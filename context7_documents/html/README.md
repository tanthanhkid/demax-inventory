# HTML5 Documentation

## HTML5 Overview
HTML5 là phiên bản mới nhất của HTML, cung cấp các tính năng mới và cải tiến cho việc phát triển web.

## Các thẻ HTML cơ bản

### Document Structure
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
</head>
<body>
    <!-- Content here -->
</body>
</html>
```

### Semantic Elements
- `<header>` - Header của trang hoặc section
- `<nav>` - Navigation menu
- `<main>` - Main content
- `<section>` - Section content
- `<article>` - Independent content
- `<aside>` - Sidebar content
- `<footer>` - Footer của trang hoặc section

### Form Elements
```html
<form action="/submit" method="POST">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
    
    <button type="submit">Submit</button>
</form>
```

### Table Elements
```html
<table>
    <thead>
        <tr>
            <th>Header 1</th>
            <th>Header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
        </tr>
    </tbody>
</table>
```

## HTML Attributes
- `class` - CSS classes
- `id` - Unique identifier
- `style` - Inline styles
- `data-*` - Custom data attributes
- `aria-*` - Accessibility attributes

## Best Practices
1. Sử dụng semantic elements
2. Đảm bảo accessibility
3. Validate HTML
4. Sử dụng proper indentation
5. Include meta tags
6. Use descriptive alt text for images

## Resources
- [MDN HTML Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
- [HTML5 Specification](https://html.spec.whatwg.org/)
