import Card from "./Card";
import CardColumn from "./CardColumn";
import EmptySpaces from "./EmptySpaces";

const cardStacks = [
  [{ value: 5, suit: "clubs", faceUp: true }],
  [
    { value: 6, suit: "spades", faceUp: false },
    { value: 13, suit: "hearts", faceUp: true },
  ],
  [
    { value: 6, suit: "diamonds", faceUp: false },
    { value: 5, suit: "hearts", faceUp: false },
    { value: 7, suit: "hearts", faceUp: true },
  ],
  [
    { value: 8, suit: "spades", faceUp: false },
    { value: 12, suit: "diamonds", faceUp: false },
    { value: 11, suit: "hearts", faceUp: false },
    { value: 10, suit: "diamonds", faceUp: true },
  ],
  [
    { value: 3, suit: "spades", faceUp: false },
    { value: 12, suit: "hearts", faceUp: false },
    { value: 10, suit: "hearts", faceUp: false },
    { value: 12, suit: "spades", faceUp: false },
    { value: 13, suit: "clubs", faceUp: true },
  ],
  [
    { value: 9, suit: "clubs", faceUp: false },
    { value: 1, suit: "diamonds", faceUp: false },
    { value: 2, suit: "spades", faceUp: false },
    { value: 3, suit: "clubs", faceUp: false },
    { value: 11, suit: "clubs", faceUp: false },
    { value: 11, suit: "diamonds", faceUp: true },
  ],
  [
    { value: 13, suit: "spades", faceUp: false },
    { value: 4, suit: "hearts", faceUp: false },
    { value: 4, suit: "spades", faceUp: false },
    { value: 7, suit: "diamonds", faceUp: false },
    { value: 8, suit: "clubs", faceUp: false },
    { value: 7, suit: "spades", faceUp: false },
    { value: 1, suit: "clubs", faceUp: true },
  ],
];

export default function Field() {
  return (
    <div className="h-screen w-screen bg-felt bg-repeat p-8 overflow-hidden">
      <div className="flex mb-8">
        <section className="flex gap-8 mr-auto">
          <Card suit="diamonds" value="3" faceUp={false} />
          <Card suit="diamonds" value="7" faceUp={true} />
        </section>
        <section className="flex gap-8">
          <EmptySpaces />
          <EmptySpaces />
          <EmptySpaces />
          <EmptySpaces />
        </section>
      </div>
      <div className="flex justify-between">
        {cardStacks.map((stack) => {
          return <CardColumn cards={stack} />;
        })}
      </div>
    </div>
  );
}
