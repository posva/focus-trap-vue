import {
  defineComponent,
  onMounted,
  watch,
  ref,
  cloneVNode,
  onUnmounted,
} from 'vue';
import createFocusTrap, { FocusTrap as FocusTrapI } from 'focus-trap';

const FocusTrap = defineComponent({
  props: {
    active: {
      // TODO: could be options for activate
      type: Boolean as () => boolean,
      default: true,
    },
    escapeDeactivates: {
      type: Boolean as () => boolean,
      default: true,
    },
    returnFocusOnDeactivate: {
      type: Boolean as () => boolean,
      default: true,
    },
    allowOutsideClick: {
      type: Boolean as () => boolean,
      default: true,
    },
    initialFocus: {
      type: [String as () => string, Function as () => () => HTMLElement],
      default: undefined,
    },
    fallbackFocus: {
      type: [String as () => string, Function as () => () => HTMLElement],
      default: undefined,
    },
  },
  setup(props, { slots, emit }) {
    let trap: FocusTrapI | null;
    const el = ref<HTMLElement | null>(null);
    onMounted(function () {
      watch(
        () => props.active,
        (active) => {
          if (active && el.value) {
            // has no effect if already activated
            trap = createFocusTrap(el.value, {
              escapeDeactivates: props.escapeDeactivates,
              allowOutsideClick: () => props.allowOutsideClick,
              returnFocusOnDeactivate: props.returnFocusOnDeactivate,
              onActivate: () => {
                emit('update:active', true);
                emit('activate');
              },
              onDeactivate: () => {
                emit('update:active', false);
                emit('deactivate');
              },
              initialFocus:
                typeof props.initialFocus === 'string'
                  ? props.initialFocus
                  : props.initialFocus?.() ?? el.value,
              fallbackFocus: props.fallbackFocus,
            });
            trap.activate();
          } else {
            trap?.deactivate();
          }
        },
        { immediate: true }
      );
    });
    onUnmounted(() => {
      trap?.deactivate();
      trap = null;
    });
    return () => {
      const content = slots.default?.();
      if (!content || !content.length || content.length > 1) {
        throw new Error('FocusTrap requires exactly one child');
      }
      const vnode = cloneVNode(content[0], { ref: el });
      return vnode;
    };
  },
});

export default FocusTrap;
