<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <section class="doc-demo">
    <header v-if="title || description" class="doc-demo__header">
      <h4 v-if="title" class="doc-demo__title">{{ title }}</h4>
      <p v-if="description" class="doc-demo__description">{{ description }}</p>
    </header>

    <div class="doc-demo__preview">
      <slot />
    </div>
  </section>
</template>
