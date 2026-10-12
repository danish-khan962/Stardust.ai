"use client"

import React from 'react'

import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { DataTable } from './data-table'
import { columns } from './columns'
import EmptyState from '@/components/empty-state'
import { useAgentsFilters } from '../hooks/use-agents-filters'
import DataPagination from './data-pagination'

const AgentsModule = () => {
    const [filters, setFilters] = useAgentsFilters();

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters
    }));

    return (
        <div className='flex-1 flex-col p-4 gap-y-4'>
            <DataTable data={data.item} columns={columns} />
            <DataPagination page={filters.page}
            totalPages={data.totalPages}  onPageChange={(page) => setFilters({page})}/>
            {
                data.item.length === 0 && (
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
