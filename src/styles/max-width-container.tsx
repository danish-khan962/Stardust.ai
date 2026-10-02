"use client"

import React from 'react'
import { cn } from 'cn'

interface MaxWidthContainerProps {
    children?: React.ReactNode,
    className?: string
}

const MaxWidthContainer: React.FC<MaxWidthContainerProps> = ({
    children, className
}) => {
    return (
        <div
            className={
                cn(
                    `max-w-360 w-full mx-auto py-2 px-4 sm:px-5 md:px-6 lg:px-8`,
                    className
                )
            }
        >
            {children}
        </div>
    )
}

export default MaxWidthContainer