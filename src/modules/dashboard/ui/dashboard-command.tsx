"use client"

import {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandItem
} from '@/components/ui/command'
import React, { Dispatch, SetStateAction } from 'react'

interface CommandDialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const DashboardCommand = ({
    open, setOpen
}: CommandDialogProps) => {
    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <Command>
                <CommandInput placeholder='Find a meeting or an agent....' />

                <CommandList>
                    <CommandItem>
                        Testing it
                    </CommandItem>
                </CommandList>
            </Command>
        </CommandDialog>
    )
}

export default DashboardCommand