import Skeleton from "../Skeleton";

function PostInfoSkeleton() {
  return (
    <div className="grow w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Skeleton height={200} rows={1} />
      <Skeleton height={90} rows={4} marginTop={32} />
    </div>
  );
}

export default PostInfoSkeleton;
