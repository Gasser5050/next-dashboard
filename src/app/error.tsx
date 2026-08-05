"use client";

function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h1>Error: {error.message}</h1>
      <button onClick={reset} className="border px-2 rounded-md cursor-pointer">
        Retry
      </button>
    </div>
  );
}

export default ErrorBoundary;
