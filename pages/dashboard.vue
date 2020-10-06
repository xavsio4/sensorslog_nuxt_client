<template>
  <b-container>
    <h1>Dashboard</h1>
    <div>
      <p>Hello {{ $auth.user.name }}</p>
      <p>
        On your dashboard goes what you've recorded so far. By the way, you can
        get your api key in the
        <nuxt-link to="/account">account</nuxt-link> page.
      </p>
      <b-row>
        <b-col>
          <measures-table></measures-table>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>
<script>
import MeasuresTable from '@/components/measures/MeasuresTable'
export default {
  middleware: 'auth',
  layout: 'dashboard',
  components: {
    MeasuresTable,
  },
}
</script>