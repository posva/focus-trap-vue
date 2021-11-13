<template>
  <article>
    Here's a part from an imported Vue component.

    Here's yet more focusables.
    <input type="text" /><br />

    <a href="#">Link A</a><br />
    <a href="#">Link B</a><br />
    <a href="#">Link C</a>

    <slot></slot>
  </article>
</template>

<script>
export default {
  name: 'MyComponent',
}
</script>
