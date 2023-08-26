import Card from "./Card";
import CardColumn from "./CardColumn";
import AceSpace from "./AceSpace";
import EmptySpace from "./EmptySpace";
import { useContext } from "react";
import SolitaireContext from "./lib/context";
import FaceUpRow from "./FaceUpRow";
import Winner from "./Winner";
import { hasWon } from "./lib/gameLogic";

export default function Field() {
  const { state, dispatch } = useContext(SolitaireContext);

  const handleDeckClick = () => {
    dispatch({ type: "REVEAL_CARDS" });
  };

  const handleEmptyDeckClick = () => {
    dispatch({ type: "RESET_DECK" });
  };

  const isDeckEmpty =
    state.faceDownCards.length === 0 &&
    state.faceUpCards.length <= 3 &&
    state.hiddenCards.length === 0;

  return (
    <div className="h-screen w-screen bg-felt bg-repeat p-8 overflow-hidden grid grid-cols-7 grid-rows-field gap-8">
      {state.faceDownCards.length ? (
        <Card faceUp={false} onClick={handleDeckClick} />
      ) : (
        <EmptySpace
          symbol={isDeckEmpty ? "X" : "O"}
          onClick={!isDeckEmpty ? handleEmptyDeckClick : undefined}
        />
      )}
      <FaceUpRow cards={state.faceUpCards} />
      <AceSpace cards={state.spacesForAces[0]} aceSpaceIndex={0} />
      <AceSpace cards={state.spacesForAces[1]} aceSpaceIndex={1} />
      <AceSpace cards={state.spacesForAces[2]} aceSpaceIndex={2} />
      <AceSpace cards={state.spacesForAces[3]} aceSpaceIndex={3} />

      {state.stacks.map((stack, index) => {
        return <CardColumn key={index} cards={stack} stackIndex={index} />;
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
      {hasWon(state) ? <Winner /> : null}
    </div>
  );
}
