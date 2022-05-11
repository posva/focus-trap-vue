<template>
  <div>
    <h1 tabindex="0">focus-trap demo</h1>

    <p>
      <span style="font-size: 2em; vertical-align: middle">☜</span>
      <a
        href="https://github.com/posva/focus-trap-vue"
        style="vertical-align: middle"
        >Return to the repository</a
      >
    </p>

    <p>
      In the demos below, you'll be able to tell that a focus trap is active
      because it will turn pink. You should also be able to tell because it will
      trap your focus!
    </p>

    <p>
      When a trap is active, you can deactivate it by pushing its deactivate
      button or, if the demo allows, hitting
      <kbd>Escape</kbd>.
    </p>

    <section id="basic">
      <h2>default behavior</h2>
      <p>
        <button id="activate-default" @click="demos.basic.isActive = true">
          activate trap
        </button>
      </p>

      <focus-trap v-model:active="demos.basic.isActive">
        <div
          class="trap"
          :class="demos.basic.isActive && 'is-active'"
          tabindex="-1"
        >
          <p>
            Here is a focus trap
            <a href="#">with</a>
            <a href="#">some</a>
            <a href="#">focusable</a> parts.
          </p>
          <p>
            <button
              id="deactivate-default"
              @click="demos.basic.isActive = false"
            >
              deactivate trap
            </button>
          </p>
        </div>
      </focus-trap>
    </section>

    <section id="vif">
      <h2>With v-if (ie: transitioning component)</h2>
      <p>
        <button id="activate-default" @click="demos.vif.isActive = true">
          activate trap
        </button>
      </p>
      <focus-trap v-model:active="demos.vif.isActive">
        <transition name="fade" appear>
          <div
            class="trap"
            v-if="demos.vif.isActive"
            :class="demos.vif.isActive && 'is-active'"
            tabindex="-1"
            ref="vifContainer"
          >
            <p>
              Here is a focus trap
              <a href="#">with</a>
              <a href="#">some</a>
              <a href="#">focusable</a> parts.
            </p>
            <p>
              <button
                id="deactivate-default"
                @click="demos.vif.isActive = false"
              >
                deactivate trap
              </button>
            </p>
          </div>
        </transition>
      </focus-trap>
    </section>

    <section id="iene">
      <h2 id="iene-heading">initial element, no escape</h2>
      <p>
        When this focus trap activates, focus jumps to a specific, manually
        specified element.
      </p>
      <p>
        Also, in this demo the
        <kbd>Escape</kbd> key does not deactivate the focus trap. You must click
        the button.
      </p>
      <p>
        <button @click="demos.iene.isActive = true">activate trap</button>
      </p>

      <focus-trap
        v-model:active="demos.iene.isActive"
        :initial-focus="demos.iene.initialFocus"
        :escape-deactivates="false"
      >
        <div class="trap" :class="demos.iene.isActive && 'is-active'">
          <p>
            Here is a focus trap
            <a href="#">with</a>
            <a href="#">some</a>
            <a href="#">focusable</a> parts.
          </p>
          <p>
            <label class="inline-label">
              Initially focused input
              <input ref="ieneInput" />
            </label>
          </p>
          <p>
            <button @click="demos.iene.isActive = false">
              deactivate trap
            </button>
          </p>
        </div>
      </focus-trap>
    </section>
    <section id="ocd">
      <h2 id="ocd-heading">Click outside deactivates</h2>
      <p>
        When this focus trap activates, focus jumps to a specific, manually
        specified element.
      </p>
      <p>
        Also, in this demo the
        <kbd>Escape</kbd> key does not deactivate the focus trap. You must click
        the button.
      </p>
      <p>
        <button @click="demos.ocd.isActive = true">activate trap</button>
      </p>

      <focus-trap
        v-model:active="demos.ocd.isActive"
        :click-outside-deactivates="true"
      >
        <div class="trap" :class="demos.ocd.isActive && 'is-active'">
          <p>
            Here is a focus trap
            <a href="#">with</a>
            <a href="#">some</a>
            <a href="#">focusable</a> parts.
          </p>
          <p>
            <label class="inline-label">
              Initially focused input
              <input ref="ieneInput" />
            </label>
          </p>
          <p>
            <button @click="demos.ocd.isActive = false">deactivate trap</button>
          </p>
        </div>
      </focus-trap>
    </section>

    <section id="aoc">
      <h2 id="aoc-heading">allow outside click</h2>
      <p>
        A callback function can be used to determine whether or not you should
        be allowed to click outside of the focus trap when it's deactivated.
      </p>
      <p>
        <label>
          <input type="checkbox" v-model="demos.aoc.clickOutsideEnabled" />
          Enable outside clicking
        </label>
      </p>
      <p>
        <button @click="demos.aoc.isActive = true">activate trap</button>
      </p>

      <focus-trap
        v-model:active="demos.aoc.isActive"
        :allow-outside-click="demos.aoc.allowOutsideClick"
      >
        <div class="trap" :class="demos.aoc.isActive && 'is-active'">
          <p>
            Here is a focus trap <a href="#">with</a> <a href="#">some</a>
            <a href="#">focusable</a> parts.
          </p>
          <p>
            <label class="inline-label">
              Some input
              <input ref="ocdInput" />
            </label>
          </p>
          <p>
            <button @click="demos.aoc.isActive = false">deactivate trap</button>
          </p>
        </div>
      </focus-trap>
      <p>
        <button id="aoc-outside-button" @click="handleClickFromAOC">
          Try clicking me after activating the focus trap!
        </button>
      </p>
    </section>

    <section id="methods">
      <h2 id="methods-heading">exposed methods</h2>
      <p>
        Uses the methods exposed by the component (via $refs attachment) to
        activate and deactivate the focus trap
      </p>
      <p>
        <button @click="() => $refs.methodsFocusTrap.activate()">
          activate trap
        </button>
      </p>

      <focus-trap
        ref="methodsFocusTrap"
        v-model:active="demos.methods.isActive"
      >
        <div class="trap" :class="demos.methods.isActive && 'is-active'">
          <p>
            Here is a focus trap
            <a href="#">with</a>
            <a href="#">some</a>
            <a href="#">focusable</a> parts.
          </p>
          <p>
            <label class="inline-label">
              Some input
              <input ref="ieneInput" />
            </label>
          </p>
          <p>
            <button @click="() => $refs.methodsFocusTrap.deactivate()">
              deactivate trap via method call
            </button>
          </p>
        </div>
      </focus-trap>
    </section>

    <section id="vue-components">
      <h2>Wrapping Vue Components</h2>

      <p>
        <button @click="demos.comp.isActive = true">activate trap</button>
      </p>

      <focus-trap v-model:active="demos.comp.isActive">
        <SampleComponent
          class="trap"
          :class="demos.comp.isActive && 'is-active'"
          tabindex="-1"
        >
          <p>
            <button @click="demos.comp.isActive = false">
              deactivate trap
            </button>
          </p>
        </SampleComponent>
      </focus-trap>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { FocusTrap } from '../src'
