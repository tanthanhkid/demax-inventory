'use client';

import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Select, 
  Checkbox, 
  Space, 
  Typography, 
  Card, 
  Row, 
  Col, 
  Tag, 
  Alert,
  Switch,
  Divider,
  message,
  Input
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  SaveOutlined, 
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined
} from '@ant-design/icons';

const { Text, Title } = Typography;
const { Option } = Select;

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  actions: string[];
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  roleId: string;
  isActive: boolean;
  lastLogin?: string;
}

const RolePermission: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [form] = Form.useForm();

  // Mock data
  useEffect(() => {
    const mockPermissions: Permission[] = [
      // Quản lý kho
      { id: 'warehouse_view', name: 'Xem kho', description: 'Xem danh sách và thông tin kho', module: 'warehouse', actions: ['read'] },
      { id: 'warehouse_create', name: 'Tạo kho', description: 'Tạo kho mới', module: 'warehouse', actions: ['create'] },
      { id: 'warehouse_edit', name: 'Sửa kho', description: 'Chỉnh sửa thông tin kho', module: 'warehouse', actions: ['update'] },
      { id: 'warehouse_delete', name: 'Xóa kho', description: 'Xóa kho', module: 'warehouse', actions: ['delete'] },
      
      // Quản lý vật tư
      { id: 'item_view', name: 'Xem vật tư', description: 'Xem danh sách và thông tin vật tư', module: 'item', actions: ['read'] },
      { id: 'item_create', name: 'Tạo vật tư', description: 'Tạo vật tư mới', module: 'item', actions: ['create'] },
      { id: 'item_edit', name: 'Sửa vật tư', description: 'Chỉnh sửa thông tin vật tư', module: 'item', actions: ['update'] },
      { id: 'item_delete', name: 'Xóa vật tư', description: 'Xóa vật tư', module: 'item', actions: ['delete'] },
      
      // Phiếu nhập
      { id: 'grn_view', name: 'Xem phiếu nhập', description: 'Xem danh sách phiếu nhập', module: 'grn', actions: ['read'] },
      { id: 'grn_create', name: 'Tạo phiếu nhập', description: 'Tạo phiếu nhập mới', module: 'grn', actions: ['create'] },
      { id: 'grn_edit', name: 'Sửa phiếu nhập', description: 'Chỉnh sửa phiếu nhập', module: 'grn', actions: ['update'] },
      { id: 'grn_approve', name: 'Duyệt phiếu nhập', description: 'Duyệt phiếu nhập', module: 'grn', actions: ['approve'] },
      { id: 'grn_delete', name: 'Xóa phiếu nhập', description: 'Xóa phiếu nhập', module: 'grn', actions: ['delete'] },
      
      // Phiếu xuất
      { id: 'issue_view', name: 'Xem phiếu xuất', description: 'Xem danh sách phiếu xuất', module: 'issue', actions: ['read'] },
      { id: 'issue_create', name: 'Tạo phiếu xuất', description: 'Tạo phiếu xuất mới', module: 'issue', actions: ['create'] },
      { id: 'issue_edit', name: 'Sửa phiếu xuất', description: 'Chỉnh sửa phiếu xuất', module: 'issue', actions: ['update'] },
      { id: 'issue_approve', name: 'Duyệt phiếu xuất', description: 'Duyệt phiếu xuất', module: 'issue', actions: ['approve'] },
      { id: 'issue_delete', name: 'Xóa phiếu xuất', description: 'Xóa phiếu xuất', module: 'issue', actions: ['delete'] },
      
      // Điều chuyển
      { id: 'transfer_view', name: 'Xem điều chuyển', description: 'Xem danh sách điều chuyển', module: 'transfer', actions: ['read'] },
      { id: 'transfer_create', name: 'Tạo điều chuyển', description: 'Tạo phiếu điều chuyển mới', module: 'transfer', actions: ['create'] },
      { id: 'transfer_approve', name: 'Duyệt điều chuyển', description: 'Duyệt phiếu điều chuyển', module: 'transfer', actions: ['approve'] },
      
      // Kiểm kê
      { id: 'stocktake_view', name: 'Xem kiểm kê', description: 'Xem danh sách kiểm kê', module: 'stocktake', actions: ['read'] },
      { id: 'stocktake_create', name: 'Tạo kiểm kê', description: 'Tạo phiếu kiểm kê mới', module: 'stocktake', actions: ['create'] },
      { id: 'stocktake_approve', name: 'Duyệt kiểm kê', description: 'Duyệt phiếu kiểm kê', module: 'stocktake', actions: ['approve'] },
      
      // BOM
      { id: 'bom_view', name: 'Xem BOM', description: 'Xem danh sách BOM', module: 'bom', actions: ['read'] },
      { id: 'bom_create', name: 'Tạo BOM', description: 'Tạo BOM mới', module: 'bom', actions: ['create'] },
      { id: 'bom_edit', name: 'Sửa BOM', description: 'Chỉnh sửa BOM', module: 'bom', actions: ['update'] },
      { id: 'bom_approve', name: 'Duyệt BOM', description: 'Duyệt BOM', module: 'bom', actions: ['approve'] },
      
      // Thu mua
      { id: 'purchase_view', name: 'Xem thu mua', description: 'Xem danh sách yêu cầu mua và đơn mua', module: 'purchase', actions: ['read'] },
      { id: 'purchase_create', name: 'Tạo yêu cầu mua', description: 'Tạo yêu cầu mua mới', module: 'purchase', actions: ['create'] },
      { id: 'purchase_approve', name: 'Duyệt thu mua', description: 'Duyệt yêu cầu mua và đơn mua', module: 'purchase', actions: ['approve'] },
      
      // Báo cáo
      { id: 'report_view', name: 'Xem báo cáo', description: 'Xem các báo cáo tồn kho', module: 'report', actions: ['read'] },
      { id: 'report_export', name: 'Xuất báo cáo', description: 'Xuất báo cáo ra file', module: 'report', actions: ['export'] },
      
      // Cài đặt
      { id: 'setting_view', name: 'Xem cài đặt', description: 'Xem cài đặt hệ thống', module: 'setting', actions: ['read'] },
      { id: 'setting_edit', name: 'Sửa cài đặt', description: 'Chỉnh sửa cài đặt hệ thống', module: 'setting', actions: ['update'] },
      
      // Quản lý người dùng
      { id: 'user_view', name: 'Xem người dùng', description: 'Xem danh sách người dùng', module: 'user', actions: ['read'] },
      { id: 'user_create', name: 'Tạo người dùng', description: 'Tạo người dùng mới', module: 'user', actions: ['create'] },
      { id: 'user_edit', name: 'Sửa người dùng', description: 'Chỉnh sửa thông tin người dùng', module: 'user', actions: ['update'] },
      { id: 'user_delete', name: 'Xóa người dùng', description: 'Xóa người dùng', module: 'user', actions: ['delete'] },
    ];

    const mockRoles: Role[] = [
      {
        id: 'admin',
        name: 'Administrator',
        description: 'Quản trị viên hệ thống - Toàn quyền',
        permissions: mockPermissions.map(p => p.id),
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      {
        id: 'warehouse_manager',
        name: 'Quản lý kho',
        description: 'Quản lý kho - Quyền quản lý kho và vật tư',
        permissions: [
          'warehouse_view', 'warehouse_create', 'warehouse_edit',
          'item_view', 'item_create', 'item_edit',
          'grn_view', 'grn_create', 'grn_edit', 'grn_approve',
          'issue_view', 'issue_create', 'issue_edit', 'issue_approve',
          'transfer_view', 'transfer_create', 'transfer_approve',
          'stocktake_view', 'stocktake_create', 'stocktake_approve',
          'report_view', 'report_export',
        ],
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      {
        id: 'warehouse_staff',
        name: 'Nhân viên kho',
        description: 'Nhân viên kho - Quyền thực hiện nghiệp vụ kho',
        permissions: [
          'warehouse_view', 'item_view',
          'grn_view', 'grn_create', 'grn_edit',
          'issue_view', 'issue_create', 'issue_edit',
          'transfer_view', 'transfer_create',
          'stocktake_view', 'stocktake_create',
          'report_view',
        ],
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      {
        id: 'production_manager',
        name: 'Quản lý sản xuất',
        description: 'Quản lý sản xuất - Quyền quản lý BOM và yêu cầu vật tư',
        permissions: [
          'item_view',
          'issue_view', 'issue_create',
          'bom_view', 'bom_create', 'bom_edit', 'bom_approve',
          'purchase_view', 'purchase_create',
          'report_view',
        ],
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      {
        id: 'purchase_manager',
        name: 'Quản lý thu mua',
        description: 'Quản lý thu mua - Quyền quản lý thu mua',
        permissions: [
          'item_view',
          'purchase_view', 'purchase_create', 'purchase_approve',
          'grn_view', 'grn_create',
          'report_view', 'report_export',
        ],
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
    ];

    const mockUsers: User[] = [
      {
        id: '1',
        username: 'admin',
        fullName: 'Administrator',
        email: 'admin@demax.com',
        roleId: 'admin',
        isActive: true,
        lastLogin: '2024-01-02 10:30:00',
      },
      {
        id: '2',
        username: 'kho1',
        fullName: 'Nguyễn Văn Kho',
        email: 'kho1@demax.com',
        roleId: 'warehouse_manager',
        isActive: true,
        lastLogin: '2024-01-02 09:15:00',
      },
      {
        id: '3',
        username: 'sx1',
        fullName: 'Trần Thị Sản Xuất',
        email: 'sx1@demax.com',
        roleId: 'production_manager',
        isActive: true,
        lastLogin: '2024-01-02 08:45:00',
      },
      {
        id: '4',
        username: 'tm1',
        fullName: 'Phạm Thị Thu Mua',
        email: 'tm1@demax.com',
        roleId: 'purchase_manager',
        isActive: true,
        lastLogin: '2024-01-02 08:00:00',
      },
    ];

    setPermissions(mockPermissions);
    setRoles(mockRoles);
    setUsers(mockUsers);
  }, []);

  const showModal = (role?: Role) => {
    setEditingRole(role || null);
    if (role) {
      form.setFieldsValue({
        name: role.name,
        description: role.description,
        permissions: role.permissions,
        isActive: role.isActive,
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRole(null);
    form.resetFields();
  };

  const handleSave = async (values: any) => {
    try {
      if (editingRole) {
        // Update existing role
        const updatedRole: Role = {
          ...editingRole,
          name: values.name,
          description: values.description,
          permissions: values.permissions,
          isActive: values.isActive,
          updatedAt: new Date().toISOString(),
        };
        setRoles(prev => prev.map(r => r.id === editingRole.id ? updatedRole : r));
        message.success('Cập nhật vai trò thành công');
      } else {
        // Create new role
        const newRole: Role = {
          id: `role_${Date.now()}`,
          name: values.name,
          description: values.description,
          permissions: values.permissions,
          isActive: values.isActive,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setRoles(prev => [...prev, newRole]);
        message.success('Tạo vai trò thành công');
      }
      handleCancel();
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role && users.some(u => u.roleId === roleId)) {
      message.error('Không thể xóa vai trò đang được sử dụng');
      return;
    }
    setRoles(prev => prev.filter(r => r.id !== roleId));
    message.success('Xóa vai trò thành công');
  };

  const getPermissionModule = (permissionId: string) => {
    const permission = permissions.find(p => p.id === permissionId);
    return permission?.module || '';
  };

  const getPermissionName = (permissionId: string) => {
    const permission = permissions.find(p => p.id === permissionId);
    return permission?.name || permissionId;
  };

  const getRoleName = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role?.name || roleId;
  };

  const roleColumns = [
    {
      title: 'Tên vai trò',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Role) => (
        <Space>
          <Text strong>{text}</Text>
          {record.id === 'admin' && <Tag color="red">Admin</Tag>}
        </Space>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Số quyền',
      key: 'permissionCount',
      render: (text: string, record: Role) => (
        <Tag color="blue">{record.permissions.length}</Tag>
      ),
    },
    {
      title: 'Người dùng',
      key: 'userCount',
      render: (text: string, record: Role) => (
        <Tag color="green">{users.filter(u => u.roleId === record.id).length}</Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (text: string, record: Role) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />}
            onClick={() => showModal(record)}
          >
            Xem
          </Button>
          <Button 
            type="text" 
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            disabled={record.id === 'admin'}
          >
            Sửa
          </Button>
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteRole(record.id)}
            disabled={record.id === 'admin'}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const userColumns = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'roleId',
      key: 'roleId',
      render: (roleId: string) => getRoleName(roleId),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Đăng nhập cuối',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (lastLogin?: string) => lastLogin || 'Chưa đăng nhập',
    },
  ];

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Title level={2}>Quản lý phân quyền</Title>
        <Text type="secondary">
          Quản lý vai trò và quyền hạn của người dùng trong hệ thống
        </Text>
      </div>

      <Row gutter={16}>
        <Col span={12}>
          <Card 
            title="Danh sách vai trò" 
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => showModal()}
              >
                Thêm vai trò
              </Button>
            }
          >
            <Table
              dataSource={roles}
              columns={roleColumns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        
        <Col span={12}>
          <Card title="Danh sách người dùng">
            <Table
              dataSource={users}
              columns={userColumns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title={editingRole ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            isActive: true,
            permissions: [],
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên vai trò"
                rules={[{ required: true, message: 'Vui lòng nhập tên vai trò' }]}
              >
                <Input placeholder="Nhập tên vai trò" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="isActive"
                label="Trạng thái"
                valuePropName="checked"
              >
                <Switch checkedChildren="Hoạt động" unCheckedChildren="Không hoạt động" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <Input.TextArea rows={3} placeholder="Nhập mô tả vai trò" />
          </Form.Item>

          <Divider />

          <Form.Item
            name="permissions"
            label="Quyền hạn"
            rules={[{ required: true, message: 'Vui lòng chọn ít nhất một quyền' }]}
          >
            <div style={{ maxHeight: 400, overflowY: 'auto' }}>
              {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
                <Card 
                  key={module} 
                  title={module.toUpperCase()} 
                  size="small" 
                  style={{ marginBottom: 16 }}
                >
                  <Row gutter={[16, 8]}>
                    {modulePermissions.map(permission => (
                      <Col span={12} key={permission.id}>
                        <Checkbox value={permission.id}>
                          <div>
                            <Text strong>{permission.name}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              {permission.description}
                            </Text>
                          </div>
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Card>
              ))}
            </div>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                {editingRole ? 'Cập nhật' : 'Tạo mới'}
              </Button>
              <Button onClick={handleCancel}>
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Alert
        message="Lưu ý về phân quyền"
        description="Hệ thống tuân thủ nguyên tắc SoD (Separation of Duties). Người tạo phiếu không thể tự duyệt phiếu của mình. Vai trò Administrator có toàn quyền trong hệ thống."
        type="info"
        showIcon
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default RolePermission;
