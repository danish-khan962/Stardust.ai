"use client"

import { DataTable } from '@/components/data-table';
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import { columns } from './columns';
import EmptyState from '@/components/empty-state';
import { useRouter } from 'next/navigation';
import { useMeetingsFilters } from '../hooks/use-meetings-filters';
import DataPagination from '@/components/data-pagination';

const MeetingsModule = () => {
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
    ...filters,
  }))

  return (
    <div className='flex-1 flex-col p-4 gap-y-4'>
      <DataTable
        data={data.item}
        columns={columns}
        onRowClick={(row) => {
          router.push(`/meetings/${row.id}`)
        }}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({page})}
      />
      {
        data.item.length === 0 && (
          <EmptyState
            title='Create Your First Meeting'
            description='Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time.'
          />
        )
      }
    </div>
  )
}

export default MeetingsModule