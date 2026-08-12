import Skeleton from "../Skeleton";

function UserInfoSkeleton() {
  return (
    <div className="grow w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Skeleton height={180} rows={1} />
      <Skeleton height={60} rows={8} marginTop={32} />
    </div>
  );
}

export default UserInfoSkeleton;
