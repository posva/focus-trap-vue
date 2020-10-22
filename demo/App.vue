<template>
  <div>
    <h1 tabindex="0">focus-trap demo</h1>

    <p>
      <span style="font-size: 2em; vertical-align: middle;">☜</span>
      <a
        href="https://github.com/posva/focus-trap-vue"
        style="vertical-align: middle;"
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
          id="default"
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
            >deactivate trap</button>
          </p>
        </div>
      </focus-trap>
    </section>

    <section id="vif">
      <h2>With v-if (ie: transitioning component)</h2>
      <p>
        <button
          id="activate-default"
          @click="demos.vif.isActive = true"
        >activate trap</button>
      </p>
        <focus-trap
          v-model:active="demos.vif.isActive"
        >
          <transition
            name="fade"
            appear
          >
            <div
              id="default"
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
                >deactivate trap</button>
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
            <button @click="demos.ocd.isActive = false">
              deactivate trap
            </button>
          </p>
        </div>
      </focus-trap>
    </section>
  </div>
</template>

<script>
import { FocusTrap } from '/@/'

export default {
  components: { FocusTrap },
  data() {
    return {
      demos: {
        basic: {
          isActive: false,
        },
        vif: {
          isActive: false,
        },
        iene: {
          initialFocus: () => this.$refs.ieneInput,
          isActive: false,
        },
        ocd: {
          isActive: false,
        },
      },
    }
  },
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
  transition: opacity .3s ease;
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
