
import { useState } from 'react';
import PhotoGrid from '@/components/PhotoGrid';
import ImageModal from '@/components/ImageModal';
import Header from '@/components/Header';
import { Photo } from '@/types/photo';

const Index = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <div className="min-h-screen bg-showcase-dark">
      <Header />
      <PhotoGrid onPhotoSelect={setSelectedPhoto} />
      <ImageModal 
        photo={selectedPhoto} 
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
};

export default Index;
