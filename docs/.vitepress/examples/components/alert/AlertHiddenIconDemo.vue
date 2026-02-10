<script setup lang="ts">
import { Alert } from '@fluxuijs/core'
</script>

<template>
  <div class="doc-example-stack">
    <Alert color="default" hiddenIcon>
      当前服务负载较高，响应时间可能增加
    </Alert>

    <Alert color="warning" variant="bordered" hiddenIcon>
      你的会话将在 3 分钟后过期
    </Alert>

    <Alert color="danger" variant="faded" hiddenIcon>
      风险校验未通过，请联系管理员
    </Alert>
  </div>
</template>
