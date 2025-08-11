'use client';

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, InputNumber, message, Typography, Card, Steps, Descriptions } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { mockGRNs, mockWarehouses, mockSuppliers, mockItems } from '@/data/mockData';
import { getStatusColor, getStatusText, formatDate, formatCurrency } from '@/lib/utils';
import Layout from '@/components/Layout';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const GRNsPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingGRN, setEditingGRN] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Mã phiếu',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Kho',
      dataIndex: 'warehouse_name',
      key: 'warehouse_name',
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'supplier_name',
      key: 'supplier_name',
    },
    {
      title: 'Người nhận',
      dataIndex: 'received_by_name',
      key: 'received_by_name',
    },
    {
      title: 'Ngày nhận',
      dataIndex: 'received_at',
      key: 'received_at',
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
      title: 'Thông tin phiếu',
      content: (
        <div>
          <Form.Item
            name="warehouse_id"
            label="Kho nhập"
            rules={[{ required: true, message: 'Vui lòng chọn kho!' }]}
          >
            <Select placeholder="Chọn kho">
              {mockWarehouses.map(warehouse => (
                <Option key={warehouse.id} value={warehouse.id}>{warehouse.name}</Option>
              ))}
            </Select>
          </Form.Item>

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
            name="notes"
            label="Ghi chú"
          >
            <TextArea rows={3} placeholder="Nhập ghi chú (nếu có)" />
          </Form.Item>
        </div>
      ),
    },
    {
      title: 'Dòng vật tư',
      content: (
        <div>
          <p>Bước này sẽ cho phép thêm các dòng vật tư vào phiếu nhập.</p>
          <p>Trong demo này, chúng ta sẽ bỏ qua bước này.</p>
        </div>
      ),
    },
    {
      title: 'Xác nhận',
      content: (
        <div>
          <p>Xác nhận thông tin phiếu nhập trước khi tạo.</p>
          <p>Trong demo này, chúng ta sẽ bỏ qua bước này.</p>
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingGRN(null);
    setCurrentStep(0);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (grn: any) => {
    setEditingGRN(grn);
    setCurrentStep(0);
    form.setFieldsValue(grn);
    setIsModalVisible(true);
  };

  const handleView = (grn: any) => {
    Modal.info({
      title: 'Chi tiết phiếu nhập',
      width: 800,
      content: (
        <div>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Mã phiếu">{grn.code}</Descriptions.Item>
            <Descriptions.Item label="Kho">{grn.warehouse_name}</Descriptions.Item>
            <Descriptions.Item label="Nhà cung cấp">{grn.supplier_name}</Descriptions.Item>
            <Descriptions.Item label="Người nhận">{grn.received_by_name}</Descriptions.Item>
            <Descriptions.Item label="Ngày nhận">{formatDate(grn.received_at)}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={getStatusColor(grn.status)}>
                {getStatusText(grn.status)}
              </Tag>
            </Descriptions.Item>
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
              dataSource={grn.items}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </div>
        </div>
      ),
    });
  };

  const handleDelete = (grn: any) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa phiếu nhập "${grn.code}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        message.success('Đã xóa phiếu nhập thành công!');
      },
    });
  };

  const handleModalOk = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      form.validateFields().then((values) => {
        if (editingGRN) {
          message.success('Cập nhật phiếu nhập thành công!');
        } else {
          message.success('Tạo phiếu nhập thành công!');
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
          <Title level={2}>Quản lý phiếu nhập</Title>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Tạo phiếu nhập
          </Button>
        </div>

        <Card>
          <Table
            columns={columns}
            dataSource={mockGRNs}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} phiếu nhập`,
            }}
          />
        </Card>

        <Modal
          title={editingGRN ? 'Sửa phiếu nhập' : 'Tạo phiếu nhập mới'}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText={currentStep === steps.length - 1 ? (editingGRN ? 'Cập nhật' : 'Tạo') : 'Tiếp theo'}
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
              {currentStep === steps.length - 1 ? (editingGRN ? 'Cập nhật' : 'Tạo') : 'Tiếp theo'}
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

export default GRNsPage;
