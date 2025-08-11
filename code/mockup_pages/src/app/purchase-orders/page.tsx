'use client';

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, InputNumber, message, Typography, Card, Steps, Descriptions } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { mockPurchaseOrders, mockSuppliers, mockItems } from '@/data/mockData';
import { getStatusColor, getStatusText, formatDate, formatCurrency } from '@/lib/utils';
import Layout from '@/components/Layout';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const PurchaseOrdersPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPO, setEditingPO] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Mã PO',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'supplier_name',
      key: 'supplier_name',
    },
    {
      title: 'Người yêu cầu',
      dataIndex: 'requested_by_name',
      key: 'requested_by_name',
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'ordered_at',
      key: 'ordered_at',
      render: (date: string) => formatDate(date),
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
      title: 'Tổng tiền',
      key: 'total_amount',
      render: (_: any, record: any) => {
        const total = record.items?.reduce((sum: number, item: any) => 
          sum + (item.quantity * item.unit_price), 0) || 0;
        return formatCurrency(total);
      },
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            Xem
          </Button>
          {record.status === 'pending' && (
            <>
              <Button 
                type="link" 
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              >
                Sửa
              </Button>
              <Button 
                type="link" 
                danger 
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record)}
              >
                Xóa
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const steps = [
    {
      title: 'Thông tin đơn hàng',
      content: (
        <div>
          <Form.Item
            name="supplier_id"
            label="Nhà cung cấp"
            rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp!' }]}
          >
            <Select placeholder="Chọn nhà cung cấp">
              {mockSuppliers.map(supplier => (
                <Option key={supplier.id} value={supplier.id}>{supplier.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="delivery_address"
            label="Địa chỉ giao hàng"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ giao hàng!' }]}
          >
            <TextArea rows={2} placeholder="Nhập địa chỉ giao hàng" />
          </Form.Item>

          <Form.Item
            name="expected_delivery"
            label="Ngày giao hàng dự kiến"
            rules={[{ required: true, message: 'Vui lòng chọn ngày giao hàng!' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            name="payment_terms"
            label="Điều khoản thanh toán"
            rules={[{ required: true, message: 'Vui lòng chọn điều khoản thanh toán!' }]}
          >
            <Select placeholder="Chọn điều khoản thanh toán">
              <Option value="immediate">Thanh toán ngay</Option>
              <Option value="30_days">30 ngày</Option>
              <Option value="60_days">60 ngày</Option>
              <Option value="90_days">90 ngày</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="notes"
            label="Ghi chú"
          >
            <TextArea rows={3} placeholder="Nhập ghi chú (nếu có)" />
          </Form.Item>
        </div>
      ),
    },
    {
      title: 'Danh sách vật tư',
      content: (
        <div>
          <p>Bước này sẽ cho phép thêm các vật tư vào đơn hàng.</p>
          <p>Trong demo này, chúng ta sẽ bỏ qua bước này.</p>
        </div>
      ),
    },
    {
      title: 'Xác nhận',
      content: (
        <div>
          <p>Xác nhận thông tin đơn hàng trước khi tạo.</p>
          <p>Trong demo này, chúng ta sẽ bỏ qua bước này.</p>
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingPO(null);
    setCurrentStep(0);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (po: any) => {
    setEditingPO(po);
    setCurrentStep(0);
    form.setFieldsValue(po);
    setIsModalVisible(true);
  };

  const handleView = (po: any) => {
    const total = po.items?.reduce((sum: number, item: any) => 
      sum + (item.quantity * item.unit_price), 0) || 0;

    Modal.info({
      title: 'Chi tiết đơn mua hàng',
      width: 800,
      content: (
        <div>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Mã PO">{po.code}</Descriptions.Item>
            <Descriptions.Item label="Nhà cung cấp">{po.supplier_name}</Descriptions.Item>
            <Descriptions.Item label="Người yêu cầu">{po.requested_by_name}</Descriptions.Item>
            <Descriptions.Item label="Ngày đặt hàng">{formatDate(po.ordered_at)}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={getStatusColor(po.status)}>
                {getStatusText(po.status)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">{formatCurrency(total)}</Descriptions.Item>
          </Descriptions>
          
          <div style={{ marginTop: 16 }}>
            <h4>Danh sách vật tư:</h4>
            <Table
              columns={[
                { title: 'Vật tư', dataIndex: 'item_name', key: 'item_name' },
                { title: 'SKU', dataIndex: 'item_sku', key: 'item_sku' },
                { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
                { title: 'Đơn vị', dataIndex: 'uom_name', key: 'uom_name' },
                { 
                  title: 'Đơn giá', 
                  dataIndex: 'unit_price', 
                  key: 'unit_price',
                  render: (price: number) => formatCurrency(price)
                },
                { 
                  title: 'Thành tiền', 
                  key: 'total',
                  render: (_: any, record: any) => formatCurrency(record.quantity * record.unit_price)
                },
              ]}
              dataSource={po.items}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </div>
        </div>
      ),
    });
  };

  const handleDelete = (po: any) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa đơn mua hàng "${po.code}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        message.success('Đã xóa đơn mua hàng thành công!');
      },
    });
  };

  const handleModalOk = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      form.validateFields().then((values) => {
        if (editingPO) {
          message.success('Cập nhật đơn mua hàng thành công!');
        } else {
          message.success('Tạo đơn mua hàng thành công!');
        }
        setIsModalVisible(false);
        form.resetFields();
        setCurrentStep(0);
      });
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setCurrentStep(0);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Layout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={2}>Quản lý đơn mua hàng</Title>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Tạo đơn mua hàng
          </Button>
        </div>

        <Card>
          <Table
            columns={columns}
            dataSource={mockPurchaseOrders}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} đơn mua hàng`,
            }}
          />
        </Card>

        <Modal
          title={editingPO ? 'Sửa đơn mua hàng' : 'Tạo đơn mua hàng mới'}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText={currentStep === steps.length - 1 ? (editingPO ? 'Cập nhật' : 'Tạo') : 'Tiếp theo'}
          cancelText="Hủy"
          width={800}
          footer={[
            <Button key="cancel" onClick={handleModalCancel}>
              Hủy
            </Button>,
            currentStep > 0 && (
              <Button key="prev" onClick={handlePrev}>
                Quay lại
              </Button>
            ),
            <Button 
              key="next" 
              type="primary" 
              onClick={handleModalOk}
            >
              {currentStep === steps.length - 1 ? (editingPO ? 'Cập nhật' : 'Tạo') : 'Tiếp theo'}
            </Button>,
          ].filter(Boolean)}
        >
          <Steps current={currentStep} style={{ marginBottom: 24 }}>
            {steps.map((step, index) => (
              <Steps.Step key={index} title={step.title} />
            ))}
          </Steps>

          <Form
            form={form}
            layout="vertical"
          >
            {steps[currentStep].content}
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default PurchaseOrdersPage;
