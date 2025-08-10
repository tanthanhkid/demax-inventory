# Next.js - Tài liệu tham khảo

## Tổng quan
Next.js là một React framework để xây dựng ứng dụng web full-stack. Nó cung cấp các tính năng bổ sung và tối ưu hóa, tự động cấu hình các công cụ cấp thấp để giúp các nhà phát triển tập trung vào việc xây dựng sản phẩm một cách nhanh chóng.

## Cài đặt và Khởi tạo

### Tạo ứng dụng Next.js mới
```bash
npx create-next-app@latest
```

### Tạo ứng dụng với ví dụ cụ thể
```bash
# Ví dụ với route handlers
npx create-next-app --example route-handlers

# Ví dụ với GraphQL React
npx create-next-app --example with-graphql-react with-graphql-react-app

# Ví dụ với blog starter
npx create-next-app --example blog-starter blog-starter-app

# Ví dụ với Sanity CMS
npx create-next-app --example cms-sanity next-sanity-blog

# Ví dụ với Tailwind CSS
npx create-next-app --example with-tailwindcss my-app
```

### Sử dụng các package manager khác
```bash
# Với Yarn
yarn create next-app --example blog-starter blog-starter-app

# Với pnpm
pnpm create next-app --example blog-starter blog-starter-app

# Với Bun
bunx create-next-app --example mdx mdx-app
```

## Chạy ứng dụng

### Cài đặt dependencies
```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

### Chạy development server
```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
# hoặc
bun dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## Cấu hình ESLint
```bash
npm run lint
```

## Build và Deploy

### Build cho production
```bash
npm run build
```

### Chạy production server
```bash
npm start
```

## Các ví dụ và Templates

### CMS Examples
- **Sanity**: `npx create-next-app --example cms-sanity`
- **Contentful**: `npx create-next-app --example cms-contentful`
- **DatoCMS**: `npx create-next-app --example cms-datocms`
- **Ghost**: `npx create-next-app --example cms-ghost`
- **Strapi**: `npx create-next-app --example cms-strapi`
- **WordPress**: `npx create-next-app --example cms-wordpress`

### UI Framework Examples
- **Tailwind CSS**: `npx create-next-app --example with-tailwindcss`
- **Material-UI**: `npx create-next-app --example with-material-ui`
- **Chakra UI**: `npx create-next-app --example with-chakra-ui`
- **Ant Design**: `npx create-next-app --example with-ant-design`

### State Management Examples
- **Redux**: `npx create-next-app --example with-redux`
- **Zustand**: `npx create-next-app --example with-zustand`
- **Jotai**: `npx create-next-app --example with-jotai`
- **Context API**: `npx create-next-app --example with-context-api`

### Database Examples
- **Prisma**: `npx create-next-app --example with-prisma`
- **MongoDB**: `npx create-next-app --example with-mongodb`
- **PostgreSQL**: `npx create-next-app --example with-postgres`
- **Supabase**: `npx create-next-app --example with-supabase`

### Authentication Examples
- **NextAuth.js**: `npx create-next-app --example with-next-auth`
- **Auth0**: `npx create-next-app --example with-auth0`
- **Clerk**: `npx create-next-app --example with-clerk`

## Cấu hình MDX
```bash
npm install @next/mdx
# hoặc
yarn add @next/mdx
```

## Deploy với Firebase
```bash
# Cài đặt Firebase CLI
npm i -g firebase-tools

# Đăng nhập
firebase login

# Liệt kê projects
firebase projects:list
```

## Cấu hình Docker
```bash
npx create-next-app --example with-docker nextjs-docker
```

## Cấu hình Turbopack
```bash
npx create-next-app --example with-turbopack with-turbopack-app
```

## Lưu ý quan trọng

1. **App Router**: Next.js 13+ sử dụng App Router mặc định
2. **Server Components**: Mặc định sử dụng React Server Components
3. **TypeScript**: Hỗ trợ TypeScript out-of-the-box
4. **ESLint**: Tích hợp sẵn ESLint configuration
5. **Fast Refresh**: Hot reloading cho development
6. **Automatic Optimization**: Tự động tối ưu hóa images, fonts, và bundles

## Tài liệu tham khảo
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)
- [Vercel Platform](https://vercel.com)

---
*Tài liệu này được tạo từ Context7 MCP - Next.js Library*
