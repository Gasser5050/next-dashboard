import TodosList from "./TodosList";
import { getTodos } from "../../lib/getData";

async function TodoListWrapper({ query }: { query: string }) {
  const initialTodos = await getTodos();

  return <TodosList initialTodos={initialTodos} query={query} />;
}

export default TodoListWrapper;
