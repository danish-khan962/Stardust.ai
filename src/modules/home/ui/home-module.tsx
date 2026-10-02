"use client"

import React from 'react'
import { authClient } from '@/lib/auth-client'
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const HomeModule = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    if (!session) {
        return (
            <Skeleton>Loading...</Skeleton>
        )
    }

    return (
        <div className="flex flex-col p-10 gap-5 text-center">
            <p className="font-semibold text-4xl">Logged in as {session.user.name}</p>
            <Button
                onClick={() => authClient.signOut({
                    fetchOptions: {
                        onSuccess: () => router.push('/sign-in')
                    }
                })}
                className="text-3xl px-5 py-7  cursor-pointer bg-red-800">
                Sign Out
            </Button>
        </div>
    )
}

export default HomeModule