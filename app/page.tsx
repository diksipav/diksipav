import { readFile } from "fs/promises";
import { join } from "path";
import { readdirSync } from "fs";
import Intro from "@/components/Intro";
import { BlogFrontmatter } from "@/hooks/useBlogs";

export default async function HomePage() {
  return (
    <>
      <div className="px-5 sm:px-11 min-h-[calc(100vh-90px-35px)] md:min-h-[calc(100vh-80px-35px)] flex justify-center items-center relative overflow-hidden">
        <div className="container mx-auto px-0 md:px-4 py-8 relative z-10">
          <div className="mx-auto">
            <div className="flex flex-col items-center justify-center">
              <Intro />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
