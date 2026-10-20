"use client"

import React from 'react'
import GeneratedAvatarUri from '@/lib/avatar'
import { authClient } from '@/lib/auth-client'
import { Loader } from 'lucide-react'
import CallConnect from './call-connect'

interface Props{
    meetingId: string,
    meetingName: string,
}

const CallProvider = ({
    meetingId, meetingName
} : Props) => {
    const {data, isPending} = authClient.useSession();

    if(!data || isPending){
        return(
            <div className='flex h-screen w-screen justify-center items-center bg-radial from-warm-earth-extradark to-warm-earth-superdark'>
                <Loader className='animate-spin size-7 text-white' />
            </div>
        )
    }

  return (
    <CallConnect
        meetingId={meetingId}
        meetingName={meetingName}
        userId={data.user.id}
        userName={data.user.name}
        userImage={
            data.user.image ?? GeneratedAvatarUri({
                seed: data.user.name,
                variant: "initials"
            })
        }
    />
  )
}

export default CallProvider