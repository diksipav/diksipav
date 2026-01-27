interface Heading {
  id: string;
  text: string;
  level: number;
}

interface SidebarProps {
  headings: Heading[];
}

const Sidebar = ({ headings }: SidebarProps) => {
  return (
    <div className="hidden lg:block lg:w-[calc(50%-300px)] lg:fixed lg:top-[28vh] lg:left-6">
      <nav className="flex flex-col gap-4 w-[157px] mx-auto">
        {headings
          .filter((heading) => heading.level === 2)
          .map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className="text-[11px] text-[#ababab] hover:text-secondary/90 leading-5 border-none hover:border-none transition-colors duration-300"
            >
              {heading.text}
            </a>
          ))}
      </nav>
    </div>
  );
};

export default Sidebar;
