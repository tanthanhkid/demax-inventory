# Bootstrap Documentation

## Bootstrap Overview
Bootstrap là một CSS framework miễn phí và mã nguồn mở để phát triển giao diện người dùng responsive và mobile-first.

## Cài đặt Bootstrap

### CDN
```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- JavaScript Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

### NPM
```bash
npm install bootstrap
```

## Grid System
Bootstrap sử dụng hệ thống grid 12 cột:

```html
<div class="container">
    <div class="row">
        <div class="col-md-6">Column 1</div>
        <div class="col-md-6">Column 2</div>
    </div>
</div>
```

### Breakpoints
- `xs` - < 576px
- `sm` - ≥ 576px
- `md` - ≥ 768px
- `lg` - ≥ 992px
- `xl` - ≥ 1200px
- `xxl` - ≥ 1400px

## Components

### Buttons
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-light">Light</button>
<button class="btn btn-dark">Dark</button>
```

### Forms
```html
<form>
    <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email">
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### Cards
```html
<div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>
```

### Tables
```html
<table class="table">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
        </tr>
    </tbody>
</table>
```

### Modals
```html
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                Modal content here
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
```

## Utilities

### Spacing
- `m-*` - Margin
- `p-*` - Padding
- `mt-*`, `mb-*`, `ms-*`, `me-*` - Directional margins
- `pt-*`, `pb-*`, `ps-*`, `pe-*` - Directional padding

### Display
- `d-none` - Display none
- `d-block` - Display block
- `d-flex` - Display flex
- `d-grid` - Display grid

### Flexbox
- `justify-content-start`
- `justify-content-center`
- `justify-content-end`
- `align-items-start`
- `align-items-center`
- `align-items-end`

### Text
- `text-start` - Text align left
- `text-center` - Text align center
- `text-end` - Text align right
- `text-primary` - Primary color text
- `text-secondary` - Secondary color text

## Best Practices
1. Sử dụng container cho layout
2. Responsive design với breakpoints
3. Sử dụng utility classes
4. Customize với CSS variables
5. Optimize cho mobile-first

## Resources
- [Bootstrap Official Documentation](https://getbootstrap.com/docs/)
- [Bootstrap Examples](https://getbootstrap.com/docs/examples/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
