<script setup lang="ts">
import { Alert } from '@fluxuijs/core'
</script>

<template>
  <div class="doc-example-stack">
    <Alert color="success" closable>
      资料已保存，你可以关闭这条提示。
    </Alert>

    <Alert color="warning" variant="bordered" closable>
      <template #icon>
        <span style="font-size: 18px">⚡</span>
      </template>
      请在提交前检查必填字段。
    </Alert>
  </div>
</template>
