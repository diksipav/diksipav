export interface Photo {
  id: number;
  title: string;
  desc: string;
  imageUrl: string;
  // colors: string[];
  aspectRatio: number;
  createdAt?: string;
}

export interface PhotoGridProps {
  onPhotoSelect: (photo: Photo) => void;
}

export interface ImageModalProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
}
