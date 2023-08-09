import Field from "./Field";
import { useReducer, useState } from "react";
import { reducer, init } from "./lib/reducer";
import SolitaireContext from "./lib/context";

function App() {
  // const [state, dispatch] = useReducer(reducer, null, init);

  const [{ x, y }, changePosition] = useState({ x: 150, y: 150 });
  const [{ xOffset, yOffset }, changeOffset] = useState({
    xOffset: 0,
    yOffset: 0,
  });

  const onMouseDown = (downEvent) => {
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
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    // <SolitaireContext.Provider value={{ state, dispatch }}>
    //   <div className="flex gap-6 flex-wrap">
    //     <Field />
    //   </div>
    // </SolitaireContext.Provider>
    <div
      className="w-64 h-64 bg-yellow-400 absolute left-12 top-12"
      style={{ left: x - xOffset, top: y - yOffset }}
      onMouseDown={onMouseDown}
    ></div>
  );
}

export default App;
