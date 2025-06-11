import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex items-center gap-x-6 z-[1] relative justify-end px-11 py-5 rounded-bl-md h-full shadow-[0_0_15px_rgba(11,11,11,0.3)]">
      <Link
        to="/read"
        className={`text-lg px-[2px] hover:cursor-pointer transition-all duration-300${
          isActive("/read") ? "border-secondary" : "border-transparent"
        }`}
      >
        read
      </Link>
      <Link
        to="/photography"
        className={`text-lg px-[2px] hover:cursor-pointer transition-all duration-300 ${
          isActive("/photography") ? "font-semibold" : "font-medium"
        }`}
      >
        photography
      </Link>
    </div>
  );
};

export default Nav;
