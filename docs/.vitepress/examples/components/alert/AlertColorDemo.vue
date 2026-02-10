<script setup lang="ts">
import { Alert } from '@fluxuijs/core'
</script>

<template>
  <div class="doc-example-stack">
    <Alert color="default">系统将在 10 分钟后自动刷新页面</Alert>
    <Alert color="primary">检测到新的公告，请及时查看</Alert>
    <Alert color="secondary">本页面启用了实验性功能，请谨慎操作</Alert>
    <Alert color="success">保存成功，配置已生效</Alert>
    <Alert color="warning">当前网络不稳定，提交可能延迟</Alert>
    <Alert color="danger">支付失败，请检查后重试</Alert>
  </div>
</template>
