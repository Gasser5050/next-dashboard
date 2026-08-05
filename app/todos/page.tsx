import Link from "next/link";
import { Suspense } from "react";
import TodoListWrapper from "../../components/Todos/TodoListWrapper";
import TodoSearchForms from "../../components/Todos/TodoSearchForms";
import Skeleton from "../../components/Skeleton";

async function Todos({ searchParams }: { searchParams: { query: string } }) {
  const params = await searchParams;
  const query = params?.query?.toLowerCase() || "";

  return (
    <div className="px-8 md:px-12 xl:px-15 py-10">
      {/* Add a new Todo */}
      <div className="flex justify-between mb-5 lg:mb-7">
        <h1 className="text-4xl lg:text-5xl font-bold text-[hsl(200,100%,10%)] tracking-tight">
          Todos
        </h1>
        <Link
          href={"/todos/new"}
          className={
            "text-xl border p-2 text-[hsl(200,20%,95%)] bg-[hsl(200,100%,20%)] hover:scale-105 rounded-lg h-fit"
          }
        >
          New
        </Link>
      </div>

      {/* Search for a Todo */}
      <TodoSearchForms />

      {/* Todos Wrapper */}
      <Suspense fallback={<Skeleton height={60} rows={10} />}>
        <TodoListWrapper query={query} />
      </Suspense>
    </div>
  );
}

export default Todos;
