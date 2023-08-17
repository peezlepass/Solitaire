import { Fireworks } from "@fireworks-js/react";
import { useRef } from "react";

export default function Winner() {
  const ref = useRef(null);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <h1 className="font-bold text-5xl text-white [text-shadow:_2px_2px_2px_rgb(0_0_0_/_100%)]">
        Congratulations, you are a smartarse :)
      </h1>
      <Fireworks
        ref={ref}
        options={{
          hue: {
            min: 0,
            max: 345,
          },
          acceleration: 1,
          brightness: { min: 50, max: 80 },
          decay: { min: 0.012, max: 0.016 },
          delay: { min: 30, max: 60 },
          explosion: 4,
          flickering: 100,
          intensity: 35,
          friction: 1,
          gravity: 0.87,
          opacity: 0.1,
          particles: 107,
          traceLength: 6.58,
          traceSpeed: 10,
          rocketsPoint: {
            min: 50,
            max: 50,
          },
          lineWidth: {
            explosion: {
              min: 1,
              max: 2.58,
            },
            trace: {
              min: 1,
              max: 2.58,
            },
          },
          lineStyle: "round",
        }}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
          background: "transparent",
        }}
      />
    </div>
  );
}
