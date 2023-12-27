import React from 'react'
import '../../tailwind.css'

export interface DropdownProps {
    name: string;
}

export const Dropdown: React.FC<DropdownProps> = ({name}) => {
    return (
        <div className='text-red-500 font-bold w-10 h-10 flex justify-center'>
            {name}
        </div>
    )
}

