export default {
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
    }
  },

  computed: {
    smallScreenAndDown() {
      return this.window.width <= 600
    },
    mediumScreenAndUp() {
      return this.window.width >= 601
    },
  },

  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },
  },
}
