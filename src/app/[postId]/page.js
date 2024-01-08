import PostsComponent from "@/components/Posts";

export const metadata = {
  title: 'JustPostIt.dev',
}

export default function PostsPage({params}) {

  const {postId} = params;
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 container w-full">
          <PostsComponent postId={postId} />
        </div>
      </main>
  )
}


