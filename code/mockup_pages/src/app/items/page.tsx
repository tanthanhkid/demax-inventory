'use client';

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, InputNumber, message, Typography, Card, Badge } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { mockItems, mockItemGroups, mockUOMs } from '@/data/mockData';
import Layout from '@/components/Layout';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const ItemsPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Tên vật tư',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Nhóm vật tư',
      dataIndex: 'item_group_name',
      key: 'item_group_name',
    },
    {
      title: 'Đơn vị tính',
      dataIndex: 'uom_name',
      key: 'uom_name',
    },
    {
      title: 'Tồn kho',
      dataIndex: 'current_stock',
      key: 'current_stock',
      render: (stock: number, record: any) => {
        const isLowStock = stock < record.min_qty;
        return (
          <Space>
            <span>{stock}</span>
            {isLowStock && <Badge status="error" text="Tồn thấp" />}
          </Space>
        );
      },
    },
    {
      title: 'Min/Max',
      key: 'minmax',
      render: (_, record: any) => (
        <span>{record.min_qty} / {record.max_qty}</span>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record: any) => {
        const isLowStock = record.current_stock < record.min_qty;
        return (
          <Tag color={isLowStock ? 'warning' : 'success'}>
            {isLowStock ? 'Tồn thấp' : 'Bình thường'}
          </Tag>
        );
      },
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

  const filteredItems = mockItems.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchText.toLowerCase()) ||
    item.item_group_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setIsModalVisible(true);
  };

  const handleView = (item: any) => {
    Modal.info({
      title: 'Thông tin vật tư',
      content: (
        <div>
          <p><strong>SKU:</strong> {item.sku}</p>
          <p><strong>Tên vật tư:</strong> {item.name}</p>
          <p><strong>Nhóm vật tư:</strong> {item.item_group_name}</p>
          <p><strong>Đơn vị tính:</strong> {item.uom_name}</p>
          <p><strong>Tồn kho:</strong> {item.current_stock}</p>
          <p><strong>Min:</strong> {item.min_qty}</p>
          <p><strong>Max:</strong> {item.max_qty}</p>
        </div>
      ),
    });
  };

  const handleDelete = (item: any) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa vật tư "${item.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        message.success('Đã xóa vật tư thành công!');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingItem) {
        message.success('Cập nhật vật tư thành công!');
      } else {
        message.success('Thêm vật tư thành công!');
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
          <Title level={2}>Quản lý vật tư</Title>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Thêm vật tư
          </Button>
        </div>

        <Card>
          <div style={{ marginBottom: 16 }}>
            <Input
              placeholder="Tìm kiếm theo tên, SKU hoặc nhóm vật tư..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 400 }}
            />
          </div>

          <Table
            columns={columns}
            dataSource={filteredItems}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} vật tư`,
            }}
          />
        </Card>

        <Modal
          title={editingItem ? 'Sửa vật tư' : 'Thêm vật tư mới'}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText={editingItem ? 'Cập nhật' : 'Thêm'}
          cancelText="Hủy"
          width={700}
        >
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="sku"
              label="SKU"
              rules={[
                { required: true, message: 'Vui lòng nhập SKU!' },
                { max: 50, message: 'SKU không được quá 50 ký tự!' }
              ]}
            >
              <Input placeholder="Nhập SKU" />
            </Form.Item>

            <Form.Item
              name="name"
              label="Tên vật tư"
              rules={[
                { required: true, message: 'Vui lòng nhập tên vật tư!' },
                { max: 100, message: 'Tên vật tư không được quá 100 ký tự!' }
              ]}
            >
              <Input placeholder="Nhập tên vật tư" />
            </Form.Item>

            <Form.Item
              name="item_group_id"
              label="Nhóm vật tư"
              rules={[{ required: true, message: 'Vui lòng chọn nhóm vật tư!' }]}
            >
              <Select placeholder="Chọn nhóm vật tư">
                {mockItemGroups.map(group => (
                  <Option key={group.id} value={group.id}>{group.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="uom_id"
              label="Đơn vị tính"
              rules={[{ required: true, message: 'Vui lòng chọn đơn vị tính!' }]}
            >
              <Select placeholder="Chọn đơn vị tính">
                {mockUOMs.map(uom => (
                  <Option key={uom.id} value={uom.id}>{uom.name} ({uom.code})</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="min_qty"
              label="Số lượng tối thiểu"
              rules={[{ required: true, message: 'Vui lòng nhập số lượng tối thiểu!' }]}
            >
              <InputNumber 
                placeholder="Nhập số lượng tối thiểu" 
                min={0}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              name="max_qty"
              label="Số lượng tối đa"
              rules={[{ required: true, message: 'Vui lòng nhập số lượng tối đa!' }]}
            >
              <InputNumber 
                placeholder="Nhập số lượng tối đa" 
                min={0}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default ItemsPage;
