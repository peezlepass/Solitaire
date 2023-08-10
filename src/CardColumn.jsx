import Card from "./Card";

export default function CardColumn({ cards, className, style }) {
  return (
    <div className={`flex flex-col -space-y-48 ${className}`} style={style}>
      {cards.map((cardDefinition) => {
        return (
          <Card
            key={`${cardDefinition.suit}-${cardDefinition.value}`}
            value={cardDefinition.value}
            suit={cardDefinition.suit}
            faceUp={cardDefinition.faceUp}
          />
        );
      })}
    </div>
  );
}
