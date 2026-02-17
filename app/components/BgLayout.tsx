"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const enableBg =
    usePathname() === "/" ||
    usePathname() === "/blog/" ||
    usePathname() === "/projects/";

  return (
    <div
      className={`block bg-background}`}
      style={
        enableBg
          ? {
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,194,0.1) 1px, transparent 1px)",
              backgroundSize: "12px 12px",
            }
          : {}
      }
    >
      {children}
    </div>
  );
};

export default Layout;
