"use client";

import { useEffect } from "react";

function PostsError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Posts Fetch Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-xl my-6 text-center">
      <h2 className="text-2xl font-bold text-red-700 mb-2">
        Failed to load posts
      </h2>
      <p className="text-red-600 mb-4">
        {error.message || "Could not fetch posts data."}
      </p>

      <button
        onClick={reset}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}

export default PostsError;
