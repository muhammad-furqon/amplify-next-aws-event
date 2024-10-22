import { onDeletePost } from "@/actions/actions";
import Post from "@/components/Post";
import { cookieBasedClient, isAuthenticated  } from "@/utils/amplify-utils";

export default async function Home() {
  const isSignedIn = await isAuthenticated();
  const {data: posts} = await cookieBasedClient.models.Post.list({
    selectionSet: ["title", "id"],
    authMode: isSignedIn ? "userPool" : "identityPool",
  })

  // console.log("posts", posts)
  // console.log("user belongs to following groups: " + currentUserGroup());

  return (
    <main className="flex flex-col items-center justify-between p-24 w-1/2 m-auto">
      <h1 className="text-2xl pb-10">List of All Titles</h1>
      {posts?.map(async (post, idx) => (
        <Post
        key={idx}
        onDelete={onDeletePost}
        post={post}
        isSignedIn={await isAuthenticated()}
        />
      ))}
    </main>
  );
}
