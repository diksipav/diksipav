// components/BackgroundCircles.tsx
import type { CSSProperties, FC } from "react";

const CIRCLES = 15;

/* Helper for random numbers in a range */
const r = (min: number, max: number) => Math.random() * (max - min) + min;

const BackgroundCircles: FC = () => (
  <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
    {Array.from({ length: CIRCLES }).map((_, i) => {
      const size = r(20, 40); // px
      const style: CSSProperties = {
        /* Start anywhere (-10 % lets some spawn slightly off-screen) */
        top: `${r(-10, 90)}%`,
        left: `${r(-10, 90)}%`,
        width: size,
        height: size,
        opacity: r(0.12, 0.25),

        /* ③  Per-circle motion path (in pixels) */
        ["--x1" as any]: `${r(-70, 70)}px`,
        ["--y1" as any]: `${r(-70, 70)}px`,
        ["--x2" as any]: `${r(-70, 70)}px`,
        ["--y2" as any]: `${r(-70, 70)}px`,
        ["--x3" as any]: `${r(-70, 70)}px`,
        ["--y3" as any]: `${r(-70, 70)}px`,

        /* ④  Per-circle speed   (8–13 s = visibly faster) */
        ["--duration" as any]: `${r(10, 15)}s`,

        /* Optional: slightly softer edges */
        filter: "blur(0.5px)",
      };

      return (
        <div
          key={i}
          className="absolute rounded-full bg-secondary animate-drift"
          style={style}
        />
      );
    })}
  </div>
);

export default BackgroundCircles;
