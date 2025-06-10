import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {
  return (
    <div
      className={`sticky top-0 z-20 bg-[#0b0b0b] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-all duration-300
      `}
    >
      <div className="relative">
        <div className="flex justify-between items-center relative h-full">
          <Link
            to="/"
            className="text-purple font-thicccboi text-[26px] leading-7 font-bold sm:text-[32px] sm:leading-10 shadow-[0_0_15px_rgba(11,11,11,0.3)] px-11 py-5 rounded-br-md bg-[#0b0b0b] h-full hover:border-b-0 transition-all duration-300"
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
