'use client';

import React from 'react';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { clsx } from 'clsx';

const { Text } = Typography;

interface LoadingScreenProps {
  visible: boolean;
  message?: string;
  size?: 'small' | 'default' | 'large';
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  visible,
  message = 'Đang tải...',
  size = 'large'
}) => {
  if (!visible) return null;

  return (
    <div className={clsx(
      'fixed inset-0 z-50 flex items-center justify-center',
      'bg-white/80 backdrop-blur-sm transition-all duration-300',
      'animate-fade-in'
    )}>
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner với animation */}
        <div className="relative">
          <Spin
            size={size}
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: size === 'large' ? 48 : size === 'default' ? 32 : 24,
                }}
                spin
              />
            }
          />
          
          {/* Hiệu ứng pulse xung quanh spinner */}
          <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20" />
        </div>

        {/* Text loading */}
        <div className="text-center">
          <Text className="text-lg font-medium text-gray-700">
            {message}
          </Text>
          
          {/* Dots animation */}
          <div className="flex justify-center space-x-1 mt-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
