"use client"

import { authClient } from "@/lib/auth-client";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useState } from 'react'

const page = () => {

  const { data: session } = authClient.useSession()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = () => {
    authClient.signUp.email({
      name,
      email,
      password,
    }, {
      onError: () => {
        window.alert("Something went wrong")
      },
      onSuccess: () => {
        window.alert("Success! User created")
      }
    })
  }

  if (session) {
    return (
      <div className="flex flex-col p-10 gap-5 text-center">
        <p className="font-semibold text-4xl">Logged in as {session.user.name}</p>
        <Button
          onClick={() => authClient.signOut()}
          className="text-3xl px-5 py-7  cursor-pointer bg-red-800">
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <div className='p-10 flex flex-col justify-center items-center gap-8'>
      <Input
        placeholder='name'
        className='px-5 py-8 font-semibold text-black text-2xl border-blue-400'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder='email'
        className='px-5 py-8 font-semibold text-black text-2xl border-blue-400'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder='password'
        className='px-5 py-8 font-semibold text-black text-2xl border-blue-400'
        value={password}
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        onClick={onSubmit}
        className="text-3xl px-5 py-7  cursor-pointer bg-purple-800">
        Create User
      </Button>
    </div>
  )
}

export default page