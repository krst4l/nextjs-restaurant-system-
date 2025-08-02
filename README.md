# 🍽️ 餐饮管理系统

一个现代化的餐厅运营管理平台，基于 Next.js 15、React 19 和 TypeScript 构建。

## ✨ 功能特色

### 🎛️ 仪表板

- **实时数据统计** - 今日订单、营收、活跃餐桌等关键指标
- **订单状态监控** - 实时追踪订单进度和状态变化
- **热门菜品分析** - 销量统计和收入分析
- **业务概览** - 全面的餐厅运营数据可视化

### 📋 订单管理

- **订单创建与编辑** - 快速创建和修改订单信息
- **状态跟踪** - 从待确认到完成的全流程管理
- **智能筛选** - 按状态、时间、餐桌等条件筛选订单
- **批量操作** - 支持批量处理订单状态更新

### 🍜 菜品管理

- **菜品信息维护** - 名称、价格、描述、图片管理
- **分类管理** - 开胃菜、主菜、汤类、甜品等分类
- **库存状态** - 实时更新菜品可用状态
- **销量统计** - 菜品销售数据和评分管理

### 🪑 桌台管理

- **可视化桌台布局** - 直观的餐桌状态显示
- **状态管理** - 空闲、使用中、预订、清洁等状态
- **预订系统** - 餐桌预订和时间管理
- **服务员分配** - 餐桌服务员指派管理

### 👥 员工管理

- **员工信息管理** - 基本信息和职位管理
- **权限控制** - 不同职位的系统访问权限
- **工作排班** - 员工排班和工作时间管理
- **绩效统计** - 员工工作表现数据统计

### 📦 库存管理

- **原料库存** - 食材和用品库存管理
- **供应商管理** - 供应商信息和采购记录
- **库存预警** - 低库存自动提醒功能
- **进销存报表** - 完整的库存流水记录

### 📊 财务报表

- **营收分析** - 日、周、月营收统计和趋势
- **成本控制** - 食材成本和运营成本分析
- **利润报表** - 毛利润和净利润计算
- **数据导出** - 支持多种格式的报表导出

## 🛠️ 技术栈

### 前端框架

- **Next.js 15** - 最新的 React 全栈框架，使用 App Router
- **React 19** - 最新的 React 版本，支持并发特性
- **TypeScript 5.8** - 完整的类型安全和智能提示

### UI 设计

- **Tailwind CSS 4.1** - 原子化 CSS 框架
- **Shadcn UI** - 基于 Radix UI 的现代化组件库
- **Lucide React** - 优雅的图标库
- **液态玻璃效果** - iOS 风格的现代化 UI 设计

### 状态管理

- **SWR 2.3** - 数据获取、缓存和同步
- **Zustand 5.0** - 轻量级状态管理解决方案
- **React Hook Form** - 高性能表单管理

### 国际化与主题

- **Next-intl 4.3** - 完整的国际化支持 (中文/英文)
- **Next-themes 0.4** - 暗黑模式支持
- **动态主题切换** - 无闪烁的主题切换体验

### 开发工具

- **ESLint + Prettier** - 代码质量保证和格式化
- **Husky + Lint-staged** - Git 提交前代码检查
- **TypeScript** - 类型检查和代码提示
- **Turbopack** - 高性能构建工具

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 pnpm

### 安装步骤

```bash
# 克隆项目
git clone <repository-url>
cd restaurant-management-system

# 安装依赖
npm install
# 或
pnpm install

# 启动开发服务器
npm run dev
# 或
pnpm dev
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📱 页面结构

```
餐饮管理系统/
├── 🏠 仪表板              # 业务数据总览
├── 📋 订单管理            # 订单处理和跟踪
├── 🍜 菜品管理            # 菜单和菜品维护
├── 🪑 桌台管理            # 餐桌状态和预订
├── 👥 员工管理            # 员工信息和权限
├── 📦 库存管理            # 库存和供应商
└── 📊 财务报表            # 营收和成本分析
```

## ⚙️ 配置说明

### 环境变量

创建 `.env.local` 文件：

```env
# 数据库配置
DATABASE_URL="your-database-url"

# API 配置
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# 上传配置
NEXT_PUBLIC_UPLOAD_URL="your-upload-service"
```

### 国际化配置

支持中文和英文，可在 `lib/i18n/routing.ts` 中配置更多语言：

```typescript
export const routing = defineRouting({
  locales: ['zh-CN', 'en'],
  defaultLocale: 'zh-CN',
});
```

## 🎨 UI 设计特色

### 液态玻璃效果

- **毛玻璃背景** - 现代化的视觉效果
- **动态边框** - 渐变边框和阴影效果
- **交互反馈** - 悬停和点击状态动画
- **响应式设计** - 适配各种屏幕尺寸

### 颜色系统

```css
/* 主要颜色 */
--primary: #3b82f6; /* 蓝色 */
--success: #10b981; /* 绿色 */
--warning: #f59e0b; /* 黄色 */
--danger: #ef4444; /* 红色 */
```

## 📊 数据模型

### 订单 (Order)

```typescript
interface Order {
  id: string;
  tableNumber: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  waiter: string;
}
```

### 菜品 (Dish)

```typescript
interface Dish {
  id: string;
  name: string;
  category: DishCategory;
  price: number;
  description: string;
  image?: string;
  available: boolean;
  rating: number;
}
```

### 餐桌 (Table)

```typescript
interface Table {
  id: string;
  number: string;
  seats: number;
  status: TableStatus;
  currentOrder?: string;
  waiter?: string;
}
```

## 🔧 开发指南

### 添加新页面

1. 在 `app/[locale]/` 下创建新目录
2. 添加 `page.tsx` 文件
3. 更新语言文件 `locales/zh-CN.json` 和 `locales/en.json`
4. 更新导航菜单

### 创建新组件

```bash
# 使用 shadcn UI 添加组件
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
```

### 样式定制

在 `styles/globals.css` 中自定义液态玻璃效果：

```css
.liquid-glass-card {
  @apply bg-white/70 backdrop-blur-md dark:bg-gray-900/70;
  @apply border border-white/20 dark:border-gray-700/50;
  @apply shadow-xl shadow-black/5;
}
```

## 📈 性能优化

- **服务器组件** - 利用 Next.js 15 服务器组件
- **静态生成** - 对静态内容进行预渲染
- **图片优化** - Next.js Image 自动优化
- **代码分割** - 按需加载减少包体积
- **缓存策略** - SWR 智能缓存管理

## 🧪 测试

```bash
# 运行测试
npm run test

# 运行 E2E 测试
npm run test:e2e

# 代码覆盖率
npm run test:coverage
```

## 📦 部署

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 提交规范

使用 [Conventional Commits](https://conventionalcommits.org/) 格式：

```
feat: 添加新功能
fix: 修复问题
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 构建工具变动
```

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

## 🙏 致谢

- [Next.js](https://nextjs.org) - React 框架
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架
- [Shadcn UI](https://ui.shadcn.com) - UI 组件库
- [Lucide](https://lucide.dev) - 图标库

---

**🚀 立即开始管理您的餐厅！**
