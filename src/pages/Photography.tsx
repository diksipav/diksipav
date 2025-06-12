import { useState } from "react";
import PhotoGrid from "@/components/PhotoGrid";
import ImageModal from "@/components/ImageModal";
import { Photo } from "@/types/photo";

const Photography = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <div className="px-3 sm:px-5 md:px-11 min-h-[calc(100vh-80px-35px)] ">
      <div className="relative z-10 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3"></div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-space font-bold mb-6 leading-tight">
              Captured moments
              {/* <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              moments
            </span> */}
            </h2>
            <p className="md:text-lg max-w-3xl mx-auto leading-relaxed">
              Photography is my way of remembering the beauty in people, nature,
              and places I cross paths with. Each photo holds a piece of a
              journey, a feeling, a story.
            </p>
          </div>
        </div>
      </div>
      <PhotoGrid onPhotoSelect={setSelectedPhoto} />
      <ImageModal
        photo={selectedPhoto}
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
};

export default Photography;
