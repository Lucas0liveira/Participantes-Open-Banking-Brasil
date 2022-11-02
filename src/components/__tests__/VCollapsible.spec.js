import { mount } from '@vue/test-utils'
import VCollapsible from '../VCollapsible.vue'

test('it should render properly', async () => {
  const wrapper = mount(VCollapsible)

  expect(wrapper.find('.v-collapsible').exists()).toBe(true)
})

test('it should open when clicked', async () => {
  const wrapper = mount(VCollapsible, {
    propsData: {
      open: false,
    },
    slots: {
      content: '<div class="my-content"></div>',
    },
  })

  wrapper.vm.$nextTick(() => {
    wrapper.find('.v-collapsible__header').trigger('click')

    expect(wrapper.findAll('.my-content').isVisible()).toBe(true)
  })
})

test('it should close when clicked', async () => {
  const wrapper = mount(VCollapsible, {
    propsData: {
      open: true,
    },
    slots: {
      content: '<div class="my-content"></div>',
    },
  })
  wrapper.vm.$nextTick(() => {
    wrapper.find('.v-collapsible__header').trigger('click')

    expect(wrapper.findAll('.my-content').isVisible()).toBe(false)
  })
})

test('it should be opened', async () => {
  const wrapper = mount(VCollapsible, {
    propsData: {
      open: true,
    },
    slots: {
      content: '<div class="my-content"></div>',
    },
  })

  expect(wrapper.findAll('.my-content').isVisible()).toBe(true)
})

test('it should be closed', async () => {
  const wrapper = mount(VCollapsible, {
    propsData: {
      open: false,
    },
    slots: {
      content: '<div class="my-content"></div>',
    },
  })

  expect(wrapper.findAll('.my-content').isVisible()).toBe(false)
})
