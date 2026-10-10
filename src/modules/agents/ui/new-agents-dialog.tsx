"use client"

import ResponsiveDialog from '@/components/reponsive-dialog'
import React from 'react'
import AgentsForm from './agents-form'

interface NewAgentsDialogProps{
    open: boolean,
    onOpenChange: (open: boolean) => void,
}

const NewAgentsDialog = ({
    open, onOpenChange
} : NewAgentsDialogProps) => {
  return (
    <ResponsiveDialog 
    title='New Agent'
    description='Create your new agent'
    open={open}
    onOpenChange={onOpenChange}
    >
        <AgentsForm
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
    </ResponsiveDialog>
  )
}

export default NewAgentsDialog