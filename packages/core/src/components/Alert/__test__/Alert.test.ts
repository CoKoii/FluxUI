/// <reference types="vitest/globals" />
import type { ComponentMountingOptions } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Alert from '../Alert.vue'
import type { AlertProps } from '../types'

type AlertMountOptions = Omit<ComponentMountingOptions<typeof Alert>, 'slots'> & {
  slots?: Record<string, string>
}

const mountAlert = (options?: AlertMountOptions) =>
  mount(Alert, {
    ...options,
    global: {
      stubs: { Transition: { template: '<div><slot /></div>' } },
      ...((options?.global ?? {}) as Record<string, unknown>),
    },
  })

const getAlertClasses = (wrapper: ReturnType<typeof mountAlert>) =>
  wrapper.get('.Alert').classes()

describe('Alert', () => {
  it('默认渲染时显示容器与基础结构', () => {
    const wrapper = mountAlert()
    expect(wrapper.find('.Alert').exists()).toBe(true)
    expect(wrapper.find('.icon').exists()).toBe(true)
    expect(wrapper.find('.text').exists()).toBe(true)
  })

  it('不传 props 时应用默认样式类', () => {
    const wrapper = mountAlert()
    const classes = getAlertClasses(wrapper)
    expect(classes).toContain('alert_default_flat')
    expect(classes).toContain('alert_radius_md')
    expect(classes).not.toContain('alert_icon_hidden')
  })

  it('未提供 icon 插槽时渲染默认图标', () => {
    const wrapper = mountAlert()
    expect(wrapper.find('.icon svg').exists()).toBe(true)
  })

  const colorCases = [
    ['default', 'alert_default_flat'],
    ['primary', 'alert_primary_flat'],
    ['secondary', 'alert_secondary_flat'],
    ['success', 'alert_success_flat'],
    ['warning', 'alert_warning_flat'],
    ['danger', 'alert_danger_flat'],
  ] as const
  it.each(colorCases)('设置 color=%s 时应用 %s 样式类', (color, expectedClass) => {
    const wrapper = mountAlert({ props: { color } })
    expect(getAlertClasses(wrapper)).toContain(expectedClass)
  })

  const variantCases = [
    ['solid', 'alert_default_solid'],
    ['bordered', 'alert_default_bordered'],
    ['flat', 'alert_default_flat'],
    ['faded', 'alert_default_faded'],
  ] as const
  it.each(variantCases)('设置 variant=%s 时应用 %s 样式类', (variant, expectedClass) => {
    const wrapper = mountAlert({ props: { variant } })
    expect(getAlertClasses(wrapper)).toContain(expectedClass)
  })

  const radiusCases = [
    ['none', 'alert_radius_none'],
    ['sm', 'alert_radius_sm'],
    ['md', 'alert_radius_md'],
    ['lg', 'alert_radius_lg'],
    ['full', 'alert_radius_full'],
  ] as const
  it.each(radiusCases)('设置 radius=%s 时应用 %s 样式类', (radius, expectedClass) => {
    const wrapper = mountAlert({ props: { radius } })
    expect(getAlertClasses(wrapper)).toContain(expectedClass)
  })

  it('设置 hiddenIcon=false 时不添加隐藏图标样式类', () => {
    const wrapper = mountAlert({ props: { hiddenIcon: false } })
    expect(getAlertClasses(wrapper)).not.toContain('alert_icon_hidden')
  })

  it('设置 hiddenIcon=true 时添加隐藏图标样式类', () => {
    const wrapper = mountAlert({ props: { hiddenIcon: true } })
    expect(getAlertClasses(wrapper)).toContain('alert_icon_hidden')
  })

  it('不传 closable 时不渲染关闭按钮', () => {
    const wrapper = mountAlert()
    expect(wrapper.find('button.close').exists()).toBe(false)
  })

  it('设置 closable=true 时渲染关闭按钮', () => {
    const wrapper = mountAlert({ props: { closable: true } })
    const button = wrapper.get('button.close')
    expect(button.attributes('aria-label')).toBe('Close alert')
    expect(button.attributes('type')).toBe('button')
  })

  it('点击关闭按钮会移除 Alert 容器', async () => {
    const wrapper = mountAlert({ props: { closable: true } })
    await wrapper.get('button.close').trigger('click')
    await nextTick()
    expect(wrapper.find('.Alert').exists()).toBe(false)
  })

  it('默认插槽内容会渲染到文本区域', () => {
    const wrapper = mountAlert({ slots: { default: '你好 Alert' } })
    expect(wrapper.get('.text').text()).toContain('你好 Alert')
  })

  it('icon 插槽会替换默认图标', () => {
    const wrapper = mountAlert({ slots: { icon: '<span class="custom-icon">I</span>' } })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    expect(wrapper.find('.icon svg').exists()).toBe(false)
  })

  it('同时设置 color 与 variant 时生成组合样式类', () => {
    const wrapper = mountAlert({ props: { color: 'warning', variant: 'bordered' } })
    expect(getAlertClasses(wrapper)).toContain('alert_warning_bordered')
  })

  it('非法 color 值仍会被拼接为样式类', () => {
    const wrapper = mountAlert({
      props: { color: 'mystery' as AlertProps['color'], variant: 'solid' },
    })
    expect(getAlertClasses(wrapper)).toContain('alert_mystery_solid')
  })

  it('非法 variant 值仍会被拼接为样式类', () => {
    const wrapper = mountAlert({
      props: { variant: 'ghost' as AlertProps['variant'] },
    })
    expect(getAlertClasses(wrapper)).toContain('alert_default_ghost')
  })

  it('非法 radius 值仍会被拼接为圆角样式类', () => {
    const wrapper = mountAlert({ props: { radius: 'giant' as AlertProps['radius'] } })
    expect(getAlertClasses(wrapper)).toContain('alert_radius_giant')
  })

  it('组件对外名称为 FLAlert', () => {
    const wrapper = mountAlert()
    expect(wrapper.vm.$options.name).toBe('FLAlert')
  })
})
