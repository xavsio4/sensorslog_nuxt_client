<template>
  <div>
    <top-nav></top-nav>

    <Nuxt />
    <color-mode></color-mode>
    <color-mode-icon></color-mode-icon>
    <footer-site></footer-site>
    <footer-bottom></footer-bottom>
  </div>
</template>
<script>
import TopNav from '~/components/TopNav'
import FooterBottom from '~/components/FooterBottom'
import FooterSite from '~/components/FooterSite'
import ColorMode from '~/components/ColorMode'
import ColorModeIcon from '~/components/ColorModeIcon'

export default {
  scrollToTop: true,
  components: {
    TopNav,
    FooterBottom,
    FooterSite,
    ColorMode,
    ColorModeIcon,
  },
}
</script>
