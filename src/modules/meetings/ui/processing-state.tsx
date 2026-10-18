"use client"

import EmptyState from '@/components/empty-state'
import React from 'react'

const ProcessingState = () => {
    return (
        <div className='bg-white flex flex-col justify-center items-center px-4 py-5 gap-4 rounded-lg border'>
            <EmptyState
                image={"/images/processing-state.png"}
                title='Meeting under processing'
                description='This meeting was completed, a summary will appear soon.'
            />
        </div>
    )
}

export default ProcessingState