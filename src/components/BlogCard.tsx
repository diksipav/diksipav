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
    return null; // Don't render if frontmatter is invalid
  }

  const description = frontmatter.description || "";
  const tags = description.split(" ").filter((word) => word.startsWith("#"));
  const descriptionWithoutTags = description
    .split(" ")
    .filter((word) => !word.startsWith("#"))
    .join(" ");

  return (
    <article className="flex mb-8 items-start">
      <time className="text-sm text-gray-500 dark:text-gray-400 min-w-[80px] mr-8 pt-1 text-right">
        {new Date(frontmatter.date)
          .toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
          .replace(" ", ". ")}
      </time>
      <Link
        to={`/read/${frontmatter.id}`}
        className="flex-1 block hover:opacity-80 transition-opacity"
      >
        <h2 className="text-xl font-bold mb-1 text-foreground">
          {frontmatter.title}
        </h2>
        {tags.length > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {tags.join(" ")}
          </p>
        )}
      </Link>
    </article>
  );
};

export default BlogCard;
