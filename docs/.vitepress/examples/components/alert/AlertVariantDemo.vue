<script setup lang="ts">
import { Alert } from '@fluxuijs/core'
</script>

<template>
  <div class="doc-example-stack">
    <Alert color="primary" variant="solid">提交成功，数据已保存</Alert>
    <Alert color="primary" variant="bordered">请先完成手机号验证</Alert>
    <Alert color="primary" variant="flat">检测到新的版本可更新</Alert>
    <Alert color="primary" variant="faded">当前为只读模式，部分操作不可用</Alert>
  </div>
</template>
