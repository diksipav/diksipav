import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="px-5 sm:px-11 block sm:grid sm:grid-cols-[1fr_532_1fr] 2xl:grid-cols-[1fr_612_1fr] 3xl:grid-cols-[1fr_720_1fr]">
      {children}
    </div>
  );
};

export default Layout;
