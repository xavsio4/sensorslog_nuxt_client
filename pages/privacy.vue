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
    const page = await $content('privacy').fetch() //get from content.privacy.md

    return {
      page
    }
  }
}
</script>
