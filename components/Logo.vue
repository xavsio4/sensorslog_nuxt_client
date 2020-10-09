<template>
  <object
    v-if="colormode === 'light'"
    class="logo"
    type="image/svg+xml"
    data="/images/sensorlog.svg"
  >
    Your browser does not support SVG
  </object>

  <object
    v-else="colormode === 'dark'"
    class="logo"
    type="image/svg+xml"
    data="/images/sensorslog-light_animated.svg"
  >
    Your browser does not support SVG
  </object>
</template>
<script>
export default {
  computed: {
    //integration of the color-mode module if it exists
    colormode() {
      if (this.$colorMode.preference) {
        if (
          this.$colorMode.preference === 'system' ||
          this.$colorMode.preference === 'dark'
        )
          return 'dark'
      }
      return 'light'
    },
  },
}
</script>

<style>
.logo {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
