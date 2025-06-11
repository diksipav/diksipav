import { Link } from "react-router-dom";
import { BlogFrontmatter } from "@/hooks/useBlogs";

interface BlogCardProps {
  frontmatter: BlogFrontmatter;
}

const BlogCard = ({ frontmatter }: BlogCardProps) => {
  if (!frontmatter) {
    console.error(
      "BlogCard received undefined or null frontmatter:",
      frontmatter
    );
    return null;
  }

  const description = frontmatter.description || "";
  const tags = description.split(" ").filter((word) => word.startsWith("#"));
  const descriptionWithoutTags = description
    .split(" ")
    .filter((word) => !word.startsWith("#"))
    .join(" ");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <article className="mb-4 flex">
      <div className="flex items-start gap-4 text-xs text-[#9E9E9E] mb-2 mt-1">
        <time>{formatDate(frontmatter.date)}</time>
      </div>
      <Link
        to={`/read/${frontmatter.id}`}
        className="block hover:opacity-80 transition-opacity border-none hover:border-none"
      >
        <h2 className="text-xl font-bold mb-3 mt-0 text-foreground leading-tight">
          {frontmatter.title}
        </h2>
        <p className="text-base leading-relaxed mb-2">
          {descriptionWithoutTags}
        </p>
        {tags.length > 0 && (
          <p className="text-sm  mb-0 text-[#9E9E9E]">{tags.join(" ")}</p>
        )}
      </Link>
    </article>
  );
};

export default BlogCard;
