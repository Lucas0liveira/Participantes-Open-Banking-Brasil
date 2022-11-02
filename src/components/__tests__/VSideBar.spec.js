import { mount } from '@vue/test-utils'
import VSideBar from '../VSideBar.vue'

test('it should render properly', async () => {
  const wrapper = mount(VSideBar)

  expect(wrapper.find('.v-sidebar').exists()).toBe(true)
})

test('it should have the selected background type', async () => {
  const wrapper = mount(VSideBar, {
    propsData: {
      background: 'secondary',
    },
  })

  expect(wrapper.findAll('.secondary').exists()).toBe(true)
})

test('it should open from the right', async () => {
  const wrapper = mount(VSideBar, {
    propsData: {
      from: 'right',
    },
  })

  expect(wrapper.findAll('.right').exists()).toBe(true)
})

test('it should open from the left', async () => {
  const wrapper = mount(VSideBar, {
    propsData: {
      from: 'left',
    },
  })

  expect(wrapper.findAll('.left').exists()).toBe(true)
})

test('it should render the content in the slots', async () => {
  const wrapper = mount(VSideBar, {
    slots: {
      header: '<div>slot-header</div>',
      body: '<div>slot-body</div>',
      actions: '<div>slot-actions</div>',
      footer: '<div>slot-footer</div>',
    },
  })

  expect(wrapper.text()).toContain('slot-header')
  expect(wrapper.text()).toContain('slot-body')
  expect(wrapper.text()).toContain('slot-actions')
  expect(wrapper.text()).toContain('slot-footer')
})
