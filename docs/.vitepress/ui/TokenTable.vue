<script setup lang="ts">
import { computed } from 'vue'

interface TokenRow {
  key: string
  value: string
}

interface TokenTableProps {
  title?: string
  tokens: Record<string, unknown>
  prefix?: string
}

const props = defineProps<TokenTableProps>()

const rows = computed<TokenRow[]>(() => flattenEntries(props.tokens, props.prefix ?? ''))

function flattenEntries(input: unknown, path: string): TokenRow[] {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return path ? [{ key: path, value: String(input) }] : []
  }

  const out: TokenRow[] = []
  for (const [key, value] of Object.entries(input)) {
    const nextPath = path ? `${path}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      out.push(...flattenEntries(value, nextPath))
      continue
    }
    out.push({ key: nextPath, value: String(value) })
  }
  return out
}
</script>

<template>
  <div class="token-table">
    <h4 v-if="title" class="token-table__title">{{ title }}</h4>
    <div class="token-table__wrap">
      <table>
        <thead>
          <tr>
            <th>Token Path</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.key">
            <td><code>{{ row.key }}</code></td>
            <td><code>{{ row.value }}</code></td>
          </tr>
          <tr v-if="rows.length === 0">
            <td colspan="2">无可展示 token</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
