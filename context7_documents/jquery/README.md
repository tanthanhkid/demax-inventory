# jQuery Documentation

## jQuery Overview
jQuery là một thư viện JavaScript nhanh, nhỏ gọn và giàu tính năng giúp đơn giản hóa việc duyệt tài liệu HTML, xử lý sự kiện, tạo hiệu ứng và tương tác Ajax cho phát triển web nhanh chóng.

## Cài đặt jQuery

### CDN
```html
<!-- Full version -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Slim version (không có AJAX, effects) -->
<script src="https://code.jquery.com/jquery-3.7.1.slim.min.js"></script>
```

### NPM
```bash
npm install jquery
```

### ES Module
```html
<script type="module">
    import { $ } from "https://code.jquery.com/jquery-3.7.1.module.min.js";
</script>
```

## Document Ready
```javascript
// Cách 1: Shorthand
$(function() {
    // Code chạy khi DOM sẵn sàng
});

// Cách 2: Full syntax
$(document).ready(function() {
    // Code chạy khi DOM sẵn sàng
});

// Cách 3: ES6 arrow function
$(() => {
    // Code chạy khi DOM sẵn sàng
});
```

## Selectors

### Basic Selectors
```javascript
// Element selector
$("p").css("color", "red");

// Class selector
$(".highlight").addClass("active");

// ID selector
$("#header").hide();

// Universal selector
$("*").css("margin", "0");
```

### Combinators
```javascript
// Descendant selector
$("div p").addClass("nested");

// Child selector
$("div > p").addClass("direct-child");

// Adjacent sibling
$("h1 + p").addClass("adjacent");

// General sibling
$("h1 ~ p").addClass("sibling");
```

### Attribute Selectors
```javascript
// Has attribute
$("[title]").addClass("has-title");

// Attribute equals
$("[type='text']").addClass("text-input");

// Attribute contains
$("[class*='btn']").addClass("button-like");

// Attribute starts with
$("[id^='user']").addClass("user-element");
```

## DOM Manipulation

### Content Manipulation
```javascript
// Get/set HTML content
$("#element").html("<p>New content</p>");
var content = $("#element").html();

// Get/set text content
$("#element").text("Plain text");
var text = $("#element").text();

// Get/set value
$("input").val("new value");
var value = $("input").val();
```

### Element Creation
```javascript
// Create new element
var newDiv = $("<div>", {
    class: "new-element",
    text: "Hello World",
    click: function() {
        alert("Clicked!");
    }
});

// Append to existing element
$("#container").append(newDiv);
```

### Element Insertion
```javascript
// Append (inside, at end)
$("#container").append("<p>New paragraph</p>");

// Prepend (inside, at beginning)
$("#container").prepend("<p>First paragraph</p>");

// After (outside, after element)
$("#element").after("<p>After element</p>");

// Before (outside, before element)
$("#element").before("<p>Before element</p>");
```

## Events

### Event Binding
```javascript
// Click event
$("#button").click(function() {
    alert("Button clicked!");
});

// Multiple events
$("#element").on("click mouseenter", function() {
    $(this).addClass("active");
});

// Event delegation
$(document).on("click", ".dynamic-element", function() {
    // Works for elements added later
});
```

### Common Events
```javascript
// Mouse events
$("#element").click(function() {});
$("#element").dblclick(function() {});
$("#element").mouseenter(function() {});
$("#element").mouseleave(function() {});
$("#element").hover(
    function() { /* mouseenter */ },
    function() { /* mouseleave */ }
);

// Form events
$("input").focus(function() {});
$("input").blur(function() {});
$("form").submit(function() {});
$("input").change(function() {});

// Keyboard events
$(document).keydown(function() {});
$(document).keyup(function() {});
$(document).keypress(function() {});
```

### Event Object
```javascript
$("#element").click(function(event) {
    // Prevent default behavior
    event.preventDefault();
    
    // Stop event bubbling
    event.stopPropagation();
    
    // Get event target
    var target = event.target;
    
    // Get mouse coordinates
    var x = event.clientX;
    var y = event.clientY;
});
```

