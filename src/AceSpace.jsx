import Card from "./Card";
import EmptySpace from "./EmptySpace";
import { useContext } from "react";
import SolitaireContext from "./lib/context";

export default function AceSpace({ cards, aceSpaceIndex }) {
  const { dispatch, state } = useContext(SolitaireContext);
  const topCard = cards[cards.length - 1];

  const onMouseUp = () => {
    if (state.selected.length) {
      dispatch({
        type: "PLACE_CARD_ON_ACE_SPACE",
        payload: { aceSpaceIndex },
      });
    }
  };

  const onMouseDown = (event) => {
    const { pageX, pageY, currentTarget } = event;
    const { left, top } = currentTarget.getBoundingClientRect();

    dispatch({
      type: "SELECT_CARD_FROM_ACE_SPACE",
      payload: {
        selected: topCard,
        aceSpaceIndex,
        mouse: {
          x: pageX,
          y: pageY,
        },
        selectionOffset: {
          x: pageX - left,
          y: pageY - top,
        },
      },
    });
  };

  if (cards.length === 0) {
    return <EmptySpace onMouseUp={onMouseUp} />;
  }

  return (
    <Card
      suit={topCard.suit}
      value={topCard.value}
      faceUp={true}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
    />
  );
}
