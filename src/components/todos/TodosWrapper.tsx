import { prisma } from "@/lib/prisma";
import TodoList from "./TodosList";

async function TodosWrapper() {
  const todos = await prisma.todo.findMany();

  return <TodoList todos={todos} />;
}

export default TodosWrapper;
