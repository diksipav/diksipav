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
    <div className="hidden md:block md:w-[calc(50%-300px)] md:fixed md:top-[28vh] md:left-6">
      <nav className="flex flex-col gap-3 w-[157px] mx-auto">
        {headings
          .filter((heading) => heading.level === 2)
          .map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className="text-[15px] 2xl:text-base leading-5 text-[var(--link-gray)] hover:text-[var(--link-color)] hover:no-underline"
            >
              {heading.text}
            </a>
          ))}
      </nav>
    </div>
  );
};

export default Sidebar;
