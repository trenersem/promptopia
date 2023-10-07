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
    const [allPosts, setAllPosts] =  useState< EPromt[] | []>([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
  const [searchedResults, setSearchedResults] = useState<EPromt[] | []>([]);
  
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data: EPromt[] = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item: EPromt) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  // const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   clearTimeout(searchTimeout);
  //   setSearchText(e.target.value);

  //   searchTimeout(
  //     setTimeout(() => {
  //       const searchResult = filterPrompts(e.target.value);
  //       setSearchedResults(searchResult);
  //     }, 500) 
  //   )
  // };
const handleSearchChange = (e:ChangeEvent<HTMLInputElement>) => {
  clearTimeout(searchTimeout || undefined);
  setSearchText(e.target.value);

  const timeoutId = window.setTimeout(() => {
    const searchResult = filterPrompts(e.target.value);
    setSearchedResults(searchResult);
  }, 500)

  setSearchTimeout(timeoutId);
}

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };
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
        {searchText ? (
          <PromptCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
        )}
    </section>
  )
}

export default Feed
