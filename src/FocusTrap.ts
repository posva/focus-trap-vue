import Vue, { ComponentOptions } from 'vue'
// import Component from 'vue-class-component'
import createFocusTrap, { FocusTrap as FocusTrapI } from 'focus-trap'

interface FocusTrapComponentProps {
  active: boolean
  escapeDeactivates: boolean
  returnFocusOnDeactivate: boolean
  allowOutsideClick: boolean
  initialFocus: string | (() => any)
  fallbackFocus: string | (() => any)
}

interface FocusTrapComponentsMethods {}

interface FocusTrapComponent
  extends Vue,
    ComponentOptions<
      never,
      {},
      FocusTrapComponentsMethods,
      {},
      FocusTrapComponentProps
    > {
  trap: FocusTrapI
  active: FocusTrapComponentProps['active']
  escapeDeactivates: FocusTrapComponentProps['escapeDeactivates']
  returnFocusOnDeactivate: FocusTrapComponentProps['returnFocusOnDeactivate']
  allowOutsideClick: FocusTrapComponentProps['allowOutsideClick']
  initialFocus: FocusTrapComponentProps['initialFocus']
  fallbackFocus: FocusTrapComponentProps['fallbackFocus']
}

// @ts-ignore
const FocusTrap: FocusTrapComponent = {
  // @ts-ignore
  props: {
    active: {
      // TODO: could be options for activate
      type: Boolean,
      default: true,
    },
    escapeDeactivates: {
      type: Boolean,
      default: true,
    },
    returnFocusOnDeactivate: {
      type: Boolean,
      default: true,
    },
    allowOutsideClick: {
      type: Boolean,
      default: true,
    },
    initialFocus: [String, Function],
    fallbackFocus: [String, Function],
  },

  model: {
    event: 'update:active',
    prop: 'active',
  },

  mounted() {
    this.$watch(
      'active',
      (active: boolean) => {
        if (active) {
          // has no effect if already activated
          this.trap = createFocusTrap(
            // @ts-ignore
            this.$el,
            {
              escapeDeactivates: this.escapeDeactivates,
              allowOutsideClick: this.allowOutsideClick,
              returnFocusOnDeactivate: this.returnFocusOnDeactivate,
              onActivate: () => {
                this.$emit('update:active', true)
                this.$emit('activate')
              },
              onDeactivate: () => {
                this.$emit('update:active', false)
                this.$emit('deactivate')
              },
              initialFocus: this.initialFocus || (() => this.$el),
              fallbackFocus: this.fallbackFocus,
            }
          )
          this.trap.activate()
        } else {
          this.trap && this.trap.deactivate()
        }
      },
      { immediate: true }
    )
  },

  beforeDestroy() {
    this.trap && this.trap.deactivate()
    // @ts-ignore
    this.trap = null
  },

  methods: {
    activate() {
      // @ts-ignore
      this.trap.activate()
    },
    deactivate() {
      // @ts-ignore
      this.trap.deactivate()
    },
  },

  render() {
    const content = this.$slots.default
    if (!content || !content.length || content.length > 1)
      throw new Error('FocusTrap requires exactly one child')

    return content[0]
  },
}

export default FocusTrap
