import { mount } from '@vue/test-utils'
import VChart from '../VChart.vue'

test('it should render properly', async () => {
  const wrapper = mount(VChart)

  expect(wrapper.find('.chart').exists()).toBe(true)
})

test('it should have the selected title', async () => {
  const wrapper = mount(VChart, {
    propsData: {
      title: 'My Chart',
    },
  })

  expect(wrapper.text()).toContain('My Chart')
})
