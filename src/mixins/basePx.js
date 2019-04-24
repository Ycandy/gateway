export default {
  data () {
    return {
      basePx: 0
    }
  },
  beforeMount () {
    this.getBasePx()
    window.onresize = () => {
      this.getBasePx()
    }
  },
  methods: {
    getBasePx () {
      let base = Math.min(document.body.clientWidth * 0.75, document.body.clientHeight)
      this.basePx = Math.round(base / 867 * 100) / 100
    }
  }
}
