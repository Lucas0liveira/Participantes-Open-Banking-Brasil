import { mount } from '@vue/test-utils'
import VChip from '../VChip.vue'

test('it should render properly', async () => {
  const wrapper = mount(VChip)

  expect(wrapper.find('.v-chip').exists()).toBe(true)
})

test('it should have the selected title', async () => {
  const wrapper = mount(VChip, {
    propsData: {
      title: 'My Chip',
    },
  })

  expect(wrapper.text()).toContain('My Chip')
})

test('it should have emit toggle when clicked', async () => {
  const wrapper = mount(VChip, {
    propsData: {
      title: 'My Chip',
      code: 'my-code',
    },
  })

  wrapper.vm.$nextTick(() => {
    wrapper.trigger('click')

    expect(wrapper.emitted('toggle')).toBeTruthy()
    expect(wrapper.emitted('toggle')[1]).toEqual(['my-code'])
  })
})
