function PostsFormSkeleton() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:items-end space-y-3 md:space-y-0 md:space-x-2 lg:space-x-4 mb-5 animate-pulse">
      {/* Query Input Placeholder */}
      <div className="flex flex-col w-full md:grow">
        <div className="w-12 h-4 bg-gray-300 rounded mb-1" /> {/* Label */}
        <div className="h-9.5 bg-gray-300 rounded-lg w-full" /> {/* Input */}
      </div>

      {/* Author Select Placeholder */}
      <div className="flex flex-col w-full md:w-1/3">
        <div className="w-14 h-4 bg-gray-300 rounded mb-1" /> {/* Label */}
        <div className="h-9.5 bg-gray-300 rounded-lg w-full" />{" "}
      </div>

      {/* Filter Button Placeholder */}
      <div className="w-20 md:w-20 h-9.5 bg-gray-300 rounded-lg" />
    </div>
  );
}

export default PostsFormSkeleton;
