# Mockup Code Mapping

This document links each UI mockup with the relevant business requirement section in the SRS summary (`README.md`).

| Mockup file | Screen / Feature | Business requirement reference | Database tables |
|-------------|-----------------|--------------------------------|-----------------|
| login.html | Đăng nhập hệ thống | §6.1 Phân quyền – quản lý vai trò và đăng nhập【F:README.md†L194-L197】 | users, roles |
| dashboard.html | Dashboard tiến trình | §3 Yêu cầu UI/UX – Dashboard theo dõi tiến trình phiếu【F:README.md†L55-L59】 | grns, issues, transfers, stocktakes, returns, purchase_requests, purchase_orders |
| warehouses.html | Danh sách kho | §4.1 Danh mục chính – Kho【F:README.md†L61-L63】 | warehouses |
| bins.html | Quản lý bin/khu | §4.1 Danh mục chính – Khu/Bin【F:README.md†L61-L63】 | bins |
| items.html | Danh sách vật tư | §4.1 Danh mục chính – Vật tư (SKU)【F:README.md†L61-L63】 | items |
| item_groups.html | Nhóm vật tư | §4.1 Danh mục chính – Nhóm vật tư【F:README.md†L61-L63】 | item_groups |
| uoms.html | Đơn vị tính | §4.1 Danh mục chính – ĐVT (UoM)【F:README.md†L61-L63】 | uoms |
| suppliers.html | Nhà cung cấp | §4.1 Danh mục chính – Nhà cung cấp【F:README.md†L61-L63】 | suppliers |
| users.html | Người dùng | §4.1 Danh mục chính – Người dùng & Vai trò【F:README.md†L61-L63】 | users |
| roles.html | Vai trò | §4.1 Danh mục chính – Người dùng & Vai trò【F:README.md†L61-L63】 | roles |
| grn_form.html | Tạo phiếu nhập (GRN) | §5.1 Quản lý kho & nhập/xuất – Nhập kho【F:README.md†L71-L75】 | grns, grn_items |
| grn_approval.html | Duyệt phiếu nhập | §5.1 Quản lý kho & nhập/xuất – Nhập kho (duyệt)【F:README.md†L71-L75】 | grns, grn_items |
| issue_form.html | Tạo phiếu xuất (Issue) | §5.1 Quản lý kho & nhập/xuất – Xuất kho【F:README.md†L71-L75】 | issues, issue_items |
| issue_approval.html | Duyệt phiếu xuất | §5.1 Quản lý kho & nhập/xuất – Xuất kho (duyệt)【F:README.md†L71-L75】 | issues, issue_items |
| transfer_form.html | Tạo phiếu điều chuyển | §5.1 Quản lý kho & nhập/xuất – Điều chuyển nội bộ【F:README.md†L71-L75】 | transfers, transfer_items |
| transfer_approval.html | Duyệt điều chuyển | §5.1 Quản lý kho & nhập/xuất – Điều chuyển nội bộ (duyệt)【F:README.md†L71-L75】 | transfers, transfer_items |
| stocktake_form.html | Tạo phiếu kiểm kê | §5.1 Quản lý kho & nhập/xuất – Kiểm kê & điều chỉnh【F:README.md†L71-L75】 | stocktakes, stocktake_items |
| stocktake_approval.html | Duyệt phiếu kiểm kê | §5.1 Quản lý kho & nhập/xuất – Kiểm kê & điều chỉnh (duyệt)【F:README.md†L71-L75】 | stocktakes, stocktake_items |
| return_form.html | Tạo phiếu trả hàng | §5.1 Quản lý kho & nhập/xuất – Trả hàng【F:README.md†L71-L75】 | returns, return_items |
| return_approval.html | Duyệt phiếu trả hàng | §5.1 Quản lý kho & nhập/xuất – Trả hàng (duyệt)【F:README.md†L71-L75】 | returns, return_items |
| bom_list.html | Danh sách BOM | §5.2 Quản lý BOM【F:README.md†L130-L134】 | boms, bom_items |
| bom_detail.html | Chi tiết BOM | §5.2 Quản lý BOM【F:README.md†L130-L134】 | boms, bom_items |
| bom_form.html | Tạo/Sửa BOM | §5.2 Quản lý BOM【F:README.md†L130-L134】 | boms, bom_items |
| request_issue_bom.html | Lãnh theo BOM | §5.3 Lãnh vật tư theo BOM/kho chung【F:README.md†L148-L153】 | issues, issue_items, boms, bom_items |
| request_issue_general.html | Lãnh kho chung | §5.3 Lãnh vật tư theo BOM/kho chung【F:README.md†L148-L153】 | issues, issue_items |
| pr_form.html | Phiếu yêu cầu mua (PR) | §5.4 Thu mua【F:README.md†L169-L172】 | purchase_requests, purchase_request_items |
| pr_approval.html | Duyệt phiếu yêu cầu mua | §5.4 Thu mua (duyệt)【F:README.md†L169-L172】 | purchase_requests, purchase_request_items |
| po_form.html | Đơn mua hàng (PO) | §5.4 Thu mua【F:README.md†L169-L172】 | purchase_orders, purchase_order_items |
| po_approval.html | Duyệt đơn mua | §5.4 Thu mua (duyệt)【F:README.md†L169-L172】 | purchase_orders, purchase_order_items |
| report_inventory.html | Báo cáo tồn kho | §5.5 Báo cáo【F:README.md†L191-L192】 | inventory |
