"use client"

import React from 'react'

import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { DataTable } from './data-table'
import { columns } from './columns'
import EmptyState from '@/components/empty-state'

const AgentsModule = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

    return (
        <div className='flex-1 flex-col p-4 gap-y-4'>
            <DataTable data={data} columns={columns} />
            {
                data.length === 0 && (
                    <EmptyState
                    title='Create your first agent'
                    description='Create an agent to join your meetings. Each agent will follow your instructions can can interact with participants during call.'
                    />
                )
            }
        </div>
    )
}

export default AgentsModule
