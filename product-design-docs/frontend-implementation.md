# 前端实现记录

> 更新日期：2026-04-01

## 设计系统已同步

从 `design/stitch/larkbase_nexus/DESIGN.md` 提取的设计系统已同步到代码：

### 配色系统

| 变量 | 色值 | 用途 |
|------|------|------|
| primary | #005da7 | 主色调 |
| primary-container | #2976c7 | 主色容器 |
| surface | #f7f9fb | 页面背景 |
| surface-container-low | #f2f4f6 | 区块背景 |
| surface-container-lowest | #ffffff | 卡片背景 |
| surface-container-high | #e6e8ea | 高亮区块 |
| on-surface | #191c1e | 主文字 |
| on-surface-variant | #414751 | 次要文字 |
| tertiary | #7f5300 | 金牌/认证行家强调 |
| outline-variant | #c1c7d3 | 分隔线 |

### 关键视觉细节

- ✅ **Tonal Surface 系统** — 用背景色位移替代 1px 边框分隔区块
- ✅ **Expert Card 头像灰度悬停** — 灰度头像悬停时变彩色
- ✅ **Bento Grid 布局** — 模板区域使用 8+4 列非对称网格
- ✅ **认证徽章样式** — 带边框的圆角徽章，带有色调区分
- ✅ **玻璃态 Header** — backdrop-blur 效果
- ✅ **品牌字体** — Inter + Noto Sans SC

## 文件变更

| 文件 | 变更 |
|------|------|
| `tailwind.config.ts` | 替换为完整设计系统色彩 |
| `src/styles/globals.css` | Tonal surface 系统、认证徽章、Utility classes |
| `src/components/layouts/header.tsx` | 对齐设计稿样式、玻璃态效果 |
| `src/components/features/expert-card.tsx` | 灰度悬停、圆角、Bento 风格布局 |
| `src/app/page.tsx` | Bento Grid 模板区域、整体视觉对齐 |

## 已完成

- [x] 行家列表页 - 侧边栏筛选、面包屑、统计网格、分页
- [x] 行家详情页 - Profile Header、Bento Grid服务与案例、用户评价
- [x] 模板列表页 - 侧边栏类目导航、模板卡片hover效果、排序选项卡
- [x] 提交需求页 - 左侧进度指示器、专家徽章卡片、项目类型选择卡片、预算输入
- [x] 模板卡片组件 - aspect-[16/10]、hover:scale-110、shadow-xl、Expert徽章

## 待完成

- [ ] Footer 样式对齐
- [ ] 移动端响应式细节优化
