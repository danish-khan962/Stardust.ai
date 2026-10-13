"use client"

import { useTRPC } from '@/trpc/client'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import AgentIdModuleHeader from './agent-id-module-header';
import GeneratedAvatar from '@/components/generated-avatar';
import { Badge } from '@/components/ui/badge';
import { VideoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useConfirm } from '../hooks/use-confirm';
import UpdateAgentsDialog from './update-agents-dialog';

interface Props {
  agentId: string,
}

const AgentIdModule = ({ agentId }: Props) => {
  const router = useRouter();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));
  const queryClient = useQueryClient();

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
        router.push("/agents")
        toast.success("Agent removed")
      },

      onError: (error) => {
        toast.error(error.message)
      }
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will also delete ${data.meetingCount} meetings associated with this agent.`
  )

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeAgent.mutateAsync({ id: agentId })
  }

  const [updateAgentDialogOpen, setUpdateAgentDialog] = useState(false);

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentsDialog
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialog}
        initialValues={data}
      />
      <div className='p-4 flex-1 flex-col gap-10 items-center'>
        <AgentIdModuleHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialog(true)}
          onRemove={handleRemoveAgent}
        />

        <div className='mt-8 p-4 md:p-8 bg-background rounded-xl border flex flex-col gap-10'>
          <div className='flex flex-row items-center justify-between gap-5'>
            <div className='flex flex-row gap-5 items-center'>
              <GeneratedAvatar
                variant={"botttsNeutral"}
                seed={data.name}
                className='size-10'
              />
              <h2 className='font-semibold text-lg md:text-xl'>
                {data.name}
              </h2>
            </div>
            <Badge
              variant={"outline"}
              className="flex items-center gap-2 h-7 p-2 md:h-8 md:p-4"
            >
              <VideoIcon className="text-warm-earth-superdark" />
              {data.meetingCount} {data.meetingCount === 1 ? "meeting" : "meetings"}
            </Badge>
          </div>

          <div className='flex flex-col gap-3'>
            <p className='font-medium text-lg'>Instructions</p>
            <p className='bg-muted p-4 text-sm md:text-base'>
              {data.instructions}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AgentIdModule