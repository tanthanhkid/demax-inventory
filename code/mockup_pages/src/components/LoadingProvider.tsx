'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LoadingScreen from './LoadingScreen';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  setLoadingMessage: (message: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoadingContext must be used within LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Đang tải...');
  const pathname = usePathname();

  useEffect(() => {
    // Bắt đầu loading khi pathname thay đổi
    setIsLoading(true);
    setLoadingMessage('Đang chuyển trang...');
    
    // Dừng loading sau một khoảng thời gian
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const handleSetLoadingMessage = (message: string) => {
    setLoadingMessage(message);
  };

  const value: LoadingContextType = {
    isLoading,
    startLoading,
    stopLoading,
    setLoadingMessage: handleSetLoadingMessage,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <LoadingScreen 
        visible={isLoading} 
        message={loadingMessage}
        size="large"
      />
    </LoadingContext.Provider>
  );
};
