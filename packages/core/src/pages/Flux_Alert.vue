<script setup lang="ts">
import Alert from '../components/Alert/Alert.vue'
defineOptions({
  name: 'Flux_Alert',
})
</script>

<template>
  <!-- Default Color Variants -->
  <Alert color="default" variant="solid">Default Solid Alert</Alert>
  <Alert color="default" variant="bordered">Default Bordered Alert</Alert>
  <Alert color="default" variant="flat">Default Flat Alert</Alert>
  <Alert color="default" variant="faded">Default Faded Alert</Alert>

  <!-- Primary Color Variants -->
  <Alert color="primary" variant="solid" closable>Primary Solid Alert</Alert>
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
  <!-- radius -->
  <Alert radius="none">No Radius Alert</Alert>
  <Alert radius="sm">Small Radius Alert</Alert>
  <Alert radius="md">Medium Radius Alert</Alert>
  <Alert radius="lg">Large Radius Alert</Alert>
  <Alert radius="full">Extra Large Radius Alert</Alert>
  <Alert radius="md" hiddenIcon>Extra Large Radius Alert</Alert>
  <Alert radius="md" hiddenIcon>
    <h1>666</h1>
    <h1>666</h1>
    <h1>666</h1>
    <h1>666</h1>
    <h1>666</h1>
  </Alert>
</template>
