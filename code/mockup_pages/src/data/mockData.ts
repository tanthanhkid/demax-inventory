import { 
  User, Role, Warehouse, Bin, ItemGroup, UOM, Item, Supplier, 
  BOM, BOMItem, GRN, GRNItem, Issue, IssueItem, Transfer, TransferItem,
  Stocktake, StocktakeItem, Return, ReturnItem, PurchaseRequest, 
  PurchaseRequestItem, PurchaseOrder, PurchaseOrderItem, Inventory,
  DashboardStats, ChartData 
} from '../types';

// Mock Users & Roles
export const mockRoles: Role[] = [
  { id: 1, name: 'Admin', description: 'Quản trị hệ thống' },
  { id: 2, name: 'Kho', description: 'Nhân viên kho' },
  { id: 3, name: 'Sản xuất', description: 'Nhân viên sản xuất' },
  { id: 4, name: 'Kỹ thuật', description: 'Nhân viên kỹ thuật' },
  { id: 5, name: 'Thu mua', description: 'Nhân viên thu mua' },
  { id: 6, name: 'Duyệt 1', description: 'Duyệt cấp 1' },
  { id: 7, name: 'Duyệt 2', description: 'Duyệt cấp 2' },
  { id: 8, name: 'CEO', description: 'Giám đốc điều hành' },
];

export const mockUsers: User[] = [
  { id: 1, username: 'admin', full_name: 'Administrator', role_id: 1, role_name: 'Admin' },
  { id: 2, username: 'kho1', full_name: 'Nguyễn Văn Kho', role_id: 2, role_name: 'Kho' },
  { id: 3, username: 'sx1', full_name: 'Trần Thị Sản Xuất', role_id: 3, role_name: 'Sản xuất' },
  { id: 4, username: 'kt1', full_name: 'Lê Văn Kỹ Thuật', role_id: 4, role_name: 'Kỹ thuật' },
  { id: 5, username: 'tm1', full_name: 'Phạm Thị Thu Mua', role_id: 5, role_name: 'Thu mua' },
  { id: 6, username: 'duyet1', full_name: 'Hoàng Văn Duyệt 1', role_id: 6, role_name: 'Duyệt 1' },
  { id: 7, username: 'duyet2', full_name: 'Vũ Thị Duyệt 2', role_id: 7, role_name: 'Duyệt 2' },
  { id: 8, username: 'ceo', full_name: 'CEO DEMAX', role_id: 8, role_name: 'CEO' },
];

// Mock Warehouses & Bins
export const mockWarehouses: Warehouse[] = [
  { id: 1, code: 'WH001', name: 'Kho chung vật tư', location: 'Tầng 1, Tòa A' },
  { id: 2, code: 'WH002', name: 'Kho thành phẩm', location: 'Tầng 2, Tòa B' },
  { id: 3, code: 'WH003', name: 'Kho phân xưởng 1', location: 'Phân xưởng 1' },
  { id: 4, code: 'WH004', name: 'Kho phân xưởng 2', location: 'Phân xưởng 2' },
];

export const mockBins: Bin[] = [
  { id: 1, warehouse_id: 1, warehouse_name: 'Kho chung vật tư', zone: 'A', code: 'A01' },
  { id: 2, warehouse_id: 1, warehouse_name: 'Kho chung vật tư', zone: 'A', code: 'A02' },
  { id: 3, warehouse_id: 1, warehouse_name: 'Kho chung vật tư', zone: 'B', code: 'B01' },
  { id: 4, warehouse_id: 1, warehouse_name: 'Kho chung vật tư', zone: 'B', code: 'B02' },
  { id: 5, warehouse_id: 2, warehouse_name: 'Kho thành phẩm', zone: 'A', code: 'A01' },
  { id: 6, warehouse_id: 2, warehouse_name: 'Kho thành phẩm', zone: 'A', code: 'A02' },
  { id: 7, warehouse_id: 3, warehouse_name: 'Kho phân xưởng 1', zone: 'A', code: 'A01' },
  { id: 8, warehouse_id: 4, warehouse_name: 'Kho phân xưởng 2', zone: 'A', code: 'A01' },
];

// Mock Item Groups & UOMs
export const mockItemGroups: ItemGroup[] = [
  { id: 1, name: 'Vật tư điện' },
  { id: 2, name: 'Vật tư cơ khí' },
  { id: 3, name: 'Vật tư hóa chất' },
  { id: 4, name: 'Bao bì' },
  { id: 5, name: 'Thành phẩm' },
];

