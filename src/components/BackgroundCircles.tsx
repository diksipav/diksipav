import { useEffect, useState } from "react";

interface Circle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}

const BackgroundCircles = () => {
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    // Create initial circles
    const initialCircles: Circle[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10, // Random size between 10 and 30
      opacity: Math.random() * 0.1 + 0.05, // Random opacity between 0.05 and 0.15
      duration: Math.random() * 20 + 20, // Random duration between 20 and 40 seconds
    }));

    setCircles(initialCircles);

    // Animate circles
    const interval = setInterval(() => {
      setCircles((prevCircles) =>
        prevCircles.map((circle) => ({
          ...circle,
          x: circle.x + (Math.random() - 0.5) * 2,
          y: circle.y + (Math.random() - 0.5) * 2,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 p-24">
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="absolute rounded-full bg-purple"
          style={{
            left: `${circle.x}%`,
            top: `${circle.y}%`,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            opacity: circle.opacity,
            transition: `all ${circle.duration}s ease-in-out`,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundCircles;
