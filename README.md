# IA610 智能麦克风模组官网

这是 IA610 智能麦克风模组的官方网站。

## 部署步骤

1. 安装 Vercel CLI（可选）：
   ```bash
   npm install -g vercel
   ```

2. 登录 Vercel：
   ```bash
   vercel login
   ```

3. 部署到 Vercel：
   ```bash
   vercel
   ```

4. 添加自定义域名：
   - 登录 Vercel 控制台
   - 进入项目设置
   - 添加域名：ia610.com
   - 按照提示配置 DNS 记录

## 本地开发

1. 安装依赖：
   ```bash
   npm install
   ```

2. 运行开发服务器：
   ```bash
   npm run dev
   ```

## 目录结构

```
public/
├── index.html      # 主页面
├── css/           # 样式文件
├── js/            # JavaScript文件
├── images/        # 图片资源
└── downloads/     # 下载文件
```

## 技术栈

- HTML5
- CSS3
- JavaScript
- Vercel 部署

## 项目概述
IA610是一款高性能的智能麦克风模组，集成了先进的语音处理技术。本项目包含了IA610模组的开发文档、SDK和设计指南，旨在帮助开发者快速集成和使用IA610模组。

## 文档结构
项目包含以下重要文档：

1. **产品规格书**
   - `IA610 Datasheet-K.pdf`: IA610模组详细规格说明书
   - `IA610模组使用说书.doc`: 中文版使用说明书

2. **开发文档**
   - `IA61x Android VQ App-Middleware Integration Guide.docx`: Android平台集成指南
   - `IA61x SmartMic Design Guide v1.0.pdf`: 智能麦克风设计指南

3. **开发工具**
   - `SDK3_7.zip`: 开发SDK包
   - `Audience_SDK_IA61x.zip`: Audience SDK包

## 快速开始

### 1. 环境准备
- 下载并解压SDK包（`SDK3_7.zip`）
- 下载并解压Audience SDK包（`Audience_SDK_IA61x.zip`）

### 2. 开发流程
1. 阅读产品规格书了解模组特性
2. 参考设计指南进行硬件设计
3. 按照集成指南进行软件开发
4. 使用SDK进行功能测试和调试

## 技术支持
如需技术支持，请参考以下文档：
- 产品规格书中的联系方式
- 集成指南中的常见问题解答

## 注意事项
1. 使用前请仔细阅读产品规格书和使用说明书
2. 确保按照设计指南进行硬件设计
3. 遵循集成指南进行软件开发
4. 定期检查SDK更新

## 文档更新记录
- 2024-03-27: 项目文档初始化 