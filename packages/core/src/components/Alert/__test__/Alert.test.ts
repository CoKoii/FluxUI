/// <reference types="vitest/globals" />
import type { ComponentMountingOptions, GlobalMountOptions } from '@vue/test-utils'
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
      ...((options?.global ?? {}) as GlobalMountOptions),
    },
  })
describe('Alert', () => {
  it('渲染默认插槽和图标', () => {
    const wrapper = mountAlert({ slots: { default: '你好 Alert' } })
    expect(wrapper.text()).toContain('你好 Alert')
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
  })

  it('渲染自定义图标插槽', () => {
    const wrapper = mountAlert({ slots: { icon: '<span class="custom-icon">I</span>' } })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  it('仅在可关闭时渲染关闭按钮', () => {
    const plain = mountAlert()
    expect(plain.find('button.close').exists()).toBe(false)

    const closable = mountAlert({ props: { closable: true } })
    const button = closable.get('button.close')
    expect(button.attributes('aria-label')).toBe('Close alert')
  })

  it('点击关闭按钮时关闭', async () => {
    const wrapper = mountAlert({ props: { closable: true }, slots: { default: '关闭我' } })
    await wrapper.get('button.close').trigger('click')
    await nextTick()
    expect(wrapper.find('.Alert').exists()).toBe(false)
  })
})
