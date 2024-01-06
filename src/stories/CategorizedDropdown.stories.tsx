import React from 'react';
import '../tailwind.css'
import type { Meta, StoryObj } from '@storybook/react';
import { DropdownSize, CategorizedDropdown } from '../components/Dropdown';

const meta = {
    title: 'Categorized Dropdown',
    component: CategorizedDropdown,
} satisfies Meta<typeof CategorizedDropdown>;

export default meta;

export const Default = {
    args: {
        onSearchChange: (query) => console.log(query),
        closeOnSelect: true,
        categories: [{
            title: 'Books',
            items: [
                {
                    item: 'first',
                    disabled: false,
                },
                {
                    item: 'first',
                    disabled: false,
                },
                {
                    item: 'first',
                    disabled: false,
                },
                {
                    item: 'first',
                    disabled: false,
                },
                {
                    item: 'second',
                    disabled: false,
                },
                {
                    item: 'first',
                    disabled: false,
                },
                {
                    item: 'first',
                    disabled: false,
                },
                {
                    item: 'second',
                    disabled: false,
                },
                {
                    item: 'first',
                    disabled: false,
                },
                {
                    item: 'first',
                    disabled: false,
                },
                {
                    item: 'second',
                    disabled: false,
                },
                {
                    item: 'first',
                    disabled: false,
                },
                {
                    item: 'first',
                    disabled: false,
                },
                {
                    item: 'second',
                    disabled: false,
                },
                {
                    item: 'first',
                    disabled: false,
                },
                {
                    item: 'first',
                    disabled: false,
                },
                {
                    item: 'second',
                    disabled: false,
                },
                {
                    item: 'third',
                    disabled: true,
                },
            ],
        }, {
            title: 'Magazines',
            items: [
                {
                    item: 'first',
                    disabled: false,
                },
                {
                    item: 'second',
                    disabled: false,
                },
                {
                    item: 'third',
                    disabled: true,
                },
            ],
        },],
        selected: {
            item: 'second',
            category: {
                title: 'Books',
            },
        },
        onSelect: (item) => console.log(item),
        size: '25' as DropdownSize,
        title: 'Select an item',
        maxHeight: '200px',
        shadow: true,
        darkMode: true,
        search: true,
        animation: {
            animate: true,
        },
    }
} satisfies StoryObj<typeof meta>;