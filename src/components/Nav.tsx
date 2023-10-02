'use client'

import Link from "next/link";
import Image from "next/image";
import {signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider} from 'next-auth/react';
import { useEffect, useState } from "react";



const Nav = () => {
    const [providers, setProviders] = useState<Record<LiteralUnion<any, string>, ClientSafeProvider> | null>(null);
    const [toggleDropDown, setToggleDropDown] = useState(false);
    const { data: session} = useSession();
        
    useEffect(() => {
        (async () => {
            const response= await getProviders()
            setProviders(response);
        })()
    }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-6">
        <Link href='/' className="flex flex-center gap-2">
            <Image 
                src='/assets/images/logo.svg'
                alt='logo'
                width={30}
                height={30}
                className="object-contain"
            />
            <p className='logo_text'>Promptopia</p>
        </Link>

        {/* Desktop NAV */}
        <div className="sm:flex hidden">
            {session?.user ? (
                <div className="flex gap-3 md:gap-5">
                    <Link
                        href='/create-prompt'
                        className="black_btn"
                    >
                        Create Post
                    </Link>

                    <button
                        type='button'
                        onClick={() => signOut()}
                        className="outline_btn"
                    >
                        Sign Out
                    </button>

                    <Link href='/profile'>
                          <Image 
                            src={session?.user.image ?? ''}
                            alt='profile image'
                            height={37}
                            width={37}
                            className="rounded-full "
                          />
                    </Link>
                </div>
            ) : (
                <>
                    {providers && 
                        Object.values(providers).map((provider) => (
                            <button
                                 type='button'
                                 key={provider.name}
                                 onClick={() => signIn(provider.id)}
                                 className="black_btn"
                            >
                                Sign In
                            </button>
                        ))
                    }
                </>
            )}
        </div>

        {/* MOBILE NAV */}
        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                     <Image 
                            src={session?.user.image ?? ''}
                            alt='profile image'
                            height={37}
                            width={37}
                            className="rounded-full "
                            onClick={() => setToggleDropDown((prev) => !prev)}
                     />

                     {toggleDropDown && (
                        <div className='dropdown'>
                            <Link
                                 href='/profile'
                                 className='dropdown_link'
                                 onClick={() => setToggleDropDown(false)}
                            >
                                My Profile
                            </Link>
                            <Link
                                 href='/create-prompt'
                                 className='dropdown_link'
                                 onClick={() => setToggleDropDown(false)}
                            >
                                Create Prompt
                            </Link>
                            <button
                                type='button'
                                onClick={() => {
                                    setToggleDropDown(false);
                                    signOut()
                                }}
                                className="mt-5 w-full black_btn"
                            >
                                Sign Out
                            </button>

                        </div>
                     )}
                </div>
            ) : (
                 <>
                    {providers && 
                        Object.values(providers).map((provider) => (
                            <button
                                 type='button'
                                 key={provider.name}
                                 onClick={() => signIn(provider.id)}
                                 className="black_btn"
                            >
                                Sign In
                            </button>
                        ))
                    }
                </>
            )}

        </div>

      
    </nav>
  )
}

export default Nav
