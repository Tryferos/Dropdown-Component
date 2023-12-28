import React from 'react'
import './tailwind.css'

export function Arrow({ isOpen }: { isOpen: boolean }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
            stroke="currentColor" className={`w-6 h-6 scale-90 ${isOpen ? 'rotate-90' : 'rotate-0'} transition-transform`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
    )
}