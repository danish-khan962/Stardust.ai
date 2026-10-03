"use client"

import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { useSidebar } from '@/components/ui/sidebar'
import { VscLayoutSidebarLeftOff, VscLayoutSidebarRightOff } from "react-icons/vsc";
import { Search } from 'lucide-react';
import { Kbd } from '@/components/ui/kbd';
import DashboardCommand from './dashboard-command';

const DashboardNavbar = () => {

    const { state, isMobile, toggleSidebar } = useSidebar();
    const [searchCommandOpen, setSearchCommandOpen] = useState(false);

    useEffect(() =>{
        const down = (e: KeyboardEvent) => {
            if(e.key == "k" && (e.ctrlKey || e.metaKey)){
                e.preventDefault();
                setSearchCommandOpen((open) => !open);
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [])

    return (
        <>
            <DashboardCommand
            open={searchCommandOpen}
            setOpen={setSearchCommandOpen}
            />

            <nav className='flex flex-row items-center gap-5 px-4 py-2 md:py-4 bg-white border-2 border-b-neutral-200'>
                <Button
                    size="sm"
                    variant="outline"
                    className="cursor-pointer bg-neutral-100 border border-[#121212]/25"
                    onClick={toggleSidebar}
                >
                    {(state === "collapsed" || isMobile) ?
                        (<VscLayoutSidebarLeftOff />)
                        :
                        (<VscLayoutSidebarRightOff />)
                    }
                </Button>

                <Button
                    variant='outline'
                    className="h-8.5 md:h-9 w-60 flex flex-row justify-start items-center cursor-pointer bg-muted hover:bg-muted"
                    onClick={() => setSearchCommandOpen((open) => !open)}
                >
                    <Search className='text-muted-foreground' />
                    <span className='text-sm md:text-base text-muted-foreground'>Search</span>

                    <Kbd className='ml-auto text-sm md:text-base px-1 py-2 flex flex-row gap-1 bg-neutral-200'>
                        <span>&#8984;</span> <span>K</span>
                    </Kbd>
                </Button>
            </nav>
        </>
    )
}

export default DashboardNavbar