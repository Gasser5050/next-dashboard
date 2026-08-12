"use client";
import type { TodoModel } from "@/generated/prisma/models";
import { useSearchParams } from "next/navigation";

function TodoList({ todos }: { todos: TodoModel[] }) {
  const params = useSearchParams();
  const query = params?.get("query")?.toLowerCase() || "";

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(query)
  );

  return (
    <ul className="flex flex-col space-y-2">
      {filteredTodos.map(todo => {
        return (
          <li
            key={todo.id}
            className={`px-5 py-4 bg-white border rounded-xl shadow-xs cursor-default  ${
              todo.completed
                ? "border-emerald-500 bg-emerald-50/15 line-through decoration-emerald-300"
                : "font-medium text-gray-700 border-[hsl(200,20%,88%)] hover:border-[hsl(200,20%,80%)] hover:shadow-md"
            }`}
          >
            {todo.title}
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;
