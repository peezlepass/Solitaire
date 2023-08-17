import Card from "./Card";
import { useContext } from "react";
import SolitaireContext from "./lib/context";
import EmptySpace from "./EmptySpace";

export default function CardColumn({ cards, className, style, stackIndex }) {
  const { dispatch, state } = useContext(SolitaireContext);

  const onMouseUp = () => {
    if (state.selected.length) {
      dispatch({
        type: "PLACE_CARDS_ON_STACK",
        payload: { stackIndex },
      });
    }
  };

  if (cards.length === 0) {
    return <EmptySpace onMouseUp={onMouseUp} />;
  }

  let firstFaceUpCard = cards.findIndex((card) => card.faceUp);
  if (firstFaceUpCard === -1) {
    firstFaceUpCard = Infinity;
  }
  return (
    <div className={`flex flex-col -space-y-72 ${className}`} style={style}>
      {cards.map((cardDefinition, cardIndex) => {
        const onMouseDown = (event) => {
          const { pageX, pageY, target } = event;
          const { left, top } = target.getBoundingClientRect();

          dispatch({
            type: "SELECT_CARDS_FROM_STACKS",
            payload: {
              stackIndex,
              selected: cards.slice(cardIndex),
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
        return (
          <Card
            key={`${cardDefinition.suit}-${cardDefinition.value}`}
            value={cardDefinition.value}
            suit={cardDefinition.suit}
            faceUp={cardDefinition.faceUp}
            className={cardIndex > firstFaceUpCard ? "!-mt-64 " : ""}
            onMouseDown={cardDefinition.faceUp ? onMouseDown : undefined}
            onMouseUp={cardIndex === cards.length - 1 ? onMouseUp : undefined}
          />
        );
      })}
    </div>
  );
}
