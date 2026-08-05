function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-30 animate-fade-in">
      <h1 className="text-5xl xl:text-6xl mb-6 xl:mb-8 font-black tracking-tight text-[hsl(200,100%,10%)]">
        Welcome to My Application
      </h1>
      <p className="text-xl xl:text-2xl max-w-xs text-gray-600 xs:max-w-md xl:max-w-lg">
        Select one of the navigation links above to start.
      </p>
    </div>
  );
}

export default Home;
