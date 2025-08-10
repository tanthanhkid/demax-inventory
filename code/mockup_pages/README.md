# DEMAX Inventory System - NextJS Demo

Đây là phiên bản demo của hệ thống quản lý kho DEMAX được xây dựng bằng NextJS và Ant Design.

## Tính năng

### ✅ Đã hoàn thành
- **Authentication**: Đăng nhập với mock data
- **Dashboard**: Thống kê tổng quan với biểu đồ và bảng dữ liệu
- **Quản lý kho**: CRUD kho với giao diện thân thiện
- **Quản lý vật tư**: CRUD vật tư với tìm kiếm và lọc
- **Phiếu nhập (GRN)**: Tạo và quản lý phiếu nhập kho với wizard form
- **Phiếu xuất (Issue)**: Tạo và quản lý phiếu xuất kho
- **Điều chuyển kho**: Quản lý điều chuyển giữa các kho
- **Kiểm kê**: Tạo và quản lý phiếu kiểm kê với chênh lệch
- **BOM Management**: Quản lý Bill of Materials với cấu trúc cây
- **Yêu cầu mua (PR)**: Tạo và quản lý yêu cầu mua hàng
- **Đơn mua hàng (PO)**: Quản lý đơn mua hàng với nhà cung cấp
- **Báo cáo**: Báo cáo tồn kho với filter và thống kê
- **Cài đặt hệ thống**: Cấu hình toàn diện cho hệ thống
- **Layout responsive**: Giao diện thích ứng với mọi thiết bị
- **Theme customization**: Sử dụng màu sắc theo thiết kế DEMAX

### 🚧 Có thể mở rộng thêm
- Trả hàng (Returns)
- Truy vết lô/serial
- Báo cáo nâng cao với biểu đồ
- Export/Import Excel
- Barcode/QR scanning
- Mobile app

## Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18+ 
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
# hoặc
yarn install
```

### Chạy development server
```bash
npm run dev
# hoặc
yarn dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

### Build production
```bash
npm run build
npm start
```

## Tài khoản demo

Có thể sử dụng các tài khoản sau để đăng nhập:

| Username | Password | Vai trò |
|----------|----------|---------|
| admin | password | Administrator |
| kho1 | password | Nhân viên kho |
| sx1 | password | Nhân viên sản xuất |
| kt1 | password | Nhân viên kỹ thuật |
| tm1 | password | Nhân viên thu mua |

## Cấu trúc project

```
src/
├── app/                    # NextJS App Router
│   ├── login/             # Trang đăng nhập
│   ├── warehouses/        # Quản lý kho
│   ├── items/             # Quản lý vật tư
│   ├── grns/              # Phiếu nhập (GRN)
│   ├── issues/            # Phiếu xuất (Issue)
│   ├── transfers/         # Điều chuyển kho
│   ├── stocktakes/        # Kiểm kê
│   ├── boms/              # Quản lý BOM
│   ├── purchase-requests/ # Yêu cầu mua (PR)
│   ├── purchase-orders/   # Đơn mua hàng (PO)
│   ├── reports/           # Báo cáo
│   ├── settings/          # Cài đặt hệ thống
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard
├── components/            # React components
│   └── Layout.tsx         # Main layout component
├── data/                  # Mock data
│   └── mockData.ts        # Tất cả mock data
├── lib/                   # Utilities
│   ├── theme.ts           # Ant Design theme
│   └── utils.ts           # Helper functions
└── types/                 # TypeScript types
    └── index.ts           # Type definitions
```

## Công nghệ sử dụng

- **Next.js 14**: React framework với App Router
- **Ant Design 5**: UI component library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Day.js**: Date manipulation
- **Axios**: HTTP client

## Theme và Design

Hệ thống sử dụng theme tùy chỉnh theo thiết kế DEMAX:

- **Primary**: #0E4F9E (Xanh dương đậm)
- **Success**: #16A34A (Xanh lá)
- **Warning**: #F59E0B (Vàng cam)
- **Error**: #DC2626 (Đỏ)
- **Background**: #F5F5F5 (Xám nhạt)

## Tính năng đặc biệt

### 1. Responsive Design
- Giao diện thích ứng với desktop, tablet và mobile
- Sidebar có thể thu gọn
- Bảng dữ liệu responsive

### 2. Mock Data Integration
- Tất cả dữ liệu được mock sẵn
- Có thể dễ dàng thay thế bằng API thật
- Dữ liệu phản ánh đúng nghiệp vụ thực tế

### 3. User Experience
- Loading states
- Error handling
- Success messages
- Confirmation dialogs
- Form validation

### 4. Performance
- Code splitting tự động
- Lazy loading components
- Optimized images
- Efficient re-renders

## Phát triển tiếp theo

### Backend Integration
1. Thay thế mock data bằng API calls
2. Implement authentication với JWT
3. Add real-time updates
4. File upload cho chứng từ

### Tính năng bổ sung
1. Export/Import Excel
2. Barcode/QR scanning
3. Mobile app
4. Advanced reporting
5. Workflow automation

### Performance & Security
1. Add caching layer
2. Implement rate limiting
3. Add audit logging
4. Data encryption
5. Backup & recovery

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

This project is proprietary software for DEMAX company.

## Support

Liên hệ team phát triển để được hỗ trợ kỹ thuật.

Truy cập http://localhost:3000 và đăng nhập với:
admin / password
kho1 / password
sx1 / password
kt1 / password
tm1 / password
