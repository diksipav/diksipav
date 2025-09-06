import { readFile } from 'fs/promises';
import { join } from 'path';
import { readdirSync } from 'fs';
import BlogCard from '@/components/BlogCard';
import Intro from '@/components/Intro';
import { BlogFrontmatter } from '@/hooks/useBlogs';

async function getBlogs(): Promise<BlogFrontmatter[]> {
  try {
    const blogsPath = join(process.cwd(), 'public/content/blogs');
    const files = readdirSync(blogsPath);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    const blogPromises = mdFiles.map(async (filename) => {
      try {
        const filePath = join(blogsPath, filename);
        const content = await readFile(filePath, 'utf-8');
        
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

    return sortedBlogs;
  } catch (error) {
    console.error("Error loading blogs:", error);
    return [];
  }
}

export default async function HomePage() {
  const blogs = await getBlogs();

  return (
    <>
      <div className="px-5 sm:px-11 min-h-[calc(100vh-80px-35px)] flex justify-center items-center relative overflow-hidden">
        <div className="container mx-auto px-0 md:px-4 py-8 relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-24 2xl:gap-40 max-w-6xl mx-auto">
            {/* Left Column - Profile */}
            <div className="flex flex-col items-center justify-center">
              <Intro />
            </div>

            {/* Right Column - Latest Posts */}
            <div className="flex flex-col justify-center max-w-[600px] m-auto">
              <div>
                <p className="text-muted-foreground mb-4 text-sm">Latest:</p>
                <div className="group [&>*:not(:last-child)]:mb-6">
                  {blogs.slice(0, 3).map((frontmatter) => (
                    <BlogCard key={frontmatter.id} frontmatter={frontmatter} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
