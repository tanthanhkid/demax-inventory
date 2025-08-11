import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    // Primary colors from UIUX_DESIGNER.md
    colorPrimary: '#0E4F9E',
    colorSuccess: '#16A34A',
    colorWarning: '#F59E0B',
    colorError: '#DC2626',
    colorText: '#1F2937',
    colorBgContainer: '#FFFFFF',
    colorBgLayout: '#F5F5F5',
    
    // Typography
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeSM: 12,
    fontWeightStrong: 600,
    
    // Border radius
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,
    
    // Spacing
    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    paddingXS: 8,
    
    // Control height
    controlHeight: 40,
    controlHeightLG: 48,
    controlHeightSM: 32,
  },
  components: {
    Layout: {
      headerBg: '#0E4F9E',
      siderBg: '#0E4F9E',
    },
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: '#1E5FAE',
      itemHoverBg: '#1E5FAE',
      itemColor: '#FFFFFF',
      itemSelectedColor: '#FFFFFF',
      itemHoverColor: '#FFFFFF',
    },
    Button: {
      colorPrimary: '#0E4F9E',
    },
  },
};
