"use client"

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { CallControls, SpeakerLayout } from '@stream-io/video-react-sdk';

interface Props {
    onLeave: () => void;
    meetingName: string;
}

const CallActive = ({
    onLeave, meetingName
}: Props) => {
    return (
        <div className='flex flex-col justify-between h-screen items-center p-2 md:p-4 text-neutral-200 gap-4'>
            <div className='w-full flex justify-start items-center gap-3 md:gap-4 bg-warm-earth-dark/10 p-3 md:p-4 rounded-xl'>
                <Link
                    className='h-fit w-fit'
                    href={"/meetings"}>
                    <Image
                        alt='logo'
                        src={"/logo.svg"}
                        height={1000}
                        width={1000}
                        className='h-fit w-fit'
                    />
                </Link>
                <span className='font-medium capitalize text-lg md:text-xl'>
                    {meetingName}
                </span>
            </div>

            <div className='flex-1 w-full flex items-center justify-center relative min-h-0 overflow-hidden'>
                <SpeakerLayout />
            </div>

            <div className='w-full bg-warm-earth-extradark/10 rounded-full px-3'>
                <CallControls onLeave={onLeave} />
            </div>
        </div>
    )
}

export default CallActive