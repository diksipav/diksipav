
import { Helmet } from "react-helmet-async";
import BlogCard from "@/components/BlogCard";
import Intro from "@/components/Intro";
import BackgroundCircles from "@/components/BackgroundCircles";

// This would typically come from your data fetching layer
const mockBlogs = [
  {
    id: "1",
    title: "What is quantum computing?",
    description:
      "Imagine trying to design a life-saving drug by predicting exactly how complex molecules will... #quantum-computing",
    date: "2024-05-30",
    slug: "what-is-quantum-computing",
  },
  {
    id: "2",
    title: "HTTP evolution (part 1 - HTTP/1 & HTTP/2)",
    description:
      "Did you know that HTTP/3 is available? The majority of big browsers support it, and some big domains like... #software #computer-networking",
    date: "2024-09-21",
    slug: "http-evolution-part-1",
  },
  {
    id: "3",
    title: "Networks and protocols 101 — how the Internet connects the world",
    description:
      "This post is the first in a series exploring the Internet and some networking protocols. In this introduction,... #software #computer-networking",
    date: "2024-09-15",
    slug: "networks-and-protocols-101",
  },
];

const Home = () => {
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

      <div className="min-h-[calc(100vh-80px-35px)] flex justify-center items-center relative overflow-hidden">
        {/* Smooth gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d1b4e] via-[#1a1625] to-background opacity-80"></div>
        
        <BackgroundCircles />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Left Column - Profile */}
            <div className="flex flex-col items-center justify-center">
              <Intro />
            </div>

            {/* Right Column - Latest Posts */}
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <p className="text-muted-foreground mb-4">Latest:</p>
                <div className="space-y-8">
                  {mockBlogs.map((blog) => (
                    <BlogCard key={blog.id} frontmatter={blog} />
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
