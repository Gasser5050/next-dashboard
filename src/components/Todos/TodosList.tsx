"use client";

import { cn } from "../../utils/cn";
import type { Todo } from "../../types/Types";
import { useEffect, useState } from "react";

function TodosList({
  initialTodos,
  query,
  oneUser
}: {
  initialTodos: Todo[];
  query?: string;
  oneUser?: boolean;
}) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const filteredTodos = query
    ? todos.filter(todo => {
        return todo.title.toLowerCase().includes(query);
      })
    : todos;

  useEffect(() => {
    if (oneUser) return;

    const localTodos = localStorage.getItem("TODOS");
    if (!localTodos) {
      localStorage.setItem("TODOS", JSON.stringify(initialTodos));
      return;
    }

    try {
      const parsedTodos = JSON.parse(localTodos || "[]");
      if (parsedTodos.length <= 0) return;
      setTimeout(() => setTodos(parsedTodos));
    } catch (error) {
      console.error("Error reading localStorage", error);
    }
  }, [initialTodos, oneUser]);

  return (
    <>
      {/* View Current Todos */}
      <ul className="flex flex-col space-y-2">
        {filteredTodos?.map((todo: Todo) => {
          return (
            <li
              className={cn(
                "px-5 py-4 bg-white border rounded-xl shadow-xs cursor-pointer",
                todo.completed
                  ? "border-emerald-500 bg-emerald-50/15 line-through decoration-emerald-300"
                  : "font-medium text-gray-700 border-[hsl(200,20%,88%)] hover:border-[hsl(200,20%,80%)] hover:shadow-md"
              )}
              key={todo.id}
            >
              {todo.title}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default TodosList;
