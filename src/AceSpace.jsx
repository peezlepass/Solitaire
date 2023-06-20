import Card from "./Card";
import EmptySpace from "./EmptySpace";

export default function AceSpace({ cards }) {
  if (cards.length === 0) {
    return <EmptySpace />;
  }

  const topCard = cards[cards.length - 1];
  return <Card suit={topCard.suit} value={topCard.value} faceUp={true} />;
}
