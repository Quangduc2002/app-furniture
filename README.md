# Trello Web

## Getting Started

First, run the development server:

```bash
# Install package
npm install

# Run development server
npm run dev

# Run production server
npm run build
npm start
```

More: Install extenstion to preview icon: [Icon-Preivew](https://marketplace.visualstudio.com/items?itemName=hunghg255.iconify-preview)

## Gen Color

1. Update color to `styles/color-preview.json`

- Add value
  Example:

```js
{
   Light: {
     primary: {
       "8": '#FF0000',
     }
   }
}
```

## Gen Font

```js
1. Copy file svg to `public/svgIcon`
2. Run command: `npm run gen-font`
3. Check component `Icon` in `src/components/UI/IconFont/Icon.tsx`
```

More: Install extenstion to preview icon: [Icon-Preivew](https://marketplace.visualstudio.com/items?itemName=hunghg255.iconify-preview)

## Library Docs

```md
1. React Vite: https://vite.dev/guide/

2. State management Reactjs: https://jotai.org/

3. Library UI:

- https://ant.design/
- https://tailwindcss.com/

4. Library for request api: https://www.npmjs.com/package/umi-request
```

5. Processing CSS: https://sass-lang.com/guide
