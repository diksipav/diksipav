import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";

export default async function ProjectsPage() {
  return (
    <Layout>
      <div
        className="w-[calc(100vw-40px)] sm:w-[calc(100vw-64px)]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,194,0.1) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      >
        <div className="col-start-2 flex justify-center items-center min-h-[calc(100vh-96px-35px)] sm:min-h-[calc(100vh-80px-35px)]">
          <div className="w-full max-w-[532px] group [&>*:not(:last-child)]:mb-6">
            <ProjectCard
              title="E-commerce webhooks delivery service"
              date="Jan 2026"
              tag="Golang"
              href="https://github.com/diksipav/e-commerce-webooks"
            />
            <ProjectCard
              title="VM-hours allocation service"
              date="Nov 2025"
              tag="Rust"
              href="https://github.com/diksipav/concurrent-http-service"
            />
            <ProjectCard
              title="A single-process, in-memory, Redis-like streams"
              date="Sep 2025"
              tag="Rust"
              href="https://github.com/diksipav/redis-streams"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
