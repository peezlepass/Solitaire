import { useContext } from "react";
import SolitaireContext from "./lib/context";
import Card from "./Card";

export default function FaceUpRow({ cards, numberVisible }) {
  const { dispatch } = useContext(SolitaireContext);
  return (
    <div className="flex -space-x-44 col-span-2">
      {cards
        .slice(cards.length - numberVisible, cards.length)
        .map((cardDefinition, index) => {
          let onMouseDown;
          if (index === numberVisible - 1) {
            onMouseDown = (event) => {
              const { pageX, pageY, target } = event;
              const { left, top } = target.getBoundingClientRect();
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
              console.log(action);
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
