import Card from "./Card";
import EmptySpace from "./EmptySpace";
import { useContext } from "react";
import SolitaireContext from "./lib/context";

export default function AceSpace({ cards, aceSpaceIndex }) {
  const { dispatch, state } = useContext(SolitaireContext);
  const onMouseUp = () => {
    if (state.selected.length) {
      dispatch({
        type: "PLACE_CARD_ON_ACE_SPACE",
        payload: { aceSpaceIndex },
      });
    }
  };

  if (cards.length === 0) {
    return <EmptySpace onMouseUp={onMouseUp} />;
  }

  const topCard = cards[cards.length - 1];
  return (
    <Card
      suit={topCard.suit}
      value={topCard.value}
      faceUp={true}
      onMouseUp={onMouseUp}
    />
  );
}
