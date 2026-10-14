"use client"

import ResponsiveDialog from '@/components/reponsive-dialog'
import React from 'react'
import MeetingsForm from './meetings-form'
import { useRouter } from "next/navigation"

interface NewMeetingsDialogProps{
    open: boolean,
    onOpenChange: (open: boolean) => void,
}

const NewMeetingsDialog = ({
    open, onOpenChange
} : NewMeetingsDialogProps) => {
    const router = useRouter();

  return (
    <ResponsiveDialog 
    title='New Meeting'
    description='Create your new meeting'
    open={open}
    onOpenChange={onOpenChange}
    >
        <MeetingsForm
          onSuccess={(id) => {
            onOpenChange(false),
            router.push(`/meetings/${id}`)
          }}
          onCancel={() => onOpenChange(false)}
        />
    </ResponsiveDialog>
  )
}

export default NewMeetingsDialog