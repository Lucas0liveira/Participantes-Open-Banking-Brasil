import { mount } from '@vue/test-utils'
import VPageHeader from '../VPageHeader.vue'

test('it should render properly', async () => {
  const wrapper = mount(VPageHeader)

  expect(wrapper.find('.v-header').exists()).toBe(true)
})

test('it should have the choosen title', async () => {
  const wrapper = mount(VPageHeader, {
    propsData: {
      title: 'Page Title',
    },
  })

  expect(wrapper.text()).toContain('Page Title')
})

test('it should render the content in the slot', async () => {
  const wrapper = mount(VPageHeader, {
    slots: {
      actions: '<div>slot-actions</div>',
    },
  })

  expect(wrapper.text()).toContain('slot-actions')
})
