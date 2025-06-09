
import { useEffect } from 'react';
import { X, Download, Palette } from 'lucide-react';
import { ImageModalProps } from '@/types/photo';

const ImageModal = ({ photo, isOpen, onClose }: ImageModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const downloadImage = async () => {
    if (!photo) return;
    
    try {
      const response = await fetch(photo.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${photo.title}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card/90 backdrop-blur-xl rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden animate-scale-in border border-white/10">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Image Section */}
          <div className="lg:w-2/3 relative bg-black/50 flex items-center justify-center">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Details Section */}
          <div className="lg:w-1/3 p-6 lg:p-8 space-y-6 overflow-y-auto">
            <div>
              <h2 className="text-2xl lg:text-3xl font-space font-bold mb-4">{photo.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{photo.description}</p>
            </div>
            
            {/* Color Palette */}
            <div>
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
                    <span className="text-xs text-muted-foreground font-mono">{color}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Download Button */}
            <button
              onClick={downloadImage}
              className="w-full bg-gradient-to-r from-primary to-secondary text-black font-semibold py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Download className="w-5 h-5" />
              Download High Resolution
            </button>
            
            {/* Metadata */}
            <div className="pt-4 border-t border-white/10 text-sm text-muted-foreground">
              <p>Free for personal and commercial use</p>
              <p className="mt-1">High resolution • {Math.round(photo.aspectRatio * 1000) / 1000} aspect ratio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
