<script type='text/ecmascript-6'>
import { mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters['userinfo']
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'SET_USETINFO'
    })
  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
</style>
