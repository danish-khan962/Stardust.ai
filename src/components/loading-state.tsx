"use client"

import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingStateProps {
    title: string,
    description: string,
}

const LoadingState = ({
    title, description
}: LoadingStateProps) => {
    return (
        <div className='py-4 px-8 w-full flex flex-1 justify-center items-center'>
            <div className='flex flex-col justify-center items-center gap-8 py-10 px-20 rounded-xl bg-background backdrop-blur-xl shadow-lg bg-radial from-warm-earth-dark to-warm-earth-superdark'>
                <Loader2
                    height={25}
                    width={25}
                    className='animate-spin'
                    stroke='white'
                />

                <div className='flex flex-col gap-1 justify-center text-center'>
                    <h4 className='text-lg font-medium text-white'>
                        {title}
                    </h4>
                    <p className='text-sm text-neutral-300'>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoadingState