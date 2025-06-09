
import { Camera } from 'lucide-react';

const Header = () => {
  return (
    <header className="relative z-10 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Camera className="w-5 h-5 text-black" />
            </div>
            <h1 className="text-2xl font-space font-bold">Photo Showcase</h1>
          </div>
        </div>
        
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-space font-bold mb-6 leading-tight">
            Premium Photography
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Collection
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover and download high-quality photographs for your creative projects. 
            Each image is carefully curated and available for free use.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
