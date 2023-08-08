import Field from "./Field";
import { useReducer } from "react";
import { reducer, init } from "./lib/reducer";
import SolitaireContext from "./lib/context";

function App() {
  const [state, dispatch] = useReducer(reducer, null, init);

  const onClickYellow = (event) => {
    event.stopProoagation();
    console.log("clicked yellow");
  };

  const onClickRed = () => {
    console.log("clicked red");
  };

  const onClickWrapper = () => {
    console.log("clicked wrapper");
  };

  return (
    // <SolitaireContext.Provider value={{ state, dispatch }}>
    //   <div className="flex gap-6 flex-wrap">
    //     <Field />
    //   </div>
    // </SolitaireContext.Provider>
    <div onClick={onClickWrapper}>
      <div
        className="w-64 h-64 bg-yellow-400 absolute left-12 top-12"
        onClick={onClickYellow}
      >
        <div className="w-32 h-32 m-12 bg-red-500" onClick={onClickRed}></div>
      </div>
    </div>
  );
}

export default App;
