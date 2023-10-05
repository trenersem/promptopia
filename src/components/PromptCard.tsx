'use client'
import { useState  } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { EPromt } from '@/app/types';

interface IPromptCard {
  post: EPromt,
  handleTagClick?: Function,
  handleEdit?: Function,
  handleDelete?: Function,

}
const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}: IPromptCard) => {
  const [copied, setCopied] = useState('');

  const session = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const hanleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => {
      setCopied('')
    }, 3000)

  }
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image 
            src={post.creator.image}
            alt="user_img"
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>
        
        <div
          className='copy_btn'
          onClick={() => hanleCopy()}
        >
          <Image
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
          />

        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>
        {post.prompt}
      </p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user?.id === post.creator.id &&
      pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={() => handleEdit && handleEdit()}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={() => handleDelete && handleDelete()}
          >
            Delete
          </p>
        </div>
      )
      }
    </div>
  )
}

export default PromptCard
