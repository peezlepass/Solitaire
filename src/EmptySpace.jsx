export default function EmptySpace({ onClick, onMouseUp }) {
  return (
    <div
      className="w-card h-card rounded-lg ring-4 ring-white"
      onClick={onClick}
      onMouseUp={onMouseUp}
    ></div>
  );
}
