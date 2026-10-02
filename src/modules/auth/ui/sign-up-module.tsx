"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import MaxWidthContainer from '@/styles/max-width-container'
import Image from 'next/image'
import Link from 'next/link'

import { email, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'

import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertOctagonIcon } from 'lucide-react'


// Zod form schema
const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name should atleast 3 characters long" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please provide a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must contain atleast 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Confirm your password" })
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"]
  })

type SignUpValues = z.infer<typeof formSchema>

const SignUpModule = () => {

  const router = useRouter();
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  })

  // SignUp: OnSubmit handler
  const onSubmit = async (values: SignUpValues) => {
    setError(null)
    setIsPending(true)

    authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      // confirmPassword: values.confirmPassword,
    }, {
      onSuccess: () => {
        setIsPending(false)
        toast.success("Account Created")
        router.push('/')
      },
      onError: ({ error }) => {
        toast.error("Failed to create account")
        setError(error.message)
        setIsPending(false)
      },
    })
  }

  return (
    <MaxWidthContainer className='flex justify-center items-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate // Disabling browser validation
        className='max-w-2xl w-full flex flex-col gap-3'
      >
        <h1 className='font-robotoMono text-2xl md:text-3xl xl:text-4xl font-bold tracking-tighter'> Register Now </h1>
        <p className='text-xs md:text-sm leading-snug font-medium text-gray-500'>
          Today is a new day. It&apos;s your day. You shape it.
          <br />
          Create your account to start managing your meets.
        </p>

        <div className='mt-5 flex flex-col gap-3 md:gap-5'>
          {/* Name field */}
          <div className='flex flex-col gap-1'>
            <label className='text-xs font-medium font-robotoMono'>Name</label>
            <Input
              placeholder='E.g. John Doe'
              {...register("name")}
              className={`placeholder:text-xs text-sm md:text-base py-5 transition-colors ${errors.name
                ? "border-rose-500 focus-visible:ring-rose-500"
                : "border-neutral-400"
                }`}
            />
            {errors.name?.message && (
              <span className='text-xs font-medium text-rose-500'>
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email field */}
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
              <span className="text-[11px] font-medium text-rose-500">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password field */}
          <div className='flex flex-col gap-1'>
            <label className='text-xs font-medium font-robotoMono'>Password</label>
            <Input
              type='password'
              placeholder='E.g. ********'
              {...register("password")}
              className={`placeholder:text-xs text-sm md:text-base py-5 transition-colors ${errors.password
                ? "border-rose-500 focus-visible:ring-rose-500"
                : "border-neutral-400"
                }`}
            />
            {errors.password?.message && (
              <span className="text-[11px] font-medium text-rose-500">
                {errors.password.message}
              </span>
            )}
          </div>

          {/*Confirm Password field */}
          <div className='flex flex-col gap-1'>
            <label className='text-xs font-medium font-robotoMono'>Confirm Password</label>
            <Input
              type='password'
              placeholder='E.g. ********'
              {...register("confirmPassword")}
              className={`placeholder:text-xs text-sm md:text-base py-5 transition-colors ${errors.password
                ? "border-rose-500 focus-visible:ring-rose-500"
                : "border-neutral-400"
                }`}
            />
            {errors.confirmPassword?.message && (
              <span className="text-[11px] font-medium text-rose-500">
                {errors.confirmPassword.message}
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
            className="my-4 py-5 sm:py-6 md:py-6.5 cursor-pointer text-xs md:text-sm">
            {isPending ? "Creating account..." : "Sign Up"}
          </Button>
        </div>

        <div className='flex flex-row justify-center items-center gap-4'>
          <hr className='bg-neutral-700 w-full' />
          <span> or </span>
          <hr className='bg-neutral-700 w-full' />
        </div>

        {/* Socials Auth */}
        <div className='mt-4 flex flex-col md:flex-row gap-4 justify-center items-center'>
          {/* Google Auth */}
          <Button
            type='button'
            disabled={isPending}
            variant={'outline'}
            className='w-full px-4 py-5 sm:py-6 md:py-7 rounded-lg bg-neutral-200 flex flex-row justify-center items-center gap-6 cursor-pointer hover:bg-neutral-300 transition-all ease-in-out duration-200'>
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
            className='w-full px-4 py-5 sm:py-6 md:py-7 rounded-lg bg-neutral-200 flex flex-row justify-center items-center gap-6 cursor-pointer hover:bg-neutral-300 transition-all ease-in-out duration-200'>
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
          <p>Already have an account?</p>
          <Link
            href={"/sign-in"}
            className='text-blue-700 underline transition ease-in-out duration-200'
          >
            Sign in
          </Link>
        </div>

        <footer className='mt-5 text-xs md:text-sm text-gray-500 text-center'>
          2026 &copy; All Rights Reserved. Danish Khan
        </footer>

      </form>
    </MaxWidthContainer>
  )
}

export default SignUpModule