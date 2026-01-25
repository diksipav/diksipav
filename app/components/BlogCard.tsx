import Link from "next/link";
import { BlogFrontmatter } from "@/hooks/useBlogs";
import { createSlug } from "@/lib/utils";

interface BlogCardProps {
  frontmatter: BlogFrontmatter;
  showDesc?: boolean;
}

const BlogCard = ({ frontmatter, showDesc = true }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <article className="flex">
      <div className="flex items-start gap-4 text-xs text-[#ababab] mb-2 mt-2 mr-2 max-w-[54px] shrink-0">
        <time>{formatDate(frontmatter.date)}</time>
      </div>
      <Link
        href={`/blog/${createSlug(frontmatter.title)}`}
        className="block hover:opacity-80 transition-opacity border-none hover:border-none"
      >
        <h2 className="text-lg font-bold my-0 text-foreground leading-tight">
          {frontmatter.title}
        </h2>
        {showDesc && (
          <p className="leading-relaxed mt-3 mb-1 line-clamp-2">
            {frontmatter.desc}
          </p>
        )}
        <p className="text-sm mt-1 mb-0 text-[#ababab]">{frontmatter.tags}</p>
      </Link>
    </article>
  );
};

export default BlogCard;
