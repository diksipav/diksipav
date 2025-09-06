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
        // Get list of blog files - you'll need to maintain this manually or create an API endpoint
        const blogFiles = [
          'efficient-way-to-read-string-files-in-rust.md',
          'http-evolution.md', 
          'networks-and-protocols-101-how-the-internet-connects-the-world.md',
          'what-is-quantum-computing.md'
        ];

        const blogPromises = blogFiles.map(async (filename) => {
          try {
            const response = await fetch(`/content/blogs/${filename}`);
            if (!response.ok) return null;
            const content = await response.text();
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
