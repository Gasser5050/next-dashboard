"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { todoSchema } from "../../lib/schemas";
import { addTodo } from "../../lib/addData";

function AddTodoForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const title = inputRef?.current?.value?.trim() || "";
    const result = todoSchema.safeParse({ title });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError(null);

    addTodo({
      id: Date.now().toString(),
      userId: 1,
      title,
      completed: false
    });

    router.back();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label
          htmlFor="title"
          className={`md:text-xl ${true ? "flex items-center" : ""}`}
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          ref={inputRef}
          autoFocus
          className="border bg-white px-2 py-1 lg:py-1.5 rounded-md"
        />
        <p className="text-red-500 text-sm md:text-md mt-1 min-h-5">{error}</p>
      </div>
      <div className="flex justify-end space-x-2">
        <Link
          href={"/todos"}
          className="text-[hsl(200,100%,30%)] bg-white border px-2 py-1 rounded-sm cursor-pointer hover:scale-105"
        >
          Back
        </Link>
        <button
          disabled={false}
          className={`bg-[hsl(200,100%,30%)] text-white border px-2 py-1 rounded-sm cursor-pointer hover:scale-105`}
        >
          Create
        </button>
      </div>
    </form>
  );
}

export default AddTodoForm;
