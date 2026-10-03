import React from 'react'

import { authClient } from '@/lib/auth-client'
import { LuChevronsUpDown } from 'react-icons/lu'
import { useRouter } from 'next/navigation'


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import toast from 'react-hot-toast'
import GeneratedAvatar from '@/components/generated-avatar'

const UserDashboardButton = () => {

    const router = useRouter();
    const { data, isPending } = authClient.useSession()

    if (isPending || !data?.user) {
        return null;
    }

    const onLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/")
                    toast.success("Logged out")
                },
                onError: ({error}) => {
                    toast.success(error.message)
                }
            }
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row justify-between items-center px-4 py-5 border-2 border-warm-earth-extradark/25 rounded-lg cursor-pointer bg-black/50 backdrop-blur-xl">
                <div className="flex flex-row justify-center items-center gap-2">
                    {
                        data?.user?.image ?
                            (
                                <Avatar>
                                    <AvatarImage src={data.user.image} />
                                </Avatar>
                            )
                            :
                            (
                                <GeneratedAvatar
                                    seed={data.user.name}
                                    variant='botttsNeutral'
                                    className='size-9 outline-none'
                                />
                            )
                    }
                    <div className="flex flex-col justify-start items-start">
                        <p className="text-sm font-medium text-white">
                            {data.user.name}
                        </p>
                        <p className="text-xs font-medium text-neutral-300">
                            {data.user.email}
                        </p>
                    </div>
                </div>

                <div>
                    <LuChevronsUpDown />
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="my-2 bg-[#121212]">
                <DropdownMenuGroup className="bg-[#121212]">
                    <DropdownMenuLabel>
                        My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/15" />
                    <DropdownMenuItem className="p-2 cursor-pointer text-neutral-400 hover:text-neutral-300 transition-colors ease-in-out duration-200">
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onLogout}
                        className="p-2 cursor-pointer text-neutral-400 hover:text-neutral-300 transition-colors ease-in-out duration-200">
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                {/* <DropdownMenuSeparator /> */}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDashboardButton
