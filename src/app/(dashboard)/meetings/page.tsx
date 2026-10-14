import ErrorState from '@/components/error-state';
import LoadingState from '@/components/loading-state';
import { auth } from '@/lib/auth';
import MeetingsModule from '@/modules/meetings/ui/meetings-module'
import MeetingsTitleHeader from '@/modules/meetings/ui/meetings-title-header';
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/sign-in")
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({})
  )

  return (
    <>
      <MeetingsTitleHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState title={"Loading Your Meetings"} description={"This may take few moments. Hang on tight."} />}>
          <ErrorBoundary fallback={<ErrorState title={"Problem in loading meetings"} description={"Try again after some time."} />}>
            <MeetingsModule />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  )
}

export default Page