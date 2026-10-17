"use client"

import React, { useState } from 'react'
import { cn } from 'cn'
import { ChevronsUpDownIcon, Loader2Icon } from 'lucide-react'
import { Button } from './ui/button'
import { CommandLoading } from 'cmdk'

import {
    ResponsiveCommandDialog,
    CommandDialog,
    CommandList,
    CommandItem,
    CommandEmpty,
    CommandInput,
    CommandSeparator,
    Command,
} from "@/components/ui/command"


interface CommandSelectProps {
    options: Array<{
        id: string,
        value: string,
        children: React.ReactNode
    }>;
    onSelect: (value: string) => void;
    value: string,
    onSearch?: (value: string) => void;
    placeholder?: string;
    className?: string;
    isSearchable?: boolean;
    isLoading?: boolean;
}

const CommandSelect = ({
    options,
    onSelect,
    value,
    onSearch,
    placeholder = "Select an option",
    className,
    isSearchable,
    isLoading,
}: CommandSelectProps) => {

    const [open, setOpen] = useState(false);
    const selectedOption = options.find((option) => option.value === value)

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                variant={"outline"}
                className={cn(
                    "h-11 justify-between font-normal px-2",
                    !selectedOption && "text-muted-foreground",
                    className,
                )}
            >
                <div>
                    {selectedOption?.children ?? placeholder}
                </div>
                <ChevronsUpDownIcon />
            </Button>

            <ResponsiveCommandDialog
                shouldFilter={!onSearch}
                open={open}
                onOpenChange={setOpen}
                className="py-4 px-4"
            >
                <CommandInput placeholder="Search ..." onValueChange={onSearch} />

                <CommandList className="mt-3">
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                            <Loader2Icon className="size-4 animate-spin" />
                            <span>Searching agents...</span>
                        </div>
                    ) : (
                        <>
                            <CommandEmpty>
                                <span className="text-sm font-normal text-muted-foreground">
                                    No options found.
                                </span>
                            </CommandEmpty>

                            {options.map((option) => (
                                <CommandItem
                                    key={option.id}
                                    value={option.id}
                                    onSelect={() => {
                                        onSelect(option.value)
                                        setOpen(false)
                                    }}
                                >
                                    {option.children}
                                </CommandItem>
                            ))}
                        </>
                    )}
                </CommandList>
            </ResponsiveCommandDialog>
        </>
    )
}

export default CommandSelect