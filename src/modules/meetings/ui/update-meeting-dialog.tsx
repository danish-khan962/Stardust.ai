"use client"

import ResponsiveDialog from '@/components/reponsive-dialog'
import React from 'react'
import MeetingsForm from './meetings-form'
import { useRouter } from "next/navigation"
import { MeetingGetOne } from '../types'

interface NewMeetingsDialogProps{
    open: boolean,
    onOpenChange: (open: boolean) => void,
    initialValues: MeetingGetOne
}

const UpdateMeetingsDialog = ({
    open, onOpenChange, initialValues
} : NewMeetingsDialogProps) => {
    const router = useRouter();

  return (
    <ResponsiveDialog 
    title='Update Meeting'
    description='Update existing meeting details'
    open={open}
    onOpenChange={onOpenChange}
    >
        <MeetingsForm
          onSuccess= {() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
          initialValues={initialValues}
        />
    </ResponsiveDialog>
  )
}

export default UpdateMeetingsDialog