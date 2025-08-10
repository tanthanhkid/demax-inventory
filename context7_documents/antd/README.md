# Ant Design ReactJS Documentation

## Tổng quan
Ant Design là một thư viện UI component cho ReactJS, cung cấp các component chất lượng cao cho các ứng dụng enterprise-level. Thư viện này được phát triển bởi Alibaba và có cộng đồng lớn với hơn 2759 code snippets và trust score 8.7.

## Cài đặt

```bash
npm install antd
# hoặc
yarn add antd
```

## Sử dụng cơ bản

```jsx
import React from 'react';
import { Button, Space, DatePicker, version } from 'antd';

const App = () => (
  <div style={{ padding: '0 24px' }}>
    <h1>antd version: {version}</h1>
    <Space>
      <DatePicker />
      <Button type="primary">Primary Button</Button>
    </Space>
  </div>
);

export default App;
```

## Các Component chính

### 1. Layout Components

#### Layout
```jsx
import { Layout, Menu } from 'antd';

<Layout>
  <Sider width="200" theme="light" className="site-layout-background">
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
      items={items}
    />
  </Sider>
  <Layout>
    <Header className="site-layout-background" style={{ background: '#fff', padding: 0 }} />
    <Content style={{ margin: '24px 16px 0' }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        Content
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
  </Layout>
</Layout>
```

#### Grid System
```jsx
import { Row, Col } from 'antd';

<Row gutter={16}>
  <Col span={12}>
    <Card>
      <Statistic title="Active Users" value={112893} />
    </Card>
  </Col>
  <Col span={12}>
    <Card>
      <Statistic title="Active Users" value={112893} />
    </Card>
  </Col>
</Row>
```

### 2. Form Components

#### Form cơ bản
```jsx
import { Form, Input, Button } from 'antd';

const App = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
```

#### Input với Addons
```jsx
import { Input, Space } from 'antd';

<Space direction="vertical">
  <Input addonBefore="Http://" defaultValue="mysite.com" />
  <Input addonAfter=".com" defaultValue="mysite" />
  <Input addonBefore="https://" addonAfter="/" defaultValue="mysite" />
</Space>
```

#### Input Sizes
```jsx
import { Input } from 'antd';

<>
  <Input size="large" placeholder="large input" />
  <Input placeholder="middle input" />
  <Input size="small" placeholder="small input" />
</>
```

### 3. Data Display Components

#### Table
```jsx
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
];

<Table columns={columns} dataSource={data} />
```

#### Card
```jsx
import { Card, Statistic } from 'antd';

<Card>
  <Statistic title="Active Users" value={112893} />
</Card>
```

#### Descriptions
```jsx
import { Descriptions } from 'antd';

const items = [
  {
    key: '1',
    label: 'UserName',
    children: <p>Zhou Maomao</p>,
  },
  {
    key: '2',
    label: 'Telephone',
    children: <p>1810000000</p>,
  },
  {
    key: '3',
    label: 'Live',
    children: <p>Hangzhou, Zhejiang</p>,
  },
];

<Descriptions title="User Info" items={items} />
```

### 4. Navigation Components

#### Menu
```jsx
import { Menu } from 'antd';

const items = [
  {
    key: '1',
    label: 'Option 1',
  },
  {
    key: '2',
    label: 'Option 2',
  },
];

<Menu items={items} />
```

#### Tabs
```jsx
import { Tabs } from 'antd';

const items = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
];

<Tabs defaultActiveKey="1" items={items} />
```

#### Steps
```jsx
import { Steps } from 'antd';

const items = [
  {
    title: 'Finished',
    description: 'This is a description.',
  },
  {
    title: 'In Progress',
    description: 'This is a description.',
  },
  {
    title: 'Waiting',
    description: 'This is a description.',
  },
];

<Steps current={1} items={items} />
```

### 5. Feedback Components

#### Modal
```jsx
import { Modal, Button } from 'antd';

const [isModalOpen, setIsModalOpen] = useState(false);

const showModal = () => {
  setIsModalOpen(true);
};

const handleOk = () => {
  setIsModalOpen(false);
};

const handleCancel = () => {
  setIsModalOpen(false);
};

<>
  <Button type="primary" onClick={showModal}>
    Open Modal
  </Button>
  <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>
</>
```

#### Message
```jsx
import { message, Button } from 'antd';

const success = () => {
  message.success('This is a success message');
};

<Button onClick={success}>Display success message</Button>
```

