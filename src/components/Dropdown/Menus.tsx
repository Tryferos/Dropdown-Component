import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

type MenuProps = {
    isOpen: boolean;
    handleOpen: () => void;
}

export function Menu(props: MenuProps) {
    const { handleOpen, isOpen } = props;
    const [rotation, handleClick] = useRotation(90);
    return (
        <motion.svg
            initial={{ rotate: 0 }}
            animate={{ rotate: rotation }}
            onClick={() => handleClick(handleOpen)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
            stroke="currentColor" className={`w-6 h-6 scale-90 cursor-pointer text-slate-700 dark:bg-slate-200`}>
            <path strokeLinecap="round" strokeWidth={2.5} strokeLinejoin="round" d="M3 6h19M3 12h19M3 18h19" />
        </motion.svg>
    )
}

export const useRotation = (rotation: number):
    [number, (cb: () => void) => void] => {
    const [r, setRotation] = useState(0);
    const handleClick = (cb: () => void) => {
        setRotation(r + rotation);
        cb();
    }
    return [r, handleClick];
}

export function AppsMenu(props: MenuProps) {
    const { handleOpen, isOpen } = props;
    const [rotation, handleClick] = useRotation(45);
    return (
        <motion.ul onClick={() => handleClick(handleOpen)}
            initial={{ rotate: 0 }}
            animate={{ rotate: rotation }}
            className='grid grid-cols-3 grid-rows-3 w-6 h-6 cursor-pointer'>
            {
                new Array(9).fill(0).map((_, i) => (
                    <li key={i} className='flex flex-row justify-center items-center'>
                        <div className='w-[6px] h-[6px] bg-slate-700 dark:bg-slate-200 rounded-full' />
                    </li>
                ))
            }
        </motion.ul>
    )
}