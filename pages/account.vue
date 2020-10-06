<template>
  <b-container fluid>
    <h1>Account settings</h1>
    <h4>hello {{ $auth.user.name }}</h4>
    <p>({{ $auth.user.email }})</p>

    <b-tabs pills card vertical>
      <b-tab title="Api Key" active><api-manager></api-manager> </b-tab>
      <b-tab title="Destroy Account"><destroy-account></destroy-account></b-tab>
    </b-tabs>
  </b-container>
</template>
<script>
import ApiManager from '@/components/ApiManager'
import DestroyAccount from '@/components/user/DestroyAccount'
export default {
  middleware: 'auth',
  components: {
    ApiManager,
    DestroyAccount,
  },
  data() {
    return {}
  },
}
</script>
<style>
</style>
