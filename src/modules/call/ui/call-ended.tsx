"use client"

import React from 'react'

import Link from 'next/link';
import { Button } from '@/components/ui/button';

import "@stream-io/video-react-sdk/dist/css/styles.css"
import { useRouter } from 'next/navigation';

const CallEnded = () => {
    const router = useRouter();

    return (
        <div className='flex flex-col items-center justify-center w-full min-h-screen bg-radial from-warm-earth-extradark to-warm-earth-superdark text-black'>
            <div className='flex flex-col px-10 py-14 gap-5 bg-white rounded-lg shadow-[1px_1px_16px_#c38e70]'>
                <div className='flex flex-col gap-3 text-center'>
                    <p className='text-lg md:text-xl font-semibold'>Meeting is ended</p>
                    <p className='text-xs md:text-sm font-medium text-neutral-800'>This meeting is completed and under processing. A summary will appear soon.</p>
                </div>

                <Button 
                onClick={() => router.push("/meetings")}
                className="text-white">
                    <Link href={"/meetings"}>
                        Back to meetings
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default CallEnded