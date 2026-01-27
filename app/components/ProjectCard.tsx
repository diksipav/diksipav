interface ProjectCardProps {
  title: string;
  date: string;
  tag: string;
  href: string;
}

const ProjectCard = ({ title, date, tag, href }: ProjectCardProps) => {
  return (
    <article className="flex">
      <div className="text-xs text-[#ababab] mb-2 mt-1 mr-2 max-w-[40px] shrink-0">
        <time>{date}</time>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:opacity-80 transition-opacity border-none hover:border-none"
      >
        <h2 className="text-base font-semibold my-0 text-foreground leading-tight">
          {title}
        </h2>
        <p className="text-sm mt-1 mb-0 text-[#ababab]">#{tag}</p>
      </a>
    </article>
  );
};

export default ProjectCard;
