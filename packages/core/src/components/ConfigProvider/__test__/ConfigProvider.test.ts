/// <reference types="vitest/globals" />
import {
  darkTheme,
  DEFAULT_ATTRIBUTE,
  DEFAULT_PREFIX,
  lightTheme,
  type Theme,
} from '@fluxuijs/theme'
import type { ComponentMountingOptions } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import ConfigProvider from '../ConfigProvider.vue'
import { useTheme } from '../context'
import type { ConfigProviderProps } from '../types'

type ConfigProviderMountOptions = ComponentMountingOptions<typeof ConfigProvider>

const mountConfigProvider = (options?: ConfigProviderMountOptions) =>
  mount(ConfigProvider, { ...options })

const getProviderContainer = (wrapper: ReturnType<typeof mountConfigProvider>) =>
  wrapper.get('.fl-config-provider')

const getThemeStyle = (key: string) =>
  document.head.querySelector(`style[data-fluxuijs-theme="${key}"]`)

const ThemeProbe = defineComponent({
  name: 'ThemeProbe',
  setup() {
    const { theme, mode, isDark, toggle, set } = useTheme()
    return {
      theme,
      mode,
      isDark,
      toggle,
      setDark: () => set(darkTheme),
      setLight: () => set(lightTheme),
    }
  },
  template: `
    <div class="theme-probe">
      <span class="theme-name">{{ theme.name }}</span>
      <span class="mode">{{ mode }}</span>
      <span class="is-dark">{{ String(isDark) }}</span>
      <button class="toggle" type="button" @click="toggle">toggle</button>
      <button class="set-dark" type="button" @click="setDark">set-dark</button>
      <button class="set-light" type="button" @click="setLight">set-light</button>
    </div>
  `,
})

const mountProviderWithProbe = (props?: ConfigProviderProps) =>
  mountConfigProvider({
    props,
    slots: { default: () => h(ThemeProbe) },
  })

const mountProbeWithoutProvider = () => {
  const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const wrapper = mount(ThemeProbe)
  warnSpy.mockRestore()
  return wrapper
}

const brandTheme: Theme = { ...lightTheme, name: 'brand' }

describe('ConfigProvider', () => {
  it('未传任何 props 时使用 lightTheme 并写入默认 attribute', () => {
    const wrapper = mountConfigProvider()
    expect(getProviderContainer(wrapper).attributes(DEFAULT_ATTRIBUTE)).toBe('light')
  })

  it('设置 theme 为非默认主题时写入对应主题名', () => {
    const wrapper = mountConfigProvider({ props: { theme: brandTheme } })
    expect(getProviderContainer(wrapper).attributes(DEFAULT_ATTRIBUTE)).toBe('brand')
  })

  it('更新 theme 后会重新应用并更新容器 attribute', async () => {
    const wrapper = mountConfigProvider()
    await wrapper.setProps({ theme: darkTheme })
    await nextTick()
    expect(getProviderContainer(wrapper).attributes(DEFAULT_ATTRIBUTE)).toBe('dark')
  })

  it('传入非法 theme（缺失 tokens）时抛出异常', () => {
    const mountWithBrokenTheme = () =>
      mountConfigProvider({
        props: { theme: { name: 'broken' } as Theme },
      })
    expect(mountWithBrokenTheme).toThrow()
  })

  it('未传 prefix 时会按 DEFAULT_PREFIX 生成主题样式', () => {
    const attribute = 'data-prefix-default'
    mountConfigProvider({ props: { attribute } })
    expect(getThemeStyle(`${DEFAULT_PREFIX}|${attribute}|light`)).not.toBeNull()
  })

  it('prefix 设置为自定义值时会生成对应前缀样式', () => {
    const prefix = '--fl-custom-prefix'
    const attribute = 'data-prefix-custom'
    mountConfigProvider({ props: { prefix, attribute } })
    expect(getThemeStyle(`${prefix}|${attribute}|light`)).not.toBeNull()
  })

  it('prefix 显式设为 DEFAULT_PREFIX 时仍按默认前缀输出样式', () => {
    const attribute = 'data-prefix-explicit-default'
    mountConfigProvider({ props: { prefix: DEFAULT_PREFIX, attribute } })
    expect(getThemeStyle(`${DEFAULT_PREFIX}|${attribute}|light`)).not.toBeNull()
  })

  it('prefix 为空字符串时不会额外生成空前缀样式', () => {
    const attribute = 'data-prefix-empty'
    mountConfigProvider({ props: { prefix: '', attribute } })
    expect(getThemeStyle(`|${attribute}|light`)).toBeNull()
  })

  it('更新 prefix 后会按新前缀生成样式', async () => {
    const attribute = 'data-prefix-switch'
    const wrapper = mountConfigProvider({
      props: { prefix: '--prefix-old', attribute },
    })
    await wrapper.setProps({ prefix: '--prefix-new' })
    await nextTick()
    expect(getThemeStyle(`--prefix-new|${attribute}|light`)).not.toBeNull()
  })

  it('未传 attribute 时写入 DEFAULT_ATTRIBUTE', () => {
    const wrapper = mountConfigProvider()
    expect(getProviderContainer(wrapper).attributes(DEFAULT_ATTRIBUTE)).toBe('light')
  })

  it('设置 attribute 时写入自定义属性名', () => {
    const wrapper = mountConfigProvider({ props: { attribute: 'data-theme-mode' } })
    expect(getProviderContainer(wrapper).attributes('data-theme-mode')).toBe('light')
  })

  it('更新 attribute 后会写入新的属性名', async () => {
    const wrapper = mountConfigProvider({ props: { attribute: 'data-theme-old' } })
    await wrapper.setProps({ attribute: 'data-theme-new' })
    await nextTick()
    expect(getProviderContainer(wrapper).attributes('data-theme-new')).toBe('light')
  })

  it('attribute 为空字符串时抛出异常', () => {
    const mountWithEmptyAttribute = () => mountConfigProvider({ props: { attribute: '' } })
    expect(mountWithEmptyAttribute).toThrow()
  })

  it('default 插槽内容会渲染到主题容器内', () => {
    const wrapper = mountConfigProvider({
      slots: { default: '<span class="slot-content">Config Slot</span>' },
    })
    expect(wrapper.get('.slot-content').text()).toBe('Config Slot')
  })

  it('组件对外名称为 FlConfigProvider', () => {
    const wrapper = mountConfigProvider()
    expect(wrapper.vm.$options.name).toBe('FlConfigProvider')
  })

  it('组合使用 theme + prefix + attribute 时会同时输出默认与自定义前缀样式', () => {
    const prefix = '--combo-prefix'
    const attribute = 'data-combo-theme'
    mountConfigProvider({
      props: { theme: darkTheme, prefix, attribute },
    })
    expect(getThemeStyle(`${DEFAULT_PREFIX}|${attribute}|dark`)).not.toBeNull()
    expect(getThemeStyle(`${prefix}|${attribute}|dark`)).not.toBeNull()
  })
})

