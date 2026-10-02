import React from 'react'

interface Props{
    children: React.ReactNode,
}

const Layout = ( {children} : Props ) => {
  return (
    <div className='bg-muted w-full min-h-screen flex justify-center items-center'>
        {children}
    </div>
  )
}

export default Layout