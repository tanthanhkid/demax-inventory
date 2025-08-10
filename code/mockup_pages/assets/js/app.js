// DEMAX Inventory - Common JavaScript Functions

$(document).ready(function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Auto-hide alerts after 5 seconds
    setTimeout(function() {
        $('.alert').fadeOut('slow');
    }, 5000);

    // Barcode scanner focus
    $('.barcode-input').on('focus', function() {
        $(this).select();
    });

    // Enter key in barcode input
    $('.barcode-input').on('keypress', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            handleBarcodeScan($(this).val());
        }
    });

    // Table row selection
    $('.table tbody tr').on('click', function() {
        $(this).toggleClass('table-active');
    });

    // Form validation
    $('form').on('submit', function(e) {
        if (!validateForm($(this))) {
            e.preventDefault();
            showAlert('Vui lòng kiểm tra lại thông tin nhập liệu', 'danger');
        }
    });

    // Dynamic form fields
    $('.add-row-btn').on('click', function() {
        addTableRow($(this));
    });

    $('.remove-row-btn').on('click', function() {
        removeTableRow($(this));
    });

    // Search functionality
    $('.search-input').on('keyup', function() {
        var searchTerm = $(this).val().toLowerCase();
        filterTable($(this).closest('.card').find('table'), searchTerm);
    });

    // Date picker initialization - Fixed: Use HTML5 date input instead of datepicker
    $('.date-picker').each(function() {
        // Set default value to today if empty
        if (!$(this).val()) {
            var today = new Date().toISOString().split('T')[0];
            $(this).val(today);
        }
        
        // Add date validation
        $(this).on('change', function() {
            validateDate($(this));
        });
    });

    // Number formatting
    $('.number-input').on('blur', function() {
        formatNumber($(this));
    });

    // Print functionality
    $('.print-btn').on('click', function() {
        printElement($(this).closest('.card'));
    });

    // Export functionality
    $('.export-btn').on('click', function() {
        exportTable($(this).closest('.card').find('table'));
    });

    // Mobile navigation toggle
    $('.navbar-toggler').on('click', function() {
        $('.sidebar').toggleClass('show');
    });

    // Close sidebar when clicking outside on mobile
    $(document).on('click', function(e) {
        if ($(window).width() < 768) {
            if (!$(e.target).closest('.sidebar, .navbar-toggler').length) {
                $('.sidebar').removeClass('show');
            }
        }
    });

    // Add loading states to buttons
    $('.btn-primary, .btn-success').on('click', function() {
        if (!$(this).hasClass('no-loading')) {
            showButtonLoading($(this));
        }
    });

    // Add animations to cards
    $('.card').addClass('animate__animated animate__fadeIn');
    
    // Add hover animations
    $('.card').hover(
        function() { $(this).addClass('shadow-lg'); },
        function() { $(this).removeClass('shadow-lg'); }
    );
});

// Date validation function
function validateDate(input) {
    var date = new Date(input.val());
    var today = new Date();
    
    if (date > today) {
        showAlert('Ngày không được lớn hơn ngày hiện tại', 'warning');
        input.val(today.toISOString().split('T')[0]);
    }
}

// Show button loading state
function showButtonLoading(button) {
    var originalText = button.text();
    button.prop('disabled', true)
          .html('<span class="spinner-border spinner-border-sm me-2" role="status"></span>Đang xử lý...');
    
    // Reset after 2 seconds (simulate API call)
    setTimeout(function() {
        button.prop('disabled', false).text(originalText);
    }, 2000);
}

// Barcode scanner handler
function handleBarcodeScan(barcode) {
    console.log('Barcode scanned:', barcode);
    
    // Show loading
    showLoading();
    
    // Simulate API call
    setTimeout(function() {
        hideLoading();
        
        // Mock response
        var mockItem = {
            code: barcode,
            name: 'Vật tư mẫu ' + barcode,
            group: 'Cơ khí',
            uom: 'Cái',
            price: 25000
        };
        
        populateItemFields(mockItem);
        showAlert('Tìm thấy vật tư: ' + mockItem.name, 'success');
    }, 1000);
}

