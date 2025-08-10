'use client';

import React, { useState } from 'react';
import { Card, Row, Col, Form, Input, Select, InputNumber, Button, Switch, Typography, Space, Divider, message } from 'antd';
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import { mockUsers, mockRoles, mockWarehouses } from '@/data/mockData';
import Layout from '@/components/Layout';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const SettingsPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await form.validateFields();
      // Mock save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Cài đặt đã được lưu thành công!');
    } catch (error) {
      message.error('Có lỗi xảy ra khi lưu cài đặt!');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    message.info('Đã đặt lại cài đặt về mặc định!');
  };

  return (
    <Layout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={2}>Cài đặt hệ thống</Title>
          <Space>
            <Button 
              icon={<ReloadOutlined />}
              onClick={handleReset}
            >
              Đặt lại
            </Button>
            <Button 
              type="primary"
              icon={<SaveOutlined />}
              loading={loading}
              onClick={handleSave}
            >
              Lưu cài đặt
            </Button>
          </Space>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            system_name: 'DEMAX Inventory System',
            company_name: 'Công ty TNHH DEMAX',
            default_warehouse: 1,
            auto_generate_codes: true,
            require_approval: true,
            low_stock_threshold: 20,
            max_stock_threshold: 80,
            backup_frequency: 'daily',
            session_timeout: 30,
            email_notifications: true,
            sms_notifications: false,
          }}
        >
          <Row gutter={[24, 24]}>
            {/* Thông tin hệ thống */}
            <Col xs={24} lg={12}>
              <Card title="Thông tin hệ thống" style={{ marginBottom: 24 }}>
                <Form.Item
                  name="system_name"
                  label="Tên hệ thống"
                  rules={[{ required: true, message: 'Vui lòng nhập tên hệ thống!' }]}
                >
                  <Input placeholder="Nhập tên hệ thống" />
                </Form.Item>

                <Form.Item
                  name="company_name"
                  label="Tên công ty"
                  rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}
                >
                  <Input placeholder="Nhập tên công ty" />
                </Form.Item>

                <Form.Item
                  name="company_address"
                  label="Địa chỉ công ty"
                >
                  <TextArea rows={3} placeholder="Nhập địa chỉ công ty" />
                </Form.Item>

                <Form.Item
                  name="company_phone"
                  label="Số điện thoại"
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>

                <Form.Item
                  name="company_email"
                  label="Email"
                  rules={[{ type: 'email', message: 'Email không hợp lệ!' }]}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Card>
            </Col>

            {/* Cài đặt kho */}
            <Col xs={24} lg={12}>
              <Card title="Cài đặt kho" style={{ marginBottom: 24 }}>
                <Form.Item
                  name="default_warehouse"
                  label="Kho mặc định"
                  rules={[{ required: true, message: 'Vui lòng chọn kho mặc định!' }]}
                >
                  <Select placeholder="Chọn kho mặc định">
                    {mockWarehouses.map(warehouse => (
                      <Option key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="auto_generate_codes"
                  label="Tự động tạo mã"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  name="code_prefix"
                  label="Tiền tố mã phiếu"
                >
                  <Input placeholder="VD: GRN, ISSUE, PO" />
                </Form.Item>

                <Form.Item
                  name="require_approval"
                  label="Yêu cầu duyệt"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Card>
            </Col>

            {/* Cài đặt tồn kho */}
            <Col xs={24} lg={12}>
              <Card title="Cài đặt tồn kho" style={{ marginBottom: 24 }}>
                <Form.Item
                  name="low_stock_threshold"
                  label="Ngưỡng tồn thấp (%)"
                  rules={[{ required: true, message: 'Vui lòng nhập ngưỡng tồn thấp!' }]}
                >
                  <InputNumber
                    min={0}
                    max={100}
                    style={{ width: '100%' }}
                    placeholder="Nhập ngưỡng tồn thấp"
                  />
                </Form.Item>

                <Form.Item
                  name="max_stock_threshold"
                  label="Ngưỡng tồn cao (%)"
                  rules={[{ required: true, message: 'Vui lòng nhập ngưỡng tồn cao!' }]}
                >
                  <InputNumber
                    min={0}
                    max={100}
                    style={{ width: '100%' }}
                    placeholder="Nhập ngưỡng tồn cao"
                  />
                </Form.Item>

                <Form.Item
                  name="auto_reorder"
                  label="Tự động đặt hàng"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  name="stock_warning_days"
                  label="Số ngày cảnh báo trước"
                >
                  <InputNumber
                    min={1}
                    max={30}
                    style={{ width: '100%' }}
                    placeholder="Nhập số ngày"
                  />
                </Form.Item>
              </Card>
            </Col>

            {/* Cài đặt bảo mật */}
            <Col xs={24} lg={12}>
              <Card title="Cài đặt bảo mật" style={{ marginBottom: 24 }}>
                <Form.Item
                  name="session_timeout"
                  label="Thời gian timeout (phút)"
                  rules={[{ required: true, message: 'Vui lòng nhập thời gian timeout!' }]}
                >
                  <InputNumber
                    min={5}
                    max={480}
                    style={{ width: '100%' }}
                    placeholder="Nhập thời gian timeout"
                  />
                </Form.Item>

                <Form.Item
                  name="password_min_length"
                  label="Độ dài mật khẩu tối thiểu"
                >
                  <InputNumber
                    min={6}
                    max={20}
                    style={{ width: '100%' }}
                    placeholder="Nhập độ dài mật khẩu"
                  />
                </Form.Item>

                <Form.Item
                  name="require_strong_password"
                  label="Yêu cầu mật khẩu mạnh"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  name="max_login_attempts"
                  label="Số lần đăng nhập tối đa"
                >
                  <InputNumber
                    min={3}
                    max={10}
                    style={{ width: '100%' }}
                    placeholder="Nhập số lần"
                  />
                </Form.Item>
              </Card>
            </Col>

            {/* Cài đặt thông báo */}
            <Col xs={24} lg={12}>
              <Card title="Cài đặt thông báo" style={{ marginBottom: 24 }}>
                <Form.Item
                  name="email_notifications"
                  label="Thông báo qua email"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  name="sms_notifications"
                  label="Thông báo qua SMS"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  name="notification_frequency"
                  label="Tần suất thông báo"
                >
                  <Select placeholder="Chọn tần suất">
                    <Option value="immediate">Ngay lập tức</Option>
                    <Option value="hourly">Hàng giờ</Option>
                    <Option value="daily">Hàng ngày</Option>
                    <Option value="weekly">Hàng tuần</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="low_stock_notification"
                  label="Thông báo tồn thấp"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Card>
            </Col>

            {/* Cài đặt sao lưu */}
            <Col xs={24} lg={12}>
              <Card title="Cài đặt sao lưu" style={{ marginBottom: 24 }}>
                <Form.Item
                  name="backup_frequency"
                  label="Tần suất sao lưu"
                  rules={[{ required: true, message: 'Vui lòng chọn tần suất sao lưu!' }]}
                >
                  <Select placeholder="Chọn tần suất">
                    <Option value="daily">Hàng ngày</Option>
                    <Option value="weekly">Hàng tuần</Option>
                    <Option value="monthly">Hàng tháng</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="backup_retention"
                  label="Thời gian lưu trữ (ngày)"
                >
                  <InputNumber
                    min={1}
                    max={365}
                    style={{ width: '100%' }}
                    placeholder="Nhập số ngày"
                  />
                </Form.Item>

                <Form.Item
                  name="auto_backup"
                  label="Sao lưu tự động"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  name="backup_location"
                  label="Vị trí sao lưu"
                >
                  <Input placeholder="Nhập đường dẫn sao lưu" />
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </Layout>
  );
};

export default SettingsPage;
