import Card from "./Card";
import CardColumn from "./CardColumn";
import AceSpace from "./AceSpace";
import EmptySpace from "./EmptySpace";
import { useContext } from "react";
import SolitaireContext from "./lib/context";
import FaceUpRow from "./FaceUpRow";

export default function Field() {
  const { state, dispatch } = useContext(SolitaireContext);

  const handleDeckClick = () => {
    dispatch({ type: "REVEAL_CARDS" });
  };

  const handleEmptyDeckClick = () => {
    dispatch({ type: "RESET_DECK" });
  };

  console.log("=>state", state);

  return (
    <div className="h-screen w-screen bg-felt bg-repeat p-8 overflow-hidden grid grid-cols-7 grid-rows-field gap-8">
      {state.faceDownCards.length ? (
        <Card faceUp={false} onClick={handleDeckClick} />
      ) : (
        <EmptySpace onClick={handleEmptyDeckClick} />
      )}
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
      {state.selected.length ? (
        <CardColumn
          cards={state.selected}
          className="absolute pointer-events-none"
          style={{
            left: state.mouse.x - state.selectionOffset.x,
            top: state.mouse.y - state.selectionOffset.y,
          }}
        />
      ) : undefined}
    </div>
  );
}
