"use client"

import ResponsiveDialog from '@/components/reponsive-dialog'
import React from 'react'
import AgentsForm from './agents-form'
import { AgentsGetOne } from '../types'

interface UpdateAgentsDialogProps{
    open: boolean,
    onOpenChange: (open: boolean) => void,
    initialValues: AgentsGetOne,
}

const UpdateAgentsDialog = ({
    open, 
    onOpenChange, 
    initialValues,
} : UpdateAgentsDialogProps) => {
  return (
    <ResponsiveDialog 
    title='Update Agent'
    description='Edit your agent details'
    open={open}
    onOpenChange={onOpenChange}
    >
        <AgentsForm
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
          initialValues={initialValues}
        />
    </ResponsiveDialog>
  )
}

export default UpdateAgentsDialog