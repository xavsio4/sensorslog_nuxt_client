<template>
  <div>
    <h4>Your api keys</h4>
    <b-button v-if="yourKey === ''" @click="genkey">Generate a key</b-button>
    <b-button v-if="yourKey != ''" @click="renewkey">Renew your key</b-button>
    <p class="text-danger">Doing so will render your old key unoperational</p>
    <b-overlay :show="show">
      <code-display
        :code="lakey"
        caption="Your actual key to use to access the service via your IOT device"
      />

      <h4>Endpoint example</h4>
      <code-display
        :code="
          'Https://api.sensorslog.com/v1/measure/create?measure_type=temperature&measure_value=23.23' +
          '\n\n' +
          '&measure_unit=C°' +
          '&measure_origin=mkr1000&api_key=' +
          yourKey
        "
        caption="Endpoint to post a measure from your iot device"
      >
      </code-display>
      <nuxt-link to="/doc">Learn more on how it works</nuxt-link>
    </b-overlay>
  </div>
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
  computed: {
    lakey() {
      return this.yourKey
    },
  },
  methods: {
    async genkey() {
      this.show = true
      await this.$axios
        .get('/auth/createapikey')
        .then((response) => {
          this.apiKey = response.data.data
          this.yourKey = response.data.data
          this.show = false
        })
        .catch((err) => {
          this.show = false
          console.log(err)
        })
    },
    async renewkey() {
      this.show = true
      await this.$axios
        .get('/auth/renewapikey')
        .then((response) => {
          this.apiKey = response.data.data
          this.yourKey = response.data.data
          this.show = false
        })
        .catch((err) => {
          this.show = false
          console.log(err)
        })
    },
    async readkey() {
      this.show = true
      await this.$axios
        .get('/auth/listkey')
        .then((response) => {
          this.apiKey = response.data.data.key
          this.yourKey = response.data.data.key
          this.show = false
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
