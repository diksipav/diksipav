import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import BlogCard from "@/components/BlogCard";
import { useBlogs } from "@/hooks/useBlogs";

const Read = () => {
  const { blogs } = useBlogs();

  return (
    <>
      <Helmet>
        <title>
          Blog posts on software engineering, digital nomad life and my personal
          philosophies.
        </title>
        <meta
          name="description"
          content="Read blog posts on software engineering, including front-end and 
          back-end development, JS/TS, Rust, and more. Occasionally, Sometimes, I 
          also write about digital nomad life and personal philosophies."
        />
      </Helmet>

      <Layout>
        <div className="flex justify-center py-10">
          <div className="w-full max-w-3xl">
            {blogs.map((frontmatter) => (
              <BlogCard key={frontmatter.id} frontmatter={frontmatter} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Read;
