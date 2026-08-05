const REVALIDATE_TIME = 360;

export async function getPosts(id?: string, singlePost?: boolean) {
  const url = id
    ? `https://jsonplaceholder.cypress.io/posts?userId=${id}`
    : "https://jsonplaceholder.cypress.io/posts";

  const singlePostUrl = singlePost
    ? `https://jsonplaceholder.cypress.io/posts/${id}`
    : url;

  const res = await fetch(singlePostUrl, {
    next: { revalidate: REVALIDATE_TIME }
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export async function getUsers(id?: string) {
  const url = id
    ? `https://jsonplaceholder.cypress.io/users/${id}`
    : "https://jsonplaceholder.cypress.io/users";

  const res = await fetch(url, {
    next: { revalidate: REVALIDATE_TIME }
  });
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export async function getTodos(id?: string) {
  const url = id
    ? `https://jsonplaceholder.cypress.io/todos?userId=${id}`
    : "https://jsonplaceholder.cypress.io/todos";

  const res = await fetch(url, {
    next: { revalidate: REVALIDATE_TIME }
  });
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return await res.json();
}

export async function getComments(id: string) {
  const url = `https://jsonplaceholder.cypress.io/comments?postId=${id}`;

  const res = await fetch(url, {
    next: { revalidate: REVALIDATE_TIME }
  });
  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  return await res.json();
}
