"use client"

import EmptyState from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import React from 'react'
import {
    VideoIcon, BanIcon
} from "lucide-react"
import Link from 'next/link'

interface Props {
    meetingId: string;
}

const ActiveState = ({
    meetingId
}: Props) => {
    return (
        <div className='bg-white flex flex-col justify-center items-center px-4 py-5 gap-4 rounded-lg border'>
            <EmptyState
                image={"/images/upcoming-state.png"}
                title='Meeting is active'
                description='Meeting will end automatically once all participants will leave the meeting.'
            />

            <div className='max-w-xs w-full flex flex-col md:flex-row justify-center items-center gap-x-4'>
                <Button
                    className="text-white w-full"
                    // disabled={isCancelling}
                >
                    <Link
                        className='flex flex-row items-center gap-x-2'
                        href={`/call/${meetingId}`}>
                        <VideoIcon />
                        Join meeting
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default ActiveState