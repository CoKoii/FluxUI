<script setup lang="ts">
import { darkTheme, lightTheme } from '../../theme/src'
import ConfigProvider from './components/ConfigProvider/ConfigProvider.vue'
import { ref } from 'vue'
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
    <div class="App">
      <button @click="changeTheme">切换主题</button>
    </div>
  </ConfigProvider>
</template>

<style scoped lang="scss"></style>
