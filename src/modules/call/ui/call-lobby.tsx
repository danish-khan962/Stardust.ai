"use client"

import React from 'react'

import { LogInIcon, Video } from 'lucide-react';
import {
    DefaultVideoPlaceholder,
    StreamVideoParticipant,
    ToggleAudioPreviewButton,
    ToggleVideoPreviewButton,
    useCallStateHooks,
    VideoPreview
} from "@stream-io/video-react-sdk"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import GeneratedAvatarUri from '@/lib/avatar';

import "@stream-io/video-react-sdk/dist/css/styles.css"
import { redirect } from 'next/navigation';

interface Props{
    onJoin: () => void;
}

const CallLobby = ({onJoin}: Props) => {
    const {useCameraState, useMicrophoneState} = useCallStateHooks();

    const {hasBrowserPermission: hasCameraPermission} = useCameraState()
    const {hasBrowserPermission: hasMicPermission} = useMicrophoneState();

    const hasBrowserMediaPermission = hasCameraPermission && hasMicPermission;

    const {data} = authClient.useSession();

    const disabledVideoPreview = () => {
        return (
            <DefaultVideoPlaceholder
                participant={{
                    name: data?.user.name ?? "",
                    image: 
                        data?.user.image ?? GeneratedAvatarUri({
                            seed: data?.user.name ?? "",
                            variant: "initials"
                        }),
                } as StreamVideoParticipant}
            />
        )
    }

    const AllowBrowserPermissions = () => {
        return (
            <p className='text-sm font-medium font-manrope-font'>
                Please grant your browser a permission to access your camera and microphone.
            </p>
        )
    }

  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen bg-radial from-warm-earth-extradark to-warm-earth-superdark text-black'>
        <div className='flex flex-col px-10 py-5 gap-5 bg-white rounded-lg shadow-[1px_1px_16px_#c38e70]'>
            <div className='flex flex-col gap-3 text-center'>
                <p className='text-lg md:text-xl font-semibold'>Ready to join?</p>
                <p className='text-xs md:text-sm font-medium text-neutral-800'>Set up your call before joining</p>
            </div>

            <VideoPreview 
                DisabledVideoPreview={
                    hasBrowserMediaPermission ? disabledVideoPreview : AllowBrowserPermissions
                }
                NoCameraPreview={disabledVideoPreview}
            />

            <div className='flex justify-center items-center gap-4'>
                <ToggleAudioPreviewButton />
                <ToggleVideoPreviewButton />
            </div>

            <div className='w-full flex flex-col md:flex-row justify-center items-center gap-x-4'>
                <Button
                    variant={"secondary"}
                    className="w-full md:flex-auto cursor-pointer border-neutral-200 h-10 md:h-13 flex flex-row items-center gap-x-2"
                    onClick={() => redirect("/meetings")}
                >
                    Cancel meeting
                </Button>
                <Button
                    className="text-white w-full md:flex-auto flex flex-row items-center gap-x-2"
                    onClick={onJoin}
                >
                    Join meeting
                </Button>
            </div>
        </div>
    </div>
  )
}

export default CallLobby