import SampleComponent from './components/SampleComponent.vue'

const ieneInput = ref<HTMLInputElement>()

const demos = reactive({
  basic: {
    isActive: false,
  },
  vif: {
    isActive: false,
  },
  iene: {
    initialFocus: () => ieneInput.value,
    isActive: false,
  },
  ocd: {
    isActive: false,
  },
  aoc: {
    isActive: false,
    clickOutsideEnabled: false,
    allowOutsideClick: () => demos.aoc.clickOutsideEnabled,
  },
  methods: {
    isActive: false,
  },
  comp: {
    isActive: false,
  },
})

function handleClickFromAOC() {
  if (demos.aoc.isActive) {
    alert('Successfully clicked outside of FocusTrap')
  } else {
    alert(
      'Active the FocusTrap first to see that you can allow clicks to escape conditionally'
    )
  }
}
</script>

<style>
body {
  color: #333;
  font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  max-width: 600px;
  margin: 0 auto 200px;
  padding: 10px;
}

*:focus {
  outline: 5px solid lightblue;
}

.trap {
  border: 1px solid #ccc;
  padding: 1em 2em;
}

.trap.is-active {
  background: #fee9ff;
}

.inline-label {
  margin-right: 0.5em;
}

#demo-four,
#initial-nine {
  outline: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}

code,
kbd {
  background: #eee;
  font-size: 90%;
  padding: 0 2px;
}
</style>
