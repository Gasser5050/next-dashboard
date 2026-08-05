import { Post, Todo } from "../types/Types";

export async function addTodo(newTodo: Todo) {
  try {
    const localTodos = localStorage.getItem("TODOS");
    const parsedTodos = JSON.parse(localTodos || "[]");

    const finalTodos = [newTodo, ...parsedTodos];

    localStorage.setItem("TODOS", JSON.stringify(finalTodos));
  } catch (error) {
    console.error("Failed to save todo to localStorage:", error);
  }
}

export async function addPost(newPost: Post) {
  try {
    const localPosts = localStorage.getItem("POSTS");
    const parsedPosts = JSON.parse(localPosts || "[]");

    const finalPosts = [newPost, ...parsedPosts];

    localStorage.setItem("POSTS", JSON.stringify(finalPosts));
  } catch (error) {
    console.error("Failed to save post to localStorage:", error);
  }
}
