<script setup lang="ts">
import { Moon, MoonStar, Sun } from 'lucide-vue-next'
import { darkTheme, lightTheme } from '../../theme/src'
import ConfigProvider from './components/ConfigProvider/ConfigProvider.vue'
import { ref } from 'vue'
import Alert from './components/Alert/Alert.vue'
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
      <Alert color="default">
        <template #icon>
          <MoonStar fill="currentColor" :size="22" />
        </template>
        This is a default alert</Alert
      >
      <Alert color="primary">This is a primary alert</Alert>
      <Alert color="secondary">This is a secondary alert</Alert>
      <Alert color="success">This is a success alert</Alert>
      <Alert color="warning">This is a warning alert</Alert>
      <Alert color="danger">This is a danger alert</Alert>
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
