'use client'

import { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { useSession } from "next-auth/react";

export interface Custom extends AdapterUser {
    id: any
}
export const useCustomSession = () => {
    const { data: session} = useSession();

    const userId = ((session as Session)?.user as Custom)?.id

    return {
        userId,
    }
}