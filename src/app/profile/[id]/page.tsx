"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from '@/components/Profile';
import { EPromt, ICreator } from "../../types";

interface IUserProfile {
    params: ICreator
}
const UserProfile = ({params}: IUserProfile) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name")

  const [userPosts, setUserPosts] = useState< EPromt[] | []>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params._id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params._id) fetchPosts();
  }, [params._id]);


  return (
    <Profile
        name={userName ?? ''}
        desc={`Welcome to ${userName}'s personalized profile`}
        data={userPosts}
    />
  )
}

export default UserProfile;
