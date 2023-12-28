import { SimpleDropdownProps, DropdownWrapper } from "./SimpleDropdown";
import React, { useState, useEffect, ReactNode, Fragment } from 'react'

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

export type CategorizedDropdownProps<T> = {
    categories: Array<Category<T>>;
} & Omit<SimpleDropdownProps<T>, 'items' | 'onSelect' | 'selected'> & { onSelect: onSelectProps<T> } & { selected: SelectProps<T> };

type DropdownProps<T> = CategorizedDropdownProps<T>;

export function CategorizedDropdown<T extends ReactNode & {}>(props: DropdownProps<T>) {
    const { title, selected, onSelect, openByDefault } = props;
    const { categories } = props;
    const [isOpen, setIsOpen] = useState(openByDefault || false);
    const handleOpen = () => setIsOpen(!isOpen);
    return (
        <DropdownWrapper
            title={title} selected={selected.item} size={props.size}
            onOpen={handleOpen} isOpen={isOpen} showTitleIfClosed={props.showTitleIfClosed} >
            <DropdownItems categories={categories} isOpen={isOpen} onSelect={props.onSelect} selected={props.selected} />
        </DropdownWrapper>
    )
}

function DropdownItems<T>(props: Pick<DropdownProps<T>, 'categories'>
    & { isOpen: boolean } & { onSelect: onSelectProps<T> } & { selected: SelectProps<T> }) {
    const { categories } = props;
    return (
        <ul className='min-h-[0px]'>
            {props.isOpen &&
                categories.map((category, index) => {
                    return (
                        <Fragment key={index}>
                            <li
                                className='border-b-[1px] select-none flex items-center text-gray-600 text-lg border-b-gray-200'
                                key={index}>
                                <p className='px-2 py-1 first-letter:uppercase select-none'>
                                    {category.title as ReactNode}
                                </p>
                            </li>
                            {
                                category.items.map((item, index) => {
                                    return (
                                        <li onClick={() =>
                                            item.disabled != true &&
                                            props.onSelect({ item: item.item, category: { title: category.title } })}
                                            className={`select-none border-b-[1px] flex items-center border-b-gray-200 ${props.selected.category.title == category.title && props.selected.item == item.item && 'bg-gray-200'}
                                            ${item.disabled == true ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'} `}
                                            key={index}>

                                            <div className={`w-[6px] ml-3 h-[6px] rounded-full bg-slate-500`}></div>
                                            <p className='px-2 py-1 first-letter:uppercase select-none'>
                                                {item.item as ReactNode}
                                            </p>
                                        </li>
                                    )
                                })
                            }
                        </Fragment>
                    )
                })
            }
        </ul>
    )
}