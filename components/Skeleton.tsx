function Skeleton({ height, rows }: { height: number; rows: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }, (_, index) => {
        return (
          <div
            key={index}
            style={{ height: height }}
            className="bg-gray-300 rounded-xl w-full"
          />
        );
      })}
    </div>
  );
}

export default Skeleton;
