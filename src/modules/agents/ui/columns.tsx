"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "../../../components/data-table-features"
import { AgentsGetMany } from "../types"
import GeneratedAvatar from "@/components/generated-avatar"
import { CornerDownRightIcon, VideoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const columnHelper = createColumnHelper<DataTableFeatures, AgentsGetMany[number]>()

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Agent Name",
    cell: ({row}) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex flex-row gap-x-2 items-center">
          <GeneratedAvatar
          seed={row.original.name}
          variant="botttsNeutral"
          className="size-6 md:size-8"
          />
          <span className="font-semibold capitalize">
            {row.original.name}
          </span>
        </div>

          <div className="flex gap-x-2 items-center">
              <CornerDownRightIcon 
              size={15}
              className="text-muted-foreground" />
              <span className="max-w-30 w-full truncate text-muted-foreground capitalize text-xs md:text-sm">
                {row.original.instructions}
              </span>
          </div>
      </div>
    )
  }),
 
  columnHelper.accessor("meetingCount", {
    header: "Meetings",
    cell: ({row}) => (
      <Badge
      variant={"outline"}
      className="flex items-center gap-2 h-7 p-2 md:h-8 md:p-4"
      >
        <VideoIcon className="text-warm-earth-superdark" />
        {row.original.meetingCount} {row.original.meetingCount === 1 ? "meeting" : "meetings"}
      </Badge>
    )
  })
])