## Effects and Animations

### Show/Hide
```javascript
// Basic show/hide
$("#element").show();
$("#element").hide();
$("#element").toggle();

// With duration
$("#element").show(1000); // 1 second
$("#element").hide("slow"); // 600ms
$("#element").toggle("fast"); // 200ms

// With callback
$("#element").show(1000, function() {
    console.log("Animation complete");
});
```

### Fade Effects
```javascript
// Fade in/out
$("#element").fadeIn(1000);
$("#element").fadeOut(1000);
$("#element").fadeToggle(1000);

// Fade to specific opacity
$("#element").fadeTo(1000, 0.5); // 50% opacity
```

### Slide Effects
```javascript
// Slide up/down
$("#element").slideDown(1000);
$("#element").slideUp(1000);
$("#element").slideToggle(1000);
```

### Custom Animations
```javascript
// Animate CSS properties
$("#element").animate({
    width: "200px",
    height: "200px",
    opacity: 0.5
}, 1000);

// Animate with easing
$("#element").animate({
    left: "+=100px"
}, {
    duration: 1000,
    easing: "easeInOutQuad"
});
```

## AJAX

### Basic AJAX
```javascript
// GET request
$.get("api/data", function(data) {
    console.log(data);
});

// POST request
$.post("api/submit", {
    name: "John",
    email: "john@example.com"
}, function(response) {
    console.log(response);
});
```

### Advanced AJAX
```javascript
$.ajax({
    url: "api/data",
    method: "POST",
    data: {
        name: "John",
        email: "john@example.com"
    },
    dataType: "json",
    success: function(data) {
        console.log("Success:", data);
    },
    error: function(xhr, status, error) {
        console.log("Error:", error);
    },
    complete: function() {
        console.log("Request completed");
    }
});
```

### AJAX with Promises
```javascript
$.ajax("api/data")
    .done(function(data) {
        console.log("Success:", data);
    })
    .fail(function(xhr, status, error) {
        console.log("Error:", error);
    })
    .always(function() {
        console.log("Request completed");
    });
```

## Utility Functions

### Array/Object Manipulation
```javascript
// Extend objects
var obj1 = { name: "John" };
var obj2 = { age: 30 };
var result = $.extend(obj1, obj2);

// Check if element exists
if ($("#element").length > 0) {
    // Element exists
}

// Get array index
var index = $.inArray("item", ["a", "b", "item", "c"]);
```

### Type Checking
```javascript
$.isArray([1, 2, 3]); // true
$.isFunction(function() {}); // true
$.isNumeric("123"); // true
$.isEmptyObject({}); // true
$.isPlainObject({}); // true
```

### String/Array Utilities
```javascript
// Trim string
var trimmed = $.trim("  hello  ");

// Parse JSON
var data = $.parseJSON('{"name": "John"}');

// Make array
var array = $.makeArray(document.querySelectorAll("div"));
```

## Best Practices

1. **Use Document Ready**: Luôn đảm bảo DOM sẵn sàng trước khi thao tác
2. **Event Delegation**: Sử dụng event delegation cho elements động
3. **Cache Selectors**: Lưu trữ jQuery objects để tái sử dụng
4. **Use Modern Methods**: Ưu tiên `.on()` thay vì `.bind()`, `.live()`
5. **Minimize DOM Queries**: Giảm thiểu việc query DOM
6. **Use Proper Selectors**: Sử dụng selectors hiệu quả

## Performance Tips

```javascript
// Bad: Query DOM multiple times
$("#element").addClass("active");
$("#element").show();
$("#element").text("Hello");

// Good: Cache the selector
var $element = $("#element");
$element.addClass("active");
$element.show();
$element.text("Hello");

// Use ID selectors when possible (fastest)
$("#myId"); // Fast
$(".myClass"); // Slower
$("div.myClass"); // Slower
```

## Resources
- [jQuery Official Documentation](https://api.jquery.com/)
- [jQuery Learning Center](https://learn.jquery.com/)
- [jQuery UI](https://jqueryui.com/)
- [jQuery Mobile](https://jquerymobile.com/)
