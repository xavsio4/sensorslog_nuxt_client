<template>
  <b-container>
    <h1>Account settings</h1>
    <h4>hello {{ $auth.user.name }}</h4>
    <p>({{ $auth.user.email }})</p>

    <h2>Your api keys</h2>
    <b-button v-if="apiKey.length === 0" @click="genkey"
      >Generate a key</b-button
    >
    <b-button v-if="apiKey.length > 0" @click="renewkey"
      >Renew your key</b-button
    >
    <p class="text-danger">Doing so will render your old key unoperational</p>

    <div>
      <ul class="list-unstyled">
        <li v-for="item in apiKey">
          <code-display
            :code="item.key"
            caption="Your actual key to use to access the service via your IOT device"
          />
        </li>
      </ul>
    </div>
    <b-overlay :show="show">
      <h4>Endpoint example</h4>
      <code-display
        :code="
          'Https://api.sensorslog.com/v1/measure/create?measure_type=temperature&measure_value=23.23&measure_unit=C°&measure_origin=mkr1000&api_key=' +
          yourKey
        "
        caption="Endpoint to post a measure from your iot device"
      >
      </code-display>
      <nuxt-link to="/doc">Learn more on how it works</nuxt-link>
    </b-overlay>
  </b-container>
</template>
<script>
import CodeDisplay from '@/components/CodeDisplay'
export default {
  middleware: 'auth',
  components: {
    CodeDisplay,
  },
  data() {
    return {
      apiKey: [],
      show: false,
      yourKey: '',
    }
  },
  methods: {
    genkey() {
      this.$axios
        .get('/auth/createapikey')
        .then((response) => {
          this.apiKey = response.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    renewkey() {
      this.$axios
        .get('/auth/renewkey')
        .then((response) => {
          this.apiKey = response.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async readkey() {
      this.show = true
      await this.$axios
        .get('/auth/listkey')
        .then((response) => {
          this.apiKey = response.data.data
          this.show = false
          this.yourKey = this.apiKey[0].key
        })
        .catch((err) => {
          this.show = false
          console.log(err)
        })
    },
  },
  mounted() {
    this.readkey()
  },
}
</script>
<style>
</style>
