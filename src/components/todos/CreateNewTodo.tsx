"use client";
import Link from "next/link";
import { useActionState } from "react";
import { CreateTodo } from "@/actions/createTodo";
import { cn } from "@/utils/cn";
import type { UserModel } from "@/generated/prisma/models/User";

function CreateNewTodo({ users }: { users: UserModel[] }) {
  const [error, action, isPending] = useActionState(CreateTodo, {
    error: "",
    fields: {
      title: "",
      author: ""
    }
  });

  return (
    <form action={action} className="px-2 sm:px-5 lg:px-8">
      {/* Form Fields */}
      <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="md:text-xl">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            minLength={5}
            required
            autoFocus
            defaultValue={error?.fields?.title?.toString() || ""}
            className="border bg-white px-2 py-1 lg:py-1.5 rounded-md"
          />
        </div>

        {/* Author */}
        <div className="flex flex-col">
          <label htmlFor="author" className="md:text-xl">
            Author
          </label>
          <select
            id="author"
            name="author"
            required
            key={error?.fields?.author?.toString()}
            defaultValue={error?.fields?.author?.toString() || ""}
            className="border bg-white px-2 py-1 lg:py-1.5 rounded-md"
          >
            <option value="">Any</option>
            {users.map(user => {
              return (
                <option key={user.id} value={user.id.toString()}>
                  {user.name}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>

      <div className="flex items-center justify-between mt-1">
        {/* Error handling */}
        <p className="text-red-500 mt-2">{error?.error}</p>

        {/* Submitting */}
        <div className="flex space-x-2 mt-3">
          <Link
            href={"/todos"}
            className="text-[hsl(200,100%,30%)] bg-white border px-2 py-1 rounded-sm cursor-pointer hover:scale-105 transition-transform"
          >
            Back
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className={cn(
              "bg-[hsl(200,100%,30%)] text-white border px-2 py-1 rounded-sm cursor-pointer hover:scale-105 transition-transform",
              isPending ? "bg-gray-500 text-white" : ""
            )}
          >
            {isPending ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateNewTodo;
