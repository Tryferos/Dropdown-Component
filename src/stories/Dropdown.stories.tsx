import React from 'react';
import '../tailwind.css'
import type { Meta, StoryObj } from '@storybook/react';
import { SimpleDropdown, DropdownSize } from '../components/Dropdown';

const meta = {
  title: 'Dropdown',
  component: SimpleDropdown,
} satisfies Meta<typeof SimpleDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    items: new Array(100).fill(0).map((_, i) => i.toString()),
    selected: '4',
    onSelect: (item) => console.log(item),
    onSearchChange: (query) => console.log(query),
    closeOnSelect: true,
    size: '100' as DropdownSize,
    minWidth: '200px',
    maxWidth: '200px',
    title: 'Select an item',
    closeOnClickOutside: false,
    search: true,
    maxHeight: '50vh',
    animation: {
      delayPerChild: 0.20,
      animate: true,
      animateChildren: true,
      animateChildrenUntilIndex: 20,
    },
  },
} satisfies Story;

export const Picked = {
  args: {
    items: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelveth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twentieth'],
    selected: 'first',
    onSelect: (item) => console.log(item),
    size: DropdownSize.sm,
    title: 'Select an item',
    darkMode: true,
    search: true,
    rounded: false,
    openByDefault: true,
    shadow: true,
    showTitleIfClosed: false,
  },
} satisfies Story;