export const mockUOMs: UOM[] = [
  { id: 1, code: 'PCS', name: 'Cái' },
  { id: 2, code: 'KG', name: 'Kilogram' },
  { id: 3, code: 'M', name: 'Mét' },
  { id: 4, code: 'L', name: 'Lít' },
  { id: 5, code: 'BOX', name: 'Hộp' },
  { id: 6, code: 'ROLL', name: 'Cuộn' },
];

// Mock Items
export const mockItems: Item[] = [
  { 
    id: 1, sku: 'SKU001', name: 'Cáp điện 2x1.5mm', item_group_id: 1, item_group_name: 'Vật tư điện',
    uom_id: 3, uom_name: 'Mét', min_qty: 100, max_qty: 1000, current_stock: 250
  },
  { 
    id: 2, sku: 'SKU002', name: 'Công tắc 1 chiều', item_group_id: 1, item_group_name: 'Vật tư điện',
    uom_id: 1, uom_name: 'Cái', min_qty: 50, max_qty: 500, current_stock: 30
  },
  { 
    id: 3, sku: 'SKU003', name: 'Ống thép phi 21', item_group_id: 2, item_group_name: 'Vật tư cơ khí',
    uom_id: 3, uom_name: 'Mét', min_qty: 200, max_qty: 2000, current_stock: 150
  },
  { 
    id: 4, sku: 'SKU004', name: 'Sơn chống gỉ', item_group_id: 3, item_group_name: 'Vật tư hóa chất',
    uom_id: 4, uom_name: 'Lít', min_qty: 20, max_qty: 200, current_stock: 15
  },
  { 
    id: 5, sku: 'SKU005', name: 'Thùng carton 30x40x50', item_group_id: 4, item_group_name: 'Bao bì',
    uom_id: 1, uom_name: 'Cái', min_qty: 100, max_qty: 1000, current_stock: 80
  },
  { 
    id: 6, sku: 'SKU006', name: 'Sản phẩm A', item_group_id: 5, item_group_name: 'Thành phẩm',
    uom_id: 1, uom_name: 'Cái', min_qty: 10, max_qty: 100, current_stock: 25
  },
];

// Mock Suppliers
export const mockSuppliers: Supplier[] = [
  { id: 1, code: 'SUP001', name: 'Công ty TNHH ABC', contact: '0901234567' },
  { id: 2, code: 'SUP002', name: 'Công ty CP XYZ', contact: '0909876543' },
  { id: 3, code: 'SUP003', name: 'Công ty TNHH DEF', contact: '0905555555' },
];

// Mock BOMs
export const mockBOMs: BOM[] = [
  { id: 1, code: 'BOM001', description: 'BOM sản phẩm A', status: 'active', created_at: '2024-01-15' },
  { id: 2, code: 'BOM002', description: 'BOM sản phẩm B', status: 'draft', created_at: '2024-01-20' },
  { id: 3, code: 'BOM003', description: 'BOM sản phẩm C', status: 'active', created_at: '2024-01-25' },
];

export const mockBOMItems: BOMItem[] = [
  { id: 1, bom_id: 1, item_id: 1, item_name: 'Cáp điện 2x1.5mm', item_sku: 'SKU001', quantity: 2, uom_id: 3, uom_name: 'Mét' },
  { id: 2, bom_id: 1, item_id: 2, item_name: 'Công tắc 1 chiều', item_sku: 'SKU002', quantity: 1, uom_id: 1, uom_name: 'Cái' },
  { id: 3, bom_id: 1, item_id: 3, item_name: 'Ống thép phi 21', item_sku: 'SKU003', quantity: 1.5, uom_id: 3, uom_name: 'Mét' },
  { id: 4, bom_id: 2, item_id: 4, item_name: 'Sơn chống gỉ', item_sku: 'SKU004', quantity: 0.5, uom_id: 4, uom_name: 'Lít' },
  { id: 5, bom_id: 2, item_id: 5, item_name: 'Thùng carton 30x40x50', item_sku: 'SKU005', quantity: 1, uom_id: 1, uom_name: 'Cái' },
];

