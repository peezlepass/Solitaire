import Field from "./Field";
import { useReducer, useState } from "react";
import { reducer, init } from "./lib/reducer";
import SolitaireContext from "./lib/context";

function App() {
  // const [state, dispatch] = useReducer(reducer, null, init);

  const [{ x, y }, changePosition] = useState({ x: 150, y: 150 });

  const onMouseDown = (event) => {
    changePosition({ x: event.pageX, y: event.pageY });
  };

  const onMouseUp = () => {
    console.log("mouse up");
  };

  const onMouseMove = () => {
    console.log("mouse move");
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
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    ></div>
  );
}

export default App;
