<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
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
      <Alert color="default"></Alert>
      <Alert color="primary"></Alert>
      <Alert color="secondary"></Alert>
      <Alert color="success"></Alert>
      <Alert color="warning"></Alert>
      <Alert color="danger"></Alert>
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
  transition: color 0.3s;
}
.main {
  padding: 16px 24px;
  background-color: var(--fl-colors-layout-background);
  width: 100vw;
  height: 100vh;
  transition: background-color 0.3s;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
