<template>
<b-container>
    <h1>Account settings</h1>
    <p>hello {{ $auth.user.name }}</p>
    <em>Your email: {{ $auth.user.email }}</em>
    <em>Token {{$auth.strategy.token}}</em>
    <h2>Your api keys</h2>
    <b-button @click="genpat">Generate a key</b-button>
    {{apiKey}}
<p>The key used to access the service via your IOT device</p>
Here under is the endpoint ti use to post a measure. 
<code-display code="Https://api.sensorslog.com/v1/measure/create?measure_type=temperature&measure_value=23.23&measure_unit=C°&measure_origin=mkr1000&api_key=">
</code-display>

</b-container>
</template>
<script>
import CodeDisplay from "@/components/CodeDisplay";
export default {
    middleware:'auth',
    components : {
        CodeDisplay
    },
    data () {
        return {
            apiKey : ''
        };
    },
    methods:{
        genpat() {
            this.$axios.get('/auth/genpat')
            .then(response => {
                this.apiKey = response.data;
            })
            .catch(err => {
                console.log(err)
            })
        },
        readpat() {
            this.$axios.get('/auth/readpat')
            .then(response => {
                this.apiKey = response.data;
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    
}
</script>
<style>
</style>