import React, { useEffect, useState, ReactNode } from 'react'
import '../../tailwind.css'
import { Arrow } from '../../svg';
import { AnimatePresence, motion } from 'framer-motion'
import { AnimationListItem } from './CategorizedDropdown';
import { DropdownProps, DropdownSize } from '.';


type ExtraProps<T> = {
    items: Array<T>;
    onSelect: (item: T) => void;
    selected: T;
}


type SimpleDropdownProps<T> = DropdownProps & ExtraProps<T>;

export function SimpleDropdown<T extends ReactNode & {}>(props: SimpleDropdownProps<T>) {
    const { title, selected, items, onSelect, openByDefault, animation } = props;

    const [isOpen, setIsOpen] = useState(openByDefault || false);
    const [selectedItem, setSelected] = useState<T>(props.selected);

    const [renderedItems, setItems] = useState(props.items);

    const queryItems = (query: string) => {
        setSelected(query as T);
        const filteredItems = items.filter(item => item.toString().toLowerCase().includes(query.toLowerCase()));
        setItems(filteredItems);
        setIsOpen(true);
    }

    const maxHeight = props.maxHeight || '250px';

    const handleOpen = () => setIsOpen(!isOpen);

    useEffect(() => {
    }, [])
    return (
        <DropdownWrapper queryItems={queryItems} search={props.search} shadow={props.shadow} rounded={props.rounded} darkMode={props.darkMode} maxWidth={props.maxWidth} minWidth={props.minWidth} title={title} selected={selected} size={props.size} onOpen={handleOpen} isOpen={isOpen} showTitleIfClosed={props.showTitleIfClosed}>
            <AnimatePresence>
                {isOpen &&
                    <DropdownItems maxHeight={maxHeight} items={renderedItems} selected={selectedItem} onSelect={onSelect} animation={animation} />
                }
            </AnimatePresence>
        </DropdownWrapper>
    )
}

function DropdownItems<T>(props: Pick<SimpleDropdownProps<T>, 'items' | 'selected' | 'onSelect' | 'animation' | 'maxHeight'>) {
    const { items, selected, onSelect, animation } = props;
    const animate = animation?.animate ?? true;
    const animateChildren = (animate && animation?.animateChildren) ?? true;
    const offset = (animation?.delayPerChild || 0.2)
    const ANIMATION_STOP = animation?.animateChildrenUntilIndex ?? 10;
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
            className='*:border-b-[1px] *:border-b-gray-200 *:dark:border-b-gray-600 dark:bg-slate-800 *:cursor-pointer scrollbar dark:scrollbar-dark
             data-[mode=selected]:*:bg-gray-200 data-[mode=selected]:*:dark:bg-slate-700 data-[mode=disabled]:*:cursor-not-allowed'>
            {items.length == 0 ?
                <AnimationListItem
                    animate={animate}
                    delay={offset}
                    disabled={true}
                    selected={false}
                    index={0}
                    onClick={() => { }}
                    className='text-gray-600 dark:bg-slate-800 dark:text-gray-200 cursor-not-allowed'
                >
                    <p className='px-2 py-1 first-letter:uppercase select-none'>
                        No items found
                    </p>
                </AnimationListItem> :
                items.map((item, index) => {
                    const delay = animateChildren ? (offset * Math.min(index, ANIMATION_STOP)) : offset;
                    return (
                        (!canRenderMore && index > ANIMATION_STOP) ? null :
                            <AnimationListItem
                                key={index}
                                selected={selected == item}
                                disabled={false}
                                animate={animate}
                                delay={delay}
                                index={index}
                                onClick={() => onSelect(item)}
                                className={`hover:bg-gray-200 dark:hover:bg-slate-700`}
                            >
                                <p className='px-2 py-1 first-letter:uppercase dark:text-white select-none'>{item as ReactNode}</p>
                            </AnimationListItem>
                    )
                })
            }
        </motion.ul>
    )
}


export function DropdownWrapper<T>(
    props:
        Pick<SimpleDropdownProps<T>, | 'search' | 'title' | 'size' | 'selected' | 'showTitleIfClosed' | 'maxWidth' | 'minWidth' | 'darkMode' | 'rounded' | 'shadow'> &
        { children: ReactNode; onOpen: () => void; isOpen: boolean; queryItems: (query: string) => void; }) {

    const { title: vTitle, children, isOpen, selected } = props;

    const ref = React.useRef<HTMLDivElement>(null);
    const parentRef = React.useRef<HTMLElement>(null);
    const showTitleIfClosed = props.showTitleIfClosed == null ? false : props.showTitleIfClosed;
    const title = (isOpen == true ? selected : (showTitleIfClosed == true ? vTitle : selected)) || vTitle;
    const darkMode = props.darkMode ?? false;
    const rounded = props.rounded ?? true;
    const shadow = props.shadow ?? true;
    const search = props.search ?? false;

    const [query, setQuery] = useState<string>(props.selected as string ?? '');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    useEffect(() => {
        if (!search) return;
        props.queryItems(query);
    }, [query, search])

    useEffect(() => {
        const size = parseInt(props.size || DropdownSize.sm);
        if (ref.current == null || !ref) return;

        ref.current.style.minWidth = props.minWidth || '125px';
        ref.current.style.maxWidth = props.maxWidth || '100%';
        ref.current.style.width = `${size}%`;

    }, [props.size, ref])

    useEffect(() => {
        if (!darkMode) return;
        if (parentRef.current == null || !ref) return;
        parentRef.current.setAttribute('class', 'dark')
    }, [darkMode, parentRef])

    return (
        <section ref={parentRef}>
            <div ref={ref} className={`${rounded ? 'rounded' : 'rounded-none'} dark:rounded outline ml-10 mt-10 dark:outline-white dark:text-white ${shadow ? 'shadow-outline dark:shadow-outline-dark' : 'shadow-none'} transition-all outline-black w-[25%] outline-2 min-w-[125px] min-h-md`}>
                <div onClick={props.onOpen} className={`h-[10%] px-2 text-lg flex dark:bg-slate-800 dark:text-white justify-between py-2 ${isOpen ? 'border-b-2' : 'border-b-none'} dark:border-b-gray-300 border-b-gray-600 cursor-pointer`}>
                    {
                        search ?
                            <input onClick={onClick} onChange={onChange} type='text' value={query} className='w-[80%] bg-transparent outline-none font-medium select-none first-letter:uppercase' />
                            : <p className='font-medium select-none first-letter:uppercase'>{title as ReactNode}</p>
                    }
                    <Arrow isOpen={isOpen} />
                </div>
                {children}
            </div>
        </section>
    )
}

