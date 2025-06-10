import { HTMLAttributes } from "react";

interface MountainProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Mountain = ({ className = "", ...props }: MountainProps) => {
  return (
    <div className={className} {...props}>
      {/* First Mountain */}
      <div className="absolute bottom-0 left-[160px] z-[1] shadow-[0px_32px_24px_-20px_rgba(0,0,0,0.12)] border-l-[110px] border-r-[110px] border-b-[130px] border-l-transparent border-r-transparent border-b-[var(--mountain-bottom)]">
        <div className="absolute right-[-44px] z-[2] border-l-[44px] border-r-[44px] border-b-[52px] border-l-transparent border-r-transparent border-b-[var(--mountain-top)]">
          <div className="absolute top-[51px] left-[-43px] border-l-[17px] border-r-[17px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--mountain-top)]"></div>
          <div className="absolute top-[51px] left-[-15px] border-l-[17px] border-r-[17px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--mountain-top)]"></div>
          <div className="absolute top-[51px] left-[9px] border-l-[17px] border-r-[17px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--mountain-top)]"></div>
        </div>
      </div>

      {/* Second Mountain */}
      <div className="absolute bottom-[30px] left-[80px] z-0 border-l-[110px] border-r-[110px] border-b-[130px] border-l-transparent border-r-transparent border-b-[var(--mountain-bottom)]">
        <div className="absolute right-[-44px] z-[2] border-l-[44px] border-r-[44px] border-b-[52px] border-l-transparent border-r-transparent border-b-[var(--mountain-top)]">
          <div className="absolute top-[51px] left-[-43px] border-l-[17px] border-r-[17px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--mountain-top)]"></div>
          <div className="absolute top-[51px] left-[-15px] border-l-[17px] border-r-[17px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--mountain-top)]"></div>
          <div className="absolute top-[51px] left-[9px] border-l-[17px] border-r-[17px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--mountain-top)]"></div>
        </div>
      </div>

      {/* Third Mountain */}
      <div className="absolute bottom-0 left-[-10px] z-0 border-l-[110px] border-r-[110px] border-b-[130px] border-l-transparent border-r-transparent border-b-[var(--mountain-bottom)]">
        <div className="absolute right-[-44px] z-[2] border-l-[44px] border-r-[44px] border-b-[52px] border-l-transparent border-r-transparent border-b-[var(--mountain-top)]">
          <div className="absolute top-[51px] left-[-43px] border-l-[17px] border-r-[17px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--mountain-top)]"></div>
          <div className="absolute top-[51px] left-[-15px] border-l-[17px] border-r-[17px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--mountain-top)]"></div>
          <div className="absolute top-[51px] left-[9px] border-l-[17px] border-r-[17px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--mountain-top)]"></div>
        </div>
      </div>
    </div>
  );
};

export default Mountain;
