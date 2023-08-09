import Field from "./Field";
import { useReducer, useState } from "react";
import { reducer, init } from "./lib/reducer";
import SolitaireContext from "./lib/context";

function App() {
  // const [state, dispatch] = useReducer(reducer, null, init);

  const [{ x, y }, changePosition] = useState({ x: 150, y: 150 });

  const onMouseDown = (event) => {
    // Start dragging

    // Set up a mouseMove handler on Window
    // Gonna move the box every time it fires
    const onMouseMove = (event) => {
      changePosition({ x: event.pageX, y: event.pageY });
    };

    // Set up a mouseUp handler on Window
    // gonna Stop dragging
    // gonna turn off mousemove handler on window
    const onMouseUp = (event) => {
      console.log("onMouseUp");
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
      style={{ left: x, top: y }}
      onMouseDown={onMouseDown}
    ></div>
  );
}

export default App;
