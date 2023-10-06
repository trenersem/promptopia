"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from '@/components/Profile';
import { EPromt, ICreator, IUser } from "../types";

const MyProfile = () => {

  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id

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
  const handleDelete = async (post: EPromt) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if(hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',

        })

        const filteredPosts = myPosts.filter((p) => p._id !== post._id);

        setMyPosts(filteredPosts)
      } catch (err) {
        console.error(err)
      }
    }
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
