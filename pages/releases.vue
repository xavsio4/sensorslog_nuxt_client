<template>
<b-container>
  <article>
    <h1>{{ page.title }}</h1>
    <nuxt-content :document="page" />
  </article>
  </b-container>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const page = await $content('releases').fetch() //get from conten.releases.md

    return {
      page
    }
  }
}
</script>