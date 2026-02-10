<script setup lang="ts">
import { Alert } from '@fluxuijs/core'
import { BadgeCheck, TriangleAlert } from 'lucide-vue-next'
</script>

<template>
  <div class="doc-example-stack">
    <Alert color="success" variant="flat">
      <template #icon>
        <BadgeCheck />
      </template>
      审核已通过，配置可以发布。
    </Alert>

    <Alert color="warning" variant="bordered">
      <template #icon>
        <TriangleAlert />
      </template>
      当前策略即将过期，请尽快更新。
    </Alert>
  </div>
</template>
