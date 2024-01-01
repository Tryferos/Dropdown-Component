# Dropdown Components

[Install the package for npm here.](https://www.npmjs.com/package/@tryferos/dropdown)

[Source code on Github.](https://github.com/Tryferos/Dropdown-Component)

This is a **react component** delivering various **Editable Dropdowns** that you can use in your projects, which also adds **types** support using Typescript.

The project is build using **React, Typescript and Tailwindcss**. Tailwindcss is compiled into css, meaning you do not need it as a depedency.

All files are bundled into 3 seperate files for both cjs, esm and dts using the Rollup bundler. (commonjs, esmodules and declaration for ts types).

## :dart: Features

-   :white_check_mark: Typescript support
-   :white_check_mark: **FULLY** Customizable to your needs
-   :white_check_mark: Light/dark mode toggle
-   :white_check_mark: Search option
-   :white_check_mark: Animations option

## :electric_plug: Installation

##

Install @tryferos/dropdown using

```bash
  npm install @tryferos/dropdown@1.3.2
```

Remember that you need to have react and react-dom already installed

```bash
  npm install react@^18.0.1 react-dom@^18.0.1
```

This package is build using react 18, you can use with different versions of react at your own risk.

```bash
  npm install @tryferos/dropdown@1.3.2 --force
```

Import the components

```javascript
import { SimpleDropdown, CategorizedDropdown } from "@tryferos/dropdown";
```

:speech_balloon: **Options & Types**

```typescript
    title: string;
    animation?: {
        animate?: boolean;
        animateChildren?: boolean;
        delayPerChild?: 0.1 | 0.2 | 0.3 | 0.4 | 0.5;
        animateChildrenUntilIndex?: number;
    };
    maxHeight?: string;
    minWidth?: string;
    maxWidth?: string;
    darkMode?: boolean;
    rounded?: boolean;
    shadow?: boolean;
    size?: string; //in percentage without %
    openByDefault?: boolean;
    showTitleIfClosed?: boolean;
    search?: boolean;
    closeOnClickOutside?: boolean;
    placeholder?: string;
    onSearchChange?: (value: string) => void;
    closeOnSelect?: boolean;
    //For Simple Dropdowns
    items: Array<T>;
    onSelect: (item: T) => void;
    selected: T;
    //For Categorized Dropdowns
    categories: Array<{
        title: string;
        items: Array<{
            item: T;
            disabled?: boolean;
        }>;
    }>;
    selected: {
        item: T,
        category: {
            title: string;
        }
    }
    onSelect: ({item: T, category: {title: string}}) => void

```

## :information_source: Acknowledgements

-   [Heroicons](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
-   [Awesome README](https://github.com/matiassingers/awesome-readme)
