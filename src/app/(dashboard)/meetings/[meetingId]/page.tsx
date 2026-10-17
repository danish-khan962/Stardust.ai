import ErrorState from '@/components/error-state';
import LoadingState from '@/components/loading-state';
import { auth } from '@/lib/auth';
import MeetingIdModule from '@/modules/meetings/ui/meeting-id-module';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, hydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

interface Props{
  params: Promise<{
    meetingId: string;
  }>
}

const page = async ({ params }: Props) => {
  const {meetingId} = await params;

  const session = await auth.api.getSession({
    headers: await headers()
  })

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({id: meetingId})
  )

  if(!session){
    redirect("/sign-in")
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState title="Loading Your Meeting" description="We're loading your selected meeting. Please wait until it loads." />}>
        <ErrorBoundary fallback={<ErrorState title="Problem In Loading Meeting" description="We are facing problem right now in opening your selected meeting. Please try again after some time."/>}>
          <MeetingIdModule meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default page