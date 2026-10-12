"use client"

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'
import { useAgentsFilters } from '../hooks/use-agents-filters'

const AgentSearchFilter = () => {
  const [filters, setFilters] = useAgentsFilters();

  return (
    <div className='flex flex-row relative bg-background items-center px-2 py-1 rounded-lg border border-neutral-200'>
      <Input 
      className='outline-none border-none focus:ring-0 focus-visible:border-none focus-visible:ring-0' 
      placeholder='Search agents by name'
      style={{wordSpacing: "1px"}}
      value={filters.search}
      onChange={(e) => setFilters({search: e.target.value})}
      />
      <Search className='h-5 text-neutral-700' />
    </div>
  )
}

export default AgentSearchFilter