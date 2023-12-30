import '../../tailwind.css'

export * from './SimpleDropdown.tsx'
export * from './CategorizedDropdown.tsx'

export enum DropdownSize {
    'sm' = '25',
    'md' = '50',
    'lg' = '75',
    'full' = '100',
}

export type DropdownAnimationProps = {
    animate?: boolean;
    animateChildren?: boolean;
    delayPerChild?: 0.1 | 0.2 | 0.3 | 0.4 | 0.5;
    animateChildrenUntilIndex?: number;
}
export type DropdownProps = {
    animation?: DropdownAnimationProps;
    size?: DropdownSize;
    search?: boolean;
    closeOnClickOutside?: boolean;
    minWidth?: string;
    placeholder?: string;
    maxWidth?: string;
    maxHeight?: string;
    darkMode?: boolean;
    rounded?: boolean;
    shadow?: boolean;
    openByDefault?: boolean;
    showTitleIfClosed?: boolean;
    onSearchChange?: (value: string) => void;
    closeOnSelect?: boolean;
    title: string;
}
