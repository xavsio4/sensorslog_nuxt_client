<template>
<div class="code-display">
    <code>{{code}}</code>
    </div>    
</template>
<script>
export default {
  props: {
      code: ''
  }  
}
</script>
<style scoped>
.code-display
{
    background: #333;
    color:white;
    padding:8px;
    word-wrap: break-word;
    border:1px solid #BBB;
}
</style>