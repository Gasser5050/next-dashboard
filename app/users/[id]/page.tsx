import Link from "next/link";
import { getPosts, getTodos, getUsers } from "../../../lib/getData";
import { Post, Todo, User } from "../../../types/Types";
import TodosList from "../../../components/Todos/TodosList";
import PostList from "../../../components/Posts/PostList";

async function UserInfo({ params }: { params: { id: string } }) {
  const { id } = await params;
  const [user, posts, todos]: [user: User, posts: Post[], todos: Todo[]] =
    await Promise.all([getUsers(id), getPosts(id), getTodos(id)]);

  return (
    <div className="px-8 md:px-12 xl:px-15 py-10">
      <h2 className="text-3xl lg:text-5xl font-bold mb-2 lg:mb-3">
        {user.name}
      </h2>
      <p className="text-lg lg:text-3xl mb-5">{user?.email}</p>
      <>
        <p className="lg:text-2xl font-bold">
          Company:
          <span className="lg:text-xl ml-1 lg:ml-2 font-normal">
            {user?.company?.name}
          </span>
        </p>
        <p className="lg:text-2xl font-bold">
          Website:
          <span className="lg:text-xl ml-1 lg:ml-2 font-normal">
            {user?.website}
          </span>
        </p>
        <p className="lg:text-2xl font-bold mb-5 md:mb-8">
          Address:
          <span className="lg:text-xl ml-1 lg:ml-2 font-normal">
            {user?.address?.street} {user?.address?.suite} {user?.address?.city}{" "}
            {user?.address?.zipcode}
          </span>
        </p>

        <h3 className="text-3xl font-bold mb-5">Posts</h3>
        <PostList initialPosts={posts} oneUser />

        <h4 className="text-3xl font-bold mb-5">Todos</h4>
        <TodosList initialTodos={todos} oneUser />

        <p className="mb-8"></p>
        <Link
          href={"/users"}
          className={"bg-white border px-2 py-3 rounded-lg hover:bg-white/10"}
        >
          Back to Users
        </Link>
      </>
    </div>
  );
}

export default UserInfo;
