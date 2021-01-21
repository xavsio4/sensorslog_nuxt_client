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
          <b-card title="Latest Value" class="card-widget">
            <b-card-text
              ><h2>{{ latest.measure_value }} {{ latest.measure_unit }}</h2>
              <div class="latest_time">
                {{ latest.created_at | formatTimestampFr }}
              </div>
              <div>
                <b-badge>{{ latest.measure_type }}</b-badge>
                <b-badge variant="info">{{ latest.origin }}</b-badge>
              </div></b-card-text
            >
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card title="Your measures"
            ><measures-table></measures-table
          ></b-card>
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
  data() {
    return {
      latest: '',
      widget_ov_show: true,
    }
  },
  methods: {
    async getLatest() {
      await this.$axios.get('/v1/measure/latest').then((response) => {
        this.latest = response.data.data
      })
    },
  },
  mounted() {
    this.getLatest()
  },
}
</script>
<style>
.card {
  margin:4px;
}

.card-widget {
  max-width: 16rem;
}

.latest_time {
  margin: -14px 0 4px 0;
}
</style>
