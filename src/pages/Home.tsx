import { Helmet } from "react-helmet-async";
import BlogCard from "@/components/BlogCard";
import Intro from "@/components/Intro";
import { useBlogs } from "@/hooks/useBlogs";

const Home = () => {
  const { blogs } = useBlogs();
  console.log("bb", blogs);
  return (
    <>
      <Helmet>
        <title>
          Software Engineer & Consultants | Insights on Tech, AI & Software
        </title>
        <meta
          name="description"
          content="Hi, I'm a software engineer and digital nomad from Serbia. 
          Explore my insights on software engineering, tech adventures, and personal 
          interests. Currently building with EdgeDB and sharing my experiences with coding, nature, and more."
        />
      </Helmet>

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
};

export default Home;
