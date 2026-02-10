<script setup lang="ts">
type ApiColumn = {
  key: string
  label: string
  code?: boolean
}

defineProps<{
  columns: ApiColumn[]
  rows: Record<string, string>[]
}>()
</script>

<template>
  <div class="doc-api-table">
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="`column-${column.key}`">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="`row-${rowIndex}`">
          <td v-for="column in columns" :key="`cell-${rowIndex}-${column.key}`">
            <code v-if="column.code">{{ row[column.key] ?? '-' }}</code>
            <span v-else>{{ row[column.key] ?? '-' }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
