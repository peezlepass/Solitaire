import { useRef } from "react";
import { Fireworks } from "@fireworks-js/react";

export default function Winner() {
  const ref = useRef(null);
  return (
    <div className="fixed bg-transparent inset-0 flex items-center justify-center bg-black/50">
      <h1 className="font-bold text-5xl text-white [text-shadow:_2px_2px_2px_rgb(0_0_0_/_100%)]">
        Congratulations, you are the smartarse!
      </h1>
      <Fireworks
        ref={ref}
        options={{ opacity: 0.5 }}
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
