/*
**  <b-card-widget :show="" title="" value="" subvalue=""></b-card-widget>
*/
<template>
  <b-overlay :show="show">
    <b-card title="Latest Value" class="card-widget">
      <b-card-text>
        <h2>{{ latest.measure_value }} {{ latest.measure_unit }}</h2>
        <div class="latest_time">
          {{ latest.created_at | formatTimestampFr }}
        </div>
        <div>
          <b-badge>{{ latest.measure_type }}</b-badge>
          <b-badge variant="info">{{ latest.origin }}</b-badge>
        </div>
      </b-card-text>
    </b-card>
  </b-overlay>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    subvalue: {
      type: String,
      default: '',
    },
    additional: {
        type:String,
        defaul:""
    }
  },
}
</script>
<style>
.card-widget {
  max-width: 16rem;
}
</style>
