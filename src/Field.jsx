import Card from "./Card";
import CardColumn from "./CardColumn";
import AceSpace from "./AceSpace";
import { useContext } from "react";
import SolitaireContext from "./lib/context";
import FaceUpRow from "./FaceUpRow";

export default function Field() {
  const { state, disptch } = useContext(SolitaireContext);
  return (
    <div className="h-screen w-screen bg-felt bg-repeat p-8 overflow-hidden grid grid-cols-7 grid-rows-field gap-8">
        <Card faceUp={false} />
        <FaceUpRow
          cards={state.faceUpCards}
          numberVisible={state.visibleFaceUpCards}
        />
        <AceSpace cards={state.spacesForAces[0]} />
        <AceSpace cards={state.spacesForAces[1]} />
        <AceSpace cards={state.spacesForAces[2]} />
        <AceSpace cards={state.spacesForAces[3]} />
      
      {state.stacks.map((stack, index) => {
        return <CardColumn key={index} cards={stack} />;
      })}
    </div>
  );
}
