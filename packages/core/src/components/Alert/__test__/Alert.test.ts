/// <reference types="vitest/globals" />
import type { ComponentMountingOptions } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Alert from '../Alert.vue'

const mountAlert = (
  options?: Omit<ComponentMountingOptions<typeof Alert>, 'slots'> & {
    slots?: Record<string, string>
  },
) =>
  mount(Alert, {
    ...options,
    global: {
      stubs: { Transition: { template: '<div><slot /></div>' } },
      ...((options?.global ?? {}) as Record<string, unknown>),
    },
  })
describe('Alert', () => {
  it('应用默认 props 并渲染基础结构', () => {
    const wrapper = mountAlert()
    const root = wrapper.get('.Alert')
    const classes = root.classes()
    expect(classes).toEqual(expect.arrayContaining(['alert_default_flat', 'alert_radius_md']))
    expect(classes).not.toContain('alert_icon_hidden')
    expect(root.find('.icon').exists()).toBe(true)
    expect(root.find('.text').exists()).toBe(true)
    expect(wrapper.find('button.close').exists()).toBe(false)
  })

  it('渲染默认插槽到文本区域并保留默认图标', () => {
    const wrapper = mountAlert({ slots: { default: '你好 Alert' } })
    expect(wrapper.get('.text').text()).toContain('你好 Alert')
    expect(wrapper.find('.icon svg').exists()).toBe(true)
  })

  it('从 props 应用类名', () => {
    const wrapper = mountAlert({
      props: { color: 'primary', variant: 'faded', radius: 'lg', hiddenIcon: true },
    })
    const classes = wrapper.get('.Alert').classes()
    expect(classes).toEqual(
      expect.arrayContaining(['alert_primary_faded', 'alert_radius_lg', 'alert_icon_hidden']),
    )
    expect(wrapper.find('.icon').exists()).toBe(true)
  })

  it('渲染自定义图标插槽并覆盖默认图标', () => {
    const wrapper = mountAlert({ slots: { icon: '<span class="custom-icon">I</span>' } })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    expect(wrapper.find('.icon svg').exists()).toBe(false)
  })

  it('仅在可关闭时渲染关闭按钮', () => {
    const plain = mountAlert()
    expect(plain.find('button.close').exists()).toBe(false)

    const closable = mountAlert({ props: { closable: true } })
    const button = closable.get('button.close')
    expect(button.attributes('aria-label')).toBe('Close alert')
    expect(button.attributes('type')).toBe('button')
    expect(button.find('svg').exists()).toBe(true)
  })

  it('更新 props 后 class 和按钮状态同步', async () => {
    const wrapper = mountAlert({ props: { radius: 'sm' } })
    expect(wrapper.get('.Alert').classes()).toContain('alert_radius_sm')
    expect(wrapper.find('button.close').exists()).toBe(false)

    await wrapper.setProps({ radius: 'full', closable: true, hiddenIcon: true })
    await nextTick()
    const classes = wrapper.get('.Alert').classes()
    expect(classes).toContain('alert_radius_full')
    expect(classes).not.toContain('alert_radius_sm')
    expect(classes).toContain('alert_icon_hidden')
    expect(wrapper.find('button.close').exists()).toBe(true)
  })

  it('点击关闭按钮时关闭', async () => {
    const wrapper = mountAlert({ props: { closable: true }, slots: { default: '关闭我' } })
    await wrapper.get('button.close').trigger('click')
    await nextTick()
    expect(wrapper.find('.Alert').exists()).toBe(false)
  })
})
