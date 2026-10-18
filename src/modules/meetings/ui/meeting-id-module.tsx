"use client"

import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import MeetingIdModuleHeader from './meeting-id-module-header';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useConfirm } from '@/modules/agents/hooks/use-confirm';
import UpdateMeetingsDialog from './update-meeting-dialog';
import UpcomingState from './upcoming-state';
import ActiveState from './active-state';
import ProcessingState from './processing-state';
import CancelledState from './cancelled-state';

interface Props {
    meetingId: string;
}

const MeetingIdModule = ({
    meetingId
}: Props) => {
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({
            id: meetingId
        })
    )

    const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                router.push("/meetings");
                toast.success("Meeting Removed");
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    )

    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Are you sure?",
        "This action will permanently remove this meeting."
    )

    const handleRemoveMeeting = async () => {
        const ok = await confirmRemove();

        if (!ok) return;

        await removeMeeting.mutateAsync({ id: meetingId })
    }


    const isCompleted = data.status === "completed";
    const isActive = data.status === "active";
    const isProcessing = data.status === "processing";
    const isCancelled = data.status === "cancelled";
    const isUpcoming = data.status === "upcoming";

    return (
        <>
            <RemoveConfirmation />
            <UpdateMeetingsDialog
                open={updateMeetingDialogOpen}
                onOpenChange={setUpdateMeetingDialogOpen}
                initialValues={data}
            />
            <div className='flex-1 flex flex-col p-4 gap-4'>
                <MeetingIdModuleHeader
                    meetingId={meetingId}
                    meetingName={data.name}
                    onEdit={() => setUpdateMeetingDialogOpen(true)}
                    onRemove={handleRemoveMeeting}
                />
                {
                    isCompleted && 
                    <div>
                        Completed
                    </div>
                }
                {
                    isUpcoming && 
                    (
                        <UpcomingState
                            meetingId={meetingId}
                            onCancellingMeeting={() => {}}
                            isCancelling={false}
                        />
                    )
                }
                {
                    isActive && 
                    (
                        <ActiveState
                            meetingId={meetingId}
                        />
                    )
                }
                {
                    isProcessing && 
                    <ProcessingState />
                }
                {
                    isCancelled && 
                    <CancelledState />
                }
            </div>
        </>
    )
}

export default MeetingIdModule