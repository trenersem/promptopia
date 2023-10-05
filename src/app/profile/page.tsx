"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from '@/components/Profile';
import { EPromt, IUser } from "../types";

const MyProfile = () => {

  const router = useRouter();
  const { data: session } = useSession();
  const userId = (session?.user as IUser).id

  const [myPosts, setMyPosts] = useState< EPromt[] | []>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (userId) fetchPosts();
  }, [userId]);

  const handleEdit = (post: EPromt) => {
    router.push(`/update-prompt?id=${post._id}`);
  }
  const handleDelete = async () => {

  }

  return (
    <Profile
        name="My"
        desc='Welcome to your personalized profile'
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile;
