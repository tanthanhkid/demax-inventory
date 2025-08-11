'use client';

import React, { useState } from 'react';
import { Upload, Button, Modal, List, Image, Space, Typography, Progress, message, Alert } from 'antd';
import { 
  UploadOutlined, 
  FileImageOutlined, 
  FilePdfOutlined, 
  DeleteOutlined,
  EyeOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Text } = Typography;

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  onRemove?: (file: UploadFile) => void;
  accept?: string;
  multiple?: boolean;
  maxCount?: number;
  maxSize?: number; // MB
  buttonText?: string;
  buttonType?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  disabled?: boolean;
  showPreview?: boolean;
  showProgress?: boolean;
}

interface FileItem {
  uid: string;
  name: string;
  status: 'uploading' | 'done' | 'error' | 'removed';
  url?: string;
  thumbUrl?: string;
  type: string;
  size: number;
  percent?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  onRemove,
  accept = 'image/*,.pdf,.doc,.docx,.xls,.xlsx',
  multiple = true,
  maxCount = 10,
  maxSize = 10, // 10MB
  buttonText = 'Tải lên file',
  buttonType = 'default',
  disabled = false,
  showPreview = true,
  showProgress = true,
}) => {
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleUpload = (info: any) => {
    const { file, fileList: newFileList } = info;
    
    // Kiểm tra kích thước file
    if (file.size > maxSize * 1024 * 1024) {
      message.error(`File ${file.name} vượt quá kích thước cho phép (${maxSize}MB)`);
      return;
    }

    // Kiểm tra số lượng file
    if (newFileList.length > maxCount) {
      message.error(`Chỉ được tải lên tối đa ${maxCount} file`);
      return;
    }

    // Tạo file item với progress
    const fileItem: FileItem = {
      uid: file.uid,
      name: file.name,
      status: 'uploading',
      type: file.type,
      size: file.size,
      percent: 0,
    };

    // Mock upload progress
    const interval = setInterval(() => {
      setFileList(prev => 
        prev.map(item => 
          item.uid === file.uid 
            ? { ...item, percent: Math.min((item.percent || 0) + 10, 100) }
            : item
        )
      );
    }, 200);

    // Mock upload completion
    setTimeout(() => {
      clearInterval(interval);
      setFileList(prev => 
        prev.map(item => 
          item.uid === file.uid 
            ? { 
                ...item, 
                status: 'done', 
                percent: 100,
                url: URL.createObjectURL(file),
                thumbUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
              }
            : item
        )
      );
      
      // Gọi callback với file đã upload
      onUpload([file]);
    }, 2000);
  };

  const handleRemove = (file: UploadFile) => {
    setFileList(prev => prev.filter(item => item.uid !== file.uid));
    if (onRemove) {
      onRemove(file);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

  const uploadProps: UploadProps = {
    beforeUpload: () => false, // Prevent auto upload
    onChange: handleUpload,
    fileList: fileList,
    onRemove: handleRemove,
    onPreview: handlePreview,
    accept,
    multiple,
    maxCount,
    disabled,
  };

  const getFileIcon = (file: FileItem) => {
    if (file.type.startsWith('image/')) {
      return <FileImageOutlined style={{ color: '#1890ff' }} />;
    } else if (file.type === 'application/pdf') {
      return <FilePdfOutlined style={{ color: '#ff4d4f' }} />;
    } else {
      return <FilePdfOutlined style={{ color: '#52c41a' }} />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <Upload {...uploadProps}>
        <Button 
          type={buttonType} 
          icon={<UploadOutlined />} 
          disabled={disabled}
        >
          {buttonText}
        </Button>
      </Upload>

      {fileList.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <Text strong>Danh sách file đã tải lên:</Text>
          <List
            size="small"
            dataSource={fileList}
            renderItem={(file) => (
              <List.Item
                actions={[
                  <Button 
                    key="view" 
                    type="text" 
                    icon={<EyeOutlined />}
                    onClick={() => handlePreview(file)}
                    disabled={!file.url}
                  >
                    Xem
                  </Button>,
                  <Button 
                    key="download" 
                    type="text" 
                    icon={<DownloadOutlined />}
                    disabled={!file.url}
                  >
                    Tải
                  </Button>,
                  <Button 
                    key="delete" 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemove(file)}
                  >
                    Xóa
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={getFileIcon(file)}
                  title={file.name}
                  description={
                    <Space direction="vertical" size="small">
                      <Text type="secondary">
                        {formatFileSize(file.size)} • {file.type}
                      </Text>
                      {showProgress && file.status === 'uploading' && (
                        <Progress 
                          percent={file.percent} 
                          size="small" 
                          status={(file.status as any) === 'error' ? 'exception' : undefined}
                        />
                      )}
                      {file.status === 'done' && (
                        <Text type="success">Tải lên thành công</Text>
                      )}
                      {file.status === 'error' && (
                        <Text type="danger">Lỗi tải lên</Text>
                      )}
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      )}

      <Alert
        message="Lưu ý"
        description={`Chỉ chấp nhận file ${accept}. Kích thước tối đa ${maxSize}MB. Tối đa ${maxCount} file.`}
        type="info"
        showIcon
        style={{ marginTop: 16 }}
      />

      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        {previewImage && (
          <img alt="preview" style={{ width: '100%' }} src={previewImage} />
        )}
      </Modal>
    </div>
  );
};

export default FileUpload;
