import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Nav = () => {
  const isActive = (path: string) => {
    return usePathname() === path;
  };

  return (
    <div className="flex items-center gap-x-4 sm:gap-x-6 z-[1] relative justify-end py-5 h-full">
      <Link
        href="/articles"
        className={`text-lg hover:cursor-pointer ${
          isActive('/articles') ? 'font-semibold' : 'font-medium'
        }`}
      >
        articles
      </Link>
      <Link
        href="/photography"
        className={`text-lg hover:cursor-pointer ${
          isActive('/photography') ? 'font-semibold' : 'font-medium'
        }`}
      >
        photography
      </Link>
    </div>
  );
};

export default Nav;
