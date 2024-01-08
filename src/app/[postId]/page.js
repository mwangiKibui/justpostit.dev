import PostsComponent from "@/components/Posts";

export const metadata = {
  title: 'JustPostIt.dev',
}

export default function PostsPage({params}) {

  const {postId} = params;
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <PostsComponent postId={postId} />
      </div>
    </div>
  )
}


