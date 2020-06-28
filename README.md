# focus-trap-vue [![Build Status](https://badgen.net/circleci/github/posva/focus-trap-vue)](https://circleci.com/gh/posva/focus-trap-vue) [![npm package](https://badgen.net/npm/v/focus-trap-vue)](https://www.npmjs.com/package/focus-trap-vue) [![thanks](https://badgen.net/badge/thanks/♥/pink)](https://github.com/posva/thanks)

> Vue component to trap the focus within a DOM element

## Installation

```sh
npm install focus-trap focus-trap-vue
```

## Usage

This library exports one single named export `FocusTrap` and **requires
[`focus-trap`](https://github.com/davidtheclark/focus-trap) as a peer
dependency**. So you can locally import the component or declare it globally:

```js
import { FocusTrap } from 'focus-trap-vue';

Vue.component('FocusTrap', FocusTrap);
```

`FocusTrap` can be controlled in three different ways:

- by using the `active` _Boolean_ prop
- by using `v-model` (uses the `active` prop)
- by calling the `activate`/`deactivate` method on the component

The recommended approach is using `v-model` and it should contain **one single child**:

```html
<focus-trap v-model="isActive">
  <modal-dialog tabindex="-1">
    <p>
      Do you accept the cookies?
    </p>
    <button @click="acceptCookies">Yes</button>
    <button @click="isActive = false">No</button>
  </modal-dialog>
</focus-trap>
```

When `isActive` becomes `true`, it activates the focus trap. By default it sets
the focus to its child, so make sure the element is a focusable element. If it's
not you wil need to give it the `tabindex="-1"` attribute. You can also
customize the initial element focused. This element should be an element that
the user can interact with. For example, an input. It's a good practice to
always focus an interactable element instead of the modal container:

```html
<focus-trap v-model="isActive" :initial-focus="() => $refs.nameInput">
  <modal-dialog>
    <p>
      What name do you want to use?
    </p>
    <form @submit.prevent="setName">
      <label>
        New Name
        <input ref="nameInput" />
      </label>
      <button>Change name</button>
    </form>
  </modal-dialog>
</focus-trap>
```

### Props

`FocusTrap` also accepts other props:

- `escapeDeactivates`: `boolean`
- `returnFocusOnDeactivate`: `boolean`
- `allowOutsideClick`: `boolean`
- `initialFocus`: `string | (() => Element)` _Selector or function returning an Element_
- `fallbackFocus`: `string | (() => Element)` _Selector or function returning an
  Element_

Please, refer to
[focus-trap](https://github.com/davidtheclark/focus-trap#focustrap--createfocustrapelement-createoptions)
documentation to know what they do.

### Events

`FocusTrap` emits 2 events. They are in-sync with the prop `active`

- `activate`: Whenever the trap activates
- `deactive`: Whenever the trap deactivates (note it can also be deactivated by
  pressing <kbd>Esc</kbd> or clicking outside)

### Methods

`FocusTrap` can be used without `v-model`. In that case, you will use the
methods and _probably_ need to initialize the trap as _deactivated_, otherwise,
the focus will start as active:

```html
<button @click="() => $refs.focusTrap.activate()">Show the modal</button>

<focus-trap :active="false" ref="focusTrap">
  <modal-dialog>
    <p>Hello there!</p>
    <button @click="() => $refs.focusTrap.deactivate()">Okay...</button>
  </modal-dialog>
</focus-trap>
```

Note the use of arrow functions, this is necessary because we are accessing
`$refs` which are unset on first render.

## Related

- Focus Trap: https://github.com/davidtheclark/focus-trap

## License

[MIT](http://opensource.org/licenses/MIT)
