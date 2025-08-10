'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Input, Space, Typography, Alert } from 'antd';
import { ScanOutlined, CameraOutlined, QrcodeOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface BarcodeScannerProps {
  onScan: (code: string) => void;
  placeholder?: string;
  buttonText?: string;
  buttonType?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  disabled?: boolean;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onScan,
  placeholder = 'Quét mã barcode/QR',
  buttonText = 'Quét mã',
  buttonType = 'default',
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startScanning = async () => {
    try {
      setError('');
      setIsScanning(true);
      
      // Yêu cầu quyền truy cập camera
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      setError('Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.');
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const handleManualInput = () => {
    if (scannedCode.trim()) {
      onScan(scannedCode.trim());
      setScannedCode('');
      setIsModalVisible(false);
    }
  };

  const handleScanSuccess = (code: string) => {
    onScan(code);
    setIsModalVisible(false);
    stopScanning();
  };

  const showModal = () => {
    setIsModalVisible(true);
    setScannedCode('');
    setError('');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    stopScanning();
    setScannedCode('');
    setError('');
  };

  // Mock barcode scanning (trong thực tế sẽ sử dụng thư viện như QuaggaJS hoặc ZXing)
  const mockScan = () => {
    const mockCodes = [
      'SKU001',
      'SKU002', 
      'SKU003',
      'WH001',
      'GRN-20240101-001',
      'ISSUE-20240101-001'
    ];
    const randomCode = mockCodes[Math.floor(Math.random() * mockCodes.length)];
    handleScanSuccess(randomCode);
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <>
      <Button
        type={buttonType}
        icon={<ScanOutlined />}
        onClick={showModal}
        disabled={disabled}
      >
        {buttonText}
      </Button>

      <Modal
        title="Quét mã barcode/QR"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="manual" type="primary" onClick={handleManualInput}>
            Nhập thủ công
          </Button>,
        ]}
        width={600}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          {error && (
            <Alert
              message="Lỗi"
              description={error}
              type="error"
              showIcon
            />
          )}

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '100%',
                height: 300,
                border: '2px dashed #d9d9d9',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                background: '#fafafa',
                position: 'relative',
              }}
            >
              {isScanning ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 6,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 200,
                      height: 200,
                      border: '2px solid #1890ff',
                      borderRadius: 8,
                      pointerEvents: 'none',
                    }}
                  />
                </>
              ) : (
                <Space direction="vertical" size="large">
                  <CameraOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                  <Text>Đặt mã barcode/QR vào khung hình</Text>
                  <Space>
                    <Button 
                      type="primary" 
                      icon={<QrcodeOutlined />}
                      onClick={startScanning}
                    >
                      Bật camera
                    </Button>
                    <Button 
                      icon={<ScanOutlined />}
                      onClick={mockScan}
                    >
                      Quét thử nghiệm
                    </Button>
                  </Space>
                </Space>
              )}
            </div>
          </div>

          <div>
            <Text strong>Hoặc nhập mã thủ công:</Text>
            <Input
              placeholder="Nhập mã barcode/QR"
              value={scannedCode}
              onChange={(e) => setScannedCode(e.target.value)}
              onPressEnter={handleManualInput}
              style={{ marginTop: 8 }}
            />
          </div>

          <Alert
            message="Hướng dẫn"
            description="Đảm bảo mã barcode/QR rõ ràng và nằm trong khung hình. Hệ thống sẽ tự động nhận diện và xử lý."
            type="info"
            showIcon
          />
        </Space>
      </Modal>
    </>
  );
};

export default BarcodeScanner;
