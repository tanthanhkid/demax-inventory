# Định hướng UI/UX DEMAX Inventory

## 1. Mục tiêu
Tài liệu định hướng phong cách màu sắc và bố cục cho các màn hình của hệ thống DEMAX Inventory, nhằm bảo đảm giao diện thống nhất, dễ sử dụng và hỗ trợ thao tác nhanh theo yêu cầu trong SRS.

## 2. Bảng màu chủ đạo
| Màu | Mã | Sử dụng |
|-----|----|---------|
| Primary | #0E4F9E | Thanh điều hướng, tiêu đề chính |
| Secondary | #F5F5F5 | Nền nội dung, vùng nhập liệu |
| Accent | #16A34A | Trạng thái thành công, nút hành động chính |
| Warning | #F59E0B | Cảnh báo, tồn kho dưới Min |
| Danger | #DC2626 | Lỗi, thao tác xoá |
| Text | #1F2937 | Màu chữ chính |

## 3. Bố cục chung
- Ứng dụng Web SPA với thanh điều hướng trên (logo, tên người dùng, phím tắt) và menu bên trái.
- Vùng nội dung trung tâm hiển thị bảng dữ liệu hoặc form theo module.
- Tất cả form đặt ô quét Barcode/QR nổi bật ở đầu để đáp ứng yêu cầu thao tác nhanh.
- Các bảng dữ liệu có hàng kẻ nhạt, thanh tìm kiếm và bộ lọc phía trên.
- Badge màu cho trạng thái (Accent/Warning/Danger) giúp người dùng nhận biết.

## 4. Định hướng theo màn hình
### 4.1 Đăng nhập
- Nền Secondary phủ toàn màn hình, card đăng nhập trung tâm với viền Primary.
- Logo DEMAX phía trên, nút đăng nhập màu Accent; thông báo lỗi dùng màu Danger.

### 4.2 Dashboard
- Thẻ thống kê tóm tắt (Accent cho số liệu tốt, Warning cho tồn kho thấp).
- Biểu đồ tiến trình phiếu đặt ở phần trên; danh sách tác vụ gần đây bên dưới.

### 4.3 Layout chung & Navigation
- Sidebar nền Primary đậm với icon trắng; mục đang chọn dùng nền sáng hơn.
- Nội dung hiển thị dạng grid 12 cột, khoảng cách 16px.

### 4.4 Danh sách kho
- Bảng toàn trang, cột lọc bên phải.
- Nút "Tạo kho" màu Accent ở góc trên.

### 4.5 Form tạo/sửa kho
- Form hai cột, trường bắt buộc đánh dấu đỏ.
- Có tab "Thông tin chung" và "Địa điểm".

### 4.6 Quản lý bin
- Cây thư mục bên trái thể hiện khu/bin, bảng chi tiết bên phải.
- Màu Primary nhạt đánh dấu bin đang chọn.

### 4.7 Danh sách vật tư
- Bảng với ảnh nhỏ 40x40, bộ lọc theo nhóm và kho.
- Badge màu cảnh báo khi tồn < Min.

### 4.8 Form tạo/sửa vật tư
- Sử dụng các tab: Thông tin, BOM, Nhà cung cấp.
- Ô nhập mã SKU nằm đầu form, hỗ trợ quét.

### 4.9 Form nhập (GRN)
- Wizard 3 bước: Thông tin phiếu → Dòng vật tư → Xác nhận.
- Nút "Quét" màu Accent, cảnh báo màu Warning khi thiếu chứng từ.

### 4.10 Form xuất (Issue)
- Bố cục giống GRN, bổ sung trường "Phiếu lãnh".
- Màu Danger cho dòng xuất vượt tồn.

### 4.11 Form điều chuyển
- Hai cột song song: Kho nguồn và Kho đích.
- Màu Primary cho kho nguồn, Accent cho kho đích.

### 4.12 Danh sách BOM
- Bảng với khả năng mở rộng (accordion) để xem các vật tư con.
- Nút "Tạo BOM" đặt cố định ở góc dưới bên phải.

### 4.13 Chi tiết BOM
- Sơ đồ cây hiển thị cấp cha-con, mỗi cấp thụt 16px.
- Badge màu Warning khi thiếu vật tư hoặc chưa duyệt.

### 4.14 Yêu cầu lãnh vật tư
- Form dạng wizard theo quy trình duyệt.
- Thẻ trạng thái cho từng bước duyệt sử dụng Accent/Warning/Danger.

### 4.15 Phiếu yêu cầu mua (PR)
- Form nhiều phần: Thông tin, Dòng vật tư, Đính kèm.
- Dòng vật tư hiển thị màu Warning nếu vượt ngưỡng Min.

### 4.16 Đơn mua hàng (PO)
- Bố cục kế thừa từ PR, bổ sung trường Nhà cung cấp.
- Khi PO đã phát hành, banner nền Primary nhạt hiển thị số PO.

### 4.17 Báo cáo nhập–xuất–tồn
- Bộ lọc nằm trên, kết quả dạng bảng và biểu đồ cột.
- Sử dụng Accent cho dòng nhập, Danger cho dòng xuất.

### 4.18 Đồ thị thiếu hụt theo BOM
- Biểu đồ line/area màu Danger thể hiện chênh lệch, đường chuẩn màu Primary.

### 4.19 Báo cáo tuổi tồn
- Bảng phân nhóm theo tuổi; ô màu Warning khi > 6 tháng, Danger khi > 12 tháng.

### 4.20 Truy vết lô/serial
- Thanh tìm kiếm trên cùng, kết quả dạng timeline.
- Màu Accent cho trạng thái đã nhập, Primary cho đang lưu kho, Danger cho đã xuất.

### 4.21 Phân quyền hiển thị
- Các menu và nút ẩn/hiện tuỳ vai trò; sử dụng badge nhỏ hiển thị vai trò hiện tại trên header.

## 5. Tài liệu tham chiếu
- [README.md](../README.md)
- [SRS_Kho_DEMAX_2025-08-09_fixed.docx](../SRS_Kho_DEMAX_2025-08-09_fixed.docx)
- [SCREEN_TASKS.md](SCREEN_TASKS.md)
