"use client"

import React from 'react'
import { AgentsGetOne } from '../types'
import { useTRPC } from '@/trpc/client'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { agentsInsertionSchema } from '../schemas'
import { zodResolver } from '@hookform/resolvers/zod'

import GeneratedAvatar from '@/components/generated-avatar'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

interface AgentsFormProp {
    onSuccess?: () => void,
    onCancel?: () => void,
    initialValues?: AgentsGetOne
}

const AgentsForm = ({
    onSuccess,
    onCancel,
    initialValues
}: AgentsFormProp) => {

    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => { 
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions()
                );
                
                if(initialValues?.id){
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({ id: initialValues.id })
                    )
                }
                onSuccess?.();
                toast.success(`New agent created.`)
            },
            onError: (error) => {
                toast.error(error.message)
             },
        })
    )

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<z.infer<typeof agentsInsertionSchema>>({
        resolver: zodResolver(agentsInsertionSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? "",
        }
    });

    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending;

    const onSubmit = (values: z.infer<typeof agentsInsertionSchema>) => {
        if (isEdit) {
            console.log("UpdateAgent")
        } else {
            createAgent.mutate(values)
        }
    }

    return (
        <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className='relative flex flex-col gap-4'>
            <GeneratedAvatar
                seed={watch("name")}
                variant='botttsNeutral'
                className='border size-18'
            />

            {/* Agent Name */}
            <div className='flex flex-col gap-1'>
                <label className='text-xs font-medium font-robotoMono'>Name</label>
                <Input
                    type='text'
                    placeholder='E.g. Otaku Buddy'
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

            {/* Agent Instructions */}
            <div className='flex flex-col gap-1'>
                <label className='text-xs font-medium font-robotoMono'>Instructions</label>
                <Textarea
                    placeholder='Your anime-loving bestie! Fun, playful, and always ready to talk anime, manga, and waifus. Nani?!'
                    {...register("instructions")}
                    className={`placeholder:text-xs text-sm md:text-base py-5 transition-colors ${errors.instructions
                        ? "border-rose-500 focus-visible:ring-rose-500"
                        : "border-neutral-400"
                        }`}
                />
                {errors.instructions?.message && (
                    <span className="text-[11px] font-medium text-rose-500">
                        {errors.instructions.message}
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
    )
}

export default AgentsForm