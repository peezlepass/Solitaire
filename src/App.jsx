import Field from "./Field";
import { useReducer, useState } from "react";
import { reducer, init } from "./lib/reducer";
import SolitaireContext from "./lib/context";

function App() {
  // const [state, dispatch] = useReducer(reducer, null, init);

  const [{ x, y }, changePosition] = useState({ x: 200, y: 200 });
  const [{ xOffset, yOffset }, changeOffset] = useState({
    xOffset: 0,
    yOffset: 0,
  });
  const [isDragging, setDragging] = useState(false);

  const onMouseDown = (downEvent) => {
    setDragging(true);
    const rect = downEvent.target.getBoundingClientRect();
    changePosition({ x: downEvent.pageX, y: downEvent.pageY });
    changeOffset({
      xOffset: downEvent.pageX - rect.left,
      yOffset: downEvent.pageY - rect.top,
    });

    const onMouseMove = (moveEvent) => {
      changePosition({ x: moveEvent.pageX, y: moveEvent.pageY });
    };

    const onMouseUp = (upEvent) => {
      setDragging(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onDrop = () => {
    if (isDragging) {
      console.log("dropped me");
    }
  };

  return (
    // <SolitaireContext.Provider value={{ state, dispatch }}>
    //   <div className="flex gap-6 flex-wrap">
    //     <Field />
    //   </div>
    // </SolitaireContext.Provider>
    <>
      <div
        className="w-96 h-96 bg-blue-300 absolute right-12 bottom-12"
        onMouseUp={onDrop}
      ></div>
      <div
        className={`w-64 h-64 bg-yellow-400 absolute ${
          isDragging ? "pointer-events-none" : ""
        }`}
        style={{ left: x - xOffset, top: y - yOffset }}
        onMouseDown={onMouseDown}
      ></div>
    </>
  );
}

export default App;
