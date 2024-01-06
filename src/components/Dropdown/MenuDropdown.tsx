import React, { useEffect, useState, FC, Fragment } from 'react'

import '../../tailwind.css'
import { AppsMenu, Menu } from './Menus'
import { DropdownProps } from '.';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimationListItem } from './CategorizedDropdown';

type MenuDropdownProps<T> = {
    items: Array<T>;
    onSelect: (item: T) => void;
    maxHeight?: string;
} & Pick<DropdownProps, 'animation' | 'darkMode'>

export function MenuDropdown<T>(props: MenuDropdownProps<T>) {
    const [isOpen, setIsOpen] = useState(true);
    const handleOpen = () => setIsOpen(!isOpen);
    const [canRenderMore, setCanRenderMore] = useState(false);
    const ref = React.useRef<HTMLUListElement>(null);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const animate = props.animation?.animate ?? true;
    const duration = props.animation?.delayPerChild ?? animate ? 0.2 : 0;
    const animateChildren = props.animation?.animateChildren ?? 0.2;
    useEffect(() => {
        if (ref.current == null || !ref) return;
        ref.current.parentElement!.style.maxHeight = `calc(0px + ${props.maxHeight})`;
        timeoutRef.current && clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            //* fix showing scrollbar for a small time period when not needed
            if (ref.current == null || !ref) return;
            ref.current.style.overflowY = 'auto';
            setCanRenderMore(true);
        }, 201)
    }, [props.maxHeight, ref, timeoutRef])
    return (
        <div className='relative'>
            <AppsMenu isOpen={isOpen} handleOpen={handleOpen} />
            <AnimatePresence>
                {
                    isOpen &&
                    <div className='bg-slate-700 mt-2 w-[15%] min-h-[200px] h-[300px] text-white rounded-md '>
                        {/* <div className='h-[18px] flex items-center justify-center'>
                            <div className='w-[50%] bg-slate-400 h-[2px]'></div>
                        </div> */}
                        <motion.ul ref={ref}
                            exit={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration }}
                            initial={{ opacity: 0, height: 0 }}
                            className='*:px-4 py-2 *:py-2 scrollbar-black scrollbar'
                        >
                            {
                                props.items.map((item, i) => {
                                    return (
                                        <Fragment>
                                            {
                                                canRenderMore &&
                                                <AnimationListItem
                                                    index={i}
                                                    key={i}
                                                    animate={animate}
                                                    delay={duration * i}
                                                    selected={false}
                                                    disabled={false}
                                                    onClick={() => props.onSelect(item)}
                                                    className='hover:bg-slate-600 cursor-pointer rounded-md flex items-center justify-center'
                                                >
                                                    <p>{item as string}</p>
                                                </AnimationListItem>
                                            }
                                        </Fragment>
                                    )
                                })
                            }
                        </motion.ul>
                    </div>
                }
            </AnimatePresence>
        </div>
    )
}