import Link from "next/link";

function NotFound() {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-6 py-16">
      <h1 className="text-6xl font-black text-[hsl(200,100%,10%)] mb-4">404</h1>
      <h2 className="text-2xl xl:text-3xl font-bold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="sm:text-lg xl:text-xl text-gray-600 max-w-md sm:max-w-lg xl:max-w-xl mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="text-[hsl(200,20%,95%)] bg-[hsl(200,100%,20%)] hover:bg-[hsl(200,100%,25%)] text-md px-5 py-2.5 rounded-lg hover:scale-105 transition-all shadow-md"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
