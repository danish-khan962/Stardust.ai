"use client"

import React from 'react'
import { Button } from './ui/button'
import { Icon, LucideIcon, PlusIcon } from 'lucide-react'

interface TitleHeaderProps{
    title: string,
    enableButton?: boolean,
    buttonTitle?: string,
    icon?: React.ReactNode,
    onClickFunction?: () => void,
}

const TitleHeader = ({
    title, enableButton, buttonTitle, icon, onClickFunction
}: TitleHeaderProps) => {

  return (
    <div className='px-4 flex flex-row justify-between items-center'>
        <h2 className='text-xl md:text-2xl font-semibold font-manrope-font'>{title}</h2>

        {enableButton &&(
            <Button
            onClick={onClickFunction}
            className="text-white"
            >
                {icon}
                {buttonTitle && <span className='text-sm'>{buttonTitle}</span>}
            </Button>
        )}
    </div>
  )
}

export default TitleHeader