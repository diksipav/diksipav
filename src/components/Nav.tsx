import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="flex items-center gap-x-6 z-[1] relative justify-end bg-[#0b0b0b] px-11 py-5 rounded-bl-md h-full shadow-[0_0_15px_rgba(11,11,11,0.3)]">
      <Link
        to="/read"
        className="text-lg leading-7 sm:leading-10font-medium px-[2px] hover:cursor-pointer"
      >
        read
      </Link>
      <Link
        to="/photography"
        className="text-lg leading-7 sm:leading-10font-medium px-[2px] hover:cursor-pointer"
      >
        photography
      </Link>
    </div>
  );
};

export default Nav;
