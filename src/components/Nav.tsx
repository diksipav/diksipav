import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex items-center gap-x-4 sm:gap-x-6 z-[1] relative justify-end py-5 h-full">
      <Link
        to="/articles"
        className={`text-lg hover:cursor-pointer ${
          isActive("/articles") ? "font-semibold" : "font-medium"
        }`}
      >
        articles
      </Link>
      <Link
        to="/photography"
        className={`text-lg hover:cursor-pointer ${
          isActive("/photography") ? "font-semibold" : "font-medium"
        }`}
      >
        photography
      </Link>
    </div>
  );
};

export default Nav;
