'use client';

import React from 'react';
import { Row, Col, Card, Statistic, Progress, Table, Tag, Space, Typography, Button } from 'antd';
import {
  InboxOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import { mockDashboardStats, mockChartData, mockGRNs, mockIssues } from '@/data/mockData';
import { getStatusColor, getStatusText, formatDate } from '@/lib/utils';
import Layout from '@/components/Layout';

const { Title, Text } = Typography;

const DashboardPage: React.FC = () => {
  // Recent transactions for table
  const recentTransactions = [
    ...mockGRNs.slice(0, 3).map(grn => ({
      ...grn,
      type: 'Nhập kho',
      typeColor: 'success',
    })),
    ...mockIssues.slice(0, 3).map(issue => ({
      ...issue,
      type: 'Xuất kho',
      typeColor: 'error',
    })),
  ].sort((a, b) => new Date(b.received_at || b.issued_at).getTime() - new Date(a.received_at || a.issued_at).getTime());

  const columns = [
    {
      title: 'Mã phiếu',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (text: string, record: any) => (
        <Tag color={record.typeColor === 'success' ? 'success' : 'error'}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Kho',
      dataIndex: 'warehouse_name',
      key: 'warehouse_name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'received_at',
      key: 'received_at',
      render: (date: string, record: any) => formatDate(date || record.issued_at),
    },
  ];

  return (
    <Layout>
      <div>
        <Title level={2} style={{ marginBottom: 24 }}>
          Dashboard
        </Title>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng vật tư"
                value={mockDashboardStats.total_items}
                prefix={<ShoppingOutlined />}
                valueStyle={{ color: '#0E4F9E' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Vật tư tồn thấp"
                value={mockDashboardStats.low_stock_items}
                prefix={<ExclamationCircleOutlined />}
                valueStyle={{ color: '#F59E0B' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Phiếu nhập chờ duyệt"
                value={mockDashboardStats.pending_grns}
                prefix={<ArrowUpOutlined />}
                valueStyle={{ color: '#16A34A' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Phiếu xuất chờ duyệt"
                value={mockDashboardStats.pending_issues}
                prefix={<ArrowDownOutlined />}
                valueStyle={{ color: '#DC2626' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Charts and Progress */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} lg={12}>
            <Card title="Tiến trình phiếu" extra={<Button type="link">Xem tất cả</Button>}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text>Phiếu nhập</Text>
                  <Progress 
                    percent={75} 
                    status="active" 
                    strokeColor="#16A34A"
                    style={{ marginTop: 8 }}
                  />
                </div>
                <div>
                  <Text>Phiếu xuất</Text>
                  <Progress 
                    percent={60} 
                    status="active" 
                    strokeColor="#DC2626"
                    style={{ marginTop: 8 }}
                  />
                </div>
                <div>
                  <Text>Điều chuyển</Text>
                  <Progress 
                    percent={90} 
                    status="active" 
                    strokeColor="#0E4F9E"
                    style={{ marginTop: 8 }}
                  />
                </div>
                <div>
                  <Text>Kiểm kê</Text>
                  <Progress 
                    percent={45} 
                    status="active" 
                    strokeColor="#F59E0B"
                    style={{ marginTop: 8 }}
                  />
                </div>
              </Space>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Thống kê hoạt động" extra={<Button type="link">Xem chi tiết</Button>}>
              <Space direction="vertical" style={{ width: '100%' }}>
                {mockChartData.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{item.name}</Text>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        backgroundColor: item.color 
                      }} />
                      <Text strong>{item.value}</Text>
                    </div>
                  </div>
                ))}
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Recent Transactions Table */}
        <Card title="Giao dịch gần đây" extra={<Button type="link">Xem tất cả</Button>}>
          <Table
            columns={columns}
            dataSource={recentTransactions}
            rowKey="id"
            pagination={false}
            size="small"
          />
        </Card>
      </div>
    </Layout>
  );
};

export default DashboardPage;
