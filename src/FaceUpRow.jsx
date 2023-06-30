import Card from "./Card";

export default function FaceUpRow({ cards, numberVisible }) {
  return (
    <div className="flex -space-x-32 col-span-2">
      {cards.slice(-numberVisible).map((cardDefinition) => {
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
