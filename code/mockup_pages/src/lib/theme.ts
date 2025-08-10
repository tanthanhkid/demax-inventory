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
      bodyBg: '#F5F5F5',
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
      primaryColor: '#FFFFFF',
      primaryBg: '#0E4F9E',
      primaryBorderColor: '#0E4F9E',
      primaryHoverBg: '#1E5FAE',
      primaryHoverBorderColor: '#1E5FAE',
      dangerColor: '#FFFFFF',
      dangerBg: '#DC2626',
      dangerBorderColor: '#DC2626',
      dangerHoverBg: '#EF4444',
      dangerHoverBorderColor: '#EF4444',
    },
    Card: {
      headerBg: '#FFFFFF',
      bodyBg: '#FFFFFF',
      borderRadiusLG: 8,
    },
    Table: {
      headerBg: '#F8FAFC',
      headerColor: '#1F2937',
      rowHoverBg: '#F1F5F9',
      borderColor: '#E2E8F0',
    },
    Form: {
      labelColor: '#1F2937',
      labelRequiredMarkColor: '#DC2626',
    },
    Input: {
      borderRadius: 6,
      borderColor: '#D1D5DB',
      hoverBorderColor: '#0E4F9E',
      focusBorderColor: '#0E4F9E',
    },
    Select: {
      borderRadius: 6,
      borderColor: '#D1D5DB',
      hoverBorderColor: '#0E4F9E',
      focusBorderColor: '#0E4F9E',
    },
    DatePicker: {
      borderRadius: 6,
      borderColor: '#D1D5DB',
      hoverBorderColor: '#0E4F9E',
      focusBorderColor: '#0E4F9E',
    },
    Badge: {
      colorSuccess: '#16A34A',
      colorWarning: '#F59E0B',
      colorError: '#DC2626',
    },
    Tag: {
      colorSuccess: '#16A34A',
      colorWarning: '#F59E0B',
      colorError: '#DC2626',
      colorInfo: '#0E4F9E',
    },
    Steps: {
      colorPrimary: '#0E4F9E',
      colorSuccess: '#16A34A',
      colorError: '#DC2626',
    },
    Progress: {
      colorSuccess: '#16A34A',
      colorError: '#DC2626',
      colorInfo: '#0E4F9E',
    },
    Alert: {
      colorSuccess: '#16A34A',
      colorWarning: '#F59E0B',
      colorError: '#DC2626',
      colorInfo: '#0E4F9E',
    },
    Message: {
      colorSuccess: '#16A34A',
      colorWarning: '#F59E0B',
      colorError: '#DC2626',
      colorInfo: '#0E4F9E',
    },
    Notification: {
      colorSuccess: '#16A34A',
      colorWarning: '#F59E0B',
      colorError: '#DC2626',
      colorInfo: '#0E4F9E',
    },
  },
};
