'use client';

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, InputNumber, message, Typography, Card, Steps, Descriptions } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { mockTransfers, mockWarehouses, mockItems } from '@/data/mockData';
import { getStatusColor, getStatusText, formatDate } from '@/lib/utils';
import Layout from '@/components/Layout';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const TransfersPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState<any>(null);
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
      title: 'Kho nguồn',
      dataIndex: 'from_warehouse_name',
      key: 'from_warehouse_name',
    },
    {
      title: 'Kho đích',
      dataIndex: 'to_warehouse_name',
      key: 'to_warehouse_name',
    },
    {
      title: 'Người yêu cầu',
      dataIndex: 'requested_by_name',
      key: 'requested_by_name',
    },
    {
      title: 'Ngày chuyển',
      dataIndex: 'transferred_at',
      key: 'transferred_at',
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
      title: 'Thông tin chuyển',
      content: (
        <div>
          <Form.Item
            name="from_warehouse_id"
            label="Kho nguồn"
            rules={[{ required: true, message: 'Vui lòng chọn kho nguồn!' }]}
          >
            <Select placeholder="Chọn kho nguồn">
              {mockWarehouses.map(warehouse => (
                <Option key={warehouse.id} value={warehouse.id}>{warehouse.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="to_warehouse_id"
            label="Kho đích"
            rules={[{ required: true, message: 'Vui lòng chọn kho đích!' }]}
          >
            <Select placeholder="Chọn kho đích">
              {mockWarehouses.map(warehouse => (
                <Option key={warehouse.id} value={warehouse.id}>{warehouse.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="transfer_reason"
            label="Lý do chuyển"
            rules={[{ required: true, message: 'Vui lòng nhập lý do chuyển!' }]}
          >
            <Select placeholder="Chọn lý do chuyển">
              <Option value="production">Phục vụ sản xuất</Option>
              <Option value="maintenance">Bảo trì</Option>
              <Option value="reorganization">Tái tổ chức kho</Option>
              <Option value="other">Khác</Option>
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
          <p>Bước này sẽ cho phép thêm các dòng vật tư cần chuyển.</p>
          <p>Trong demo này, chúng ta sẽ bỏ qua bước này.</p>
        </div>
      ),
    },
    {
      title: 'Xác nhận',
      content: (
        <div>
          <p>Xác nhận thông tin điều chuyển trước khi tạo.</p>
          <p>Trong demo này, chúng ta sẽ bỏ qua bước này.</p>
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingTransfer(null);
    setCurrentStep(0);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (transfer: any) => {
    setEditingTransfer(transfer);
    setCurrentStep(0);
    form.setFieldsValue(transfer);
    setIsModalVisible(true);
  };

  const handleView = (transfer: any) => {
    Modal.info({
      title: 'Chi tiết phiếu điều chuyển',
      width: 800,
      content: (
        <div>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Mã phiếu">{transfer.code}</Descriptions.Item>
            <Descriptions.Item label="Kho nguồn">{transfer.from_warehouse_name}</Descriptions.Item>
            <Descriptions.Item label="Kho đích">{transfer.to_warehouse_name}</Descriptions.Item>
            <Descriptions.Item label="Người yêu cầu">{transfer.requested_by_name}</Descriptions.Item>
            <Descriptions.Item label="Ngày chuyển">{formatDate(transfer.transferred_at)}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={getStatusColor(transfer.status)}>
                {getStatusText(transfer.status)}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
          
          <div style={{ marginTop: 16 }}>
            <h4>Danh sách vật tư chuyển:</h4>
            <Table
              columns={[
                { title: 'Vật tư', dataIndex: 'item_name', key: 'item_name' },
                { title: 'SKU', dataIndex: 'item_sku', key: 'item_sku' },
                { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
                { title: 'Đơn vị', dataIndex: 'uom_name', key: 'uom_name' },
              ]}
              dataSource={transfer.items}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </div>
        </div>
      ),
    });
  };

  const handleDelete = (transfer: any) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa phiếu điều chuyển "${transfer.code}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        message.success('Đã xóa phiếu điều chuyển thành công!');
      },
    });
  };

  const handleModalOk = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      form.validateFields().then((values) => {
        if (editingTransfer) {
          message.success('Cập nhật phiếu điều chuyển thành công!');
        } else {
          message.success('Tạo phiếu điều chuyển thành công!');
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
          <Title level={2}>Quản lý điều chuyển kho</Title>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Tạo phiếu điều chuyển
          </Button>
        </div>

        <Card>
          <Table
            columns={columns}
            dataSource={mockTransfers}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} phiếu điều chuyển`,
            }}
          />
        </Card>

        <Modal
          title={editingTransfer ? 'Sửa phiếu điều chuyển' : 'Tạo phiếu điều chuyển mới'}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText={currentStep === steps.length - 1 ? (editingTransfer ? 'Cập nhật' : 'Tạo') : 'Tiếp theo'}
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
              {currentStep === steps.length - 1 ? (editingTransfer ? 'Cập nhật' : 'Tạo') : 'Tiếp theo'}
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

export default TransfersPage;
