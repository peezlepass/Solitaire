import { useContext } from "react";
import SolitaireContext from "./lib/context";
import Card from "./Card";

export default function FaceUpRow({ cards }) {
  const { dispatch } = useContext(SolitaireContext);
  const faceUpCards = cards;
  return (
    <div className="flex -space-x-44 col-span-2">
      {faceUpCards.map((cardDefinition, index) => {
        let onMouseDown;
        if (index === faceUpCards.length - 1) {
          onMouseDown = (event) => {
            const { pageX, pageY, currentTarget } = event;
            const { left, top } = currentTarget.getBoundingClientRect();
            const action = {
              type: "SELECT_CARD_FROM_FACE_UP_ROW",
              payload: {
                selected: [cardDefinition],
                mouse: {
                  x: pageX,
                  y: pageY,
                },
                selectionOffset: {
                  x: pageX - left,
                  y: pageY - top,
                },
              },
            };
            dispatch(action);
          };
        }
        return (
          <Card
            key={`${cardDefinition.suit}-${cardDefinition.value}`}
            value={cardDefinition.value}
            suit={cardDefinition.suit}
            faceUp={cardDefinition.faceUp}
            onMouseDown={onMouseDown}
          />
        );
      })}
    </div>
  );
}
