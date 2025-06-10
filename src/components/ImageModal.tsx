import { useEffect } from "react";
import { X, Download, Palette } from "lucide-react";
import { ImageModalProps } from "@/types/photo";

const ImageModal = ({ photo, isOpen, onClose }: ImageModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const downloadImage = async () => {
    if (!photo) return;

    try {
      const response = await fetch(photo.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${photo.title}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-card backdrop-blur-xl rounded-2xl overflow-hidden animate-scale-in border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] ${
          photo.aspectRatio < 1 ? "h-[700px]" : "max-w-[60vw]"
        }`}
      >
        <div className="flex h-full">
          <div className="relative bg-card/70 flex items-center justify-center h-full">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="h-full w-auto object-contain"
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-card/70 hover:bg-card/90 rounded-full flex items-center justify-center text-white transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Details Section - fixed width */}
          <div className="w-[340px] p-6 space-y-6 overflow-y-auto shrink-0">
            <div>
              <h2 className="text-2xl font-space font-bold mb-4 mt-0">
                {photo.title.replace(/-/g, " ")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {photo.desc}
              </p>
            </div>
            {/* Color palette */}
            {/* <div>
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-primary" />
                <h3 className="font-space font-semibold">Color Palette</h3>
              </div>
              <div className="flex gap-3 flex-wrap">
                {photo.colors.map((color, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div
                      className="color-dot"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                    <span className="text-xs text-muted-foreground font-mono">
                      {color}
                    </span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Download Button */}
            <button
              onClick={downloadImage}
              className="w-full bg-gradient-to-r from-secondary to-primary text-black font-semibold px-6 rounded-xl hover:shadow-lg hover:shadow-primary/15 transition-all duration-300 flex items-center justify-center gap-3 py-3"
            >
              <Download className="w-5 h-5" />
              Download
            </button>

            {/* Metadata */}
            <div className="pt-4 border-t border-white/10 text-sm text-muted-foreground">
              {/* <p>Free for personal and commercial use</p> */}
              <p className="mt-1 text-muted-foreground text-sm">
                aspect ratio {Math.round(photo.aspectRatio * 1000) / 1000}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
