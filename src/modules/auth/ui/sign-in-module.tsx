"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import MaxWidthContainer from '@/styles/max-width-container'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'

import { authClient } from '@/lib/auth-client'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertOctagonIcon } from 'lucide-react'

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Name is required" }),
    password: z
        .string()
        .min(1, { message: "Password is required" })
})

type SignInValues = z.infer<typeof formSchema>

const SignInModule = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignInValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    // SignIn: OnSubmit handler
    const onSubmit = async (values: SignInValues) => {
        setError(null)
        setIsPending(true)

        authClient.signIn.email({
            email: values.email,
            password: values.password,

            callbackURL: "/"
        }, {
            onSuccess: () => {
                setIsPending(false)
                toast.success("Logged in successfully")
                router.push("/")
            },
            onError: ({ error }) => {
                toast.error("Failed to login")
                setError(error.message)
            }
        })
    }

    // Socials Authentication
    const onSocialAuth = async (providers: "google" | "github") => {
        setError(null)
        setIsPending(true)

        authClient.signIn.social({
            provider: providers,
            callbackURL: "/"
        }, {
            onSuccess: () => {
                setIsPending(false)
                toast.success("Logging you in")
            },
            onError: ({ error }) => {
                toast.error("Failed to Login")
                setError(error.message)
                setIsPending(false)
            },
        })
    }


    return (
        <MaxWidthContainer className='flex justify-center items-center'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='max-w-2xl w-full flex flex-col gap-3'>
                <div className='flex flex-row justify-between items-center flex-wrap-reverse gap-y-2 gap-x-10'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-robotoMono text-2xl md:text-3xl xl:text-4xl font-bold tracking-tighter'> Welcome Back </h1>
                        <p className='text-xs md:text-sm leading-snug font-medium text-gray-500'>
                            Today is a new day. It&apos;s your day. You shape it.
                            <br />
                            Sign in to start managing your meets.
                        </p>
                    </div>
                    <Image
                        alt='logo'
                        src={"/logo.svg"}
                        height={1000}
                        width={1000}
                        loading='eager'
                        className="h-fit w-fit"
                    />
                </div>

                <div className='mt-5 flex flex-col gap-3 md:gap-5'>
                    {/* Email Field */}
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-medium font-robotoMono'>Email</label>
                        <Input
                            type='email'
                            placeholder='E.g. johndoe@gmail.com'
                            {...register("email")}
                            className={`placeholder:text-xs text-sm md:text-base py-5 transition-colors ${errors.email
                                ? "border-rose-500 focus-visible:ring-rose-500"
                                : "border-neutral-400"
                                }`}
                        />
                        {errors.email?.message && (
                            <span className='text-xs font-medium text-rose-500'>
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    {/* Email field */}
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-medium font-robotoMono'>Password</label>
                        <Input
                            type='password'
                            placeholder='E.g. ********'
                            {...register("password")}
                            className={`placeholder:text-xs text-sm md:text-base py-5 transition-colors ${errors.email
                                ? "border-rose-500 focus-visible:ring-rose-500"
                                : "border-neutral-400"
                                }`}
                        />
                        {errors.password?.message && (
                            <span className='text-xs font-medium text-rose-500'>
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <div className='text-xs text-right hover:underline cursor-pointer text-blue-700 font-medium'>
                        Forgot Password?
                    </div>

                    {
                        !!error && (
                            <Alert className='p-4 bg-radial from-red-700 to-red-600 text-white shadow-xl shadow-rose-100'>
                                <AlertOctagonIcon />
                                <AlertDescription className='text-white font-semibold font-robotoMono'>
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )
                    }

                    <Button
                        type='submit'
                        disabled={isPending}
                        className="my-4 py-5 sm:py-6 md:py-6.5 cursor-pointer text-xs md:text-sm font-semibold bg-linear-to-tr from-warm-earth-dark via-warm-earth-extradark to-warm-earth-superdark hover:opacity-90 transition-all ease-in-out duration-200">
                        {isPending ? "Logging in ..." : "Sign In"}
                    </Button>
                </div>

                <div className='flex flex-row justify-center items-center gap-4'>
                    <hr className='bg-neutral-700 w-full' />
                    <span> or </span>
                    <hr className='bg-neutral-700 w-full' />
                </div>

                {/* Socials Auth */}
                <div className='max-w-2xl w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center'>
                    {/* Google Auth */}
                    <Button
                        type='button'
                        disabled={isPending}
                        variant={'outline'}
                        onClick={() => onSocialAuth("google")}
                        className='px-4 py-5 sm:py-6 md:py-7 rounded-lg bg-neutral-200 flex flex-row justify-center items-center gap-6 cursor-pointer hover:bg-neutral-300 transition-all ease-in-out duration-200'>
                        <Image
                            alt='google auth'
                            src={"/images/icons8-google-48.png"}
                            height={1000}
                            width={1000}
                            className='h-fit w-fit'
                        />
                        <p className='text-xs md:text-sm font-medium'>Login with Google</p>
                    </Button>
                    {/* Github Auth */}
                    <Button
                        type='button'
                        variant={'outline'}
                        disabled={isPending}
                        onClick={() => onSocialAuth("github")}
                        className='px-4 py-5 sm:py-6 md:py-7 rounded-lg bg-neutral-200 flex flex-row justify-center items-center gap-6 cursor-pointer hover:bg-neutral-300 transition-all ease-in-out duration-200'>
                        <Image
                            alt='github auth'
                            src={"/images/icons8-github-48.png"}
                            height={1000}
                            width={1000}
                            className='h-fit w-fit'
                        />
                        <p className='text-xs md:text-sm font-medium'>Login with Github</p>
                    </Button>
                </div>

                <div className='mt-1 flex flex-row gap-2 text-xs md:text-sm justify-center items-center'>
                    <p>Don&apos;t have an account?</p>
                    <Link
                        href={"/sign-up"}
                        className='text-blue-700 underline transition ease-in-out duration-200'
                    >
                        Create an account
                    </Link>
                </div>

                <footer className='mt-5 text-xs md:text-sm text-gray-500 text-center'>
                    2026 &copy; All Rights Reserved. Danish Khan
                </footer>

            </form>
        </MaxWidthContainer >
    )
}

export default SignInModule