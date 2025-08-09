# Kế hoạch quản lý dự án

## Checklist công việc

- [ ] Tạo mockup màn hình bằng HTML (An) – review giao diện trước khi thiết kế database
- [ ] Thiết kế cơ sở dữ liệu (Bình)
  - [ ] Kho, Khu/Bin, Vật tư (SKU), ĐVT, Nhóm vật tư, Nhà cung cấp
  - [ ] BOM, Người dùng & Vai trò
  - [ ] Giao dịch: GRN, Issue, Điều chuyển, Kiểm kê/Điều chỉnh, PR, PO
- [ ] Xây dựng API (Châu)
  - [ ] `POST /auth/login`
  - [ ] CRUD danh mục: kho, bin, vật tư, ĐVT, nhóm vật tư, nhà cung cấp, BOM, người dùng & vai trò
  - [ ] Giao dịch: GRN, Issue, Điều chuyển, Kiểm kê/Điều chỉnh, PR, PO
- [ ] Tích hợp hệ thống/thiết bị bên ngoài (Dũng)
  - [ ] Barcode/QR scanner
  - [ ] Email/SMS/Chat
  - [ ] ERP/Kế toán (tương lai)
  - [ ] In tem nhãn ZPL/TSPL
- [ ] Thiết kế và phát triển các màn hình (Lan)
  - [ ] Đăng nhập
  - [ ] Dashboard theo dõi
  - [ ] Quản lý kho & nhập/xuất
  - [ ] Quản lý BOM
  - [ ] Lãnh vật tư theo BOM/kho chung
  - [ ] Thu mua
  - [ ] Báo cáo tồn kho & truy vết
- [ ] Thiết lập role và phân quyền (Minh)
  - [ ] Kho
  - [ ] SX-KT
  - [ ] Thu mua
  - [ ] Duyệt
  - [ ] CEO
  - [ ] Admin

