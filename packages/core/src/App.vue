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
      <!-- Default Color Variants -->
      <Alert color="default" variant="solid">Default Solid Alert</Alert>
      <Alert color="default" variant="bordered">Default Bordered Alert</Alert>
      <Alert color="default" variant="flat">Default Flat Alert</Alert>
      <Alert color="default" variant="faded">Default Faded Alert</Alert>

      <!-- Primary Color Variants -->
      <Alert color="primary" variant="solid">Primary Solid Alert</Alert>
      <Alert color="primary" variant="bordered">Primary Bordered Alert</Alert>
      <Alert color="primary" variant="flat">Primary Flat Alert</Alert>
      <Alert color="primary" variant="faded">Primary Faded Alert</Alert>

      <!-- Secondary Color Variants -->
      <Alert color="secondary" variant="solid">Secondary Solid Alert</Alert>
      <Alert color="secondary" variant="bordered">Secondary Bordered Alert</Alert>
      <Alert color="secondary" variant="flat">Secondary Flat Alert</Alert>
      <Alert color="secondary" variant="faded">Secondary Faded Alert</Alert>

      <!-- Success Color Variants -->
      <Alert color="success" variant="solid">Success Solid Alert</Alert>
      <Alert color="success" variant="bordered">Success Bordered Alert</Alert>
      <Alert color="success" variant="flat">Success Flat Alert</Alert>
      <Alert color="success" variant="faded">Success Faded Alert</Alert>

      <!-- Warning Color Variants -->
      <Alert color="warning" variant="solid">Warning Solid Alert</Alert>
      <Alert color="warning" variant="bordered">Warning Bordered Alert</Alert>
      <Alert color="warning" variant="flat">Warning Flat Alert</Alert>
      <Alert color="warning" variant="faded">Warning Faded Alert</Alert>

      <!-- Danger Color Variants -->
      <Alert color="danger" variant="solid">Danger Solid Alert</Alert>
      <Alert color="danger" variant="bordered">Danger Bordered Alert</Alert>
      <Alert color="danger" variant="flat">Danger Flat Alert</Alert>
      <Alert color="danger" variant="faded">Danger Faded Alert</Alert>
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
