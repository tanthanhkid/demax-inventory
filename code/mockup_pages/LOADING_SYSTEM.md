# Hệ thống Loading Screen - DEMAX Inventory

## Tổng quan

Hệ thống loading screen được thiết kế để cải thiện trải nghiệm người dùng khi điều hướng giữa các trang và thực hiện các tác vụ bất đồng bộ.

## Các Components

### 1. LoadingScreen
Component hiển thị màn hình loading toàn màn hình với animation đẹp mắt.

```tsx
import { LoadingScreen } from '@/components';

<LoadingScreen 
  visible={isLoading} 
  message="Đang tải..." 
  size="large" 
/>
```

**Props:**
- `visible`: boolean - Hiển thị/ẩn loading screen
- `message`: string - Thông báo hiển thị (mặc định: "Đang tải...")
- `size`: 'small' | 'default' | 'large' - Kích thước spinner

### 2. LoadingButton
Button với trạng thái loading tích hợp.

```tsx
import { LoadingButton } from '@/components';

<LoadingButton
  loading={isLoading}
  loadingText="Đang xử lý..."
  onClick={handleSubmit}
>
  Lưu
</LoadingButton>
```

**Props:**
- `loading`: boolean - Trạng thái loading
- `loadingText`: string - Text hiển thị khi loading
- Tất cả props của Ant Design Button

### 3. PageTransition
Component tạo hiệu ứng chuyển trang mượt mà.

```tsx
import { PageTransition } from '@/components';

<PageTransition>
  <YourPageContent />
</PageTransition>
```

### 4. LoadingProvider
Provider quản lý loading toàn cục.

```tsx
import { LoadingProvider, useLoadingContext } from '@/components';

// Trong layout
<LoadingProvider>
  {children}
</LoadingProvider>

// Trong component
const { startLoading, stopLoading, setLoadingMessage } = useLoadingContext();
```

## Cách sử dụng

### 1. Loading tự động khi điều hướng
Loading screen sẽ tự động hiển thị khi người dùng điều hướng giữa các trang.

### 2. Loading thủ công cho tác vụ
```tsx
const { startLoading, stopLoading, setLoadingMessage } = useLoadingContext();

const handleSubmit = async () => {
  startLoading();
  setLoadingMessage('Đang lưu dữ liệu...');
  
  try {
    await saveData();
    message.success('Lưu thành công!');
  } catch (error) {
    message.error('Có lỗi xảy ra!');
  } finally {
    stopLoading();
  }
};
```

### 3. Loading cho button
```tsx
const [buttonLoading, setButtonLoading] = useState(false);

const handleClick = async () => {
  setButtonLoading(true);
  await someAsyncTask();
  setButtonLoading(false);
};

<LoadingButton
  loading={buttonLoading}
  loadingText="Đang xử lý..."
  onClick={handleClick}
>
  Thực hiện
</LoadingButton>
```

## CSS Animations

Hệ thống sử dụng các CSS animations sau:

- `animate-fade-in`: Hiệu ứng fade in
- `animate-bounce`: Hiệu ứng bounce cho dots
- `animate-ping`: Hiệu ứng ping cho spinner
- `page-transition`: Hiệu ứng chuyển trang

## Tùy chỉnh

### Thay đổi thời gian loading
Trong `LoadingProvider.tsx`, bạn có thể điều chỉnh thời gian hiển thị loading:

```tsx
const timer = setTimeout(() => {
  setIsLoading(false);
}, 500); // Thay đổi từ 500ms
```

### Thay đổi style
Các styles có thể được tùy chỉnh trong `globals.css` hoặc trực tiếp trong components.

## Lưu ý

1. LoadingProvider phải được wrap quanh toàn bộ ứng dụng trong layout
2. Sử dụng LoadingButton thay vì Button thông thường khi có tác vụ bất đồng bộ
3. PageTransition nên được sử dụng trong Layout component để có hiệu ứng chuyển trang mượt mà
4. Loading screen sẽ tự động hiển thị khi điều hướng, không cần can thiệp thủ công
