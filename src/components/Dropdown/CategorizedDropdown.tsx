import { DropdownWrapper } from "./SimpleDropdown";
import { DropdownProps } from ".";
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
    selected: SelectProps<T>;
    categories: Array<Category<T>>;
}

export type CategorizedDropdownProps<T> = DropdownProps & ExtraProps<T>;

export function CategorizedDropdown<T extends ReactNode & {}>(props: CategorizedDropdownProps<T>) {
    const { title, selected, onSelect, openByDefault, animation } = props;
    const { categories } = props;
    const [isOpen, setIsOpen] = useState(openByDefault || false);
    const [renderedItems, setItems] = useState(props.categories);
    const handleOpen = () => setIsOpen(!isOpen);
    const queryItems = (query: string) => {
        //Filter categories containing query in both title or items
        const filteredItems = categories.filter(category =>
            category.title.toLowerCase().includes(query.toLowerCase()) ||
            category.items.some(item => item.item.toString().toLowerCase().includes(query.toLowerCase())));
        //Filter items in each category containing query
        const mappedItems = filteredItems.map(category => {
            const filteredItems = category.items.filter(item => item.item.toString().toLowerCase().includes(query.toLowerCase()));
            return {
                title: category.title,
                items: filteredItems.length == 0 ? category.items : filteredItems, //Show all items if none found
            }
        });
        setItems(mappedItems);
        setIsOpen(true);
    }
    const maxHeight = props.maxHeight || '250px';
    return (
        <DropdownWrapper queryItems={queryItems} search={props.search} rounded={props.rounded} shadow={props.shadow} darkMode={props.darkMode} maxWidth={props.maxWidth} minWidth={props.minWidth}
            title={title} selected={selected.item} size={props.size}
            onOpen={handleOpen} isOpen={isOpen} showTitleIfClosed={props.showTitleIfClosed} >
            <AnimatePresence>
                {
                    isOpen &&
                    <DropdownItems maxHeight={maxHeight} animation={animation} categories={renderedItems} onSelect={props.onSelect} selected={props.selected} />
                }
            </AnimatePresence>
        </DropdownWrapper>
    )
}


function DropdownItems<T>(props: Pick<CategorizedDropdownProps<T>, 'categories' | 'animation' | 'maxHeight' | 'onSelect' | 'selected'>) {
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
            className='*:select-none *:border-b-[1px] data-[mode=selected]:*:bg-gray-200 data-[mode=selected]:*:dark:bg-slate-700 data-[mode=disabled]:*:text-gray-600 data-[mode=disabled]:*:dark:text-gray-400 data-[mode=disabled]:*:cursor-not-allowed *:flex *:items-center *:border-b-gray-200 dark:*:border-b-gray-600 dark:scrollbar-dark scrollbar dark:bg-slate-800 bg-white'>
            {
                categories.length == 0 ?
                    <AnimationListItem
                        animate={animate}
                        delay={offset}
                        disabled={true}
                        selected={false}
                        index={0}
                        onClick={() => { }}
                        className='text-gray-600 text-lg dark:bg-slate-800 dark:text-gray-200'
                    >
                        <p className='px-2 py-1 first-letter:uppercase select-none'>
                            No items found
                        </p>
                    </AnimationListItem>
                    :
                    categories.map((category, vIndex) => {
                        const currentTotalItems = categories.slice(0, vIndex + 1).reduce((prev, cur, i) => prev + cur.items.length + 1, 0);
                        const delay = animateChildren ? ((Math.min(categories[vIndex - 1]?.items.length || 0, 4)) * offset + 0.2) : offset
                        return (
                            <Fragment key={vIndex}>
                                <AnimationListItem
                                    animate={animate}
                                    delay={delay}
                                    disabled={false}
                                    selected={false}
                                    index={vIndex}
                                    onClick={() => { }}
                                    className=' text-gray-600 text-lg dark:bg-slate-800 dark:text-gray-200'>
                                    <p className='px-2 py-1 first-letter:uppercase select-none'>
                                        {category.title as ReactNode}
                                    </p>
                                </AnimationListItem>
                                {
                                    category.items.map((item, index) => {
                                        const addedDelay = animateChildren ? (delay + offset * Math.min(index + vIndex, ANIMATION_STOP)) : offset;
                                        const isSelected = props.selected.category.title == category.title && props.selected.item == item.item;
                                        return ((!canRenderMore && ((currentTotalItems - category.items.length) + index) > ANIMATION_STOP) ? null :
                                            <AnimationListItem
                                                key={vIndex + "-" + index}
                                                animate={animate}
                                                selected={isSelected}
                                                disabled={item.disabled}
                                                delay={addedDelay}
                                                index={index}
                                                onClick={() =>
                                                    props.onSelect({ item: item.item, category: { title: category.title } })}
                                                className={`hover:bg-gray-100 dark:hover:bg-slate-700 data-[mode=disabled]:hover:bg-slate-800 cursor-pointer`}
                                            >
                                                <div className={`w-[6px] ml-3 h-[6px] rounded-full bg-slate-500 dark:bg-slate-300`}></div>
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
        animate: boolean;
        disabled?: boolean;
        selected: boolean
        className: string;
        onClick: () => void;
        children: ReactNode;
    }
>
    = (props) => {

        const { index, delay, animate, className, onClick, children, selected } = props;

        const disabled = props.disabled ?? false;

        return (
            <motion.li
                viewport={{ once: true }}
                data-mode={disabled ? 'disabled' : selected ? 'selected' : 'normal'}
                onClick={!disabled ? onClick : () => { }}
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