#### Notification
```jsx
import { notification, Button } from 'antd';

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description: 'This is the content of the notification.',
  });
};

<Button type="primary" onClick={openNotification}>
  Open the notification box
</Button>
```

### 6. Data Entry Components

#### Select
```jsx
import { Select } from 'antd';

const { Option } = Select;

<Select defaultValue="lucy" style={{ width: 120 }}>
  <Option value="jack">Jack</Option>
  <Option value="lucy">Lucy</Option>
  <Option value="disabled" disabled>
    Disabled
  </Option>
  <Option value="yiminghe">Yiminghe</Option>
</Select>
```

#### DatePicker
```jsx
import { DatePicker } from 'antd';

<DatePicker />
```

#### Checkbox
```jsx
import { Checkbox } from 'antd';

<Checkbox>Checkbox</Checkbox>
```

#### Radio
```jsx
import { Radio } from 'antd';

<Radio>Radio</Radio>
```

### 7. Other Components

#### Typography
```jsx
import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

<>
  <Title>h1. Ant Design</Title>
  <Title level={2}>h2. Ant Design</Title>
  <Title level={3}>h3. Ant Design</Title>
  <Title level={4}>h4. Ant Design</Title>
  <Title level={5}>h5. Ant Design</Title>
</>
```

#### Icon
```jsx
import { UserOutlined } from '@ant-design/icons';

<UserOutlined style={{ fontSize: '16px', color: '#08c' }} />
```

#### Button
```jsx
import { Button, Space } from 'antd';

<Space wrap>
  <Button type="primary">Primary Button</Button>
  <Button>Default Button</Button>
  <Button type="dashed">Dashed Button</Button>
  <Button type="text">Text Button</Button>
  <Button type="link">Link Button</Button>
</Space>
```

## Theme và Customization

### ConfigProvider
```jsx
import { ConfigProvider } from 'antd';

<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#00b96b',
    },
    components: {
      Radio: {
        colorPrimary: '#00b96b',
      },
      Checkbox: {
        colorPrimary: '#ff4d4f',
      },
    },
  }}
>
  <App />
</ConfigProvider>
```

### Component Tokens
Ant Design sử dụng hệ thống token để tùy chỉnh theme. Mỗi component có các token riêng:

#### Button Tokens
- `fontWeight`: Font weight của button
- `borderRadius`: Border radius
- `colorPrimary`: Màu chính
- `colorText`: Màu text
- `colorBgContainer`: Màu background

#### Form Tokens
- `labelColor`: Màu của label
- `labelFontSize`: Font size của label
- `labelHeight`: Chiều cao của label

## TypeScript Support

### GetProps Utility
```tsx
import { Checkbox } from 'antd';
import type { GetProps } from 'antd';

type CheckboxGroupType = GetProps<typeof Checkbox.Group>;
```

### GetRef Utility
```tsx
import { Select } from 'antd';
import type { GetRef } from 'antd';

type SelectRefType = GetRef<typeof Select>; // BaseSelectRef
```

## Best Practices

1. **Sử dụng ConfigProvider**: Luôn wrap ứng dụng trong ConfigProvider để có thể tùy chỉnh theme
2. **Responsive Design**: Sử dụng Grid system với responsive breakpoints
3. **Form Validation**: Sử dụng built-in validation của Form component
4. **Loading States**: Sử dụng loading props cho các component tương tác
5. **Accessibility**: Ant Design đã được thiết kế với accessibility trong tâm trí

## Migration từ v4 sang v5

### Các thay đổi chính:
- `visible` prop được thay thế bằng `open` cho Modal, Drawer, etc.
- Một số component đã được di chuyển sang `@ant-design/pro-components`
- `BackTop` component được thay thế bằng `FloatButton.BackTop`

```jsx
// v4
<Modal visible={isVisible} />

// v5
<Modal open={isOpen} />
```

## Resources

- [Official Documentation](https://ant.design/docs/react/introduce)
- [GitHub Repository](https://github.com/ant-design/ant-design)
- [Component API Reference](https://ant.design/components/overview)
- [Design Principles](https://ant.design/docs/spec/introduce)

## Version Information

- **Current Version**: 5.x
- **Trust Score**: 8.7/10
- **Code Snippets**: 2759+
- **Last Updated**: 2024

