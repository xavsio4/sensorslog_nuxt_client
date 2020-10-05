<template>
  <div>
    <figure>
      <div class="code-display">
        <code>{{ code }}</code>
        <b-button @click="clipboard(code)" small class="badge badge-light"
          >copy</b-button
        >
      </div>
      <figcaption>{{ caption }}</figcaption>
    </figure>
  </div>
</template>
<script>
export default {
  props: {
    code: '',
    caption: '',
  },
  methods: {
    clipboard(code) {
      navigator.clipboard.writeText(code)
    },
  },
}
</script>
<style scoped>
.code-display {
  background: #333;
  color: white;
  padding: 9px;
  word-wrap: break-word;
  border: 1px solid #bbb;
}
.badge {
  float: right;
  margin: 3px;
}

.badge:hover {
  background: #666;
  color: #bbb;
}

figcaption {
  font-weight: bold;
  font-size: 10px;
}
</style>