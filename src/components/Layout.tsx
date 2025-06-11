import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="block px-3 sm:grid sm:grid-cols-[1fr_532px_1fr] 2xl:grid-cols-[1fr_612px_1fr] 3xl:grid-cols-[1fr_760px_1fr]">
      {children}
    </div>
  );
};

export default Layout;
