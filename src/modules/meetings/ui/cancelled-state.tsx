"use client"

import EmptyState from '@/components/empty-state'
import React from 'react'

const CancelledState = () => {
    return (
        <div className='bg-white flex flex-col justify-center items-center px-4 py-5 gap-4 rounded-lg border'>
            <EmptyState
                image={"/images/cancelled-state.png"}
                title='Meeting is cancelled'
                description='This meeting was cancelled.'
            />
        </div>
    )
}

export default CancelledState