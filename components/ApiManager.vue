<template>
  <div>
    <h4>Your api keys</h4>
    <b-button v-if="yourKey === ''" @click="genkey">Generate a key</b-button>
    <b-button v-if="yourKey != ''" @click="renewkey">Renew your key</b-button>
    <p v-if="yourKey != ''" class="text-danger">
      Doing so will render your previous key inoperative
    </p>
    <b-overlay :show="show">
      <code-display
        :code="lakey"
        caption="Your actual key to use to access the service via your IOT device"
      />

      <h4>Endpoint example</h4>
      <p>You must use the verb POST. The api key and the measure_value are required.</p>
      <code-display
        :code="
          'https://api.sensorslog.com/api/v1/measure/create?measure_type=Temp&measure_value=19' +
          '\n\n' +
          '&measure_unit=C°' +
          '&origin=mkr1000&key=' +
          yourKey
        "
        caption="Endpoint to post a measure from your iot device"
      >
      </code-display>
      <code-display caption="Try this curl command" :code="'curl -d '+ '&quot;' +'measure_type=Temp&measure_value=19&measure_unit=C°&origin=mkr1000&key='+ yourKey+ '&quot;'
      + ' -H '+ '&quot;' +'Content-Type: application/x-www-form-urlencoded' + '&quot;' 
      + ' -X POST https://api.sensorslog.com/api/v1/measure/create'"></code-display>
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
