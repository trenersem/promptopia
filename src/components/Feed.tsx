"use client";

import { useState, useEffect, ChangeEvent } from "react";

import PromptCard from "./PromptCard";
import { EPromt } from "@/app/types";

interface IPromptCardList {
  data: EPromt[],
  handleTagClick: Function,
}
const PromptCardList = ({data, handleTagClick}: IPromptCardList) =>(
  <div className="mt-16 prompt_layout">
    {data.map((post) => (
      <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
    ))}

  </div>
)
const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();

      setAllPosts(data)
      
    }
    fetchPost();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type='text'
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />

      </form>

      <PromptCardList
        data={allPosts}
        handleTagClick={() => {}}

      />
    </section>
  )
}

export default Feed
