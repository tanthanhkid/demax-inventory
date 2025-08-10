'use client';

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, InputNumber, message, Typography, Card, Steps, Descriptions } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { mockIssues, mockWarehouses, mockItems } from '@/data/mockData';
import { getStatusColor, getStatusText, formatDate } from '@/lib/utils';
import Layout from '@/components/Layout';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const IssuesPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingIssue, setEditingIssue] = useState<any>(null);
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
      title: 'Người yêu cầu',
      dataIndex: 'requested_by_name',
      key: 'requested_by_name',
    },
    {
      title: 'Ngày yêu cầu',
      dataIndex: 'issued_at',
      key: 'issued_at',
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
      render: (_, record: any) => (
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
            label="Kho xuất"
            rules={[{ required: true, message: 'Vui lòng chọn kho!' }]}
          >
            <Select placeholder="Chọn kho">
              {mockWarehouses.map(warehouse => (
                <Option key={warehouse.id} value={warehouse.id}>{warehouse.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="request_type"
            label="Loại yêu cầu"
            rules={[{ required: true, message: 'Vui lòng chọn loại yêu cầu!' }]}
          >
            <Select placeholder="Chọn loại yêu cầu">
              <Option value="bom">Theo BOM</Option>
              <Option value="general">Kho chung</Option>
              <Option value="emergency">Khẩn cấp</Option>
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
          <p>Bước này sẽ cho phép thêm các dòng vật tư vào phiếu xuất.</p>
          <p>Trong demo này, chúng ta sẽ bỏ qua bước này.</p>
        </div>
      ),
    },
    {
      title: 'Xác nhận',
      content: (
        <div>
          <p>Xác nhận thông tin phiếu xuất trước khi tạo.</p>
          <p>Trong demo này, chúng ta sẽ bỏ qua bước này.</p>
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingIssue(null);
    setCurrentStep(0);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (issue: any) => {
    setEditingIssue(issue);
    setCurrentStep(0);
    form.setFieldsValue(issue);
    setIsModalVisible(true);
  };

  const handleView = (issue: any) => {
    Modal.info({
      title: 'Chi tiết phiếu xuất',
      width: 800,
      content: (
        <div>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Mã phiếu">{issue.code}</Descriptions.Item>
            <Descriptions.Item label="Kho">{issue.warehouse_name}</Descriptions.Item>
            <Descriptions.Item label="Người yêu cầu">{issue.requested_by_name}</Descriptions.Item>
            <Descriptions.Item label="Ngày yêu cầu">{formatDate(issue.issued_at)}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={getStatusColor(issue.status)}>
                {getStatusText(issue.status)}
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
              ]}
              dataSource={issue.items}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </div>
        </div>
      ),
    });
  };

  const handleDelete = (issue: any) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa phiếu xuất "${issue.code}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        message.success('Đã xóa phiếu xuất thành công!');
      },
    });
  };

  const handleModalOk = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      form.validateFields().then((values) => {
        if (editingIssue) {
          message.success('Cập nhật phiếu xuất thành công!');
        } else {
          message.success('Tạo phiếu xuất thành công!');
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
          <Title level={2}>Quản lý phiếu xuất</Title>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Tạo phiếu xuất
          </Button>
        </div>

        <Card>
          <Table
            columns={columns}
            dataSource={mockIssues}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} phiếu xuất`,
            }}
          />
        </Card>

        <Modal
          title={editingIssue ? 'Sửa phiếu xuất' : 'Tạo phiếu xuất mới'}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText={currentStep === steps.length - 1 ? (editingIssue ? 'Cập nhật' : 'Tạo') : 'Tiếp theo'}
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
              {currentStep === steps.length - 1 ? (editingIssue ? 'Cập nhật' : 'Tạo') : 'Tiếp theo'}
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

export default IssuesPage;
