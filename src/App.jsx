import Field from "./Field";
import { useReducer } from "react";
import { reducer, init } from "./lib/reducer";
import SolitaireContext from "./lib/context";

function App() {
  const [state, dispatch] = useReducer(reducer, null, init);
  return (
    <SolitaireContext.Provider value={{ state, dispatch }}>
      <div className="flex gap-6 flex-wrap">
        <Field />
      </div>
    </SolitaireContext.Provider>
  );
}

export default App;
