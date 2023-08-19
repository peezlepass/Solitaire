import { useContext } from "react";
import SolitaireContext from "./lib/context";

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

const LayoutMap = {
  1: Ace,
  2: Two,
  3: Three,
  4: Four,
  5: Five,
  6: Six,
  7: Seven,
  8: Eight,
  9: Nine,
  10: Ten,
  11: Jack,
  12: Queen,
  13: King,
};

export default function Card({
  suit,
  value,
  faceUp,
  onClick,
  onMouseDown,
  onMouseUp,
  className,
}) {
  const { dispatch } = useContext(SolitaireContext);
  const colour = suitColourMap[suit];
  const Layout = LayoutMap[value];

  const mouseDownHandler = (mouseDownEvent) => {
    if (!onMouseDown) {
      return;
    }

    const mouseMoveHandler = (mouseMoveEvent) => {
      const { pageX, pageY } = mouseMoveEvent;
      dispatch({
        type: "MOVE_MOUSE",
        payload: {
          x: pageX,
          y: pageY,
        },
      });
    };
    const mouseUpHandler = () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      dispatch({
        type: "RETURN_SELECTED_CARDS",
      });
    };
    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    onMouseDown(mouseDownEvent);
  };
  return (
    <div
      className={`${className} ${
        faceUp ? "border bg-white" : ""
      } rounded-lg border-gray-300 shadow-sm w-card h-card flex items-center justify-center relative select-none ${colour}`}
      onClick={onClick}
      onMouseDown={mouseDownHandler}
      onMouseUp={onMouseUp}
    >
      {faceUp ? (
        <>
          <Layout suit={suit} />
          <span className="absolute top-0.5 left-0.5 flex flex-col items-center -space-y-1">
            <span className="text-xl font-bold">
              {valueMap[value] || value}
            </span>
            <span className="text-2xl">{suitEmojiMap[suit]}</span>
          </span>
          <span className="absolute bottom-0.5 right-0.5 flex flex-col items-center -space-y-1">
            <span className="text-2xl rotate-180">{suitEmojiMap[suit]}</span>
            <span className="text-xl font-bold rotate-180">
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

function Ace({ suit }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center font-bold text-6xl font-serif">
      <span>A</span>
    </div>
  );
}

function Two({ suit }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center text-5xl space-y-32">
      <span>{suitEmojiMap[suit]}</span>
      <span className="rotate-180">{suitEmojiMap[suit]}</span>
    </div>
  );
}

function Three({ suit }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center text-5xl space-y-12">
      <span>{suitEmojiMap[suit]}</span>
      <span>{suitEmojiMap[suit]}</span>
      <span className="rotate-180">{suitEmojiMap[suit]}</span>
    </div>
  );
}

function Four({ suit }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-5xl space-x-12">
      <div className="flex flex-col justify-center items-center space-y-32">
        <span>{suitEmojiMap[suit]}</span>
        <span className="rotate-180">{suitEmojiMap[suit]}</span>
      </div>
      <div className="flex flex-col justify-center items-center space-y-32">
        <span>{suitEmojiMap[suit]}</span>
        <span className="rotate-180">{suitEmojiMap[suit]}</span>
      </div>
    </div>
  );
}

function Five({ suit }) {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center text-5xl space-x-12">
        <div className="flex flex-col justify-center items-center space-y-32">
          <span>{suitEmojiMap[suit]}</span>
          <span className="rotate-180">{suitEmojiMap[suit]}</span>
        </div>
        <div className="flex flex-col justify-center items-center space-y-32">
          <span>{suitEmojiMap[suit]}</span>
          <span className="rotate-180">{suitEmojiMap[suit]}</span>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center font-bold text-5xl">
        <span>{suitEmojiMap[suit]}</span>
      </div>
    </>
  );
}

function Six({ suit }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-5xl space-x-12">
      <div className="flex flex-col justify-center items-center space-y-12">
        <span>{suitEmojiMap[suit]}</span>
        <span>{suitEmojiMap[suit]}</span>
        <span className="rotate-180">{suitEmojiMap[suit]}</span>
      </div>
      <div className="flex flex-col justify-center items-center space-y-12">
        <span>{suitEmojiMap[suit]}</span>
        <span>{suitEmojiMap[suit]}</span>
        <span className="rotate-180">{suitEmojiMap[suit]}</span>
      </div>
    </div>
  );
}

function Seven({ suit }) {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center text-5xl space-x-12">
        <div className="flex flex-col justify-center items-center space-y-12">
          <span>{suitEmojiMap[suit]}</span>
          <span>{suitEmojiMap[suit]}</span>
          <span className="rotate-180">{suitEmojiMap[suit]}</span>
        </div>
        <div className="flex flex-col justify-center items-center space-y-12">
          <span>{suitEmojiMap[suit]}</span>
          <span>{suitEmojiMap[suit]}</span>
          <span className="rotate-180">{suitEmojiMap[suit]}</span>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center font-bold text-5xl">
        <span className="relative -top-12">{suitEmojiMap[suit]}</span>
      </div>
    </>
  );
}

function Eight({ suit }) {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center text-5xl space-x-12">
        <div className="flex flex-col justify-center items-center space-y-12">
          <span>{suitEmojiMap[suit]}</span>
          <span>{suitEmojiMap[suit]}</span>
          <span className="rotate-180">{suitEmojiMap[suit]}</span>
        </div>
        <div className="flex flex-col justify-center items-center space-y-12">
          <span>{suitEmojiMap[suit]}</span>
          <span>{suitEmojiMap[suit]}</span>
          <span className="rotate-180">{suitEmojiMap[suit]}</span>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center font-bold text-5xl">
        <span className="relative -top-6">{suitEmojiMap[suit]}</span>
        <span className="relative -bottom-6 rotate-180">
          {suitEmojiMap[suit]}
        </span>
      </div>
    </>
  );
}

function Nine({ suit }) {}

function Ten({ suit }) {}

function Jack({ suit }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center font-bold text-6xl font-serif">
      <span>J</span>
    </div>
  );
}

function Queen({ suit }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center font-bold text-6xl font-serif">
      <span>Q</span>
    </div>
  );
}

function King({ suit }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center font-bold text-6xl font-serif">
      <span>K</span>
    </div>
  );
}
