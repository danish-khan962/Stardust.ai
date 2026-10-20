import ErrorState from '@/components/error-state';
import LoadingState from '@/components/loading-state';
import { auth } from '@/lib/auth';
import CallModule from '@/modules/call/ui/call-module';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

interface Props{
    params: Promise<{
        meetingId: string;
    }>
}

const Page = async ({
    params
}: Props) => {
    const {meetingId} = await params;

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session){
        redirect("/sign-in")
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.meetings.getOne.queryOptions({id: meetingId})
    )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
            <ErrorBoundary fallback={<ErrorState title="Can't connect to call" description='Please try again after some time to start this meeting.' />}>
                <CallModule meetingId={meetingId}/>
            </ErrorBoundary>
        </Suspense>
    </HydrationBoundary>
  )
}

export default Page