// Form validation
function validateForm(form) {
    var isValid = true;
    
    form.find('.required').each(function() {
        var field = $(this);
        var value = field.val();
        
        if (!value || value.trim() === '') {
            field.addClass('is-invalid');
            isValid = false;
        } else {
            field.removeClass('is-invalid');
        }
    });
    
    return isValid;
}

// Add table row
function addTableRow(button) {
    var table = button.closest('.card').find('table tbody');
    var template = table.find('tr:first').clone();
    
    // Clear values
    template.find('input, select, textarea').val('');
    template.find('.is-invalid').removeClass('is-invalid');
    
    table.append(template);
}

// Remove table row
function removeTableRow(button) {
    var row = button.closest('tr');
    if (row.siblings().length > 0) {
        row.remove();
    } else {
        showAlert('Không thể xóa dòng cuối cùng', 'warning');
    }
}

// Filter table
function filterTable(table, searchTerm) {
    table.find('tbody tr').each(function() {
        var text = $(this).text().toLowerCase();
        if (text.indexOf(searchTerm) > -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

// Format number
function formatNumber(input) {
    var value = input.val().replace(/[^\d]/g, '');
    if (value) {
        input.val(parseInt(value).toLocaleString('vi-VN'));
    }
}

// Show alert
function showAlert(message, type) {
    var alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    $('.alert-container').append(alertHtml);
    
    // Auto remove after 5 seconds
    setTimeout(function() {
        $('.alert').last().fadeOut('slow', function() {
            $(this).remove();
        });
    }, 5000);
}

// Populate item fields
function populateItemFields(item) {
    $('#item-code').val(item.code);
    $('#item-name').val(item.name);
    $('#item-uom').val(item.uom);
    $('#item-price').val(item.price);
    $('#item-quantity').focus();
}

// Print element
function printElement(element) {
    var printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>DEMAX Inventory - Print</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
                <link href="assets/css/style.css" rel="stylesheet">
            </head>
            <body>
                ${element.html()}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Export table to Excel
function exportTable(table) {
    var csv = [];
    var rows = table.find('tr');
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');
        
        for (var j = 0; j < cols.length; j++) {
            row.push('"' + cols[j].innerText.replace(/"/g, '""') + '"');
        }
        
        csv.push(row.join(','));
    }
    
    var csvContent = 'data:text/csv;charset=utf-8,' + csv.join('\n');
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Calculate totals
function calculateTotals() {
    var total = 0;
    $('.quantity-input').each(function() {
        var quantity = parseFloat($(this).val()) || 0;
        var price = parseFloat($(this).closest('tr').find('.price-input').val()) || 0;
        var amount = quantity * price;
        
        $(this).closest('tr').find('.amount-input').val(amount.toLocaleString('vi-VN'));
        total += amount;
    });
    
    $('#total-amount').text(total.toLocaleString('vi-VN'));
}

// Status badge generator
function getStatusBadge(status) {
    var badges = {
        'pending': '<span class="badge bg-warning">Chờ duyệt</span>',
        'approved': '<span class="badge bg-success">Đã duyệt</span>',
        'rejected': '<span class="badge bg-danger">Từ chối</span>',
        'completed': '<span class="badge bg-primary">Hoàn thành</span>',
        'cancelled': '<span class="badge bg-secondary">Đã hủy</span>'
    };
    
    return badges[status] || '<span class="badge bg-secondary">Không xác định</span>';
}

// Date formatter
function formatDate(dateString) {
    var date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Currency formatter
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Loading spinner
function showLoading() {
    $('body').append('<div class="loading-overlay"><div class="spinner-border" role="status"></div></div>');
}

function hideLoading() {
    $('.loading-overlay').remove();
}

// Confirm dialog
function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

// Auto-save form
function autoSaveForm(formId, interval = 30000) {
    setInterval(function() {
        var form = $('#' + formId);
        var formData = form.serialize();
        
        localStorage.setItem('autosave_' + formId, formData);
        console.log('Form auto-saved');
    }, interval);
}

// Restore auto-saved form
function restoreForm(formId) {
    var savedData = localStorage.getItem('autosave_' + formId);
    if (savedData) {
        var form = $('#' + formId);
        form.deserialize(savedData);
        showAlert('Đã khôi phục dữ liệu tự động lưu', 'info');
    }
}
