import Skeleton from "@/components/Skeleton";
import CreateNewTodo from "@/components/todos/CreateNewTodo";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Todo"
};

async function NewTodo() {
  const users = await prisma.user.findMany();

  return (
    <div className="grow w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl xs:text-4xl lg:text-5xl px-2 sm:px-5 lg:px-8 mb-6 font-bold text-[hsl(200,100%,10%)] tracking-tight">
        Add New Todo
      </h1>

      <Suspense fallback={<Skeleton height={50} rows={2} marginTop={10} />}>
        <CreateNewTodo users={users} />
      </Suspense>
    </div>
  );
}

export default NewTodo;
