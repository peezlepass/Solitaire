import Card from "./Card";
import { useContext } from "react";
import SolitaireContext from "./lib/context";

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
  return (
    <div className={`flex flex-col -space-y-48 ${className}`} style={style}>
      {cards.map((cardDefinition, cardIndex) => {
        return (
          <Card
            key={`${cardDefinition.suit}-${cardDefinition.value}`}
            value={cardDefinition.value}
            suit={cardDefinition.suit}
            faceUp={cardDefinition.faceUp}
            onMouseUp={cardIndex === cards.length - 1 ? onMouseUp : undefined}
          />
        );
      })}
    </div>
  );
}
