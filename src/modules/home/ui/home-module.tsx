"use client"

import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const HomeModule = () => {
    const trpc = useTRPC();
    const { data } = useQuery(trpc.hello.queryOptions({text: "Danish"}))

    return (
        <div className='text-2xl flex flex-row p-8 font-semibold font-manrope-font'>
            {data?.greeting}
        </div>  
    )
}

export default HomeModule