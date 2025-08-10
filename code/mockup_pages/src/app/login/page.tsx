'use client';

import React from 'react';
import { Form, Input, Button, Card, Typography, Space, message } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { mockUsers } from '@/data/mockData';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = (values: { username: string; password: string }) => {
    // Mock authentication
    const user = mockUsers.find(u => u.username === values.username);
    
    if (user && values.password === 'password') {
      message.success('Đăng nhập thành công!');
      router.push('/');
    } else {
      message.error('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F5F5F5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Card
        style={{
          width: 400,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: 8,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2} style={{ color: '#0E4F9E', marginBottom: 8 }}>
            DEMAX Inventory
          </Title>
          <Text type="secondary">Hệ thống quản lý kho</Text>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nhập tên đăng nhập"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              icon={<LoginOutlined />}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Text type="secondary">Tài khoản demo:</Text>
          <Space direction="vertical" style={{ width: '100%', marginTop: 8 }}>
            <Text code>admin / password</Text>
            <Text code>kho1 / password</Text>
            <Text code>sx1 / password</Text>
            <Text code>kt1 / password</Text>
            <Text code>tm1 / password</Text>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
