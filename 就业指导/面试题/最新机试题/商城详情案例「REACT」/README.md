# 详情页+商品sku选择器

## 技术栈

- Vite
- React Hooks
- React-Redux
- Less

## 项目

- 使用pnpm跑环境，在终端输入pnpm dev即可启动项目
- 基于iphone6/7/8下构建视图
- 入口src/main.jsx
- 详情页src/views/Shop.jsx
- 详情页底部加入购物车按钮和购物车图标
  - 拆分到src/components/ShopCart.jsx
- 点击购物车弹出框页面
  - 拆分到src/components/CarDetail.jsx
- 简单封装了Ant Design Mobile里的骨架屏组件
  - src/components/SkeletonAgain.jsx
