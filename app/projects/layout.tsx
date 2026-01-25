import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects.",
  description: "Projects I've built for fun and learning.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
