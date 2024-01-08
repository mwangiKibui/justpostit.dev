"use client"

import { useEffect, useState } from 'react';
import {initializeSupabase} from '../../supabase';

const PostsComponent = ({postId}) => {

  const [posts, setposts] = useState([]);

  const [url,setUrl] = useState('');

  const [copyText,setCopyText] = useState("Copy");

  const supabase = initializeSupabase(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  useEffect(() => {
    // Subscribe to real-time changes
    const subscription = supabase
    .channel('room1')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, payload => {

        let newPost = payload.new;

        let currentPostId = postId.trim();


        if(newPost.postid == currentPostId){
           setposts((prevposts) => [payload.new,...prevposts]);
        }else{
          // ignore.
        }

    })
    .subscribe()

    setUrl(window.location.origin+'/cb/'+postId);

    // Fetch initial posts
    const fetchposts = async () => {
      const { data, error } = await supabase.from('posts').select('*').eq('postid',postId).order('id', { ascending: false });
      if (error) {
        console.error('Error fetching posts:', error.message);
      } else {
        setposts(data);
      }
    };

    fetchposts();

    // Clean up subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className='w-full'>

      <div className='flex items-center justify-between'>
        <p>
          Your Callback URL is: {url}
        </p>
        
        <button 
          type="button" 
          onClick={() => {
            navigator.clipboard.writeText(url);
            setCopyText("Copied");
          }}
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          {copyText}
        </button>

      </div>

      <br />

      <ul>
        {posts.map((post) => (
          <li key={post.id}>

              <div>

                <h4>{`${new Date(post.created_at).toLocaleDateString()} - ${new Date(post.created_at).toLocaleTimeString()}`}</h4>

                <div className='block py-5 px-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                  <pre>
                    {JSON.stringify(JSON.parse(post.content),undefined, 2)}
                  </pre>
                </div>

                <br />

              </div>



            </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;