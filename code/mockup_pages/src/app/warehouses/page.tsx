'use client';

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, message, Typography, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { mockWarehouses } from '@/data/mockData';
import { getStatusColor, getStatusText } from '@/lib/utils';
import Layout from '@/components/Layout';

const { Title } = Typography;
const { TextArea } = Input;

const WarehousesPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<any>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Mã kho',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Tên kho',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: () => (
        <Tag color="success">Hoạt động</Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record: any) => (
        <Space>
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            Xem
          </Button>
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
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingWarehouse(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (warehouse: any) => {
    setEditingWarehouse(warehouse);
    form.setFieldsValue(warehouse);
    setIsModalVisible(true);
  };

  const handleView = (warehouse: any) => {
    Modal.info({
      title: 'Thông tin kho',
      content: (
        <div>
          <p><strong>Mã kho:</strong> {warehouse.code}</p>
          <p><strong>Tên kho:</strong> {warehouse.name}</p>
          <p><strong>Địa điểm:</strong> {warehouse.location}</p>
          <p><strong>Trạng thái:</strong> <Tag color="success">Hoạt động</Tag></p>
        </div>
      ),
    });
  };

  const handleDelete = (warehouse: any) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa kho "${warehouse.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        message.success('Đã xóa kho thành công!');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingWarehouse) {
        message.success('Cập nhật kho thành công!');
      } else {
        message.success('Thêm kho thành công!');
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <Layout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={2}>Quản lý kho</Title>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Thêm kho
          </Button>
        </div>

        <Card>
          <Table
            columns={columns}
            dataSource={mockWarehouses}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} kho`,
            }}
          />
        </Card>

        <Modal
          title={editingWarehouse ? 'Sửa kho' : 'Thêm kho mới'}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText={editingWarehouse ? 'Cập nhật' : 'Thêm'}
          cancelText="Hủy"
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="code"
              label="Mã kho"
              rules={[
                { required: true, message: 'Vui lòng nhập mã kho!' },
                { max: 20, message: 'Mã kho không được quá 20 ký tự!' }
              ]}
            >
              <Input placeholder="Nhập mã kho" />
            </Form.Item>

            <Form.Item
              name="name"
              label="Tên kho"
              rules={[
                { required: true, message: 'Vui lòng nhập tên kho!' },
                { max: 100, message: 'Tên kho không được quá 100 ký tự!' }
              ]}
            >
              <Input placeholder="Nhập tên kho" />
            </Form.Item>

            <Form.Item
              name="location"
              label="Địa điểm"
              rules={[
                { required: true, message: 'Vui lòng nhập địa điểm!' },
                { max: 200, message: 'Địa điểm không được quá 200 ký tự!' }
              ]}
            >
              <TextArea 
                rows={3} 
                placeholder="Nhập địa điểm kho"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default WarehousesPage;
