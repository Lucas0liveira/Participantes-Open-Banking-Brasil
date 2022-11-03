import { mount } from '@vue/test-utils'
import VButton from '../VButton.vue'

test('it should render properly', async () => {
  const wrapper = mount(VButton)

  expect(wrapper.find('.v-button').exists()).toBe(true)
})

test('it should have the selected type', async () => {
  const wrapper = mount(VButton, {
    propsData: {
      type: 'primary',
    },
  })

  expect(wrapper.findAll('.primary').exists()).toBe(true)
})

test('it should have the choosen title', async () => {
  const wrapper = mount(VButton, {
    propsData: {
      title: 'Button Title',
    },
  })

  expect(wrapper.text()).toContain('Button Title')
})

test('it should be icon only', async () => {
  const wrapper = mount(VButton, {
    propsData: {
      iconOnly: true,
    },
  })

  expect(wrapper.findAll('p').exists()).toBe(false)
})

test('it should have an icon', async () => {
  const wrapper = mount(VButton, {
    propsData: {
      icon: 'xmark',
    },
  })

  expect(wrapper.findAll('.icon').exists()).toBe(true)
})
