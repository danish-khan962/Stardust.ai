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
    onCancellingMeeting: () => void;
    isCancelling: boolean;
}

const UpcomingState = ({
    meetingId, onCancellingMeeting, isCancelling
}: Props) => {
    return (
        <div className='bg-white flex flex-col justify-center items-center px-4 py-5 gap-4 rounded-lg border'>
            <EmptyState
                image={"/images/upcoming-state.png"}
                title='Not started yet'
                description='Once you start this meeting, a summary will appear here.'
            />

            <div className='max-w-xs w-full flex flex-col md:flex-row justify-center items-center gap-x-4'>
                <Button
                    variant={"secondary"}
                    className="w-full cursor-pointer border-neutral-200 h-10 md:h-13 flex flex-row items-center gap-x-2"
                    onClick={onCancellingMeeting}
                    disabled={isCancelling}
                >
                    <BanIcon />
                    Cancel meeting
                </Button>
                <Button
                    className="text-white w-full"
                    disabled={isCancelling}
                >
                    <Link
                        className='flex flex-row items-center gap-x-2'
                        href={`/call/${meetingId}`}>
                        <VideoIcon />
                        Start meeting
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default UpcomingState