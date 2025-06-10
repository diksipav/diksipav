import { Helmet } from "react-helmet-async";
import BlogCard from "@/components/BlogCard";
import Intro from "@/components/Intro";
import Header from "@/components/Header";

// This would typically come from your data fetching layer
const mockBlogs = [
  {
    id: "1",
    title: "Getting Started with EdgeDB",
    description:
      "A comprehensive guide to setting up and using EdgeDB in your projects",
    date: "2024-03-20",
    slug: "getting-started-with-edgedb",
  },
  {
    id: "2",
    title: "Digital Nomad Life in 2024",
    description: "My experiences and tips for working remotely while traveling",
    date: "2024-03-15",
    slug: "digital-nomad-life-2024",
  },
  {
    id: "3",
    title: "Building Modern Web Apps",
    description:
      "Best practices and tools for creating scalable web applications",
    date: "2024-03-10",
    slug: "building-modern-web-apps",
  },
];

const Home = () => {
  return (
    <>
      <Helmet>
        <title>
          Software Engineer & Digital Nomad | Insights on Tech & Life
        </title>
        <meta
          name="description"
          content="Hi, I'm a software engineer and digital nomad from Serbia. 
          Explore my insights on software engineering, tech adventures, and personal 
          interests. Currently building with EdgeDB and sharing my experiences with coding, nature, and more."
        />
      </Helmet>

      <div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px_minmax(100px,1fr)_480px_1fr] xl:grid-cols-[1fr_512px_minmax(180px,1fr)_512px_1fr] gap-4">
            <div className="lg:col-start-2">
              <Intro />
            </div>

            <div className="lg:col-start-4">
              <div className="flex flex-col items-center mt-12">
                <p className="text-sm text-gray-400 self-start pl-5 mb-4 hidden lg:block">
                  Latest:
                </p>
                {mockBlogs.map((blog) => (
                  <BlogCard key={blog.id} frontmatter={blog} />
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-8 lg:hidden">
            <p className="text-gray-400">. . .</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
