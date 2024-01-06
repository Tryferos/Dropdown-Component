import React from 'react';
import '../tailwind.css'
import type { Meta, StoryObj } from '@storybook/react';
import { MenuDropdown } from '../components/Dropdown';

const meta = {
    title: 'MenuDropdown',
    component: MenuDropdown,
} satisfies Meta<typeof MenuDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
    args: {
        items: ['Projects', 'Articles', 'About', 'Contact', '1', '2'],
        onSelect: (item) => console.log(item),
        animation: {
            delayPerChild: 0.20,
            animate: true,
            animateChildren: true,
            animateChildrenUntilIndex: 20,
        },

    },
} satisfies Story;