describe('useTheme', () => {
  it('在 ConfigProvider 内读取 theme 时返回当前主题对象', () => {
    const wrapper = mountProviderWithProbe({ theme: darkTheme })
    expect(wrapper.get('.theme-name').text()).toBe('dark')
  })

  it('在 ConfigProvider 内读取 mode 时根据主题名返回 dark/light', () => {
    const wrapper = mountProviderWithProbe({ theme: darkTheme })
    expect(wrapper.get('.mode').text()).toBe('dark')
  })

  it('在 ConfigProvider 内读取 isDark 时可得到布尔状态', () => {
    const wrapper = mountProviderWithProbe({ theme: darkTheme })
    expect(wrapper.get('.is-dark').text()).toBe('true')
  })

  it('在 ConfigProvider 内调用 toggle 会在 light 与 dark 之间切换', async () => {
    const wrapper = mountProviderWithProbe({ theme: lightTheme })
    await wrapper.get('button.toggle').trigger('click')
    await nextTick()
    expect(wrapper.get('.theme-name').text()).toBe('dark')
  })

  it('在 ConfigProvider 内调用 set 可直接设置指定主题', async () => {
    const wrapper = mountProviderWithProbe({ theme: lightTheme })
    await wrapper.get('button.set-dark').trigger('click')
    await nextTick()
    expect(wrapper.get('.theme-name').text()).toBe('dark')
  })

  it('无 Provider 时读取 theme 返回 fallback lightTheme', () => {
    const wrapper = mountProbeWithoutProvider()
    expect(wrapper.get('.theme-name').text()).toBe('light')
  })

  it('无 Provider 时读取 mode 返回 fallback light', () => {
    const wrapper = mountProbeWithoutProvider()
    expect(wrapper.get('.mode').text()).toBe('light')
  })

  it('无 Provider 时读取 isDark 返回 fallback false', () => {
    const wrapper = mountProbeWithoutProvider()
    expect(wrapper.get('.is-dark').text()).toBe('false')
  })

  it('无 Provider 时调用 toggle 为 no-op 且不会改变主题', async () => {
    const wrapper = mountProbeWithoutProvider()
    await wrapper.get('button.toggle').trigger('click')
    await nextTick()
    expect(wrapper.get('.theme-name').text()).toBe('light')
  })

  it('无 Provider 时调用 set 为 no-op 且不会改变主题', async () => {
    const wrapper = mountProbeWithoutProvider()
    await wrapper.get('button.set-dark').trigger('click')
    await nextTick()
    expect(wrapper.get('.theme-name').text()).toBe('light')
  })

  it('组合场景下调用 toggle 会同步更新自定义 attribute 的主题值', async () => {
    const attribute = 'data-theme-composed'
    const wrapper = mountProviderWithProbe({
      theme: lightTheme,
      prefix: '--composed-prefix',
      attribute,
    })
    await wrapper.get('button.toggle').trigger('click')
    await nextTick()
    expect(getProviderContainer(wrapper).attributes(attribute)).toBe('dark')
  })
})
