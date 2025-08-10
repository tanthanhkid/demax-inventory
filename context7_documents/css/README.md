# CSS Documentation

## CSS Overview
CSS (Cascading Style Sheets) là ngôn ngữ được sử dụng để mô tả cách hiển thị của các phần tử HTML.

## CSS Selectors

### Basic Selectors
```css
/* Element selector */
p { color: blue; }

/* Class selector */
.highlight { background-color: yellow; }

/* ID selector */
#header { font-size: 24px; }

/* Universal selector */
* { margin: 0; padding: 0; }
```

### Combinators
```css
/* Descendant selector */
div p { margin: 10px; }

/* Child selector */
div > p { color: red; }

/* Adjacent sibling */
h1 + p { font-weight: bold; }

/* General sibling */
h1 ~ p { font-style: italic; }
```

### Pseudo-classes
```css
/* Link states */
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
a:active { color: orange; }

/* Form states */
input:focus { border-color: blue; }
input:disabled { opacity: 0.5; }

/* Position */
:first-child { font-weight: bold; }
:last-child { margin-bottom: 0; }
:nth-child(odd) { background-color: #f0f0f0; }
```

## Box Model
```css
.box {
    width: 200px;
    height: 100px;
    padding: 20px;
    border: 2px solid black;
    margin: 10px;
    box-sizing: border-box;
}
```

## Layout Properties

### Display
```css
.inline { display: inline; }
.block { display: block; }
.inline-block { display: inline-block; }
.flex { display: flex; }
.grid { display: grid; }
.none { display: none; }
```

### Flexbox
```css
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
}

.item {
    flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
}
```

### Grid
```css
.container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 20px;
    grid-template-areas: 
        "header header header"
        "sidebar main aside"
        "footer footer footer";
}

.item {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
}
```

## Positioning
```css
.static { position: static; }
.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }
.sticky { position: sticky; }
```

## Typography
```css
.text {
    font-family: Arial, sans-serif;
    font-size: 16px;
    font-weight: bold;
    font-style: italic;
    line-height: 1.5;
    text-align: center;
    text-decoration: underline;
    text-transform: uppercase;
    letter-spacing: 1px;
    word-spacing: 2px;
}
```

## Colors and Backgrounds
```css
.element {
    color: #ff0000;
    background-color: rgba(0, 255, 0, 0.5);
    background-image: url('image.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
```

## Transforms and Transitions
```css
.transform {
    transform: translateX(10px) rotate(45deg) scale(1.2);
    transition: all 0.3s ease;
}

.transform:hover {
    transform: translateX(20px) rotate(90deg) scale(1.5);
}
```

## Media Queries
```css
/* Mobile first approach */
.container {
    width: 100%;
    padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        width: 750px;
        margin: 0 auto;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        width: 970px;
    }
}
```

## CSS Variables (Custom Properties)
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --font-size-base: 16px;
    --spacing-unit: 8px;
}

.element {
    color: var(--primary-color);
    font-size: var(--font-size-base);
    margin: calc(var(--spacing-unit) * 2);
}
```

## Best Practices
1. Sử dụng semantic class names
2. Mobile-first responsive design
3. Sử dụng CSS variables
4. Minimize specificity conflicts
5. Optimize performance
6. Use CSS Grid and Flexbox for layouts
7. Validate CSS

## CSS Preprocessors

### SASS/SCSS
```scss
$primary-color: #007bff;
$font-stack: Arial, sans-serif;

@mixin button-style($bg-color) {
    background-color: $bg-color;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
}

.button {
    @include button-style($primary-color);
    font-family: $font-stack;
    
    &:hover {
        opacity: 0.8;
    }
}
```

## Resources
- [MDN CSS Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS-Tricks](https://css-tricks.com/)
- [W3Schools CSS Tutorial](https://www.w3schools.com/css/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
