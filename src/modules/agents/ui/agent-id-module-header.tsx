"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVerticalIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface Props{
    agentId: string,
    agentName: string, 
    onEdit: () => void,
    onRemove: () => void;
}

const AgentIdModuleHeader = ({
    agentId,
    agentName,
    onEdit,
    onRemove 
} : Props) => {
  return (
    <div className='flex flex-row justify-between items-center gap-4'>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink 
                    href={"/agents"}className='font-medium text-sm md:text-lg'>
                        My Agents
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className='font-medium text-foreground text-xl [&>svg]:size-4'>
                </BreadcrumbSeparator>

                <BreadcrumbItem>
                    <BreadcrumbLink 
                    href={`/agents/${agentId}`}
                    className='font-medium text-sm md:text-lg text-foreground'>
                        {agentName}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
                {/* <Button 
                variant={"ghost"}
                className="cursor-pointer hover:bg-neutral-200/70 transition-all ease-in-out duration-200"
                >
                    <MoreVerticalIcon />
                </Button> */}
                <MoreVerticalIcon className='size-5 cursor-pointer'/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem 
                onClick={onEdit}
                className="p-2 flex flex-row items-center gap-3 cursor-pointer">
                    <PencilIcon className='size-3.5 md:size-4'/>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator>
                </DropdownMenuSeparator>
                <DropdownMenuItem 
                onClick={onRemove}
                className="p-2 flex flex-row items-center gap-3 cursor-pointer">
                    <Trash2Icon className='size-3.5 md:size-4'/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default AgentIdModuleHeader