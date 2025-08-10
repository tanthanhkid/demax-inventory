'use client';

import React, { useRef, useState } from 'react';
import { Button, Modal, Select, Space, Typography, Form, Input, Card, Row, Col, Divider, Alert } from 'antd';
import { 
  PrinterOutlined, 
  DownloadOutlined, 
  EyeOutlined,
  FileTextOutlined,
  BarcodeOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';

const { Text, Title } = Typography;
const { Option } = Select;

interface PrintComponentProps {
  data: any;
  type: 'grn' | 'issue' | 'transfer' | 'stocktake' | 'label' | 'barcode';
  onPrint?: () => void;
  buttonText?: string;
  buttonType?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  disabled?: boolean;
}

interface PrintTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
}

const PrintComponent: React.FC<PrintComponentProps> = ({
  data,
  type,
  onPrint,
  buttonText = 'In phiếu',
  buttonType = 'default',
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [printSettings, setPrintSettings] = useState({
    copies: 1,
    paperSize: 'A4',
    orientation: 'portrait',
    margin: 'normal',
  });
  const printRef = useRef<HTMLDivElement>(null);

  const templates: PrintTemplate[] = [
    { id: 'default', name: 'Mẫu chuẩn', description: 'Mẫu phiếu chuẩn của DEMAX', type: 'all' },
    { id: 'compact', name: 'Mẫu gọn', description: 'Mẫu phiếu gọn tiết kiệm giấy', type: 'all' },
    { id: 'detailed', name: 'Mẫu chi tiết', description: 'Mẫu phiếu chi tiết đầy đủ thông tin', type: 'all' },
    { id: 'label-small', name: 'Tem nhỏ', description: 'Tem nhãn kích thước nhỏ', type: 'label' },
    { id: 'label-medium', name: 'Tem vừa', description: 'Tem nhãn kích thước vừa', type: 'label' },
    { id: 'barcode-standard', name: 'Barcode chuẩn', description: 'Mã vạch chuẩn Code 128', type: 'barcode' },
    { id: 'qr-code', name: 'QR Code', description: 'Mã QR với thông tin đầy đủ', type: 'barcode' },
  ];

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onAfterPrint: () => {
      if (onPrint) onPrint();
    },
  });

  const showModal = () => {
    setIsModalVisible(true);
    setSelectedTemplate('default');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTemplate('');
  };

  const handlePrintClick = () => {
    handlePrint();
    setIsModalVisible(false);
  };

  const renderPrintContent = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    
    switch (type) {
      case 'grn':
        return renderGRNContent(template);
      case 'issue':
        return renderIssueContent(template);
      case 'transfer':
        return renderTransferContent(template);
      case 'stocktake':
        return renderStocktakeContent(template);
      case 'label':
        return renderLabelContent(template);
      case 'barcode':
        return renderBarcodeContent(template);
      default:
        return <div>Không hỗ trợ loại phiếu này</div>;
    }
  };

  const renderGRNContent = (template: PrintTemplate | undefined) => (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Title level={2} style={{ margin: 0 }}>PHIẾU NHẬP KHO</Title>
        <Text strong>DEMAX INVENTORY SYSTEM</Text>
      </div>
      
      <Row gutter={16}>
        <Col span={12}>
          <Text strong>Mã phiếu:</Text> {data.code || 'GRN-20240101-001'}<br/>
          <Text strong>Ngày nhập:</Text> {data.date || '01/01/2024'}<br/>
          <Text strong>Kho nhập:</Text> {data.warehouse || 'Kho chung vật tư'}
        </Col>
        <Col span={12}>
          <Text strong>Nhà cung cấp:</Text> {data.supplier || 'Công ty TNHH ABC'}<br/>
          <Text strong>Người nhận:</Text> {data.receiver || 'Nguyễn Văn Kho'}<br/>
          <Text strong>Trạng thái:</Text> {data.status || 'Đã duyệt'}
        </Col>
      </Row>

      <Divider />

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>STT</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Mã vật tư</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Tên vật tư</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Đơn vị</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Số lượng</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {(data.items || []).map((item: any, index: number) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{index + 1}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.sku}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.name}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.unit}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.quantity}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 30 }}>
        <Row gutter={16}>
          <Col span={8}>
            <div style={{ textAlign: 'center' }}>
              <Text strong>Người lập phiếu</Text><br/>
              <div style={{ marginTop: 50 }}>........................</div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center' }}>
              <Text strong>Người nhận</Text><br/>
              <div style={{ marginTop: 50 }}>........................</div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center' }}>
              <Text strong>Thủ kho</Text><br/>
              <div style={{ marginTop: 50 }}>........................</div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );

  const renderIssueContent = (template: PrintTemplate | undefined) => (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Title level={2} style={{ margin: 0 }}>PHIẾU XUẤT KHO</Title>
        <Text strong>DEMAX INVENTORY SYSTEM</Text>
      </div>
      
      <Row gutter={16}>
        <Col span={12}>
          <Text strong>Mã phiếu:</Text> {data.code || 'ISSUE-20240101-001'}<br/>
          <Text strong>Ngày xuất:</Text> {data.date || '01/01/2024'}<br/>
          <Text strong>Kho xuất:</Text> {data.warehouse || 'Kho chung vật tư'}
        </Col>
        <Col span={12}>
          <Text strong>Người yêu cầu:</Text> {data.requester || 'Trần Thị Sản Xuất'}<br/>
          <Text strong>Bộ phận:</Text> {data.department || 'Sản xuất'}<br/>
          <Text strong>Trạng thái:</Text> {data.status || 'Đã xuất'}
        </Col>
      </Row>

      <Divider />

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>STT</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Mã vật tư</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Tên vật tư</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Đơn vị</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Số lượng yêu cầu</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Số lượng thực xuất</th>
          </tr>
        </thead>
        <tbody>
          {(data.items || []).map((item: any, index: number) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{index + 1}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.sku}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.name}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.unit}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.requestedQty}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.actualQty}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 30 }}>
        <Row gutter={16}>
          <Col span={8}>
            <div style={{ textAlign: 'center' }}>
              <Text strong>Người yêu cầu</Text><br/>
              <div style={{ marginTop: 50 }}>........................</div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center' }}>
              <Text strong>Người xuất</Text><br/>
              <div style={{ marginTop: 50 }}>........................</div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center' }}>
              <Text strong>Thủ kho</Text><br/>
              <div style={{ marginTop: 50 }}>........................</div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );

  const renderTransferContent = (template: PrintTemplate | undefined) => (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Title level={2} style={{ margin: 0 }}>PHIẾU ĐIỀU CHUYỂN KHO</Title>
        <Text strong>DEMAX INVENTORY SYSTEM</Text>
      </div>
      
      <Row gutter={16}>
        <Col span={12}>
          <Text strong>Mã phiếu:</Text> {data.code || 'TRF-20240101-001'}<br/>
          <Text strong>Ngày chuyển:</Text> {data.date || '01/01/2024'}<br/>
          <Text strong>Kho nguồn:</Text> {data.sourceWarehouse || 'Kho chung vật tư'}
        </Col>
        <Col span={12}>
          <Text strong>Kho đích:</Text> {data.destWarehouse || 'Kho phân xưởng 1'}<br/>
          <Text strong>Người yêu cầu:</Text> {data.requester || 'Nguyễn Văn Kho'}<br/>
          <Text strong>Trạng thái:</Text> {data.status || 'Đã chuyển'}
        </Col>
      </Row>

      <Divider />

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>STT</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Mã vật tư</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Tên vật tư</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Đơn vị</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {(data.items || []).map((item: any, index: number) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{index + 1}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.sku}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.name}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.unit}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 30 }}>
        <Row gutter={16}>
          <Col span={8}>
            <div style={{ textAlign: 'center' }}>
              <Text strong>Người chuyển</Text><br/>
              <div style={{ marginTop: 50 }}>........................</div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center' }}>
              <Text strong>Người nhận</Text><br/>
              <div style={{ marginTop: 50 }}>........................</div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center' }}>
              <Text strong>Thủ kho</Text><br/>
              <div style={{ marginTop: 50 }}>........................</div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );

  const renderStocktakeContent = (template: PrintTemplate | undefined) => (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Title level={2} style={{ margin: 0 }}>PHIẾU KIỂM KÊ</Title>
        <Text strong>DEMAX INVENTORY SYSTEM</Text>
      </div>
      
      <Row gutter={16}>
        <Col span={12}>
          <Text strong>Mã phiếu:</Text> {data.code || 'STK-20240101-001'}<br/>
          <Text strong>Ngày kiểm kê:</Text> {data.date || '01/01/2024'}<br/>
          <Text strong>Kho kiểm kê:</Text> {data.warehouse || 'Kho chung vật tư'}
        </Col>
        <Col span={12}>
          <Text strong>Người kiểm kê:</Text> {data.checker || 'Nguyễn Văn Kho'}<br/>
          <Text strong>Loại kiểm kê:</Text> {data.type || 'Định kỳ'}<br/>
          <Text strong>Trạng thái:</Text> {data.status || 'Đã duyệt'}
        </Col>
      </Row>

      <Divider />

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>STT</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Mã vật tư</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Tên vật tư</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Đơn vị</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Tồn sổ sách</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Tồn thực tế</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Chênh lệch</th>
          </tr>
        </thead>
        <tbody>
          {(data.items || []).map((item: any, index: number) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{index + 1}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.sku}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.name}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.unit}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.bookQty}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.actualQty}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{item.difference}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 30 }}>
        <Row gutter={16}>
          <Col span={8}>
            <div style={{ textAlign: 'center' }}>
              <Text strong>Người kiểm kê</Text><br/>
              <div style={{ marginTop: 50 }}>........................</div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center' }}>
              <Text strong>Người duyệt</Text><br/>
              <div style={{ marginTop: 50 }}>........................</div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center' }}>
              <Text strong>Thủ kho</Text><br/>
              <div style={{ marginTop: 50 }}>........................</div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );

  const renderLabelContent = (template: PrintTemplate | undefined) => (
    <div style={{ 
      padding: 10, 
      fontFamily: 'Arial, sans-serif',
      border: '1px solid #000',
      width: template?.id === 'label-small' ? '200px' : '300px',
      height: template?.id === 'label-small' ? '100px' : '150px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}>
          DEMAX INVENTORY
        </div>
        <div style={{ fontSize: '10px' }}>
          <div><strong>SKU:</strong> {data.sku || 'SKU001'}</div>
          <div><strong>Tên:</strong> {data.name || 'Cáp điện 2x1.5mm'}</div>
          <div><strong>Kho:</strong> {data.warehouse || 'Kho chung vật tư'}</div>
          <div><strong>Ngày:</strong> {data.date || '01/01/2024'}</div>
        </div>
      </div>
      <div style={{ textAlign: 'center', fontSize: '8px' }}>
        <div style={{ 
          border: '1px solid #000', 
          padding: '2px', 
          display: 'inline-block',
          fontFamily: 'monospace'
        }}>
          |||| |||| |||| ||||
        </div>
      </div>
    </div>
  );

  const renderBarcodeContent = (template: PrintTemplate | undefined) => (
    <div style={{ 
      padding: 10, 
      fontFamily: 'Arial, sans-serif',
      border: '1px solid #000',
      width: '200px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '10px', marginBottom: '5px' }}>
        {data.sku || 'SKU001'}
      </div>
      <div style={{ 
        border: '1px solid #000', 
        padding: '5px', 
        marginBottom: '5px',
        fontFamily: 'monospace',
        fontSize: '12px'
      }}>
        |||| |||| |||| ||||
      </div>
      <div style={{ fontSize: '8px' }}>
        {data.name || 'Cáp điện 2x1.5mm'}
      </div>
    </div>
  );

  return (
    <>
      <Button
        type={buttonType}
        icon={<PrinterOutlined />}
        onClick={showModal}
        disabled={disabled}
      >
        {buttonText}
      </Button>

      <Modal
        title="In phiếu"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="preview" icon={<EyeOutlined />} onClick={() => {}}>
            Xem trước
          </Button>,
          <Button key="print" type="primary" icon={<PrinterOutlined />} onClick={handlePrintClick}>
            In
          </Button>,
        ]}
        width={800}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Chọn mẫu in">
                  <Select
                    value={selectedTemplate}
                    onChange={setSelectedTemplate}
                    placeholder="Chọn mẫu in"
                  >
                    {templates
                      .filter(t => t.type === 'all' || t.type === type)
                      .map(template => (
                        <Option key={template.id} value={template.id}>
                          {template.name} - {template.description}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Số bản in">
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={printSettings.copies}
                    onChange={(e) => setPrintSettings(prev => ({ ...prev, copies: parseInt(e.target.value) || 1 }))}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <Divider />

          <div style={{ border: '1px solid #d9d9d9', padding: 20, background: '#fff' }}>
            <div ref={printRef}>
              {selectedTemplate && renderPrintContent()}
            </div>
          </div>

          <Alert
            message="Lưu ý"
            description="Đảm bảo máy in đã được kết nối và có đủ giấy trước khi in."
            type="info"
            showIcon
          />
        </Space>
      </Modal>
    </>
  );
};

export default PrintComponent;
