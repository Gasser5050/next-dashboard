import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";
import Skeleton from "@/components/Skeleton";
import TodosWrapper from "@/components/todos/TodosWrapper";
import TodosFormList from "@/components/todos/TodosFormList";

export const metadata: Metadata = {
  title: "Todos"
};

async function Todos() {
  return (
    <div className="grow w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <header className="flex justify-between mb-5 lg:mb-7">
        <h1 className="text-4xl md:text-5xl font-bold text-[hsl(200,100%,10%)] tracking-tight">
          Todos
        </h1>
        <Link
          href={"/todos/new"}
          className={
            "text-xl p-2 border text-[hsl(200,20%,95%)] bg-[hsl(200,100%,20%)] rounded-lg hover:scale-105 transition-transform"
          }
        >
          New
        </Link>
      </header>

      <section className="px-2 sm:px-5">
        <Suspense fallback={<Skeleton height={50} rows={1} />}>
          <TodosFormList />
        </Suspense>

        <Suspense fallback={<Skeleton height={58} rows={8} />}>
          <TodosWrapper />
        </Suspense>
      </section>
    </div>
  );
}

export default Todos;
