-- Mock data for DEMAX Inventory

INSERT INTO roles (name, description) VALUES
  ('Kho', 'Quản lý kho'),
  ('Sản xuất', 'Nhân viên sản xuất'),
  ('Thu mua', 'Nhân viên thu mua'),
  ('Duyệt', 'Người duyệt'),
  ('Admin', 'Quản trị');

INSERT INTO users (username, password_hash, full_name, role_id) VALUES
  ('kho1', 'pass', 'Nguyễn Văn A', 1),
  ('sx1', 'pass', 'Trần Thị B', 2),
  ('tm1', 'pass', 'Phạm Văn C', 3),
  ('duyet1', 'pass', 'Lê Thị D', 4),
  ('admin', 'pass', 'Quản trị', 5);

INSERT INTO warehouses (code, name, location) VALUES
  ('WH1', 'Kho chính', 'Khu A'),
  ('WH2', 'Kho thành phẩm', 'Khu B');

INSERT INTO bins (warehouse_id, zone, code) VALUES
  (1, 'A', 'A1'),
  (1, 'A', 'A2'),
  (2, 'B', 'B1');

INSERT INTO item_groups (name) VALUES
  ('Nguyên liệu'),
  ('Hoá chất');

INSERT INTO uoms (code, name) VALUES
  ('TAM', 'Tấm'),
  ('LON', 'Lon'),
  ('KG', 'Ki-lô-gam'),
  ('CHIEC', 'Chiếc');

INSERT INTO items (sku, name, item_group_id, uom_id, min_qty, max_qty) VALUES
  ('VT001', 'Thép tấm', 1, 1, 10, 100),
  ('VT002', 'Sơn đỏ', 2, 2, 5, 50),
  ('VT003', 'Bulong M8', 1, 4, 50, 500),
  ('VT004', 'Đai ốc M8', 1, 4, 50, 500);

INSERT INTO suppliers (code, name, contact) VALUES
  ('NCC01', 'Công ty A', '0123456789'),
  ('NCC02', 'Công ty B', '0987654321');

INSERT INTO boms (code, description) VALUES
  ('BOM001', 'BOM demo');

INSERT INTO bom_items (bom_id, item_id, quantity, uom_id) VALUES
  (1, 3, 4, 4),
  (1, 1, 1, 1);

INSERT INTO inventory (item_id, warehouse_id, bin_id, quantity) VALUES
  (1, 1, 1, 100),
  (2, 1, 1, 50),
  (3, 1, 1, 200),
  (4, 1, 1, 200);

INSERT INTO grns (code, warehouse_id, supplier_id, received_by, approved_by, status, received_at) VALUES
  ('GRN-20250501-001', 1, 1, 1, 4, 'approved', '2025-05-01');

INSERT INTO grn_items (grn_id, item_id, quantity, uom_id, unit_price) VALUES
  (1, 3, 100, 4, 1000),
  (1, 4, 100, 4, 800);

INSERT INTO issues (code, warehouse_id, requested_by, approved_by, status, issued_at) VALUES
  ('ISS-20250502-001', 1, 2, 4, 'approved', '2025-05-02');

INSERT INTO issue_items (issue_id, item_id, quantity, uom_id) VALUES
  (1, 3, 40, 4),
  (1, 4, 40, 4);

INSERT INTO transfers (code, from_warehouse_id, to_warehouse_id, requested_by, approved_by, status, transferred_at) VALUES
  ('TRF-20250503-001', 1, 2, 1, 4, 'approved', '2025-05-03');

INSERT INTO transfer_items (transfer_id, item_id, quantity, uom_id) VALUES
  (1, 1, 20, 1);

INSERT INTO stocktakes (code, warehouse_id, counted_by, approved_by, status, counted_at) VALUES
  ('STK-20250504-001', 1, 1, 4, 'approved', '2025-05-04');

INSERT INTO stocktake_items (stocktake_id, item_id, system_qty, counted_qty) VALUES
  (1, 3, 200, 195),
  (1, 4, 200, 200);

INSERT INTO returns (code, warehouse_id, returned_by, approved_by, status, returned_at) VALUES
  ('RTN-20250505-001', 1, 2, 4, 'approved', '2025-05-05');

INSERT INTO return_items (return_id, item_id, quantity, uom_id) VALUES
  (1, 3, 10, 4);

INSERT INTO purchase_requests (code, requested_by, approved_by, status, requested_at) VALUES
  ('PR-20250506-001', 1, 4, 'approved', '2025-05-06');

INSERT INTO purchase_request_items (purchase_request_id, item_id, quantity, uom_id) VALUES
  (1, 1, 50, 1);

INSERT INTO purchase_orders (code, supplier_id, requested_by, approved_by, status, ordered_at) VALUES
  ('PO-20250507-001', 1, 3, 5, 'approved', '2025-05-07');

INSERT INTO purchase_order_items (purchase_order_id, item_id, quantity, uom_id, unit_price) VALUES
  (1, 1, 50, 1, 2000);
