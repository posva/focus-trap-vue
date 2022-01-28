import {
  defineComponent,
  onMounted,
  watch,
  ref,
  cloneVNode,
  onUnmounted,
  PropType,
  Comment,
} from 'vue'
import {
  createFocusTrap,
  FocusTargetOrFalse,
  FocusTrap as FocusTrapI,
  MouseEventToBoolean,
} from 'focus-trap'

export const FocusTrap = defineComponent({
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
      type: [Boolean, Function] as PropType<boolean | MouseEventToBoolean>,
      default: true,
    },
    clickOutsideDeactivates: {
      type: Boolean,
      default: false,
    },
    initialFocus: {
      type: [String, Function, Boolean] as PropType<FocusTargetOrFalse>,
    },
    fallbackFocus: {
      type: [String, Function] as PropType<string | (() => HTMLElement)>,
    },
  },

  emits: ['update:active', 'activate', 'deactivate'],

  render() {
    return this.renderImpl()
  },

  setup(props, { slots, emit }) {
    let trap: FocusTrapI | null
    const el = ref<HTMLElement | null>(null)

    const ensureTrap = () => {
      if (trap) {
        return
      }

      const { initialFocus } = props
      trap = createFocusTrap(el.value as HTMLElement, {
        escapeDeactivates: props.escapeDeactivates,
        allowOutsideClick: event =>
          typeof props.allowOutsideClick === 'function'
            ? props.allowOutsideClick(event)
            : props.allowOutsideClick,
        returnFocusOnDeactivate: props.returnFocusOnDeactivate,
        clickOutsideDeactivates: props.clickOutsideDeactivates,
        onActivate: () => {
          emit('update:active', true)
          emit('activate')
        },
        onDeactivate: () => {
          emit('update:active', false)
          emit('deactivate')
        },
        initialFocus: initialFocus
          ? typeof initialFocus === 'function'
            ? initialFocus()
            : initialFocus
          : (el.value as HTMLElement),
        fallbackFocus: props.fallbackFocus,
      })
    }

    onMounted(() => {
      watch(
        () => props.active,
        active => {
          if (active && el.value) {
            // has no effect if already activated
            ensureTrap()

            // @ts-ignore
            trap.activate()
          } else if (trap) {
            trap.deactivate()
          }
        },
        { immediate: true, flush: 'post' }
      )
    })

    onUnmounted(() => {
      if (trap) trap.deactivate()
      trap = null
    })

    // Use object-return for setup so that we can expose the 'activate'
    // and 'deactivate' methods without making use of the 'expose({ ... })'
    // method as the ExposeProxy system is problematic for users migrating
    // from Vue2 -> Vue3 due to the ExposeProxy (correctly) preventing child
    // components from reading the internal state of their $parent. This is
    // problematic for migrating users because the the Vue2-based VueRouter
    // _requires_ that functionality as it does $parent._routerRoot to set
    // the $router and $route properties on components.
    return {
      activate() {
        ensureTrap()
        // @ts-ignore
        trap.activate()
      },
      deactivate() {
        trap && trap.deactivate()
      },
      renderImpl() {
        if (!slots.default) return null

        const vNodes = slots.default().filter(vnode => vnode.type !== Comment)
        if (!vNodes || !vNodes.length || vNodes.length > 1) {
          if (__DEV__) {
            console.error(
              '[focus-trap-vue]: FocusTrap requires exactly one child.'
            )
          }

          return vNodes
        }
        const vnode = cloneVNode(vNodes[0], { ref: el })
        return vnode
      },
    }
  },
})
