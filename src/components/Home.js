"use client"

import React,{useState,useEffect} from 'react'

export default function Home() {

  const [postId,_] = useState( Math.random().toString(36).slice(2));
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true)
  }, [])

  let url = isClient  ? window.location.href+'cb/'+postId : "";

  let clientUrl = isClient  ? window.location.href+'cb/'+postId : "";

  return (
    <div>
        <h1>
            Thank you for choosing justPostIt
        </h1>
        <p>Post to : {url}</p>
        <p>
            View Posts from <span>
            <a href={clientUrl} target='_blank'>{clientUrl}</a>
            </span>
        </p>
        
    </div>
  )
}
