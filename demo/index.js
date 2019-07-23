var vm = new Vue({
  el: "#app",

  data: {
    demos: {
      basic: {
        isActive: false
      }
    }
  },

  components: { FocusTrap: FocusTrapVue.FocusTrap }
})
