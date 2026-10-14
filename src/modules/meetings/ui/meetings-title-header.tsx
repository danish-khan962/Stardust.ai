"use client"

import TitleHeader from '@/components/title-header'
import { PlusIcon, XIcon } from 'lucide-react'
import React, { useState } from 'react'
// import { useAgentsFilters } from '../hooks/use-agents-filters'
// import AgentSearchFilter from './agents-search-filter'
import { DEFAULT_PAGE } from '@/constants'
import { Button } from '@/components/ui/button'
import { GoXCircle } from 'react-icons/go'
import NewMeetingsDialog from './new-meetings-dialog'

const MeetingsTitleHeader = () => {
    // const [filters, setFilters] = useAgentsFilters();
    const [openCommandDialog, setOpeCommandDialog] = useState(false);

    // const ifFilterModified = !!filters.search;
    // const onClearFilter = () => {
    //     setFilters({
    //         search: "",
    //         page: DEFAULT_PAGE,
    //     })
    // }

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

                {/* <div className='flex items-center px-4 gap-2'>
                    <AgentSearchFilter />
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
                </div> */}
            </div>
        </>
    )
}

export default MeetingsTitleHeader