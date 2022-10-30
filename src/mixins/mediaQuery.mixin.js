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
      return this.window.width <= 700
    },
    mediumScreenAndUp() {
      return this.window.width >= 701
    },
    largeScreenAndUp() {
      return this.window.width >= 960
    },
    extraLargeScreenAndUp() {
      return this.window.width >= 1200
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
