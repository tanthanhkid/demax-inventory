'use client';

import React, { useState } from 'react';
import { Layout as AntLayout, Menu, Avatar, Dropdown, Space, Badge } from 'antd';
import {
  DashboardOutlined,
  InboxOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { mockUsers } from '@/data/mockData';

const { Header, Sider, Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Mock current user (in real app, this would come from auth context)
  const currentUser = mockUsers[0]; // Admin user

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/warehouses',
      icon: <InboxOutlined />,
      label: 'Quản lý kho',
    },
    {
      key: '/items',
      icon: <ShoppingOutlined />,
      label: 'Vật tư',
    },
    {
      key: '/grns',
      icon: <FileTextOutlined />,
      label: 'Phiếu nhập',
    },
    {
      key: '/issues',
      icon: <FileTextOutlined />,
      label: 'Phiếu xuất',
    },
    {
      key: '/transfers',
      icon: <FileTextOutlined />,
      label: 'Điều chuyển',
    },
    {
      key: '/stocktakes',
      icon: <FileTextOutlined />,
      label: 'Kiểm kê',
    },
    {
      key: '/boms',
      icon: <FileTextOutlined />,
      label: 'BOM',
    },
    {
      key: '/purchase-requests',
      icon: <FileTextOutlined />,
      label: 'Yêu cầu mua',
    },
    {
      key: '/purchase-orders',
      icon: <FileTextOutlined />,
      label: 'Đơn mua',
    },
    {
      key: '/reports',
      icon: <BarChartOutlined />,
      label: 'Báo cáo',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      // Handle logout
      router.push('/login');
    } else if (key === 'profile') {
      // Handle profile
      console.log('Profile clicked');
    } else {
      router.push(key);
    }
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{
          background: '#0E4F9E',
        }}
      >
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white',
          fontSize: collapsed ? 16 : 20,
          fontWeight: 'bold',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          {collapsed ? 'DEMAX' : 'DEMAX Inventory'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            background: '#0E4F9E',
            borderRight: 'none',
          }}
        />
      </Sider>
      <AntLayout>
        <Header style={{ 
          padding: '0 24px', 
          background: '#0E4F9E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Space>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
              style: { color: 'white', fontSize: 18 }
            })}
          </Space>
          <Space>
            <Badge count={5} size="small">
              <BellOutlined style={{ color: 'white', fontSize: 18 }} />
            </Badge>
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleMenuClick,
              }}
              placement="bottomRight"
            >
              <Space style={{ color: 'white', cursor: 'pointer' }}>
                <Avatar size="small" icon={<UserOutlined />} />
                <span>{currentUser.full_name}</span>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content style={{ 
          margin: '24px 16px',
          padding: 24,
          background: '#F5F5F5',
          borderRadius: 8,
          minHeight: 280,
        }}>
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
