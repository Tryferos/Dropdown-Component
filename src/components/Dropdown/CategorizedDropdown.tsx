import { SimpleDropdownProps, DropdownWrapper } from "./SimpleDropdown";
import React, { useState, useEffect, ReactNode, Fragment, lazy, FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Item<T> = {
    item: T;
    disabled?: boolean;
};

type Category<T> = {
    title: string;
    items: Array<Item<T>>;
};
type SelectProps<T> = { item: T, category: Pick<Category<T>, 'title'> }
type onSelectProps<T> = (item: SelectProps<T>) => void

type ExtraProps<T> = {
    onSelect: onSelectProps<T>;
    selected: SelectProps<T>
}

export type CategorizedDropdownProps<T> = {
    categories: Array<Category<T>>;
} & Omit<SimpleDropdownProps<T>, 'items' | 'onSelect' | 'selected'> & ExtraProps<T>;

type DropdownProps<T> = CategorizedDropdownProps<T>;

export function CategorizedDropdown<T extends ReactNode & {}>(props: DropdownProps<T>) {
    const { title, selected, onSelect, openByDefault, animation } = props;
    const { categories } = props;
    const [isOpen, setIsOpen] = useState(openByDefault || false);
    const handleOpen = () => setIsOpen(!isOpen);
    const maxHeight = props.maxHeight || '250px';
    return (
        <DropdownWrapper maxWidth={props.maxWidth} minWidth={props.minWidth}
            title={title} selected={selected.item} size={props.size}
            onOpen={handleOpen} isOpen={isOpen} showTitleIfClosed={props.showTitleIfClosed} >
            <AnimatePresence>
                {
                    isOpen &&
                    <DropdownItems maxHeight={maxHeight} animation={animation} categories={categories} onSelect={props.onSelect} selected={props.selected} />
                }
            </AnimatePresence>
        </DropdownWrapper>
    )
}


function DropdownItems<T>(props: Pick<DropdownProps<T>, 'categories' | 'animation' | 'maxHeight'>
    & ExtraProps<T>) {
    const { categories, animation } = props;
    const animate = animation?.animate ?? true;
    const animateChildren = (animate && animation?.animateChildren) ?? true;
    const ANIMATION_STOP = animation?.animateChildrenUntilIndex ?? 10;
    const offset = (animation?.delayPerChild || 0.2)
    const ref = React.useRef<HTMLUListElement>(null);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const [canRenderMore, setCanRenderMore] = useState(false);
    useEffect(() => {
        if (ref.current == null || !ref) return;
        ref.current.style.maxHeight = `calc(0px + ${props.maxHeight})`;
        timeoutRef.current && clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            //* fix showing scrollbar for a small time period when not needed
            if (ref.current == null || !ref) return;
            ref.current.style.overflowY = 'auto';
            setCanRenderMore(true);
        }, 201)
    }, [props.maxHeight, ref, timeoutRef])
    return (
        <motion.ul
            ref={ref}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0, transition: { duration: animate ? offset : 0 } }}
            transition={{ duration: animate ? offset : 0, ease: 'easeInOut' }}
            className='*:select-none *:border-b-[1px] *:flex *:items-center *:border-b-gray-200 scrollbar'>
            {
                categories.map((category, vIndex) => {
                    const currentTotalItems = categories.slice(0, vIndex + 1).reduce((prev, cur, i) => prev + cur.items.length + 1, 0);
                    const delay = animateChildren ? ((Math.min(categories[vIndex - 1]?.items.length || 0, 4)) * offset + 0.2) : offset
                    return (
                        <Fragment key={vIndex}>
                            <AnimationListItem
                                animate={animate}
                                delay={delay}
                                index={vIndex}
                                onClick={() => { }}
                                className=' text-gray-600 text-lg '>
                                <p className='px-2 py-1 first-letter:uppercase select-none'>
                                    {category.title as ReactNode}
                                </p>
                            </AnimationListItem>
                            {
                                category.items.map((item, index) => {
                                    const addedDelay = animateChildren ? (delay + offset * Math.min(index + vIndex, ANIMATION_STOP)) : offset;
                                    return ((!canRenderMore && ((currentTotalItems - category.items.length) + index) > ANIMATION_STOP) ? null :
                                        <AnimationListItem
                                            key={vIndex + "-" + index}
                                            animate={animate}
                                            delay={addedDelay}
                                            index={index}
                                            onClick={() =>
                                                item.disabled != true &&
                                                props.onSelect({ item: item.item, category: { title: category.title } })}
                                            className={` ${props.selected.category.title == category.title && props.selected.item == item.item && 'bg-gray-200'}
                                            ${item.disabled == true ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'} `}
                                        >
                                            <div className={`w-[6px] ml-3 h-[6px] rounded-full bg-slate-500`}></div>
                                            <p className='px-2 py-1 first-letter:uppercase select-none'>
                                                {item.item as ReactNode}
                                            </p>
                                        </AnimationListItem>
                                    )
                                })
                            }
                        </Fragment>
                    )
                })
            }
        </motion.ul>
    )
}

export const AnimationListItem: FC<
    {
        index: number;
        delay: number;
        animate: boolean
        className: string;
        onClick: () => void;
        children: ReactNode;
    }
>
    = (props) => {

        const { index, delay, animate, className, onClick, children } = props;

        return (
            <motion.li
                onClick={onClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                transition={{ duration: animate ? 0.2 : 0, delay: animate ? (delay) : 0.22 }}
                className={className}
            >
                {children}
            </motion.li>
        )
    }