import ErrorState from '@/components/error-state';
import LoadingState from '@/components/loading-state';
import AgentsModule from '@/modules/agents/ui/agents-module'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from "react-error-boundary"
import React, { Suspense } from 'react'
import AgentTitleHeader from '@/modules/agents/ui/agent-title-header';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SearchParams } from 'nuqs';
import { loadSearchParams } from '@/modules/agents/params';

interface Props{
  searchParams: Promise<SearchParams>
}

const agents = async ({searchParams} : Props) => {
  const filters = await loadSearchParams(searchParams)

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session){
    redirect("/sign-in")
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
    ...filters
  }));

  return (
    <>
      <AgentTitleHeader />

      <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={<LoadingState title="Loading your agents" description="This may take few moments..." />}
      >
        <ErrorBoundary
          fallback={<ErrorState title="Failed To Load Agents" description="Please try after some time" />}
        >
          <AgentsModule />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
    </>
  )
}

export default agents