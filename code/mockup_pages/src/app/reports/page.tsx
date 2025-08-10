'use client';

import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Table, DatePicker, Select, Button, Typography, Space, Tag } from 'antd';
import { 
  BarChartOutlined, 
  LineChartOutlined, 
  PieChartOutlined,
  DownloadOutlined,
  EyeOutlined 
} from '@ant-design/icons';
import { mockInventory, mockItems, mockWarehouses } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';
import Layout from '@/components/Layout';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const ReportsPage: React.FC = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  // Mock data cho báo cáo
  const inventoryReportData = mockInventory.map(item => ({
    ...item,
    value: item.quantity * 1000, // Mock giá trị
  }));

  const columns = [
    {
      title: 'Vật tư',
      dataIndex: 'item_name',
      key: 'item_name',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'SKU',
      dataIndex: 'item_sku',
      key: 'item_sku',
    },
    {
      title: 'Kho',
      dataIndex: 'warehouse_name',
      key: 'warehouse_name',
    },
    {
      title: 'Tồn kho',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (qty: number, record: any) => (
        <span>
          {qty} {record.uom_name}
        </span>
      ),
    },
    {
      title: 'Giá trị',
      dataIndex: 'value',
      key: 'value',
      render: (value: number) => formatCurrency(value),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record: any) => {
        const item = mockItems.find(i => i.id === record.item_id);
        if (!item) return <Tag color="default">N/A</Tag>;
        
        if (record.quantity < item.min_qty) {
          return <Tag color="error">Tồn thấp</Tag>;
        } else if (record.quantity > item.max_qty) {
          return <Tag color="warning">Tồn cao</Tag>;
        } else {
          return <Tag color="success">Bình thường</Tag>;
        }
      },
    },
  ];

  const filteredData = selectedWarehouse 
    ? inventoryReportData.filter(item => item.warehouse_id === selectedWarehouse)
    : inventoryReportData;

  const totalValue = filteredData.reduce((sum, item) => sum + item.value, 0);
  const totalItems = filteredData.length;
  const lowStockItems = filteredData.filter(item => {
    const itemData = mockItems.find(i => i.id === item.item_id);
    return itemData && item.quantity < itemData.min_qty;
  }).length;

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting report...');
  };

  const handleViewDetails = () => {
    // Mock view details functionality
    console.log('Viewing detailed report...');
  };

  return (
    <Layout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={2}>Báo cáo tổng hợp</Title>
          <Space>
            <Button 
              icon={<DownloadOutlined />}
              onClick={handleExport}
            >
              Xuất báo cáo
            </Button>
            <Button 
              type="primary"
              icon={<EyeOutlined />}
              onClick={handleViewDetails}
            >
              Xem chi tiết
            </Button>
          </Space>
        </div>

        {/* Filters */}
        <Card style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Text strong>Kho:</Text>
              <Select
                style={{ width: '100%', marginTop: 8 }}
                placeholder="Chọn kho"
                allowClear
                onChange={setSelectedWarehouse}
              >
                {mockWarehouses.map(warehouse => (
                  <Option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={8}>
              <Text strong>Thời gian:</Text>
              <RangePicker
                style={{ width: '100%', marginTop: 8 }}
                placeholder={['Từ ngày', 'Đến ngày']}
                onChange={(dates) => {
                  if (dates) {
                    setDateRange([dates[0]?.toISOString() || '', dates[1]?.toISOString() || '']);
                  } else {
                    setDateRange(null);
                  }
                }}
              />
            </Col>
            <Col span={8}>
              <Text strong>Loại báo cáo:</Text>
              <Select
                style={{ width: '100%', marginTop: 8 }}
                placeholder="Chọn loại báo cáo"
                defaultValue="inventory"
              >
                <Option value="inventory">Tồn kho</Option>
                <Option value="movement">Nhập xuất</Option>
                <Option value="aging">Tuổi tồn</Option>
                <Option value="value">Giá trị</Option>
              </Select>
            </Col>
          </Row>
        </Card>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng vật tư"
                value={totalItems}
                prefix={<BarChartOutlined />}
                valueStyle={{ color: '#0E4F9E' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng giá trị"
                value={totalValue}
                prefix="₫"
                valueStyle={{ color: '#16A34A' }}
                formatter={(value) => formatCurrency(value as number)}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Vật tư tồn thấp"
                value={lowStockItems}
                prefix={<LineChartOutlined />}
                valueStyle={{ color: '#F59E0B' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Kho đang quản lý"
                value={selectedWarehouse ? 1 : mockWarehouses.length}
                prefix={<PieChartOutlined />}
                valueStyle={{ color: '#DC2626' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Chart Placeholder */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} lg={12}>
            <Card title="Biểu đồ tồn kho theo thời gian">
              <div style={{ 
                height: 300, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: '#f5f5f5',
                borderRadius: 8
              }}>
                <Text type="secondary">Biểu đồ sẽ được hiển thị ở đây</Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Phân bố tồn kho theo kho">
              <div style={{ 
                height: 300, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: '#f5f5f5',
                borderRadius: 8
              }}>
                <Text type="secondary">Biểu đồ sẽ được hiển thị ở đây</Text>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Data Table */}
        <Card title="Báo cáo chi tiết tồn kho">
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} vật tư`,
            }}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default ReportsPage;
