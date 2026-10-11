"use client"

import React from 'react'
import { ClockAlert } from 'lucide-react'
import Image from 'next/image'

interface EmptyStateProps {
    title: string,
    description: string,
}

const EmptyState = ({
    title, description
}: EmptyStateProps) => {
    return (
        <div className='mt-25 py-4 px-8 w-full flex flex-col justify-center items-center gap-8'>

                <Image
                    src={"/images/empty-state.png"}
                    alt='empty state'
                    height={300}
                    width={300}
                />

                <div className='flex flex-col gap-2.5 justify-center text-center max-w-md mx-auto'>
                    <h4 className='text-lg font-medium'>
                        {title}
                    </h4>
                    <p className='text-sm text-neutral-600'>
                        {description}
                    </p>
                </div>
        </div>
    )
}

export default EmptyState