<template>
<b-container>
    <h1>Dashboard</h1>
    <div>
      <measures-table></measures-table>
    <!-- <p>Name: {{ $auth.user.name }}</p>
    <p>Name: {{ $auth.user.email }}</p> -->
  </div>
</b-container>
</template>
<script>
import MeasuresTable from '@/components/measures/MeasuresTable';
export default {
    middleware: 'auth',
     layout: 'dashboard',
     components: {
       MeasuresTable
     }
    
}
</script>