// Mock GRNs
export const mockGRNs: GRN[] = [
  {
    id: 1,
    code: 'GRN-20240101-001',
    warehouse_id: 1,
    warehouse_name: 'Kho chung vật tư',
    supplier_id: 1,
    supplier_name: 'Công ty TNHH ABC',
    received_by: 2,
    received_by_name: 'Nguyễn Văn Kho',
    approved_by: 6,
    approved_by_name: 'Hoàng Văn Duyệt 1',
    status: 'approved',
    received_at: '2024-01-01 09:00:00',
    items: [
      { id: 1, grn_id: 1, item_id: 1, item_name: 'Cáp điện 2x1.5mm', item_sku: 'SKU001', quantity: 500, uom_id: 3, uom_name: 'Mét', unit_price: 15000 },
      { id: 2, grn_id: 1, item_id: 2, item_name: 'Công tắc 1 chiều', item_sku: 'SKU002', quantity: 200, uom_id: 1, uom_name: 'Cái', unit_price: 25000 },
    ]
  },
  {
    id: 2,
    code: 'GRN-20240102-001',
    warehouse_id: 1,
    warehouse_name: 'Kho chung vật tư',
    supplier_id: 2,
    supplier_name: 'Công ty CP XYZ',
    received_by: 2,
    received_by_name: 'Nguyễn Văn Kho',
    status: 'pending',
    received_at: '2024-01-02 14:30:00',
    items: [
      { id: 3, grn_id: 2, item_id: 3, item_name: 'Ống thép phi 21', item_sku: 'SKU003', quantity: 1000, uom_id: 3, uom_name: 'Mét', unit_price: 45000 },
    ]
  },
];

// Mock Issues
export const mockIssues: Issue[] = [
  {
    id: 1,
    code: 'ISSUE-20240101-001',
    warehouse_id: 1,
    warehouse_name: 'Kho chung vật tư',
    requested_by: 3,
    requested_by_name: 'Trần Thị Sản Xuất',
    approved_by: 6,
    approved_by_name: 'Hoàng Văn Duyệt 1',
    status: 'issued',
    issued_at: '2024-01-01 10:00:00',
    items: [
      { id: 1, issue_id: 1, item_id: 1, item_name: 'Cáp điện 2x1.5mm', item_sku: 'SKU001', quantity: 100, uom_id: 3, uom_name: 'Mét' },
      { id: 2, issue_id: 1, item_id: 2, item_name: 'Công tắc 1 chiều', item_sku: 'SKU002', quantity: 50, uom_id: 1, uom_name: 'Cái' },
    ]
  },
  {
    id: 2,
    code: 'ISSUE-20240102-001',
    warehouse_id: 1,
    warehouse_name: 'Kho chung vật tư',
    requested_by: 4,
    requested_by_name: 'Lê Văn Kỹ Thuật',
    status: 'pending',
    issued_at: '2024-01-02 15:00:00',
    items: [
      { id: 3, issue_id: 2, item_id: 3, item_name: 'Ống thép phi 21', item_sku: 'SKU003', quantity: 200, uom_id: 3, uom_name: 'Mét' },
    ]
  },
];

// Mock Transfers
export const mockTransfers: Transfer[] = [
  {
    id: 1,
    code: 'TRF-20240101-001',
    from_warehouse_id: 1,
    from_warehouse_name: 'Kho chung vật tư',
    to_warehouse_id: 3,
    to_warehouse_name: 'Kho phân xưởng 1',
    requested_by: 2,
    requested_by_name: 'Nguyễn Văn Kho',
    approved_by: 6,
    approved_by_name: 'Hoàng Văn Duyệt 1',
    status: 'transferred',
    transferred_at: '2024-01-01 11:00:00',
    items: [
      { id: 1, transfer_id: 1, item_id: 1, item_name: 'Cáp điện 2x1.5mm', item_sku: 'SKU001', quantity: 50, uom_id: 3, uom_name: 'Mét' },
    ]
  },
];

// Mock Stocktakes
export const mockStocktakes: Stocktake[] = [
  {
    id: 1,
    code: 'STK-20240101-001',
    warehouse_id: 1,
    warehouse_name: 'Kho chung vật tư',
    counted_by: 2,
    counted_by_name: 'Nguyễn Văn Kho',
    approved_by: 6,
    approved_by_name: 'Hoàng Văn Duyệt 1',
    status: 'approved',
    counted_at: '2024-01-01 16:00:00',
    items: [
      { id: 1, stocktake_id: 1, item_id: 1, item_name: 'Cáp điện 2x1.5mm', item_sku: 'SKU001', system_qty: 250, counted_qty: 248, difference: -2 },
      { id: 2, stocktake_id: 1, item_id: 2, item_name: 'Công tắc 1 chiều', item_sku: 'SKU002', system_qty: 30, counted_qty: 30, difference: 0 },
    ]
  },
];

