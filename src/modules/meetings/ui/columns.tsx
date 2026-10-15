"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "@/components/data-table-features"
import { MeetingsGetMany } from "../types"
import GeneratedAvatar from "@/components/generated-avatar"
import {
  CircleXIcon,
  CircleCheckIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  CornerDownRightIcon,
  Loader2Icon,
  Loader
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "cn"

import { format } from "date-fns"
import "humanize-duration"
import { LoaderIcon } from "react-hot-toast"

const humanizeDuration = require("humanize-duration")
const formatDuration = (seconds: number) => {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"]
  })
}

const iconsStatus = {
  upcoming: ClockArrowUpIcon,
  active: Loader,
  completed: CircleCheckIcon,
  processing: LoaderIcon,
  cancelled: CircleXIcon,
}

const iconsStatusColors = {
  upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
  active: "bg-blue-500/20 text-blue-800 border-blue-800/5",
  completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
  cancelled: "bg-rose-500/20 text-rose-800 border-rose-800/5",
  processing: "bg-gray-300/20 text-gray-800 border-gray-800/5",
}

const columnHelper = createColumnHelper<DataTableFeatures, MeetingsGetMany[number]>()

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <span className="font-semibold capitalize">{row.original.name}</span>

        <div className="flex gap-x-2 items-center">
          <div className="flex items-center gap-1">
            <CornerDownRightIcon
              size={15}
              className="text-muted-foreground" />
            <span className="max-w-30 w-full truncate text-muted-foreground capitalize text-xs md:text-sm">
              {row.original.agent.name}
            </span>
          </div>

          <GeneratedAvatar
            seed={row.original.agent.name}
            variant="botttsNeutral"
            className="size-5"
          />
          <span className="text-sm text-muted-foreground">
            {row.original.startedAt ? format(row.original.startedAt, "MMM d") : ""}
          </span>
        </div>
      </div>
    )
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const Icon = iconsStatus[row.original.status as keyof typeof iconsStatus]
      return (
        <Badge
          variant={"outline"}
          className={cn(
            "flex items-center gap-2 capitalize [&>svg]:size-5 h-7 p-2 md:h-8 md:p-4 text-muted-foreground",
            iconsStatusColors[row.original.status as keyof typeof iconsStatusColors]
          )}
        >
          <Icon
           className={cn(
            row.original.status === "processing" && "animate-spin"
           )}
          />
          {row.original.status}
        </Badge>
      )
    }
  }),

  columnHelper.accessor("duration", {
    header: "Duration",
    cell: ({row}) => (
      <Badge
        variant={"outline"}
        className="flex items-center gap-2 capitalize [&>svg]:size-5 h-7 p-2 md:h-8 md:p-4"
      >
        <ClockFadingIcon className="text-blue-700" />
        {row.original.duration ? formatDuration(row.original.duration) : "No duration"}
      </Badge>
    )
  })
])