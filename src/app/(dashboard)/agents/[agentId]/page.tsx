import ErrorState from '@/components/error-state';
import LoadingState from '@/components/loading-state';
import AgentIdModule from '@/modules/agents/ui/agent-id-module';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

interface Props{
    params: Promise<{agentId: string}>
}

const Page = async ({params}: Props) => {

    const { agentId } = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.agents.getOne.queryOptions({id: agentId})
    )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState title={"Loading Agent"} description={"Hold on tight, we are loading your agent."}/>}>
            <ErrorBoundary fallback={<ErrorState title={"Error loading your agent"} description={"We encountered some problem in loading your agent. Please try again after some time."} />}>
                <AgentIdModule agentId={agentId} />
            </ErrorBoundary>
        </Suspense>
    </HydrationBoundary>
  )
}

export default Page