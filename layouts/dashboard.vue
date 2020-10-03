<template>
  <div>
    <top-nav></top-nav>
   
    <Nuxt />
    <footer-bottom></footer-bottom>
   
  </div>
  
</template>
<script>
import TopNav from '~/components/TopNav'
import FooterBottom from '~/components/FooterBottom'
import FooterSite from '~/components/FooterSite'

export default {
   scrollToTop: true,
  components: {
    TopNav,
    FooterBottom,
    FooterSite
  }
}
</script>
