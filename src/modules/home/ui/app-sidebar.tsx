"use client"
import Image from "next/image"
import Link from "next/link"

import { GoHubot, GoVideo, GoChevronDown, GoChevronUp } from "react-icons/go"
import { LuCrown } from "react-icons/lu"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { cn } from "cn"
import UserDashboardButton from "./user-dashboard-button"


const firstContentProvider = [
    {
        name: "Meetings",
        icon: GoVideo,
        hrefUrl: "/meetings"
    },
    {
        name: "Agents",
        icon: GoHubot,
        hrefUrl: "/agents"
    },
]

const secondContentProvider = [
    {
        name: "Upgrade",
        icon: LuCrown,
        hrefUrl: "/upgrade"
    }
]

export function AppSidebar() {
    const pathname = usePathname();

    const [isProfileTabOpen, setIsProfileTabOpen] = useState(false);

    const toggleProfileTabOpenStatus = () => {
        setIsProfileTabOpen(!isProfileTabOpen)
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <Link
                    href={"/"}
                    className="flex flex-row justify-start items-center gap-3 py-2">
                    <Image
                        src={"/logo.svg"}
                        alt="logo"
                        height={1000}
                        width={1000}
                        className="h-fit w-fit bg-white/90 rounded-xl outline-2 outline-warm-earth-superdark"
                    />
                    <p className="text-xl md:text-2xl font-bold text-white/90">
                        Stardust.AI
                    </p>
                </Link>
            </SidebarHeader>
            <div className="pt-3">
                <Separator className="text-warm-earth-light opacity-20" />
            </div>
            <SidebarContent>
                <SidebarGroup className="flex flex-col mt-4 gap-2">
                    {firstContentProvider.map((contentItem, index) => {
                        const isActive = pathname === contentItem.hrefUrl
                        return (
                            <Link
                                href={contentItem.hrefUrl}
                                key={index}
                                className={cn(
                                    "flex flex-row  gap-4 justify-start items-center hover:cursor-pointer hover:bg-warm-earth-extralight/15 p-2 rounded-lg transition-colors ease-in-out duration-200 hover:text-white",
                                    isActive && "bg-linear-to-r from-warm-earth-extradark/70 via-warm-earth-extradark/30% via-warm-earth-extradark/50% to-warm-earth-extradark/25 outline-none border border-warm-earth-extradark/25 shadow-2xs backdrop-blur-sm"
                                )}
                            >
                                <contentItem.icon
                                    className="text-xl md:text-2xl"
                                />
                                <span className="text-sm md:text-base xl:text-lg font-medium">
                                    {contentItem.name}
                                </span>
                            </Link>
                        )
                    })}
                </SidebarGroup>
                <div className="py-3">
                    <Separator className="text-warm-earth-light opacity-20" />
                </div>
                <SidebarGroup className="flex flex-col">
                    {secondContentProvider.map((contentItem, index) => {
                        const isActive = pathname === contentItem.hrefUrl
                        return (
                            <Link
                                href={contentItem.hrefUrl}
                                key={index}
                                className={cn(
                                    "flex flex-row  gap-4 justify-start items-center hover:cursor-pointer hover:bg-warm-earth-extralight/15 p-2 rounded-lg transition-colors ease-in-out duration-200 hover:text-white",
                                    isActive && "bg-linear-to-r from-warm-earth-extradark/70 via-warm-earth-extradark/30% via-warm-earth-extradark/50% to-warm-earth-extradark/25 outline-none border border-warm-earth-extradark/25 shadow-2xs backdrop-blur-sm"
                                )}>
                                <contentItem.icon
                                    className="text-xl md:text-2xl"
                                />
                                <span className="text-sm md:text-base xl:text-lg font-medium">
                                    {contentItem.name}
                                </span>
                            </Link>
                        )
                    })}
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <UserDashboardButton />
            </SidebarFooter>
        </Sidebar>
    )
}