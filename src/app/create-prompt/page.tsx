'use client'

import {useState} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

import Form from '@/components/Form';

export interface IPost {
    prompt: string,
    tag: string, 
}

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState<IPost>({
        prompt: '',
        tag: '',
    })
    const { data: session} = useSession();
    const router = useRouter();

    const createPrompt = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new',
            {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: session?.user?.id,

                })
            })

            if(response.ok) {
                router.push('/')
            }

        } catch (err) {
            console.error(err)
        }
    }

  return (
    <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt;
