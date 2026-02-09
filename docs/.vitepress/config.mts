import { defineConfig } from 'vitepress'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isProjectPages = repoName.length > 0 && !repoName.toLowerCase().endsWith('.github.io')
const base = isProjectPages ? `/${repoName}/` : '/'

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: 'FluxUI组件库',
  description: '现代化、工程化的 Vue3 UI 组件库，专注高质量组件与清晰 API 设计',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/installation' },
      { text: '组件', link: '/components/alert' },
      { text: '主题', link: '/theme/overview' },
      { text: 'FAQ', link: '/faq' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quick-start' },
          ],
        },
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Alert 警告提示', link: '/components/alert' },
            { text: 'ConfigProvider 配置提供者', link: '/components/config-provider' },
          ],
        },
      ],
      '/theme/': [
        {
          text: '主题系统',
          items: [
            { text: '概览', link: '/theme/overview' },
            { text: 'Design Tokens', link: '/theme/tokens' },
            { text: '自定义主题', link: '/theme/custom-theme' },
          ],
        },
      ],
      '/': [
        {
          text: '文档',
          items: [
            { text: '首页', link: '/' },
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quick-start' },
            { text: 'FAQ', link: '/faq' },
          ],
        },
        {
          text: '迁移页面',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' },
          ],
        },
      ],
    },
    outline: {
      level: [2, 3],
      label: '页面导航',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    lastUpdated: {
      text: '最后更新于',
    },
    search: {
      provider: 'local',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/yourusername/fluxui' }],
    footer: {
      message: 'MIT Licensed.',
      copyright: 'Copyright © FluxUI',
    },
  },
})
