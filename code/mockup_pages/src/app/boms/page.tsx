'use client';

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, InputNumber, message, Typography, Card, Tree, Descriptions } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, BranchesOutlined } from '@ant-design/icons';
import { mockBOMs, mockBOMItems, mockItems } from '@/data/mockData';
import { getStatusColor, getStatusText, formatDate } from '@/lib/utils';
import Layout from '@/components/Layout';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const BOMsPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBOM, setEditingBOM] = useState<any>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Mã BOM',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
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
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Số vật tư con',
      key: 'item_count',
      render: (_: any, record: any) => {
        const itemCount = mockBOMItems.filter(item => item.bom_id === record.id).length;
        return itemCount;
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
          <Button 
            type="link" 
            icon={<BranchesOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            Chi tiết
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
    setEditingBOM(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (bom: any) => {
    setEditingBOM(bom);
    form.setFieldsValue(bom);
    setIsModalVisible(true);
  };

  const handleView = (bom: any) => {
    Modal.info({
      title: 'Thông tin BOM',
      content: (
        <div>
          <p><strong>Mã BOM:</strong> {bom.code}</p>
          <p><strong>Mô tả:</strong> {bom.description}</p>
          <p><strong>Trạng thái:</strong> 
            <Tag color={getStatusColor(bom.status)} style={{ marginLeft: 8 }}>
              {getStatusText(bom.status)}
            </Tag>
          </p>
          <p><strong>Ngày tạo:</strong> {formatDate(bom.created_at)}</p>
        </div>
      ),
    });
  };

  const handleViewDetails = (bom: any) => {
    const bomItems = mockBOMItems.filter(item => item.bom_id === bom.id);
    
    Modal.info({
      title: `Chi tiết BOM: ${bom.code}`,
      width: 800,
      content: (
        <div>
          <Descriptions bordered column={2} style={{ marginBottom: 16 }}>
            <Descriptions.Item label="Mã BOM">{bom.code}</Descriptions.Item>
            <Descriptions.Item label="Mô tả">{bom.description}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={getStatusColor(bom.status)}>
                {getStatusText(bom.status)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">{formatDate(bom.created_at)}</Descriptions.Item>
          </Descriptions>
          
          <div>
            <h4>Danh sách vật tư con:</h4>
            <Table
              columns={[
                { title: 'Vật tư', dataIndex: 'item_name', key: 'item_name' },
                { title: 'SKU', dataIndex: 'item_sku', key: 'item_sku' },
                { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
                { title: 'Đơn vị', dataIndex: 'uom_name', key: 'uom_name' },
              ]}
              dataSource={bomItems}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </div>
        </div>
      ),
    });
  };

  const handleDelete = (bom: any) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa BOM "${bom.code}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        message.success('Đã xóa BOM thành công!');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingBOM) {
        message.success('Cập nhật BOM thành công!');
      } else {
        message.success('Tạo BOM thành công!');
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
          <Title level={2}>Quản lý BOM</Title>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Tạo BOM
          </Button>
        </div>

        <Card>
          <Table
            columns={columns}
            dataSource={mockBOMs}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} BOM`,
            }}
          />
        </Card>

        <Modal
          title={editingBOM ? 'Sửa BOM' : 'Tạo BOM mới'}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText={editingBOM ? 'Cập nhật' : 'Tạo'}
          cancelText="Hủy"
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="code"
              label="Mã BOM"
              rules={[
                { required: true, message: 'Vui lòng nhập mã BOM!' },
                { max: 20, message: 'Mã BOM không được quá 20 ký tự!' }
              ]}
            >
              <Input placeholder="Nhập mã BOM" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Mô tả"
              rules={[
                { required: true, message: 'Vui lòng nhập mô tả!' },
                { max: 255, message: 'Mô tả không được quá 255 ký tự!' }
              ]}
            >
              <TextArea rows={3} placeholder="Nhập mô tả BOM" />
            </Form.Item>

            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
            >
              <Select placeholder="Chọn trạng thái">
                <Option value="draft">Nháp</Option>
                <Option value="active">Hoạt động</Option>
                <Option value="inactive">Không hoạt động</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default BOMsPage;
