<script setup lang="ts">
type TypeRow = {
  name: string
  value: string
}

defineProps<{
  rows: TypeRow[]
}>()
</script>

<template>
  <div class="doc-type-list">
    <p v-for="row in rows" :key="row.name" class="doc-type-list__line">
      <code class="doc-type-list__name">{{ row.name }}</code>
      <span class="doc-type-list__equal">=</span>
      <code class="doc-type-list__value">{{ row.value }}</code>
    </p>
  </div>
</template>
