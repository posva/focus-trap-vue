import Vue from "vue"
import { FocusTrap } from "../src"

Vue.config.devtools = true

window.vm = new Vue({
  el: "#app",

  data: function() {
    return {
      demos: {
        basic: {
          isActive: false
        },
        iene: {
          initialFocus: function() {
            return this.$refs.ieneInput
          }.bind(this),
          isActive: false
        },
        ocd: {
          isActive: false,
          clickOutsideDeactivates: true
        },
      }
    }
  },

  components: { FocusTrap: FocusTrap }
})
