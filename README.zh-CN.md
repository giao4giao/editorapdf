# EditoraPDF 中文说明

[English](README.md) | **简体中文**

EditoraPDF 是一个在浏览器中运行的开源 PDF 编辑与处理工具。本分支由 [giao4giao](https://github.com/giao4giao) 维护，基于 [affsquadDevs/EditoraPDF](https://github.com/affsquadDevs/editorapdf) 修改，保留原项目的 MIT 许可证与版权声明。

- 在线使用：[editorapdf.171818.xyz](https://editorapdf.171818.xyz/zh)
- 本分支源码：[giao4giao/editorapdf](https://github.com/giao4giao/editorapdf)
- 问题反馈与功能建议：[GitHub Issues](https://github.com/giao4giao/editorapdf/issues)
- 许可证：[LICENSE](LICENSE)
- 参与贡献：[CONTRIBUTING.md](CONTRIBUTING.md)

## 本分支的改进

- 增加简体中文语言包，可通过导航栏或手机菜单选择“简体中文”。
- 调整首页、工具目录与通用界面样式，采用炭灰、暖白和陶土色配色。
- 修复 Cloudflare 构建过程中 PDF 依赖与 `buffer` 的打包问题。
- 将源码、反馈和维护者信息指向本分支，保留原项目致谢。
- 移除原作者的邮箱、社交账号、Trustpilot 评论组件、统计和广告账号绑定。
- 用 `NEXT_PUBLIC_SITE_URL` 集中配置本站域名，避免 SEO 链接继续指向原作者网站。

## 主要功能

| 分类 | 常用功能 |
| --- | --- |
| PDF 编辑 | 编辑或添加文字、插入图片、添加图形与批注、导出修改后的 PDF |
| 页面管理 | 合并、拆分、提取、删除、旋转、调整页面顺序 |
| 格式转换 | PDF 转图片、Word、Excel、文本等；图片转 PDF |
| 文档处理 | 压缩、裁剪、调整页面大小、添加水印和页码 |
| 安全与表单 | 签名、遮盖敏感信息、清理隐藏数据及其他工具 |

具体功能以网页的工具目录为准。转换结果受 PDF 原始结构、字体和版式影响。

## 如何使用

1. 打开网站，在语言选择器中选择“简体中文”，或访问 `/zh`。
2. 点击“编辑 PDF”，选择本地 PDF 文件；也可以先在工具目录选择所需操作。
3. 根据页面提示编辑或处理文档。
4. 导出结果，并检查文字、页面顺序和版式是否符合预期。

PDF 处理在浏览器本地完成，文件内容不会上传到本项目的服务器。初次加载网站、PDF.js、OCR 等资源仍可能需要联网；“本地处理”不表示所有功能都能在首次离线访问时使用。

## 本地开发

准备好 Node.js、npm 和 Git，并尽量与部署平台使用一致的 Node.js 版本。

```bash
git clone https://github.com/giao4giao/editorapdf.git
cd editorapdf
npm ci
```

将 `.env.example` 复制为 `.env.local`。例如在 Windows PowerShell 中：

```powershell
Copy-Item .env.example .env.local
```

启动开发服务器：

```bash
npm run dev
```

打开 [中文首页](http://localhost:3000/zh)。端口占用时可运行：

```bash
npm run dev -- -p 3001
```

## 域名与项目归属配置

维护者、GitHub 主页、Fork 仓库、Issues 和原项目地址在 [`app/lib/site.ts`](app/lib/site.ts) 中配置。

域名通过环境变量设置：

```dotenv
NEXT_PUBLIC_SITE_URL=https://editorapdf.171818.xyz
```

请填完整的 `https://` 地址，不要填 GitHub 仓库地址，也不要带 `/zh` 路径。本分支默认使用 `https://editorapdf.171818.xyz`；部署到其他地址时，请填写新的 Cloudflare Pages 地址或自定义域名。若需本地链接，也可以在 `.env.local` 中改为 `http://localhost:3000`。该变量用于规范链接、分享信息、结构化数据、站点地图等，修改后需重新构建部署。

本分支默认通过 GitHub Issues 接收反馈。没有配置个人邮箱或社交账号时，不会沿用原作者的联系方式。

## Cloudflare Pages 部署

当前项目使用 Next.js Edge 路由与 `@cloudflare/next-on-pages` 适配器，不是导出到 `out` 目录的纯静态网站。

1. 在 Cloudflare Pages 中连接自己的 `giao4giao/editorapdf` 仓库。
2. 选择需要部署的分支。
3. 设置构建命令为 `npm run build`。
4. 设置构建输出目录为 `.vercel/output/static`。
5. 在构建环境变量中设置 `NEXT_PUBLIC_SITE_URL` 为实际站点地址；生产和预览环境可分别设置。
6. 保留仓库中 [`wrangler.jsonc`](wrangler.jsonc) 的兼容性配置，并按平台要求配置 Node.js 版本。
7. 部署完成后检查 `/zh`、语言切换、工具入口和导出操作。

`scripts/build-cloudflare.js` 在外层运行 Cloudflare 适配器，在适配器内部运行 Next.js 构建，避免构建递归。不要把内部构建命令改为再次调用适配器。

使用自己的 Cloudflare 账号手动部署时，可运行：

```bash
npm run deploy
```

该命令会执行构建并实际上传；仅检查本地代码时无需运行。

## 本地生产检查

```bash
# 检查 Next.js 编译、类型与页面生成
npx next build

# 检查生成的 Edge 文件是否含有无法解析的依赖
node scripts/check-cloudflare-edge.js

# 本地预览生产构建
npm run start
```

`npx next build` 用于检查 Next.js；`npm run build` 则会运行 Cloudflare 适配器，两者用途不同。Edge 依赖检查通过不代表已经完成线上部署。

## 常见问题

### Cloudflare 报无法解析 `buffer`

保留 [`next.config.js`](next.config.js) 中 PDF 依赖的服务端处理和别名配置，并确认使用仓库提交的依赖锁文件。不要直接将 PDF.js 或 pdf-lib 改为服务端外部依赖，否则可能重新引入 Edge 打包问题。先执行上述本地生产检查，反馈问题时附上完整构建日志。

### Windows 构建提示文件被占用（`EBUSY`）

停止开发服务器和其他正在读写 `.next` 的构建进程后重试，避免开发和生产构建同时使用同一个目录。Cloudflare 的适配器构建使用其 Linux 环境；本地运行适配器遇到 Windows 环境限制时，可以使用兼容的 Linux/WSL 环境。

### PDF 无法打开或转换结果不理想

确认文件有效、没有不支持的加密保护，先尝试较小且版式简单的文件。扫描件通常需要 OCR，普通文字提取不能代替识别。复杂字体、表单、背景和多栏排版可能影响编辑或导出效果。

### 语言菜单中找不到中文

确认部署的是包含中文语言包的最新提交。桌面端从导航栏选择语言，手机端先展开菜单，也可直接访问 `/zh`。

## 已知限制

- 主编辑器单个文件大小上限为 25 MB，建议优先处理少于 50 页的文档。
- 浏览器内存和设备性能会影响大文件、OCR 及复杂转换的速度。
- 主编辑器对加密 PDF、复杂表单和特殊字体的支持有限。
- 替换原始文字可能通过覆盖原文实现，在复杂背景上需仔细检查结果。
- 处理正式文件前，请保留原件并核对导出的文档。

## 项目结构

```text
app/
  [locale]/          多语言页面
  components/        界面、编辑器和工具组件
  lib/               PDF 操作、SEO 与站点归属配置
  store/             编辑状态
i18n/
  config.ts          支持的语言与语言信息
  locales/zh.json    简体中文语言包
scripts/             Cloudflare 构建与辅助检查
public/              静态资源
```

## 反馈、贡献与致谢

请向[本分支 Issues](https://github.com/giao4giao/editorapdf/issues)提交问题，注明复现步骤、浏览器及版本、实际结果和错误信息。涉及私人或敏感信息的 PDF，请先制作不含敏感内容的复现样例。

欢迎改进中文翻译、补充说明、修复问题或提交 Pull Request。原项目由 affsquadDevs / EditoraPDF Team 创建；本分支的中文支持、界面和部署调整由 giao4giao 维护。项目同时使用 Mozilla PDF.js、pdf-lib、Next.js、React、Tailwind CSS、Zustand 等开源组件，感谢原作者及所有贡献者。

本项目使用 [MIT 许可证](LICENSE)。分发时请保留许可证中的原始版权声明与许可文本。
