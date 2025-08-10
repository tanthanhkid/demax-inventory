// User types
export interface User {
  id: number;
  username: string;
  full_name: string;
  role_id: number;
  role_name: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
}

// Warehouse types
export interface Warehouse {
  id: number;
  code: string;
  name: string;
  location: string;
}

export interface Bin {
  id: number;
  warehouse_id: number;
  warehouse_name: string;
  zone: string;
  code: string;
}

// Item types
export interface ItemGroup {
  id: number;
  name: string;
}

export interface UOM {
  id: number;
  code: string;
  name: string;
}

export interface Item {
  id: number;
  sku: string;
  name: string;
  item_group_id: number;
  item_group_name: string;
  uom_id: number;
  uom_name: string;
  min_qty: number;
  max_qty: number;
  current_stock?: number;
}

export interface Supplier {
  id: number;
  code: string;
  name: string;
  contact: string;
}

// BOM types
export interface BOM {
  id: number;
  code: string;
  description: string;
  status: 'draft' | 'active' | 'inactive';
  created_at: string;
}

export interface BOMItem {
  id: number;
  bom_id: number;
  item_id: number;
  item_name: string;
  item_sku: string;
  quantity: number;
  uom_id: number;
  uom_name: string;
}

// Transaction types
export interface GRN {
  id: number;
  code: string;
  warehouse_id: number;
  warehouse_name: string;
  supplier_id: number;
  supplier_name: string;
  received_by: number;
  received_by_name: string;
  approved_by?: number;
  approved_by_name?: string;
  status: 'pending' | 'approved' | 'rejected';
  received_at: string;
  items: GRNItem[];
}

export interface GRNItem {
  id: number;
  grn_id: number;
  item_id: number;
  item_name: string;
  item_sku: string;
  quantity: number;
  uom_id: number;
  uom_name: string;
  unit_price: number;
}

export interface Issue {
  id: number;
  code: string;
  warehouse_id: number;
  warehouse_name: string;
  requested_by: number;
  requested_by_name: string;
  approved_by?: number;
  approved_by_name?: string;
  status: 'pending' | 'approved' | 'rejected' | 'issued';
  issued_at: string;
  items: IssueItem[];
}

export interface IssueItem {
  id: number;
  issue_id: number;
  item_id: number;
  item_name: string;
  item_sku: string;
  quantity: number;
  uom_id: number;
  uom_name: string;
}

export interface Transfer {
  id: number;
  code: string;
  from_warehouse_id: number;
  from_warehouse_name: string;
  to_warehouse_id: number;
  to_warehouse_name: string;
  requested_by: number;
  requested_by_name: string;
  approved_by?: number;
  approved_by_name?: string;
  status: 'pending' | 'approved' | 'rejected' | 'transferred';
  transferred_at: string;
  items: TransferItem[];
}

export interface TransferItem {
  id: number;
  transfer_id: number;
  item_id: number;
  item_name: string;
  item_sku: string;
  quantity: number;
  uom_id: number;
  uom_name: string;
}

export interface Stocktake {
  id: number;
  code: string;
  warehouse_id: number;
  warehouse_name: string;
  counted_by: number;
  counted_by_name: string;
  approved_by?: number;
  approved_by_name?: string;
  status: 'pending' | 'approved' | 'rejected';
  counted_at: string;
  items: StocktakeItem[];
}

export interface StocktakeItem {
  id: number;
  stocktake_id: number;
  item_id: number;
  item_name: string;
  item_sku: string;
  system_qty: number;
  counted_qty: number;
  difference: number;
}

export interface Return {
  id: number;
  code: string;
  warehouse_id: number;
  warehouse_name: string;
  returned_by: number;
  returned_by_name: string;
  approved_by?: number;
  approved_by_name?: string;
  status: 'pending' | 'approved' | 'rejected';
  returned_at: string;
  items: ReturnItem[];
}

export interface ReturnItem {
  id: number;
  return_id: number;
  item_id: number;
  item_name: string;
  item_sku: string;
  quantity: number;
  uom_id: number;
  uom_name: string;
}

// Purchase types
export interface PurchaseRequest {
  id: number;
  code: string;
  requested_by: number;
  requested_by_name: string;
  approved_by?: number;
  approved_by_name?: string;
  status: 'pending' | 'approved' | 'rejected';
  requested_at: string;
  items: PurchaseRequestItem[];
}

export interface PurchaseRequestItem {
  id: number;
  purchase_request_id: number;
  item_id: number;
  item_name: string;
  item_sku: string;
  quantity: number;
  uom_id: number;
  uom_name: string;
}

export interface PurchaseOrder {
  id: number;
  code: string;
  supplier_id: number;
  supplier_name: string;
  requested_by: number;
  requested_by_name: string;
  approved_by?: number;
  approved_by_name?: string;
  status: 'pending' | 'approved' | 'rejected' | 'ordered';
  ordered_at: string;
  items: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
  id: number;
  purchase_order_id: number;
  item_id: number;
  item_name: string;
  item_sku: string;
  quantity: number;
  uom_id: number;
  uom_name: string;
  unit_price: number;
}

// Inventory types
export interface Inventory {
  id: number;
  item_id: number;
  item_name: string;
  item_sku: string;
  warehouse_id: number;
  warehouse_name: string;
  bin_id?: number;
  bin_code?: string;
  quantity: number;
  uom_name: string;
}

// Dashboard types
export interface DashboardStats {
  total_items: number;
  low_stock_items: number;
  pending_grns: number;
  pending_issues: number;
  pending_transfers: number;
  pending_stocktakes: number;
  pending_returns: number;
  pending_prs: number;
  pending_pos: number;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}
