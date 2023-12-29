import { SimpleDropdownProps, DropdownWrapper } from "./SimpleDropdown";
import React, { useState, useEffect, ReactNode, Fragment, lazy } from 'react'
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
    return (
        <DropdownWrapper
            title={title} selected={selected.item} size={props.size}
            onOpen={handleOpen} isOpen={isOpen} showTitleIfClosed={props.showTitleIfClosed} >
            <AnimatePresence>
                {
                    isOpen &&
                    <DropdownItems animation={animation} categories={categories} onSelect={props.onSelect} selected={props.selected} />
                }
            </AnimatePresence>
        </DropdownWrapper>
    )
}

function DropdownItems<T>(props: Pick<DropdownProps<T>, 'categories' | 'animation'>
    & ExtraProps<T>) {
    const { categories, animation } = props;
    const animate = animation?.animate || false;
    const animateChildren = (animate && animation?.animateChildren) || false;
    const offset = (animation?.delayPerChild || 0.2)
    return (
        <motion.ul
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0, transition: { duration: offset } }}
            transition={{ duration: animate ? offset : 0, ease: 'easeInOut' }}
            className=''>
            {
                categories.map((category, vIndex) => {
                    const delay = animateChildren ? ((categories[vIndex - 1]?.items.length || 0) * offset + 0.2) : offset
                    return (
                        <Fragment key={vIndex}>
                            <motion.li
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0 } }}
                                transition={{ duration: animate ? offset : 0, delay: animate ? (delay) : 0 }}
                                className='border-b-[1px] select-none flex items-center text-gray-600 text-lg border-b-gray-200'
                                key={vIndex}>
                                <p className='px-2 py-1 first-letter:uppercase select-none'>
                                    {category.title as ReactNode}
                                </p>
                            </motion.li>
                            {
                                category.items.map((item, index) => {
                                    const addedDelay = animateChildren ? (delay + offset * index) : offset;
                                    return (
                                        <motion.li
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, transition: { duration: 0 } }}
                                            transition={{ duration: animate ? offset : 0, delay: animate ? (addedDelay) : 0 }}
                                            onClick={() =>
                                                item.disabled != true &&
                                                props.onSelect({ item: item.item, category: { title: category.title } })}
                                            className={`select-none border-b-[1px] flex items-center border-b-gray-200 ${props.selected.category.title == category.title && props.selected.item == item.item && 'bg-gray-200'}
                                            ${item.disabled == true ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'} `}
                                            key={index}>

                                            <div className={`w-[6px] ml-3 h-[6px] rounded-full bg-slate-500`}></div>
                                            <p className='px-2 py-1 first-letter:uppercase select-none'>
                                                {item.item as ReactNode}
                                            </p>
                                        </motion.li>
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