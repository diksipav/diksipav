import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from '@/lib/vsc-dark-plus';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

const BragDoc = () => {
  const [postContent, setPostContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const modules = import.meta.glob('/src/content/brag-doc.md', {
          query: '?raw',
          import: 'default',
        });
        const modulePath = '/src/content/brag-doc.md';

        if (!modules[modulePath]) {
          throw new Error('Brag document not found.');
        }

        const rawContent = (await modules[modulePath]()) as string;
        setPostContent(rawContent);
      } catch (err: unknown) {
        console.error(err);
      }
    };

    fetchPost();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Diksipav brag document</title>
        <meta
          name="description"
          content="A timeline highlighting some of the important things I've accomplished."
        />
      </Helmet>
      <div className="col-start-2 flex min-h-[calc(100vh-96px-35px)] sm:min-h-[calc(100vh-80px-35px)]|">
        {/* Main content area */}
        <article className="pb-10 pt-14">
          <p className="text-sm mb-6">
            A running log of my work, achievements, and learnings.
          </p>
          {postContent && (
            <ReactMarkdown
              children={postContent}
              rehypePlugins={[rehypeRaw, rehypeSlug]}
              remarkPlugins={[remarkGfm]}
              components={{
                code({ className, children, ...props }) {
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
          )}
        </article>
        {/* Empty right column */}
        <div className="grid-area-right hidden sm:block"></div>
      </div>
    </Layout>
  );
};

export default BragDoc;
