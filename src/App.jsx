import Field from "./Field";
import { useReducer } from "react";
import { reducer, init } from "./lib/reducer";
import SolitaireContext from "./lib/context";

function App() {
  const [state, dispatch] = useReducer(reducer, null, init);

  const onMouseDown = () => {
    console.log("mouse down");
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
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    ></div>
  );
}

export default App;
