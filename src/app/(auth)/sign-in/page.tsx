import SignInModule from '@/modules/auth/ui/sign-in-module'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!!session){
    redirect("/")
  }

  return <SignInModule />
}

export default page