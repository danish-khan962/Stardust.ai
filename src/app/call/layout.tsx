import React from 'react'

interface Props{
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className='min-h-screen w-full bg-[#0A0A0A] text-neutral-200 flex'>
        {children}
    </div>
  )
}

export default Layout