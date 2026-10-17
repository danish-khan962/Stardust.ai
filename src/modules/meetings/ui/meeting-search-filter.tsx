"use client"

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'
import { useMeetingsFilters } from "../hooks/use-meetings-filters"

const MeetingsSearchFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();

  return (
    <div className='flex flex-row relative bg-background items-center px-2 py-1 rounded-lg border border-neutral-200'>
      <Input 
      className='outline-none border-none focus:ring-0 focus-visible:border-none focus-visible:ring-0' 
      placeholder='Search meetings by name'
      style={{wordSpacing: "1px"}}
      value={filters.search}
      onChange={(e) => setFilters({search: e.target.value})}
      />
      <Search className='h-5 text-neutral-700' />
    </div>
  )
}

export default MeetingsSearchFilter