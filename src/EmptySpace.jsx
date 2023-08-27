export default function EmptySpace({ onClick, onMouseUp, symbol }) {
  let innerSymbol;
  if (symbol === "O") {
    innerSymbol = <Circle />;
  } else if (symbol === "X") {
    innerSymbol = <Cross />;
  }
  return (
    <div
      className="w-card h-card phone:w-card-mobile phone:h-card-mobile rounded-lg ring-4 ring-white"
      onClick={onClick}
      onMouseUp={onMouseUp}
    >
      {innerSymbol}
    </div>
  );
}

function Circle() {
  return (
    <svg width="100%" height="100%">
      <circle
        cx="50%"
        cy="50%"
        r="70"
        stroke="rgba(100, 247, 67, 1"
        strokeWidth="15"
        fill="transparent"
      />
    </svg>
  );
}

function Cross() {
  return (
    <svg width="100%" height="100%">
      <line
        x1="30%"
        y1="35%"
        x2="70%"
        y2="65%"
        stroke="red"
        strokeWidth="15"
        fill="transparent"
      />
      <line
        x1="70%"
        y1="35%"
        x2="30%"
        y2="65%"
        stroke="red"
        strokeWidth="15"
        fill="transparent"
      />
    </svg>
  );
}
