'use client';

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, InputNumber, message, Typography, Card, Steps, Descriptions } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { mockStocktakes, mockWarehouses } from '@/data/mockData';
import { getStatusColor, getStatusText, formatDate } from '@/lib/utils';
import Layout from '@/components/Layout';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const StocktakesPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStocktake, setEditingStocktake] = useState<any>(null);
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
      title: 'Người kiểm kê',
      dataIndex: 'counted_by_name',
      key: 'counted_by_name',
    },
    {
      title: 'Ngày kiểm kê',
      dataIndex: 'counted_at',
      key: 'counted_at',
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
      title: 'Thông tin kiểm kê',
      content: (
        <div>
          <Form.Item
            name="warehouse_id"
            label="Kho kiểm kê"
            rules={[{ required: true, message: 'Vui lòng chọn kho!' }]}
          >
            <Select placeholder="Chọn kho">
              {mockWarehouses.map(warehouse => (
                <Option key={warehouse.id} value={warehouse.id}>{warehouse.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="stocktake_type"
            label="Loại kiểm kê"
            rules={[{ required: true, message: 'Vui lòng chọn loại kiểm kê!' }]}
          >
            <Select placeholder="Chọn loại kiểm kê">
              <Option value="full">Kiểm kê toàn bộ</Option>
              <Option value="partial">Kiểm kê một phần</Option>
              <Option value="cycle">Kiểm kê chu kỳ</Option>
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
          <p>Bước này sẽ hiển thị danh sách vật tư cần kiểm kê.</p>
          <p>Trong demo này, chúng ta sẽ bỏ qua bước này.</p>
        </div>
      ),
    },
    {
      title: 'Xác nhận',
      content: (
        <div>
          <p>Xác nhận thông tin kiểm kê trước khi tạo.</p>
          <p>Trong demo này, chúng ta sẽ bỏ qua bước này.</p>
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingStocktake(null);
    setCurrentStep(0);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (stocktake: any) => {
    setEditingStocktake(stocktake);
    setCurrentStep(0);
    form.setFieldsValue(stocktake);
    setIsModalVisible(true);
  };

  const handleView = (stocktake: any) => {
    Modal.info({
      title: 'Chi tiết phiếu kiểm kê',
      width: 800,
      content: (
        <div>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Mã phiếu">{stocktake.code}</Descriptions.Item>
            <Descriptions.Item label="Kho">{stocktake.warehouse_name}</Descriptions.Item>
            <Descriptions.Item label="Người kiểm kê">{stocktake.counted_by_name}</Descriptions.Item>
            <Descriptions.Item label="Ngày kiểm kê">{formatDate(stocktake.counted_at)}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={getStatusColor(stocktake.status)}>
                {getStatusText(stocktake.status)}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
          
          <div style={{ marginTop: 16 }}>
            <h4>Kết quả kiểm kê:</h4>
            <Table
              columns={[
                { title: 'Vật tư', dataIndex: 'item_name', key: 'item_name' },
                { title: 'SKU', dataIndex: 'item_sku', key: 'item_sku' },
                { title: 'Số lượng hệ thống', dataIndex: 'system_qty', key: 'system_qty' },
                { title: 'Số lượng thực tế', dataIndex: 'counted_qty', key: 'counted_qty' },
                { 
                  title: 'Chênh lệch', 
                  dataIndex: 'difference', 
                  key: 'difference',
                  render: (diff: number) => (
                    <Tag color={diff === 0 ? 'success' : diff > 0 ? 'warning' : 'error'}>
                      {diff > 0 ? '+' : ''}{diff}
                    </Tag>
                  )
                },
              ]}
              dataSource={stocktake.items}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </div>
        </div>
      ),
    });
  };

  const handleDelete = (stocktake: any) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa phiếu kiểm kê "${stocktake.code}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        message.success('Đã xóa phiếu kiểm kê thành công!');
      },
    });
  };

  const handleModalOk = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      form.validateFields().then((values) => {
        if (editingStocktake) {
          message.success('Cập nhật phiếu kiểm kê thành công!');
        } else {
          message.success('Tạo phiếu kiểm kê thành công!');
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
          <Title level={2}>Quản lý kiểm kê</Title>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Tạo phiếu kiểm kê
          </Button>
        </div>

        <Card>
          <Table
            columns={columns}
            dataSource={mockStocktakes}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} phiếu kiểm kê`,
            }}
          />
        </Card>

        <Modal
          title={editingStocktake ? 'Sửa phiếu kiểm kê' : 'Tạo phiếu kiểm kê mới'}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText={currentStep === steps.length - 1 ? (editingStocktake ? 'Cập nhật' : 'Tạo') : 'Tiếp theo'}
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
              {currentStep === steps.length - 1 ? (editingStocktake ? 'Cập nhật' : 'Tạo') : 'Tiếp theo'}
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

export default StocktakesPage;
