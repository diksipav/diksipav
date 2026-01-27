import { useState, useEffect, useRef } from "react";
import { Download } from "lucide-react";
import { PhotoGridProps, Photo } from "@/types/photo";
import { supabase } from "@/lib/supabase";
import { useIsMobile } from "@/hooks/useMobile";

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
    try {
      const { data, error } = await supabase.from("photos").select("*");
      if (error) {
        throw error;
      }

      // Transform Supabase data to match photo type
      const transformedPhotos = data.map((photo) => ({
        id: photo.id,
        title: photo.title,
        desc: photo.desc,
        imageUrl: photo.image_url,
        aspectRatio: photo.aspect_ratio || 1,
        createdAt: photo.created_at,
      }));

      setPhotos(transformedPhotos);
    } catch (error) {
      console.error("Error loading photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMorePhotos = () => {
    const nextBatch = photos.slice(
      loadedPhotosCount.current,
      loadedPhotosCount.current + batchSize,
    );

    if (nextBatch.length > 0) {
      setVisiblePhotos((prev) => [...prev, ...nextBatch]);
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [photos]);

  const downloadImage = async (photo: Photo, e: React.MouseEvent) => {
    e.stopPropagation();

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

  const isMobile = useIsMobile();

  const getGridSpan = (aspectRatio: number) => {
    if (aspectRatio > 1.5) return isMobile ? 6 : 8; // Landscape
    if (aspectRatio < 0.8) return isMobile ? 13 : 16; // Portrait
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
    <div className="pb-20">
      <div className="container max-w-[2260px] mx-auto px-0">
        <div ref={gridRef} className="masonry-grid">
          {visiblePhotos.map((photo) => (
            <div
              key={photo.id}
              className="masonry-item cursor-pointer group relative overflow-hidden rounded-sm"
              style={
                {
                  "--span": getGridSpan(photo.aspectRatio),
                } as React.CSSProperties
              }
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
                <div className="text-white mr-2">
                  <h3 className="font-semibold text-lg mb-1">
                    {photo.title.replace(/-/g, " ")}
                  </h3>
                  <p className="text-sm text-gray-200 line-clamp-2 m-0">
                    {photo.desc}
                  </p>
                </div>

                <button
                  onClick={(e) => downloadImage(photo, e)}
                  className="flex items-center gap-2 bg-gray/50 px-2 py-2 rounded-sm font-medium hover:bg-gray/80 transition-colors duration-300"
                >
                  <Download className="w-4 h-4" />
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
