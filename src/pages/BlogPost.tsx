import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Sidebar from "@/components/Sidebar";

interface BlogFrontmatter {
  id: string;
  title: string;
  desc: string;
  date: string;
  slug: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [postContent, setPostContent] = useState<string | null>(null);
  const [frontmatter, setFrontmatter] = useState<BlogFrontmatter | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Dynamically import the markdown file from the specific slug directory
        const modules = import.meta.glob("/src/content/blogs/*.md", {
          query: "?raw",
          import: "default",
        });
        const modulePath = `/src/content/blogs/${slug}/index.md`;

        if (!modules[modulePath]) {
          throw new Error("Blog post not found.");
        }

        const rawContent = await modules[modulePath]();

        // Extract frontmatter and content using regex
        const frontmatterMatch = rawContent.match(/^---\n([\s\S]*?)\n---/);
        let content = rawContent;
        const extractedFrontmatter: Record<string, string> = {}; // Changed to const

        if (frontmatterMatch) {
          const frontmatterContent = frontmatterMatch[1];
          frontmatterContent.split("\n").forEach((line) => {
            const [key, ...valueParts] = line.split(":");
            if (key && valueParts.length) {
              extractedFrontmatter[key.trim()] = valueParts
                .join(":")
                .trim()
                .replace(/^["']|["']$/g, "");
            }
          });
          content = rawContent.replace(frontmatterMatch[0], "").trim();
        }

        setFrontmatter({
          id: extractedFrontmatter.id || slug,
          title: extractedFrontmatter.title || slug,
          desc: extractedFrontmatter.desc || "",
          date: extractedFrontmatter.date || "",
          slug: slug,
        });
        content = content.replace("{desc}", extractedFrontmatter.desc || "");
        setPostContent(content);
      } catch (err: unknown) {
        console.error(err);
      }
    };

    fetchPost();
  }, [slug]);

  return (
    <Layout>
      <Helmet>
        <title>{frontmatter.title} | Blog</title>
        <meta name="description" content={frontmatter.desc} />
      </Helmet>
      <div className="grid-area-left sm:block">
        {/* Removed border */}
        <Sidebar headings={[]} /> {/* Removed dummy headings */}
      </div>
      {/* Main grid container for the blog post */}
      <div>
        {/* Sidebar for left column, hidden on small screens */}

        {/* Main content area */}
        <article className="grid-area-main pb-10 pt-14 prose prose-invert dark:prose-dark lg:prose-xl">
          {/* Removed border and width classes */}
          <h1 className="text-4xl font-bold pb-1">{frontmatter.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <ReactMarkdown
            children={postContent}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          />
        </article>
        {/* Empty right column */}
        <div className="grid-area-right hidden sm:block"></div>
      </div>
    </Layout>
  );
};

export default BlogPost;
