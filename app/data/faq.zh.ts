import type { FAQItem } from './faq';

export const faqDataZh: FAQItem[] = [
  { question: '如何免费在线编辑 PDF？', answer: '打开 EditoraPDF，点击“编辑 PDF”或将文件拖入浏览器即可开始。无需安装或注册，可以免费编辑文字、添加图片和批注，以及管理页面。' },
  { question: '需要安装软件吗？', answer: '不需要。EditoraPDF 完全在浏览器中运行，无需下载安装软件，支持 Windows、Mac、Linux 和 Chromebook。' },
  { question: '需要注册或创建账户吗？', answer: '不需要。无需登录或提供个人信息，选择 PDF 后即可开始编辑。' },
  { question: '我的 PDF 安全吗？文件存在哪里？', answer: 'PDF 在您的浏览器本地处理，不会上传到我们的服务器。我们无法查看、访问或存储文档。关闭页面后，会话中的文档数据会被清除；您下载的文件仍保留在设备上。' },
  { question: '这个编辑器有哪些功能？', answer: '可以编辑文字、添加和删除页面、调整顺序、旋转页面、添加高亮与批注、插入图片和形状、填写表单并导出修改后的 PDF。' },
  { question: '支持多大的文件？', answer: '支持最大 25MB 的 PDF。为了获得更好的性能，建议使用少于 50 页的文档。大文件的处理速度取决于设备性能。' },
  { question: '可以在手机或平板上使用吗？', answer: '可以，界面支持手机和平板。对于精细编辑，建议使用屏幕较大的电脑和鼠标。' },
  { question: '可以离线使用吗？', answer: '页面加载完成后，本地 PDF 编辑操作可以在离线状态下使用。需要另行加载资源的工具可能仍需联网。' },
  { question: '支持哪些浏览器？', answer: '支持 Chrome、Firefox、Edge、Safari、Opera 和 Brave 等现代浏览器，建议使用最新版本以获得更好的体验。' },
  { question: '可以编辑扫描版 PDF 吗？', answer: '可以添加批注、图片、印章、形状和文字叠加层。扫描件中的文字属于图片，不能直接像普通文字一样编辑；文字识别需要使用 OCR 工具。' },
  { question: '如何保存编辑后的 PDF？', answer: '完成修改后，点击“下载 PDF”或“导出”按钮，将包含修改的文档保存到您的设备。' },
  { question: '真的免费吗？有没有隐藏费用？', answer: 'EditoraPDF 可以免费使用，不收取订阅费用，也没有隐藏收费。' },
  { question: 'EditoraPDF 是开源的吗？', answer: '是的，项目采用 MIT 许可证开源，您可以在 GitHub 查看源代码、修改代码或参与贡献。' },
  { question: '有什么免费开源的 PDF 编辑器？', answer: 'EditoraPDF 是免费的开源浏览器 PDF 编辑器，支持文字编辑、图片插入、形状工具和页面管理，无需安装或注册。' },
  { question: '如何在不上传到云端的情况下编辑 PDF？', answer: 'EditoraPDF 使用 PDF.js 和 pdf-lib 等库在浏览器本地处理文档，无需将文件上传到服务器。' },
  { question: '如何确认 PDF 编辑器保护隐私？', answer: 'EditoraPDF 在设备本地处理 PDF，文件不上传到服务器。您可以查看开源代码，或在浏览器开发者工具中检查网络请求。' },
  { question: '有没有 Adobe Acrobat 的开源替代工具？', answer: 'EditoraPDF 提供免费开源的核心 PDF 编辑功能，包括文字编辑、图片插入、批注和页面管理；部分企业级功能可能与 Adobe Acrobat 不同。' },
];
