'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className 
}) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Bắt đầu transition
    setIsTransitioning(true);
    
    // Kết thúc transition sau một khoảng thời gian ngắn
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={clsx(
        'page-transition',
        isTransitioning && 'page-transition-enter',
        !isTransitioning && 'page-transition-enter-active',
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageTransition;
