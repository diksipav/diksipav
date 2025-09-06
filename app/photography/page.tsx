'use client';

import { useState } from 'react';
import PhotoGrid from '@/components/PhotoGrid';
import ImageModal from '@/components/ImageModal';
import { Photo } from '@/types/photo';

export default function PhotographyPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <div className="px-3 sm:px-5 md:px-11 min-h-[calc(100vh-80px-35px)]">
      <div className="relative z-10 p-6 md:p-8">
        <div className="mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3"></div>
          </div>

          <div className="text-center mx-auto">
            <h2 className="text-[28px] mb-6 max-w-none leading-tight mx-auto uppercase tracking-widest">
              Everything changes and nothing stands still
            </h2>
            <p className="md:text-lg max-w-3xl mx-auto leading-relaxed">
              A small selection of photos I've taken over the years.
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
}
