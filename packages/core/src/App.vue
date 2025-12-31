<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { darkTheme, lightTheme } from '../../theme/src'
import ConfigProvider from './components/ConfigProvider/ConfigProvider.vue'
import { ref } from 'vue'
import Flux_Alert from './pages/Flux_Alert.vue'
import Flux_Button from './pages/Flux_Button.vue'
const theme = ref(lightTheme)
const changeTheme = () => {
  theme.value = theme.value.name === 'light' ? darkTheme : { ...lightTheme }
}
defineOptions({
  name: 'App',
})
</script>

<template>
  <ConfigProvider :theme="theme">
    <div class="changeTheme">
      <Sun @click="changeTheme" v-if="theme.name === 'dark'" />
      <Moon @click="changeTheme" v-else />
    </div>
    <div class="main">
      <!-- Alert 组件示例 -->
      <Flux_Alert v-if="true" />

      <!-- Button 组件示例 -->
      <Flux_Button v-if="false" />
    </div>
  </ConfigProvider>
</template>

<style scoped lang="scss">
.changeTheme {
  position: fixed;
  top: 16px;
  right: 16px;
  cursor: pointer;
  z-index: 1000;
  color: var(--fl-colors-default-900);
  transition: color 0.3s ease;
}
.main {
  padding: 16px 24px;
  background-color: var(--fl-colors-layout-background);
  transition: background-color 0.3s ease;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: start;
  gap: 16px;
}
</style>
