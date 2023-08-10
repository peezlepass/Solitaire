import { useContext } from "react";
import SolitaireContext from "./lib/context";
import Card from "./Card";

export default function FaceUpRow({ cards, numberVisible }) {
  const { dispatch } = useContext(SolitaireContext);
  return (
    <div className="flex -space-x-32 col-span-2">
      {cards.slice(-numberVisible).map((cardDefinition, index) => {
        let onMouseDown;
        if (index === cards.length - 1) {
          onMouseDown = (event) => {
            const { pageX, pageY } = event;
            dispatch({
              type: "SELECT_CARD_FROM_FACE_UP_ROW",
              payload: {
                selected: [cardDefinition],
                mouse: {
                  x: pageX,
                  y: pageY,
                },
                selectionOffset: {
                  x: 0,
                  y: 0,
                },
              },
            });
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
