-- DEMAX Inventory database schema for PostgreSQL
-- Generated based on README, SRS summary, and mockup code

CREATE TABLE roles (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE users (
    id            BIGSERIAL PRIMARY KEY,
    username      VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name     VARCHAR(100),
    role_id       BIGINT REFERENCES roles(id)
);

CREATE TABLE warehouses (
    id       BIGSERIAL PRIMARY KEY,
    code     VARCHAR(20) NOT NULL UNIQUE,
    name     VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);

CREATE TABLE bins (
    id           BIGSERIAL PRIMARY KEY,
    warehouse_id BIGINT REFERENCES warehouses(id),
    zone         VARCHAR(20),
    code         VARCHAR(20) NOT NULL,
    UNIQUE (warehouse_id, zone, code)
);

CREATE TABLE item_groups (
    id   BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE uoms (
    id   BIGSERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE items (
    id            BIGSERIAL PRIMARY KEY,
    sku           VARCHAR(50) NOT NULL UNIQUE,
    name          VARCHAR(100) NOT NULL,
    item_group_id BIGINT REFERENCES item_groups(id),
    uom_id        BIGINT REFERENCES uoms(id),
    min_qty       NUMERIC(12,3),
    max_qty       NUMERIC(12,3)
);

CREATE TABLE suppliers (
    id      BIGSERIAL PRIMARY KEY,
    code    VARCHAR(20) NOT NULL UNIQUE,
    name    VARCHAR(100) NOT NULL,
    contact VARCHAR(100)
);

CREATE TABLE boms (
    id          BIGSERIAL PRIMARY KEY,
    code        VARCHAR(20) NOT NULL UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE bom_items (
    id     BIGSERIAL PRIMARY KEY,
    bom_id BIGINT REFERENCES boms(id),
    item_id BIGINT REFERENCES items(id),
    quantity NUMERIC(12,3) NOT NULL,
    uom_id  BIGINT REFERENCES uoms(id)
);

CREATE TABLE inventory (
    id           BIGSERIAL PRIMARY KEY,
    item_id      BIGINT REFERENCES items(id),
    warehouse_id BIGINT REFERENCES warehouses(id),
    bin_id       BIGINT REFERENCES bins(id),
    quantity     NUMERIC(12,3) NOT NULL DEFAULT 0
);

CREATE TABLE grns (
    id           BIGSERIAL PRIMARY KEY,
    code         VARCHAR(30) NOT NULL UNIQUE,
    warehouse_id BIGINT REFERENCES warehouses(id),
    supplier_id  BIGINT REFERENCES suppliers(id),
    received_by  BIGINT REFERENCES users(id),
    approved_by  BIGINT REFERENCES users(id),
    status       VARCHAR(20) NOT NULL DEFAULT 'pending',
    received_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE grn_items (
    id      BIGSERIAL PRIMARY KEY,
    grn_id  BIGINT REFERENCES grns(id),
    item_id BIGINT REFERENCES items(id),
    quantity NUMERIC(12,3) NOT NULL,
    uom_id  BIGINT REFERENCES uoms(id),
    unit_price NUMERIC(12,2)
);

CREATE TABLE issues (
    id           BIGSERIAL PRIMARY KEY,
    code         VARCHAR(30) NOT NULL UNIQUE,
    warehouse_id BIGINT REFERENCES warehouses(id),
    requested_by BIGINT REFERENCES users(id),
    approved_by  BIGINT REFERENCES users(id),
    status       VARCHAR(20) NOT NULL DEFAULT 'pending',
    issued_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE issue_items (
    id       BIGSERIAL PRIMARY KEY,
    issue_id BIGINT REFERENCES issues(id),
    item_id  BIGINT REFERENCES items(id),
    quantity NUMERIC(12,3) NOT NULL,
    uom_id   BIGINT REFERENCES uoms(id)
);

CREATE TABLE transfers (
    id                BIGSERIAL PRIMARY KEY,
    code              VARCHAR(30) NOT NULL UNIQUE,
    from_warehouse_id BIGINT REFERENCES warehouses(id),
    to_warehouse_id   BIGINT REFERENCES warehouses(id),
    requested_by      BIGINT REFERENCES users(id),
    approved_by       BIGINT REFERENCES users(id),
    status            VARCHAR(20) NOT NULL DEFAULT 'pending',
    transferred_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE transfer_items (
    id          BIGSERIAL PRIMARY KEY,
    transfer_id BIGINT REFERENCES transfers(id),
    item_id     BIGINT REFERENCES items(id),
    quantity    NUMERIC(12,3) NOT NULL,
    uom_id      BIGINT REFERENCES uoms(id)
);

CREATE TABLE stocktakes (
    id          BIGSERIAL PRIMARY KEY,
    code        VARCHAR(30) NOT NULL UNIQUE,
    warehouse_id BIGINT REFERENCES warehouses(id),
    counted_by  BIGINT REFERENCES users(id),
    approved_by BIGINT REFERENCES users(id),
    status      VARCHAR(20) NOT NULL DEFAULT 'pending',
    counted_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE stocktake_items (
    id           BIGSERIAL PRIMARY KEY,
    stocktake_id BIGINT REFERENCES stocktakes(id),
    item_id      BIGINT REFERENCES items(id),
    system_qty   NUMERIC(12,3) NOT NULL,
    counted_qty  NUMERIC(12,3) NOT NULL
);

CREATE TABLE returns (
    id           BIGSERIAL PRIMARY KEY,
    code         VARCHAR(30) NOT NULL UNIQUE,
    warehouse_id BIGINT REFERENCES warehouses(id),
    returned_by  BIGINT REFERENCES users(id),
    approved_by  BIGINT REFERENCES users(id),
    status       VARCHAR(20) NOT NULL DEFAULT 'pending',
    returned_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE return_items (
    id        BIGSERIAL PRIMARY KEY,
    return_id BIGINT REFERENCES returns(id),
    item_id   BIGINT REFERENCES items(id),
    quantity  NUMERIC(12,3) NOT NULL,
    uom_id    BIGINT REFERENCES uoms(id)
);

CREATE TABLE purchase_requests (
    id          BIGSERIAL PRIMARY KEY,
    code        VARCHAR(30) NOT NULL UNIQUE,
    requested_by BIGINT REFERENCES users(id),
    approved_by  BIGINT REFERENCES users(id),
    status      VARCHAR(20) NOT NULL DEFAULT 'pending',
    requested_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE purchase_request_items (
    id                  BIGSERIAL PRIMARY KEY,
    purchase_request_id BIGINT REFERENCES purchase_requests(id),
    item_id             BIGINT REFERENCES items(id),
    quantity            NUMERIC(12,3) NOT NULL,
    uom_id              BIGINT REFERENCES uoms(id)
);

CREATE TABLE purchase_orders (
    id           BIGSERIAL PRIMARY KEY,
    code         VARCHAR(30) NOT NULL UNIQUE,
    supplier_id  BIGINT REFERENCES suppliers(id),
    requested_by BIGINT REFERENCES users(id),
    approved_by  BIGINT REFERENCES users(id),
    status       VARCHAR(20) NOT NULL DEFAULT 'pending',
    ordered_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE purchase_order_items (
    id                 BIGSERIAL PRIMARY KEY,
    purchase_order_id  BIGINT REFERENCES purchase_orders(id),
    item_id            BIGINT REFERENCES items(id),
    quantity           NUMERIC(12,3) NOT NULL,
    uom_id             BIGINT REFERENCES uoms(id),
    unit_price         NUMERIC(12,2)
);
