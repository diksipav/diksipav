import { readFile } from "fs/promises";
import { join } from "path";
import { readdirSync } from "fs";
import BlogCard from "@/components/BlogCard";
import { BlogFrontmatter } from "@/hooks/useBlogs";
import BackgroundCircles from "@/components/BackgroundCircles";

async function getBlogs(): Promise<BlogFrontmatter[]> {
  try {
    const blogsPath = join(process.cwd(), "public/content/blogs");
    const files = readdirSync(blogsPath);
    const mdFiles = files.filter((file) => file.endsWith(".md"));

    const blogPromises = mdFiles.map(async (filename) => {
      try {
        const filePath = join(blogsPath, filename);
        const content = await readFile(filePath, "utf-8");

        // Extract frontmatter using regex
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (!frontmatterMatch) return null;

        const frontmatterContent = frontmatterMatch[1];
        const frontmatter: Record<string, string> = {};

        frontmatterContent.split("\n").forEach((line) => {
          const [key, ...valueParts] = line.split(":");
          if (key && valueParts.length) {
            frontmatter[key.trim()] = valueParts
              .join(":")
              .trim()
              .replace(/^["']|["']$/g, "");
          }
        });

        return {
          id: frontmatter.id,
          title: frontmatter.title,
          desc: frontmatter.desc,
          date: frontmatter.date,
          tags: frontmatter.tags,
        };
      } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return null;
      }
    });

    const loadedBlogs = (await Promise.all(blogPromises)).filter(
      (blog): blog is BlogFrontmatter => blog !== null,
    );

    // Sort blogs by date in descending order
    const sortedBlogs = loadedBlogs.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return sortedBlogs;
  } catch (error) {
    console.error("Error loading blogs:", error);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="px-5 sm:px-11">
      <BackgroundCircles />
      <div className="flex justify-start items-start min-h-[calc(100vh-96px-35px-112px)] sm:min-h-[calc(100vh-80px-35px-112px)] mt-28">
        <div className="w-full max-w-3xl group [&>*:not(:last-child)]:mb-6">
          {blogs.map((frontmatter) => (
            <BlogCard
              key={frontmatter.id}
              frontmatter={frontmatter}
              showDesc={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
