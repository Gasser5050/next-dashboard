import EditPostCard from "../../../../components/Posts/EditPostCard";
import { getPosts, getUsers } from "../../../../lib/getData";

async function EditPost({ params }: { params: { id: string } }) {
  const { id } = await params;
  const [post, users] = await Promise.all([getPosts(id, true), getUsers()]);

  return (
    <div className="px-8 md:px-12 xl:px-15 py-10">
      <EditPostCard users={users} post={post} postId={id} />
    </div>
  );
}

export default EditPost;
