'use client';

import React, { useState } from 'react';
import { Card, Row, Col, Typography, Space, Button, Divider, Alert } from 'antd';
import BarcodeScanner from '@/components/BarcodeScanner';
import FileUpload from '@/components/FileUpload';
import PrintComponent from '@/components/PrintComponent';
import RolePermission from '@/components/RolePermission';

const { Title, Text } = Typography;

const DemoPage: React.FC = () => {
  const [scannedCode, setScannedCode] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleScan = (code: string) => {
    setScannedCode(code);
    console.log('Scanned code:', code);
  };

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
    console.log('Uploaded files:', files);
  };

  const handlePrint = () => {
    console.log('Print completed');
  };

  // Mock data for printing
  const mockPrintData = {
    code: 'GRN-20240101-001',
    date: '01/01/2024',
    warehouse: 'Kho chung vật tư',
    supplier: 'Công ty TNHH ABC',
    receiver: 'Nguyễn Văn Kho',
    status: 'Đã duyệt',
    items: [
      {
        sku: 'SKU001',
        name: 'Cáp điện 2x1.5mm',
        unit: 'Mét',
        quantity: 100,
        note: 'Hàng mới'
      },
      {
        sku: 'SKU002',
        name: 'Công tắc 1 chiều',
        unit: 'Cái',
        quantity: 50,
        note: 'Hàng tồn kho'
      }
    ]
  };

  return (
    <div>
      <Title level={2}>Demo - Các Chức Năng Bổ Sung</Title>
      <Text type="secondary">
        Trang demo để kiểm tra các chức năng mới được bổ sung
      </Text>

      <Divider />

      <Row gutter={[16, 16]}>
        {/* Barcode Scanner */}
        <Col span={12}>
          <Card title="1. Quét Barcode/QR" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text>Chức năng quét mã barcode/QR cho vật tư và phiếu</Text>
              <BarcodeScanner 
                onScan={handleScan}
                buttonText="Quét mã barcode/QR"
                buttonType="primary"
              />
              {scannedCode && (
                <Alert
                  message="Mã đã quét"
                  description={`Mã: ${scannedCode}`}
                  type="success"
                  showIcon
                />
              )}
            </Space>
          </Card>
        </Col>

        {/* File Upload */}
        <Col span={12}>
          <Card title="2. Upload File" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text>Chức năng tải lên chứng từ và ảnh</Text>
              <FileUpload 
                onUpload={handleFileUpload}
                buttonText="Tải lên chứng từ"
                buttonType="primary"
                accept="image/*,.pdf,.doc,.docx"
                maxCount={5}
                maxSize={5}
              />
              {uploadedFiles.length > 0 && (
                <Alert
                  message="Files đã tải lên"
                  description={`Đã tải lên ${uploadedFiles.length} file`}
                  type="success"
                  showIcon
                />
              )}
            </Space>
          </Card>
        </Col>

        {/* Print Component */}
        <Col span={12}>
          <Card title="3. In Phiếu & Tem Nhãn" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text>Chức năng in phiếu và tem nhãn</Text>
              <Space>
                <PrintComponent 
                  data={mockPrintData}
                  type="grn"
                  onPrint={handlePrint}
                  buttonText="In phiếu nhập"
                  buttonType="primary"
                />
                <PrintComponent 
                  data={mockPrintData}
                  type="label"
                  onPrint={handlePrint}
                  buttonText="In tem nhãn"
                  buttonType="default"
                />
                <PrintComponent 
                  data={mockPrintData}
                  type="barcode"
                  onPrint={handlePrint}
                  buttonText="In barcode"
                  buttonType="default"
                />
              </Space>
            </Space>
          </Card>
        </Col>

        {/* Role Permission */}
        <Col span={12}>
          <Card title="4. Phân Quyền Chi Tiết" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text>Quản lý vai trò và quyền hạn người dùng</Text>
              <Button 
                type="primary"
                onClick={() => window.open('/demo/permissions', '_blank')}
              >
                Mở trang phân quyền
              </Button>
              <Text type="secondary">
                Xem chi tiết quản lý vai trò, quyền hạn và người dùng
              </Text>
            </Space>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Alert
        message="Hướng dẫn sử dụng"
        description="Các chức năng trên đã được tích hợp đầy đủ vào hệ thống. Bạn có thể sử dụng chúng trong các trang thực tế như phiếu nhập, phiếu xuất, quản lý vật tư, v.v."
        type="info"
        showIcon
      />

      <Divider />

      <Title level={3}>Tích Hợp Vào Các Trang Hiện Có</Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="Trang Phiếu Nhập" size="small">
            <Space direction="vertical">
              <Text>• Quét barcode cho vật tư</Text>
              <Text>• Upload chứng từ nhập</Text>
              <Text>• In phiếu nhập</Text>
              <Text>• In tem nhãn vật tư</Text>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Trang Phiếu Xuất" size="small">
            <Space direction="vertical">
              <Text>• Quét barcode cho vật tư</Text>
              <Text>• Upload ảnh bằng chứng</Text>
              <Text>• In phiếu xuất</Text>
              <Text>• Phân quyền duyệt</Text>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Trang Quản Lý Vật Tư" size="small">
            <Space direction="vertical">
              <Text>• Quét barcode tìm kiếm</Text>
              <Text>• Upload ảnh vật tư</Text>
              <Text>• In barcode/tem nhãn</Text>
              <Text>• Phân quyền CRUD</Text>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DemoPage;
