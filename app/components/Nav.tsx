import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const isActive = (path: string) => {
    return usePathname() === path;
  };

  return (
    <div className="flex items-center gap-x-4 sm:gap-x-6 z-[1] relative justify-end pt-2 md:pt-5 h-full">
      <Link
        href="/blog"
        className={`text-lg hover:cursor-pointer ${
          isActive("/blog") ? "font-semibold" : "font-medium"
        }`}
      >
        blog
      </Link>
      <Link
        href="/projects"
        className={`text-lg hover:cursor-pointer ${
          isActive("/projects") ? "font-semibold" : "font-medium"
        }`}
      >
        projects
      </Link>
      <Link
        href="/cover-letter"
        className={`text-lg hover:cursor-pointer ${
          isActive("/cover-letter") ? "font-semibold" : "font-medium"
        }`}
      >
        cover letter
      </Link>
      <Link
        href="/photos"
        className={`text-lg hover:cursor-pointer ${
          isActive("/photos") ? "font-semibold" : "font-medium"
        }`}
      >
        photos
      </Link>
    </div>
  );
};

export default Nav;
