import Card from "./Card";

export default function CardColumn({ cards }) {
  return (
    <div className="flex flex-col -space-y-64">
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
