<script setup lang="ts">
import { Alert } from '@fluxuijs/core'
</script>

<template>
  <div class="doc-example-stack">
    <Alert color="success" variant="flat">
      <template #icon>
        <span style="font-size: 18px; line-height: 1">✅</span>
      </template>
      审核已通过，配置可以发布。
    </Alert>

    <Alert color="warning" variant="bordered">
      <template #icon>
        <span style="font-size: 18px; line-height: 1">🛡️</span>
      </template>
      当前策略即将过期，请尽快更新。
    </Alert>
  </div>
</template>
