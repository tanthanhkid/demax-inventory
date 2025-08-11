'use client';

import React from 'react';
import { Button, ButtonProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { clsx } from 'clsx';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingText,
  children,
  disabled,
  icon,
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={disabled || loading}
      icon={loading ? <LoadingOutlined /> : icon}
      className={clsx(
        'transition-all duration-200',
        loading && 'opacity-80',
        className
      )}
    >
      {loading && loadingText ? loadingText : children}
    </Button>
  );
};

export default LoadingButton;
