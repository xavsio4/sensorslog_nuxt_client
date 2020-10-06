<template>
  <b-navbar toggleable="lg" type="light" variant="faded">
    <b-navbar-brand href="#">
      <nuxt-link to="/"><logo class="w-75"></logo></nuxt-link>
    </b-navbar-brand>

    <b-navbar-nav>
      <b-nav-item href="/" left>Home</b-nav-item>
      <b-nav-item v-if="!authenticated" href="#faq" left>Faq</b-nav-item>
      <b-nav-item href="/register" v-if="!authenticated" left
        >Register</b-nav-item
      >
    </b-navbar-nav>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <!-- Navbar dropdowns -->

        <b-nav-item
          class="btn btn-primary"
          href="/login"
          v-if="!authenticated"
          left
          >Login</b-nav-item
        >
        <b-nav-item-dropdown v-if="authenticated" text="User" left>
          <b-dropdown-item href="/dashboard">Dashboard</b-dropdown-item>
          <b-dropdown-item href="/account">Account</b-dropdown-item>
          <b-dropdown-item v-on:click.native="logout()">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>

    <b-navbar-toggle target="navbar-toggle-collapse"> </b-navbar-toggle>
  </b-navbar>
</template>
<script>
import Logo from './Logo'
export default {
  components: {
    Logo,
  },
  data() {
    return {
      authenticated: this.$auth.$state.loggedIn,
    }
  }, //data
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  }, // /computed
  methods: {
    logout() {
      this.authenticated = false
      this.$auth.logout()
    },
  }, // /methods
}
</script>
<style>
</style>