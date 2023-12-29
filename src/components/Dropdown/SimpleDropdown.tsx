import React, { useEffect, useState, ReactNode } from 'react'
import '../../tailwind.css'
import { Arrow } from '../../svg';
import { AnimatePresence, motion } from 'framer-motion'
import { AnimationListItem } from './CategorizedDropdown';

export enum DropdownSize {
    'sm' = '25',
    'md' = '50',
    'lg' = '75',
    'full' = '100',
}

export type DropdownAnimationProps = {
    animate: boolean;
    animateChildren?: boolean;
    delayPerChild?: 0.1 | 0.2 | 0.3 | 0.4 | 0.5;
}

export interface SimpleDropdownProps<T> {
    title: string;
    animation?: DropdownAnimationProps;
    selected: T | null;
    maxHeight?: string;
    minWidth?: string;
    maxWidth?: string;
    items: T[];
    onSelect: (item: T) => void;
    size?: DropdownSize;
    openByDefault?: boolean;
    showTitleIfClosed?: boolean;
}

type DropdownProps<T> = SimpleDropdownProps<T>;

export function SimpleDropdown<T extends ReactNode & {}>(props: DropdownProps<T>) {
    const { title, selected, items, onSelect, openByDefault, animation } = props;

    const [isOpen, setIsOpen] = useState(openByDefault || false);

    const maxHeight = props.maxHeight || '250px';

    const handleOpen = () => setIsOpen(!isOpen);

    useEffect(() => {
    }, [])
    return (
        <DropdownWrapper maxWidth={props.maxWidth} minWidth={props.minWidth} title={title} selected={selected} size={props.size} onOpen={handleOpen} isOpen={isOpen} showTitleIfClosed={props.showTitleIfClosed}>
            <AnimatePresence>
                {isOpen &&
                    <DropdownItems maxHeight={maxHeight} items={items} selected={selected} onSelect={onSelect} animation={animation} />
                }
            </AnimatePresence>
        </DropdownWrapper>
    )
}

function DropdownItems<T>(props: Pick<DropdownProps<T>, 'items' | 'selected' | 'onSelect' | 'animation' | 'maxHeight'>) {
    const { items, selected, onSelect, animation } = props;
    const animate = animation?.animate || false;
    const animateChildren = (animate && animation?.animateChildren) || false;
    const offset = (animation?.delayPerChild || 0.2)
    const ref = React.useRef<HTMLUListElement>(null);
    useEffect(() => {
        if (ref.current == null || !ref) return;
        ref.current.style.maxHeight = `calc(0px + ${props.maxHeight})`;
        setTimeout(() => {
            //* fix showing scrollbar for a small time period when not needed
            if (ref.current == null || !ref) return;
            ref.current.style.overflowY = 'auto';
        }, 201)
    }, [props.maxHeight, ref])
    return (
        <motion.ul
            ref={ref}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0, transition: { duration: offset } }}
            transition={{ duration: animate ? offset : 0, ease: 'easeInOut' }}
            className='*:border-b-[1px] *:border-b-gray-200 *:cursor-pointer scrollbar'>
            {
                items.map((item, index) => {
                    const delay = animateChildren ? (offset * Math.min(index, 10)) : offset;
                    return (
                        <AnimationListItem
                            key={index}
                            animate={animate}
                            delay={delay}
                            index={index}
                            onClick={() => onSelect(item)}
                            className={`hover:bg-gray-100 ${(selected == item) ? 'bg-gray-200' : ''}`}
                        >
                            <p className='px-2 py-1 first-letter:uppercase select-none'>{item as ReactNode}</p>
                        </AnimationListItem>
                    )
                })
            }
        </motion.ul>
    )
}


export function DropdownWrapper<T>(
    props:
        Pick<DropdownProps<T>, 'title' | 'size' | 'selected' | 'showTitleIfClosed' | 'maxWidth' | 'minWidth'> &
        { children: ReactNode; onOpen: () => void; isOpen: boolean }) {

    const { title: vTitle, children, isOpen, selected } = props;

    const ref = React.useRef<HTMLDivElement>(null);
    const showTitleIfClosed = props.showTitleIfClosed == null ? false : props.showTitleIfClosed;
    const title = (isOpen == true ? selected : (showTitleIfClosed == true ? vTitle : selected)) || vTitle;

    useEffect(() => {
        const size = parseInt(props.size || DropdownSize.sm);
        if (ref.current == null || !ref) return;

        ref.current.style.minWidth = props.minWidth || '125px';
        ref.current.style.maxWidth = props.maxWidth || '100%';
        ref.current.style.width = `${size}%`;

    }, [props.size, ref])

    return (
        <div ref={ref} className={`outline shadow-outline transition-all outline-black w-[25%] outline-1 rounded min-w-[125px] min-h-md`}>
            <div onClick={props.onOpen} className='h-[10%] px-2 text-lg flex justify-between py-2 border-b-[1px] border-b-gray-600 cursor-pointer'>
                <p className='font-medium select-none first-letter:uppercase'>{title as ReactNode}</p>
                <Arrow isOpen={isOpen} />
            </div>
            {children}
        </div>
    )
}

