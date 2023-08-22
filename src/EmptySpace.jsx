export default function EmptySpace({ onClick, onMouseUp, symbol }) {
  let innerSymbol;
  if (symbol === "O") {
    innerSymbol = (
      <div className="text-green-300 font-bold text-8xl h-full flex justify-center items-center">
        O
      </div>
    );
  } else if (symbol === "X") {
    innerSymbol = (
      <div className="text-red-600 font-bold text-8xl h-full flex justify-center items-center">
        X
      </div>
    );
  }
  return (
    <div
      className="w-card h-card rounded-lg ring-4 ring-white"
      onClick={onClick}
      onMouseUp={onMouseUp}
    >
      {innerSymbol}
    </div>
  );
}
