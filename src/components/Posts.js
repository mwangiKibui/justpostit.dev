"use client"

import { useEffect, useState } from 'react';
import {initializeSupabase} from '../../supabase';

const PostsComponent = ({postId}) => {

  const [posts, setposts] = useState([]);

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
    <div>

      <h2>Your Posts</h2>

      <br />

      <ul>
        {posts.map((post) => (
          <li key={post.id}>

              <div>

                <h4>{`${new Date(post.created_at).toLocaleDateString()} - ${new Date(post.created_at).toLocaleTimeString()}`}</h4>

                

                <textarea 
                  id="message"
                  value={post.content}
                  rows="4" 
                  readOnly
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />

                <br />

              </div>



            </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;