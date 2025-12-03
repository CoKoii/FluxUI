<script setup lang="ts">
import { Camera } from 'lucide-vue-next'
import { lightTheme, applyTheme } from '../../theme/src/index'
applyTheme(lightTheme)
</script>

<template>
  <Camera color="red" :size="32" />
</template>
