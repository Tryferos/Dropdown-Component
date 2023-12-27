import React from 'react'
import '../../tailwind.css'

export interface SearchProps {
    title: string;
}

export const Search: React.FC<SearchProps> = ({title: name}) => {
    return (
        <div className='text-red-500 font-bold w-10 h-10 flex justify-center'>
            {name}
        </div>
    )
}

