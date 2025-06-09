
import { useState, useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import { PhotoGridProps, Photo } from '@/types/photo';
import { mockPhotos } from '@/data/mockPhotos';

const PhotoGrid = ({ onPhotoSelect }: PhotoGridProps) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [visiblePhotos, setVisiblePhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const loadedPhotosCount = useRef(0);
  const batchSize = 12;

  useEffect(() => {
    loadPhotos();
  }, []);

  useEffect(() => {
    loadMorePhotos();
  }, [photos]);

  const loadPhotos = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPhotos(mockPhotos);
      setIsLoading(false);
    }, 500);
  };

  const loadMorePhotos = () => {
    const nextBatch = photos.slice(
      loadedPhotosCount.current,
      loadedPhotosCount.current + batchSize
    );
    
    if (nextBatch.length > 0) {
      setVisiblePhotos(prev => [...prev, ...nextBatch]);
      loadedPhotosCount.current += nextBatch.length;
    }
  };

  const handleScroll = () => {
    if (!gridRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - 1000) {
      loadMorePhotos();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [photos]);

  const downloadImage = async (photo: Photo, e: React.MouseEvent) => {
    e.stopPropagation();
    
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

  const getGridSpan = (aspectRatio: number) => {
    if (aspectRatio > 1.5) return 20; // Landscape
    if (aspectRatio < 0.8) return 35; // Portrait
    return 25; // Square-ish
  };

  if (isLoading && visiblePhotos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <div ref={gridRef} className="masonry-grid">
          {visiblePhotos.map((photo) => (
            <div
              key={photo.id}
              className="masonry-item cursor-pointer group relative overflow-hidden rounded-xl"
              style={{
                '--span': getGridSpan(photo.aspectRatio)
              } as React.CSSProperties}
              onClick={() => onPhotoSelect(photo)}
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 image-overlay opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between p-4">
                <div className="text-white">
                  <h3 className="font-space font-semibold text-lg mb-1">{photo.title}</h3>
                  <p className="text-sm text-gray-200 line-clamp-2">{photo.description}</p>
                </div>
                
                <button
                  onClick={(e) => downloadImage(photo, e)}
                  className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {isLoading && visiblePhotos.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGrid;
