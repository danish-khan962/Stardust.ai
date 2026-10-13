"use client"

import { useIsMobile } from '@/hooks/use-mobile'
import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter
} from "@/components/ui/drawer"

interface ResponsiveDialogProps{
    title: string,
    description: string,
    children: React.ReactNode,
    open: boolean,
    onOpenChange: ((open: boolean) => void)
}

const ResponsiveDialog = ({
    title, description, children, open, onOpenChange
}: ResponsiveDialogProps) => {
    const isMobile = useIsMobile();

    if(isMobile){
        return(
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                        <DrawerDescription>{description}</DrawerDescription>
                    </DrawerHeader>

                    <div className='w-full flex justify-center items-center'>
                        {children}
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }

    else{
        return(
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader className='flex flex-col gap-4'>
                        <DialogTitle className="text-base md:text-lg font-semibold">{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        )
    }
}

export default ResponsiveDialog