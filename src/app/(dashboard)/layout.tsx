import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/modules/home/ui/app-sidebar'
import {  } from "react-hot-toast"

interface Props {
    children: React.ReactNode
}

const layout = ({
    children
}: Props) => {
    return (
        <SidebarProvider >
            <AppSidebar />
            <main className='flex flex-col h-screen w-screen bg-muted
            '>
                {children}
            </main>
        </SidebarProvider>
    )
}

export default layout