import ErrorState from '@/components/error-state';
import LoadingState from '@/components/loading-state';
import MeetingsModule from '@/modules/meetings/ui/meetings-module'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

const meetings = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({})
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState title={"Loading Your Meetings"} description={"This may take few moments. Hang on tight."}/>}>
        <ErrorBoundary fallback={<ErrorState title={"Problem in loading meetings"} description={"Try again after some time."} />}>
          <MeetingsModule />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default meetings