<template>
<div>
	<top-nav></top-nav>
	<nuxt/>
	<footer-bottom></footer-bottom>
</div>
</template>
<script>
import TopNav from '~/components/TopNav'
import FooterBottom from '~/components/FooterBottom'
export default {
	 scrollToTop: true,
  components: {
    TopNav,
    FooterBottom
  }
}
</script>