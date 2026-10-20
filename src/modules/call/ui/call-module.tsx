"use client"

import ErrorState from '@/components/error-state';
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import CallProvider from './call-provider';

interface Props{
    meetingId: string,
}

const CallModule = ({
    meetingId
}: Props) => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.meetings.getOne.queryOptions({id: meetingId}))

    if(data.status === "completed"){
        return(
            <div className='flex h-screen justify-center items-center'>
                <ErrorState
                    title='This Meeting is Completed'
                    description='This meeting has already been completed and you can no longer join this meeting.'
                />
            </div>
        )
    }

  return (
    <div className='w-full h-full'>
        <CallProvider meetingId={meetingId} meetingName={data.name} />
    </div>
  )
}

export default CallModule