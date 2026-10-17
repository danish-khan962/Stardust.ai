"use client"

import TitleHeader from '@/components/title-header'
import { PlusIcon, XIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useMeetingsFilters } from '../hooks/use-meetings-filters'
import MeetingsSearchFilter from './meeting-search-filter'
import { DEFAULT_PAGE } from '@/constants'
import { Button } from '@/components/ui/button'
import { GoXCircle } from 'react-icons/go'
import NewMeetingsDialog from './new-meetings-dialog'
import { StatusFilters } from './status-filter'
import { AgentIdFilters } from './agent-id-filter'

const MeetingsTitleHeader = () => {
    const [filters, setFilters] = useMeetingsFilters();
    const [openCommandDialog, setOpeCommandDialog] = useState(false);

    const ifFilterModified = !!filters.search || !!filters.agentId || filters.status;
    const onClearFilter = () => {
        setFilters({
            search: "",
            status: null,
            agentId: "",
            page: DEFAULT_PAGE,
        })
    }

    return (
        <>
            <NewMeetingsDialog
                open={openCommandDialog}
                onOpenChange={setOpeCommandDialog}
            />

            <div className='flex flex-col'>
                <TitleHeader
                    title='My Meetings'
                    enableButton
                    buttonTitle='Add Meetings'
                    icon={<PlusIcon />}
                    onClickFunction={() => setOpeCommandDialog(true)}
                />

                <div className='flex items-center px-4 gap-2'>
                    <MeetingsSearchFilter />
                    <StatusFilters />
                    <AgentIdFilters />
                    {ifFilterModified && (
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            className="h-9 cursor-pointer"
                            onClick={onClearFilter}
                        >
                            <GoXCircle />
                            Clear
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export default MeetingsTitleHeader