import { useEffect } from "react";
import { X, Download } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-card backdrop-blur-xl rounded-lg overflow-hidden animate-scale-in shadow-[0_0_30px_rgba(0,0,0,0.3)] ${
          photo.aspectRatio < 1
            ? "lg:h-[600px] sm:w-[460px] lg:w-[unset]"
            : "w-[calc(100vw_-_40px)] sm:w-[unset] sm:max-w-[500px] lg:max-w-[800px]"
        }`}
      >
        <div className="flex h-full flex-col lg:flex-row">
          <div
            className={`relative bg-card/70 flex items-center justify-start h-full ${
              photo.aspectRatio < 1 ? "pt-5 lg:pt-0" : ""
            }  `}
          >
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className={`object-contain lg:rounded-tl-lg lg:rounded-bl-lg lg:rounded-tr-none ${
                photo.aspectRatio < 1
                  ? "ml-5 max-w-[72%] sm:max-w-[56%] lg:ml-0 lg:max-w-[unset] lg:h-full lg:w-auto rounded-lg"
                  : "rounded-tp-lg rounded-tr-lg"
              }`}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-background/60 hover:bg-card/80 rounded-full flex items-center justify-center text-white/90 transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Details Section - fixed width */}
          <div className="px-4 py-3 sm:p-6 space-y-6 overflow-y-auto shrink-0 lg:w-[300px]">
            <div>
              <h2 className="text-2xl font-bold mb-4 mt-0">
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
              className="w-full bg-gradient-to-r from-secondary to-primary text-black font-semibold px-6 rounded-xl hover:shadow-lg hover:shadow-primary/15 transition-all duration-300 flex items-center justify-center gap-3 py-2.5 sm:py-3 max-w-[300px]"
            >
              <Download className="w-5 h-5" />
              Download
            </button>

            <div className="pt-4 border-t border-white/15 text-sm text-muted-foreground">
              <p className="mt-1 text-muted-foreground text-sm mb-2">
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
