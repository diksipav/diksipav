import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import BlogCard from "@/components/BlogCard";
import { useBlogs } from "@/hooks/useBlogs";
import BackgroundCircles from "@/components/BackgroundCircles";

const Read = () => {
  const { blogs } = useBlogs();

  return (
    <Layout>
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
      <BackgroundCircles />
      <div className="col-start-2 flex justify-center items-center min-h-[calc(100vh-96px-35px)] sm:min-h-[calc(100vh-80px-35px)]">
        <div className="w-full max-w-3xl group [&>*:not(:last-child)]:mb-6">
          {blogs.map((frontmatter) => (
            <BlogCard key={frontmatter.id} frontmatter={frontmatter} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Read;
