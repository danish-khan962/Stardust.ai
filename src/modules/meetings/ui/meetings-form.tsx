"use client"

import React, { useState } from 'react'
import { MeetingGetOne } from '../types'
import { useTRPC } from '@/trpc/client'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { z } from "zod"
import { meetingsInsertionSchema } from '../schemas'
import { zodResolver } from '@hookform/resolvers/zod'

import GeneratedAvatar from '@/components/generated-avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import CommandSelect from '@/components/command-select'
import { MAX_PAGE_SIZE } from '@/constants'
import NewAgentsDialog from '@/modules/agents/ui/new-agents-dialog'

interface MeetingsFormProp {
    onSuccess?: (id?: string) => void,
    onCancel?: () => void,
    initialValues?: MeetingGetOne
}

const MeetingsForm = ({
    onSuccess,
    onCancel,
    initialValues
}: MeetingsFormProp) => {

    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
    const [agentSearch, setAgentSearch] = useState("");

    const agent = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: MAX_PAGE_SIZE,
            search: agentSearch,
        })
    )

    const createMeeting = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({})
                );

                // if(initialValues?.id){
                //     await queryClient.invalidateQueries(
                //         trpc.agents.getOne.queryOptions({ id: initialValues.id })
                //     )
                // }
                onSuccess?.();
                toast.success(`New meeting created.`)
            },
            onError: (error) => {
                toast.error(error.message)
            },
        })
    )

    const updateMeeting = useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({})
                );

                if (initialValues?.id) {
                    await queryClient.invalidateQueries(
                        trpc.meetings.getOne.queryOptions({ id: initialValues.id })
                    )
                }
                onSuccess?.();
                toast.success(`Meeting's details updated.`)
            },
            onError: (error) => {
                toast.error(error.message)
            },
        })
    )

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm<z.infer<typeof meetingsInsertionSchema>>({
        resolver: zodResolver(meetingsInsertionSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            agentsId: initialValues?.agentsId ?? "",
        }
    });

    const isEdit = !!initialValues?.id;
    const isPending = createMeeting.isPending || updateMeeting.isPending;

    const onSubmit = (values: z.infer<typeof meetingsInsertionSchema>) => {
        if (isEdit) {
            updateMeeting.mutate({ ...values, id: initialValues.id })
        } else {
            createMeeting.mutate(values)
        }
    }

    return (
        <>
        <NewAgentsDialog
            open={openNewAgentDialog}
            onOpenChange={setOpenNewAgentDialog}
        />
            <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className='relative flex-1 gap-4'>
                {/* Agent Name */}
                <div className='flex flex-col gap-3'>
                    <label className='text-xs font-medium font-robotoMono'>Name</label>
                    <Input
                        type='text'
                        placeholder='E.g. Stardust Enterprises Call'
                        {...register("name")}
                        className={`placeholder:text-xs text-sm md:text-base py-5 transition-colors ${errors.name
                            ? "border-rose-500 focus-visible:ring-rose-500"
                            : "border-neutral-400"
                            }`}
                    />
                    {errors.name?.message && (
                        <span className="text-[11px] font-medium text-rose-500">
                            {errors.name.message}
                        </span>
                    )}
                </div>

                {/* Agent Command Select */}
                <div className='flex flex-col gap-1 mt-3'>
                    <label className='text-xs font-medium font-robotoMono'>Agent</label>
                    <Controller
                        name="agentsId"
                        control={control}
                        render={({ field }) => (
                            <CommandSelect
                                options={(agent.data?.item ?? []).map((agent) => ({
                                    id: agent.id,
                                    value: agent.id,
                                    children: (
                                        <div className='flex items-center gap-2'>
                                            <GeneratedAvatar
                                                seed={agent.name}
                                                variant={"botttsNeutral"}
                                                className='border size-6'
                                            />
                                            <span>{agent.name}</span>
                                        </div>
                                    )
                                }))}
                                onSelect={(value) => field.onChange(value)}
                                onSearch={setAgentSearch}
                                placeholder='Select an Agent'
                                value={field.value}
                                isLoading={agent.isFetching}
                            />
                        )}
                    />
                    <div className='flex flex-row gap-1 md:gap-2 py-4 text-muted-foreground'>
                        Not found what you&apos;re looking for? {" "}
                        <button
                            type='button'
                            className='font-semibold hover:underline cursor-pointer text-warm-earth-extradark'
                            onClick={() => setOpenNewAgentDialog(true)}
                        >
                            Create new agent
                        </button>
                    </div>
                    {errors.agentsId?.message && (
                        <span className="text-[11px] font-medium text-rose-500">
                            {errors.agentsId.message}
                        </span>
                    )}
                </div>

                <div className='flex flex-col justify-center items-center gap-0'>
                    <Button
                        disabled={isPending}
                        type='submit'
                        className="w-full text-white"
                    >
                        {isEdit ? "Update" : "Create"}
                    </Button>
                    {onCancel && (
                        <Button
                            type='button'
                            disabled={isPending}
                            onClick={() => onCancel()}
                            className="w-full from-neutral-100 via-neutral-100 to-neutral-100 hover:from-neutral-200 hover:via-neutral-200 hover:to-neutral-200 -mt-2"
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </>
    )
}

export default MeetingsForm