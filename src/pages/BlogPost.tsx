import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from '@/lib/vsc-dark-plus';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Sidebar from '@/components/Sidebar';
import rehypeSlug from 'rehype-slug';
import { collectHeadings, Heading } from '@/lib/utils';
import { remark } from 'remark';

interface BlogFrontmatter {
  id: string;
  title: string;
  desc: string;
  date: string;
}

const BlogPost = () => {
  const { title } = useParams<{ title: string }>();
  const location = useLocation();
  const [postContent, setPostContent] = useState<string | null>(null);
  const [frontmatter, setFrontmatter] = useState<BlogFrontmatter | null>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // First scroll to element
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        setTimeout(() => {
          window.scrollBy({
            top: -112, // Move up to push the element down visually
            behavior: 'smooth',
          });
        }, 0);
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const modules = import.meta.glob('/src/content/blogs/*.md', {
          query: '?raw',
          import: 'default',
        });
        const modulePath = `/src/content/blogs/${title}.md`;

        if (!modules[modulePath]) {
          throw new Error('Blog post not found.');
        }

        const rawContent = await modules[modulePath]();

        // Extract frontmatter and content using regex
        const fmMatch = rawContent.match(/^---\n([\s\S]*?)\n---/);
        let content = rawContent;
        const extractedFrontmatter: Record<string, string> = {};
        if (fmMatch) {
          const frontmatterContent = fmMatch[1];
          frontmatterContent.split('\n').forEach((line) => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
              extractedFrontmatter[key.trim()] = valueParts
                .join(':')
                .trim()
                .replace(/^["']|["']$/g, '');
            }
          });
          content = rawContent.replace(fmMatch[0], '').trim();
        }
        console.log('extractedFrontmatter', extractedFrontmatter);
        setFrontmatter({
          id: extractedFrontmatter.id,
          title: extractedFrontmatter.title,
          desc: extractedFrontmatter.desc,
          date: extractedFrontmatter.date,
        });
        setPostContent(content);
      } catch (err: unknown) {
        console.error(err);
      }
    };

    fetchPost();
  }, [title]);
  console.log('headings', headings);
  useEffect(() => {
    if (!postContent) return;

    const h: Heading[] = [];
    remark()
      .use(remarkGfm)
      .use(collectHeadings(h))
      .process(postContent) // runs synchronously for a small doc
      .then(() => setHeadings(h)); // single state update
  }, [postContent]);

  return (
    <Layout>
      {frontmatter && (
        <Helmet>
          <title>{frontmatter.title} | Blog</title>
          <meta name="description" content={frontmatter.desc} />
        </Helmet>
      )}
      <div>
        <Sidebar headings={headings} />
      </div>
      <div>
        {/* Main content area */}
        {frontmatter && (
          <article className="pb-10 pt-14 prose prose-invert dark:prose-dark lg:prose-xl">
            <h1 className="text-4xl font-bold pb-1">{frontmatter.title}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              {new Date(frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <ReactMarkdown
              children={postContent}
              rehypePlugins={[rehypeRaw, rehypeSlug]}
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </article>
        )}
        {/* Empty right column */}
        <div className="grid-area-right hidden sm:block"></div>
      </div>
    </Layout>
  );
};

export default BlogPost;
