import AddPostForm from "../../../components/Posts/AddPostForm";
import { getUsers } from "../../../lib/getData";

async function AddNewPost() {
  const users = await getUsers();

  return (
    <div className="px-8 md:px-12 xl:px-15 py-10">
      <h1 className="text-4xl lg:text-5xl mb-4 font-bold text-[hsl(200,100%,10%)] tracking-tight">
        Add New Post
        {/* {post ? `Edit Post: ${post.title}` : "Add New Post"} */}
      </h1>

      <AddPostForm users={users} />
    </div>
  );
}

export default AddNewPost;
