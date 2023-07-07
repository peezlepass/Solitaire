const valueMap = {
  1: "A",
  11: "J",
  12: "Q",
  13: "K",
};

const suitEmojiMap = {
  hearts: "♥️",
  diamonds: "♦️",
  spades: "♠️",
  clubs: "♣️",
};

const suitColourMap = {
  hearts: "text-red-500",
  diamonds: "text-red-500",
  spades: "text-black",
  clubs: "text-black",
};

export default function Card({ suit, value, faceUp, onClick }) {
  const colour = suitColourMap[suit];
  return (
    <div
      className={`${
        faceUp ? "border bg-white" : ""
      } rounded-lg border-gray-300 shadow-sm w-card h-card flex items-center justify-center relative`}
      onClick={onClick}
    >
      {faceUp ? (
        <>
          <span className="absolute top-0.5 left-0.5 flex flex-col items-center -space-y-1">
            <span className={`${colour} text-xl font-bold`}>
              {valueMap[value] || value}
            </span>
            <span className={`${colour} text-2xl`}>{suitEmojiMap[suit]}</span>
          </span>
          <span className="absolute bottom-0.5 right-0.5 flex flex-col items-center -space-y-1">
            <span className={`${colour} text-2xl totate-180`}>
              {suitEmojiMap[suit]}
            </span>
            <span className={`${colour} text-xl font-bold rotate-180`}>
              {valueMap[value] || value}
            </span>
          </span>
        </>
      ) : (
        <div className="w-full h-full bg-card-back bg-cover"></div>
      )}
    </div>
  );
}
