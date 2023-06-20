import Card from "./Card";
import CardColumn from "./CardColumn";
import AceSpace from "./AceSpace";
import { useContext } from "react";
import SolitaireContext from "./lib/context";
import FaceUpRow from "./FaceUpRow";

export default function Field() {
  const { state, disptch } = useContext(SolitaireContext);
  return (
    <div className="h-screen w-screen bg-felt bg-repeat p-8 overflow-hidden">
      <div className="flex mb-8">
        <section className="flex gap-8 mr-auto">
          <Card faceUp={false} />
          <FaceUpRow
            cards={state.faceUpCards}
            numberVisible={state.visibleFaceUpCards}
          />
        </section>
        <section className="flex gap-8">
          <AceSpace cards={state.spacesForAces[0]} />
          <AceSpace cards={state.spacesForAces[1]} />
          <AceSpace cards={state.spacesForAces[2]} />
          <AceSpace cards={state.spacesForAces[3]} />
        </section>
      </div>
      <div className="flex justify-between">
        {state.stacks.map((stack) => {
          return <CardColumn cards={stack} />;
        })}
      </div>
    </div>
  );
}
