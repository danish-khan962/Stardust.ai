import HomeModule from '@/modules/home/ui/home-module'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if(!session){
    redirect("/sign-in")
  }

  return <HomeModule />
}

export default page