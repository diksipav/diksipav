import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div
      className={`sticky px-5 md:px-11  top-0 z-20 transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(20,20,20,0.1)] bg-background/90 backdrop-blur-md
        ${isHomePage ? "md:bg-transparent md:shadow-none" : ""}
      `}
    >
      <div className="relative">
        <div className="flex justify-between items-center relative h-full">
          <Link
            to="/"
            className="font-thicccboi text-[26px] leading-7 font-bold md:text-[32px] md:leading-10 py-5 h-full border-b-0 hover:border-b-0 w-28 md:w-fit"
          >
            dijana pavlović
          </Link>
          <div className="flex items-center gap-6 h-full">
            <Nav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
