"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from '@/components/Profile';
import { EPromt } from "../types";

const MyProfile = () => {

  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState< EPromt[] | []>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user?.id) fetchPosts();
  }, [session?.user?.id]);

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
