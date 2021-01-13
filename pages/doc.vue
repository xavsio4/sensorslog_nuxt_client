<template>
  <b-container fluid class="docSample">
    <h1>Documentation</h1>
    <p>
      Sensorlog.eu is a free service that can store the values sent through a
      Rest Api Endpoint. The first and most important endpoint is the one that
      inserts data.
    </p>
    <p>It needs several parameters:</p>

  </b-container>
</template>
<script>
import CodeDisplay from '@/components/CodeDisplay'
export default {
  auth: 'guest',
  components: {
    CodeDisplay,
  },
}
</script>
<style>
.docSample {
    padding: 15px;
    background-color: #e8f4ff;
    margin: 1em 0;
}</style>