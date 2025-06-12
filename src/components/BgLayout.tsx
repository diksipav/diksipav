import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div
      className={`block ${
        isHomePage
          ? "bg-gradient-to-br from-[#0a0a0a] via-[#0f0a15] to-[#302642]"
          : "bg-background"
      }`}
    >
      {children}
    </div>
  );
};

export default Layout;
