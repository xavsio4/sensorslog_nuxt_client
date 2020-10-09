<template>
  <div>
    <top-nav></top-nav>
    <Nuxt />
    
   
    <footer-site></footer-site>
    <footer-bottom></footer-bottom>
   <!-- <CookieControl>
  <template v-slot:bar>
    <h3>Yummy cookies</h3>
    <p>Cookies are only used to support this website functionalities. They are not used to collect, share or 
      monetize your personal data. 
    </p>
  </template>
</CookieControl> -->
<back-to-top></back-to-top>
  </div>
</template>
<script>
import TopNav from '~/components/TopNav'
import FooterBottom from '~/components/FooterBottom'
import FooterSite from '~/components/FooterSite'
//import ColorModeIcon from '~/components/ColorModeIcon'
import BackToTop from '~/components/BackToTop'

export default {
  scrollToTop: true,
  components: {
    TopNav,
    FooterBottom,
    FooterSite,
    //ColorModeIcon,
    BackToTop,
  },
}
</script>
<style scoped>
.btn-to-top {
}
</style>
