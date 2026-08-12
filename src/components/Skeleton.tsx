function Skeleton({
  height,
  rows,
  marginTop
}: {
  height: number;
  rows: number;
  marginTop?: number;
}) {
  return (
    <div
      className="space-y-2 animate-pulse"
      style={{ marginTop: `${marginTop}px` }}
    >
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          style={{ height: `${height}px` }}
          className="bg-gray-300 border border-gray-200/60 rounded-xl w-full"
        />
      ))}
    </div>
  );
}

export default Skeleton;