// Mock Returns
export const mockReturns: Return[] = [
  {
    id: 1,
    code: 'RET-20240101-001',
    warehouse_id: 1,
    warehouse_name: 'Kho chung vật tư',
    returned_by: 3,
    returned_by_name: 'Trần Thị Sản Xuất',
    status: 'pending',
    returned_at: '2024-01-01 17:00:00',
    items: [
      { id: 1, return_id: 1, item_id: 1, item_name: 'Cáp điện 2x1.5mm', item_sku: 'SKU001', quantity: 10, uom_id: 3, uom_name: 'Mét' },
    ]
  },
];

// Mock Purchase Requests
export const mockPurchaseRequests: PurchaseRequest[] = [
  {
    id: 1,
    code: 'PR-20240101-001',
    requested_by: 5,
    requested_by_name: 'Phạm Thị Thu Mua',
    approved_by: 6,
    approved_by_name: 'Hoàng Văn Duyệt 1',
    status: 'approved',
    requested_at: '2024-01-01 08:00:00',
    items: [
      { id: 1, purchase_request_id: 1, item_id: 2, item_name: 'Công tắc 1 chiều', item_sku: 'SKU002', quantity: 100, uom_id: 1, uom_name: 'Cái' },
    ]
  },
];

// Mock Purchase Orders
export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 1,
    code: 'PO-20240101-001',
    supplier_id: 1,
    supplier_name: 'Công ty TNHH ABC',
    requested_by: 5,
    requested_by_name: 'Phạm Thị Thu Mua',
    approved_by: 8,
    approved_by_name: 'CEO DEMAX',
    status: 'ordered',
    ordered_at: '2024-01-01 09:00:00',
    items: [
      { id: 1, purchase_order_id: 1, item_id: 2, item_name: 'Công tắc 1 chiều', item_sku: 'SKU002', quantity: 100, uom_id: 1, uom_name: 'Cái', unit_price: 25000 },
    ]
  },
];

// Mock Inventory
export const mockInventory: Inventory[] = [
  { id: 1, item_id: 1, item_name: 'Cáp điện 2x1.5mm', item_sku: 'SKU001', warehouse_id: 1, warehouse_name: 'Kho chung vật tư', bin_id: 1, bin_code: 'A01', quantity: 248, uom_name: 'Mét' },
  { id: 2, item_id: 2, item_name: 'Công tắc 1 chiều', item_sku: 'SKU002', warehouse_id: 1, warehouse_name: 'Kho chung vật tư', bin_id: 2, bin_code: 'A02', quantity: 30, uom_name: 'Cái' },
  { id: 3, item_id: 3, item_name: 'Ống thép phi 21', item_sku: 'SKU003', warehouse_id: 1, warehouse_name: 'Kho chung vật tư', bin_id: 3, bin_code: 'B01', quantity: 150, uom_name: 'Mét' },
  { id: 4, item_id: 4, item_name: 'Sơn chống gỉ', item_sku: 'SKU004', warehouse_id: 1, warehouse_name: 'Kho chung vật tư', bin_id: 4, bin_code: 'B02', quantity: 15, uom_name: 'Lít' },
  { id: 5, item_id: 5, item_name: 'Thùng carton 30x40x50', item_sku: 'SKU005', warehouse_id: 1, warehouse_name: 'Kho chung vật tư', bin_id: 1, bin_code: 'A01', quantity: 80, uom_name: 'Cái' },
  { id: 6, item_id: 6, item_name: 'Sản phẩm A', item_sku: 'SKU006', warehouse_id: 2, warehouse_name: 'Kho thành phẩm', bin_id: 5, bin_code: 'A01', quantity: 25, uom_name: 'Cái' },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  total_items: 6,
  low_stock_items: 2,
  pending_grns: 1,
  pending_issues: 1,
  pending_transfers: 0,
  pending_stocktakes: 0,
  pending_returns: 1,
  pending_prs: 0,
  pending_pos: 0,
};

// Mock Chart Data
export const mockChartData: ChartData[] = [
  { name: 'Nhập kho', value: 2, color: '#16A34A' },
  { name: 'Xuất kho', value: 2, color: '#DC2626' },
  { name: 'Điều chuyển', value: 1, color: '#0E4F9E' },
  { name: 'Kiểm kê', value: 1, color: '#F59E0B' },
];
