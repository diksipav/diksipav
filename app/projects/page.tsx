import ProjectCard from "@/components/ProjectCard";

export default async function ProjectsPage() {
  return (
    <div className="px-5 sm:px-11 flex justify-start items-start min-h-[calc(100vh-96px-35px-112px)] sm:min-h-[calc(100vh-80px-35px-112px)] mt-28">
      <div className="w-full max-w-[532px] group [&>*:not(:last-child)]:mb-6">
        <ProjectCard
          title="E-commerce webhooks delivery service"
          date="Jan 2026"
          tag="golang"
          href="https://github.com/diksipav/e-commerce-webooks"
        />
        <ProjectCard
          title="VM-hours allocation service"
          date="Nov 2025"
          tag="rust"
          href="https://github.com/diksipav/concurrent-http-service"
        />
        <ProjectCard
          title="A single-process, in-memory, Redis-like streams"
          date="Sep 2025"
          tag="rust"
          href="https://github.com/diksipav/redis-streams"
        />
      </div>
    </div>
  );
}
