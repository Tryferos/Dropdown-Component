import React, { useEffect, useState, ReactNode } from 'react'
import '../../tailwind.css'
import { Arrow } from '../../svg';

export enum DropdownSize {
    'sm' = '25',
    'md' = '50',
    'lg' = '75',
    'full' = '100',
}


export interface DropdownProps<T> {
    title: string;
    selected: T | null;
    items: T[];
    onSelect: (item: T) => void;
    size?: DropdownSize;
    openByDefault?: boolean;
    showTitleIfClosed?: boolean;
}

export function Dropdown<T extends ReactNode & {}>(props: DropdownProps<T>) {
    const { title, selected, items, onSelect, openByDefault } = props;

    const [isOpen, setIsOpen] = useState(openByDefault || false);

    const handleOpen = () => setIsOpen(!isOpen);

    const size = props.size || DropdownSize.sm;

    useEffect(() => {
    }, [])
    return (
        <DropdownWrapper title={title} selected={selected} size={size as DropdownSize} onOpen={handleOpen} isOpen={isOpen} showTitleIfClosed={props.showTitleIfClosed}>
            <DropdownItems items={items} selected={selected} onSelect={onSelect} isOpen={isOpen} />
        </DropdownWrapper>
    )
}

function DropdownItems<T>(props: Pick<DropdownProps<T>, 'items' | 'selected' | 'onSelect'> & { isOpen: boolean }) {
    const { items, selected, onSelect, isOpen } = props;
    return (
        <ul className='min-h-[0px]'>
            {props.isOpen &&
                items.map((item, index) => {
                    return (
                        <li onChange={() => onSelect(item)}
                            className='border-b-[1px] border-b-gray-200 cursor-pointer hover:bg-gray-100'
                            key={index} onClick={() => onSelect(item)}>
                            <p className='px-2 py-1 first-letter:uppercase select-none'>{item as ReactNode}</p>
                        </li>
                    )
                })
            }
        </ul>
    )
}

function DropdownWrapper<T>(
    props:
        Pick<DropdownProps<T>, 'title' | 'size' | 'selected' | 'showTitleIfClosed'> &
        { children: ReactNode; onOpen: () => void; isOpen: boolean }) {

    const { title: vTitle, children, isOpen, selected } = props;

    const ref = React.useRef<HTMLDivElement>(null);
    const showTitleIfClosed = props.showTitleIfClosed == null ? false : props.showTitleIfClosed;
    const title = (isOpen == true ? selected : (showTitleIfClosed == true ? vTitle : selected)) || vTitle;

    useEffect(() => {
        const size = parseInt(props.size as string);
        if (ref.current == null || !ref) return;

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

