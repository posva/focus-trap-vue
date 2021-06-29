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
      type: [String, Function] as PropType<string | (() => HTMLElement)>,
    },
    fallbackFocus: {
      type: [String, Function] as PropType<string | (() => HTMLElement)>,
    },
  },

  emits: ['update:active', 'activate', 'deactivate'],

  setup(props, { slots, emit }) {
    let trap: FocusTrapI | null
    const el = ref<HTMLElement | null>(null)

    onMounted(() => {
      watch(
        () => props.active,
        active => {
          const { initialFocus } = props
          if (active && el.value) {
            // has no effect if already activated
            trap = createFocusTrap(el.value, {
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
                : el.value,
              fallbackFocus: props.fallbackFocus,
            })
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

    return () => {
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
    }
  },
})
