# DEMAX Inventory - Mockup Pages

Đây là bộ các trang mockup cho hệ thống quản lý kho DEMAX Inventory, được xây dựng bằng HTML, CSS, Bootstrap và jQuery.

## 🚀 Cách sử dụng

### 1. Khởi chạy ứng dụng
Mở file `index.html` trong trình duyệt web để bắt đầu sử dụng hệ thống.

### 2. Đăng nhập
- **Tài khoản mặc định:** `admin` / `admin`
- Hoặc sử dụng bất kỳ tài khoản nào để test

## 📁 Cấu trúc thư mục

```
mockup_pages/
├── index.html              # Trang chủ
├── login.html              # Trang đăng nhập
├── dashboard.html          # Dashboard chính
├── warehouses.html         # Quản lý kho
├── items.html             # Quản lý vật tư
├── grn_form.html          # Form nhập kho
├── assets/
│   ├── css/
│   │   └── style.css      # CSS chung
│   └── js/
│       └── app.js         # JavaScript chung
└── README.md              # File này
```

## 🎨 Thiết kế UI/UX

### Bảng màu chủ đạo
- **Primary:** #0E4F9E (Xanh dương đậm)
- **Secondary:** #F5F5F5 (Xám nhạt)
- **Accent:** #16A34A (Xanh lá)
- **Warning:** #F59E0B (Cam)
- **Danger:** #DC2626 (Đỏ)

### Tính năng chính
- **Responsive Design:** Tương thích với mọi thiết bị
- **Barcode Scanner:** Hỗ trợ quét mã vạch
- **Wizard Forms:** Form nhiều bước cho các thao tác phức tạp
- **Real-time Validation:** Kiểm tra dữ liệu real-time
- **Interactive Tables:** Bảng tương tác với sắp xếp, lọc

## 📱 Các trang chính

### 1. Dashboard (`dashboard.html`)
- Thống kê tổng quan
- Biểu đồ tiến trình phiếu
- Hoạt động gần đây
- Cảnh báo tồn kho thấp

### 2. Quản lý kho (`warehouses.html`)
- Danh sách kho
- Thêm/sửa/xóa kho
- Tìm kiếm và lọc
- Phân trang

### 3. Quản lý vật tư (`items.html`)
- Danh sách vật tư
- Quét mã vạch
- Thêm/sửa/xóa vật tư
- Cảnh báo tồn kho

### 4. Nhập kho (`grn_form.html`)
- Wizard 3 bước
- Quét mã vạch vật tư
- Tính toán tự động
- Xác nhận thông tin

## 🔧 Tính năng kỹ thuật

### JavaScript Functions
- `showAlert(message, type)` - Hiển thị thông báo
- `handleBarcodeScan(barcode)` - Xử lý quét mã vạch
- `validateForm(form)` - Kiểm tra form
- `calculateTotals()` - Tính tổng tiền
- `formatCurrency(amount)` - Định dạng tiền tệ

### CSS Classes
- `.barcode-scanner` - Vùng quét mã vạch
- `.stat-card` - Card thống kê
- `.status-pending/approved/rejected` - Trạng thái
- `.required` - Trường bắt buộc

## 🎯 Dữ liệu Mockup

### Vật tư mẫu
- **VT001:** Vít M4x20 (Cơ khí)
- **VT015:** PCB Mainboard (Điện tử)
- **VT023:** Thép tấm 2mm (Cơ khí)
- **VT045:** Màn hình LCD 7" (Điện tử)

### Kho mẫu
- **WH001:** Kho nguyên liệu chính
- **WH002:** Kho thành phẩm
- **WH003:** Kho bán thành phẩm
- **WH004:** Kho phụ liệu

## 🚀 Hướng dẫn phát triển

### Thêm trang mới
1. Tạo file HTML mới trong thư mục gốc
2. Copy cấu trúc navigation từ trang có sẵn
3. Thêm link vào sidebar
4. Tạo CSS/JS riêng nếu cần

### Tùy chỉnh giao diện
1. Chỉnh sửa `assets/css/style.css`
2. Thêm CSS variables trong `:root`
3. Sử dụng Bootstrap classes có sẵn

### Thêm tính năng JavaScript
1. Chỉnh sửa `assets/js/app.js`
2. Thêm event handlers
3. Tạo functions mới

## 📋 Checklist phát triển

- [x] Layout chung và navigation
- [x] Trang đăng nhập
- [x] Dashboard với biểu đồ
- [x] Quản lý kho
- [x] Quản lý vật tư
- [x] Form nhập kho (wizard)
- [ ] Form xuất kho
- [ ] Form điều chuyển
- [ ] Quản lý BOM
- [ ] Báo cáo tồn kho
- [ ] Quản lý người dùng
- [ ] Phân quyền

## 🔗 Liên kết nhanh

- [Trang chủ](index.html)
- [Đăng nhập](login.html)
- [Dashboard](dashboard.html)
- [Quản lý kho](warehouses.html)
- [Quản lý vật tư](items.html)
- [Nhập kho](grn_form.html)

## 📞 Hỗ trợ

Nếu có vấn đề hoặc cần hỗ trợ, vui lòng liên hệ:
- Email: support@demax.com
- Phone: +84 123 456 789

---

**DEMAX Inventory System** - Hệ thống quản lý kho thông minh
