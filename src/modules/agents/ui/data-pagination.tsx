"use client"

import { Button } from '@/components/ui/button'
import React from 'react'

interface DataPaginationProps{
    page: number,
    totalPages: number,
    onPageChange: (page: number) => void,
}

const DataPagination = ({
    page,
    totalPages,
    onPageChange
}: DataPaginationProps) => {
  return (
    <div className='flex flex-row justify-between items-center gap-8 my-8 md:my-10'>
        <div className='text-sm font-medium text-muted-foreground'>
            Page {page} of {totalPages || 1}
        </div>
        <div className='flex flex-row justify-center items-center gap-3'>
            <Button
            disabled={page === 1}
            size={"sm"}
            variant={'outline'}
            className="py-6 px-4 cursor-pointer font-manrope-font font-semibold"
            onClick={() => onPageChange(Math.max(1, page-1))}
            >
                ...Prev
            </Button>
            <Button
            disabled={page === totalPages || totalPages === 0}
            size={"sm"}
            variant={'outline'}
            className="py-6 px-4 cursor-pointer font-manrope-font font-semibold"
            onClick={() => onPageChange(Math.min(totalPages, page+1))}
            >
                Next...
            </Button>
        </div>
    </div>
  )
}

export default DataPagination