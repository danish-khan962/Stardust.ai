import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CommandSelect from "@/components/command-select";
import { useTRPC } from "@/trpc/client";
import GeneratedAvatar from "@/components/generated-avatar";
import { useMeetingsFilters } from "../hooks/use-meetings-filters";
import { MAX_PAGE_SIZE } from "@/constants";

export const AgentIdFilters = () => {
    const [filters, setFilters] = useMeetingsFilters();
    const trpc = useTRPC();

    const [agentSearch, setAgentSearch] = useState("");
    const {data} = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: MAX_PAGE_SIZE,
            search: agentSearch,
        })
    )

    return(
        <CommandSelect
            className="h-10"
            placeholder="Agent"
            options={(data?.item ?? []).map((agent) => ({
                id: agent.id,
                value: agent.id,
                children: (
                    <div className="flex items-center gap-2">
                        <GeneratedAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="size-5"
                        />
                        {agent.name}
                    </div>
                )
            }))}
            onSelect={(value) => setFilters({agentId: value})}
            onSearch={setAgentSearch}
            value={filters.agentId ?? ""}
        />
    )
}