"use client"

import TitleHeader from '@/components/title-header'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import NewAgentsDialog from './new-agents-dialog'

const AgentTitleHeader = () => {

    const [openCommandDialog, setOpeCommandDialog] = useState(false);

    return (
        <>
            <NewAgentsDialog
            open={openCommandDialog}
            onOpenChange={setOpeCommandDialog}
            />

            <TitleHeader
                title='My Agents'
                enableButton
                buttonTitle='Add Agents'
                icon={<PlusIcon />}
                onClickFunction={() => setOpeCommandDialog(true)}
            />
        </>
    )
}

export default AgentTitleHeader