import SignUpModule from '@/modules/auth/ui/sign-up-module'
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

  return <SignUpModule />
}

export default page