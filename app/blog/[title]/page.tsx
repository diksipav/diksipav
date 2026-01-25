import { readFile } from 'fs/promises';
import { join } from 'path';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from '@/lib/vsc-dark-plus';
import Layout from '@/components/Layout';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Sidebar from '@/components/Sidebar';
import rehypeSlug from 'rehype-slug';
import { collectHeadings, Heading } from '@/lib/utils';
import { remark } from 'remark';
import { readdirSync } from 'fs';

interface BlogFrontmatter {
  id: string;
  title: string;
  desc: string;
  date: string;
}

export async function generateStaticParams() {
  const blogsPath = join(process.cwd(), 'public/content/blogs');
  const files = readdirSync(blogsPath);
  const mdFiles = files.filter((file) => file.endsWith('.md'));

  return mdFiles.map((file) => ({
    title: file.replace('.md', ''),
  }));
}

async function getBlogPost(title: string) {
  try {
    const filePath = join(process.cwd(), 'public/content/blogs', `${title}.md`);
    const rawContent = await readFile(filePath, 'utf-8');

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

    return {
      frontmatter: {
        id: extractedFrontmatter.id,
        title: extractedFrontmatter.title,
        desc: extractedFrontmatter.desc,
        date: extractedFrontmatter.date,
      },
      content,
    };
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;
  const blogData = await getBlogPost(title);

  if (!blogData) {
    return <div>Blog post not found</div>;
  }

  const { frontmatter, content } = blogData;

  // Extract headings for sidebar
  const headings: Heading[] = [];
  await remark().use(remarkGfm).use(collectHeadings(headings)).process(content);

  return (
    <Layout>
      <div>
        <Sidebar headings={headings} />
      </div>
      <div>
        {/* Main content area */}
        {frontmatter && (
          <article className="pb-10 pt-14 prose prose-invert dark:prose-dark lg:prose-xl">
            <h1 className="text-4xl font-bold pb-1">{frontmatter.title}</h1>
            <p className="text-sm mb-6">
              {new Date(frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <ReactMarkdown
              children={content}
              rehypePlugins={[rehypeRaw, rehypeSlug]}
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
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
}
