'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Bắt đầu loading khi pathname thay đổi
    setIsLoading(true);
    
    // Dừng loading sau một khoảng thời gian ngắn
    // Điều này giúp tránh flash loading quá nhanh
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading
  };
};
