import { useEffect, useState } from "react";

export interface BlogFrontmatter {
  id: string;
  title: string;
  desc: string;
  date: string;
  tags: string;
}

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<BlogFrontmatter[]>([]);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogFiles = import.meta.glob("/src/content/blogs/*.md", {
          query: "?raw",
          import: "default",
        });

        const blogPromises = Object.entries(blogFiles).map(
          async ([, loadFile]) => {
            const content = await loadFile();
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
          }
        );

        const loadedBlogs = (await Promise.all(blogPromises)).filter(
          (blog): blog is BlogFrontmatter => blog !== null
        );
        // Sort blogs by date in descending order
        const sortedBlogs = loadedBlogs.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error loading blogs:", error);
      }
    };

    loadBlogs();
  }, []);

  return { blogs };
};
