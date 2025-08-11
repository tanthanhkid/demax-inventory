'use client';

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, InputNumber, message, Typography, Card, Steps, Descriptions } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { mockPurchaseRequests, mockItems } from '@/data/mockData';
import { getStatusColor, getStatusText, formatDate } from '@/lib/utils';
import Layout from '@/components/Layout';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const PurchaseRequestsPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPR, setEditingPR] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Mã PR',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Người yêu cầu',
      dataIndex: 'requested_by_name',
      key: 'requested_by_name',
    },
    {
      title: 'Ngày yêu cầu',
      dataIndex: 'requested_at',
      key: 'requested_at',
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
      title: 'Số vật tư',
      key: 'item_count',
      render: (_: any, record: any) => {
        return record.items?.length || 0;
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
      title: 'Thông tin yêu cầu',
      content: (
        <div>
          <Form.Item
            name="request_reason"
            label="Lý do yêu cầu"
            rules={[{ required: true, message: 'Vui lòng chọn lý do yêu cầu!' }]}
          >
            <Select placeholder="Chọn lý do yêu cầu">
              <Option value="low_stock">Tồn kho thấp</Option>
              <Option value="new_item">Vật tư mới</Option>
              <Option value="production">Phục vụ sản xuất</Option>
              <Option value="maintenance">Bảo trì</Option>
              <Option value="other">Khác</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="Mức độ ưu tiên"
            rules={[{ required: true, message: 'Vui lòng chọn mức độ ưu tiên!' }]}
          >
            <Select placeholder="Chọn mức độ ưu tiên">
              <Option value="low">Thấp</Option>
              <Option value="medium">Trung bình</Option>
              <Option value="high">Cao</Option>
              <Option value="urgent">Khẩn cấp</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="expected_delivery"
            label="Ngày giao hàng dự kiến"
            rules={[{ required: true, message: 'Vui lòng chọn ngày giao hàng!' }]}
          >
            <Input type="date" />
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
          <p>Bước này sẽ cho phép thêm các vật tư cần mua.</p>
          <p>Trong demo này, chúng ta sẽ bỏ qua bước này.</p>
        </div>
      ),
    },
    {
      title: 'Xác nhận',
      content: (
        <div>
          <p>Xác nhận thông tin yêu cầu mua trước khi tạo.</p>
          <p>Trong demo này, chúng ta sẽ bỏ qua bước này.</p>
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingPR(null);
    setCurrentStep(0);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (pr: any) => {
    setEditingPR(pr);
    setCurrentStep(0);
    form.setFieldsValue(pr);
    setIsModalVisible(true);
  };

  const handleView = (pr: any) => {
    Modal.info({
      title: 'Chi tiết yêu cầu mua',
      width: 800,
      content: (
        <div>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Mã PR">{pr.code}</Descriptions.Item>
            <Descriptions.Item label="Người yêu cầu">{pr.requested_by_name}</Descriptions.Item>
            <Descriptions.Item label="Ngày yêu cầu">{formatDate(pr.requested_at)}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={getStatusColor(pr.status)}>
                {getStatusText(pr.status)}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
          
          <div style={{ marginTop: 16 }}>
            <h4>Danh sách vật tư yêu cầu:</h4>
            <Table
              columns={[
                { title: 'Vật tư', dataIndex: 'item_name', key: 'item_name' },
                { title: 'SKU', dataIndex: 'item_sku', key: 'item_sku' },
                { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
                { title: 'Đơn vị', dataIndex: 'uom_name', key: 'uom_name' },
              ]}
              dataSource={pr.items}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </div>
        </div>
      ),
    });
  };

  const handleDelete = (pr: any) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa yêu cầu mua "${pr.code}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        message.success('Đã xóa yêu cầu mua thành công!');
      },
    });
  };

  const handleModalOk = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      form.validateFields().then((values) => {
        if (editingPR) {
          message.success('Cập nhật yêu cầu mua thành công!');
        } else {
          message.success('Tạo yêu cầu mua thành công!');
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
          <Title level={2}>Quản lý yêu cầu mua</Title>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Tạo yêu cầu mua
          </Button>
        </div>

        <Card>
          <Table
            columns={columns}
            dataSource={mockPurchaseRequests}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} yêu cầu mua`,
            }}
          />
        </Card>

        <Modal
          title={editingPR ? 'Sửa yêu cầu mua' : 'Tạo yêu cầu mua mới'}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText={currentStep === steps.length - 1 ? (editingPR ? 'Cập nhật' : 'Tạo') : 'Tiếp theo'}
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
              {currentStep === steps.length - 1 ? (editingPR ? 'Cập nhật' : 'Tạo') : 'Tiếp theo'}
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

export default PurchaseRequestsPage;
