<template>
<section>
    <h4>How much is it ?</h4>
    It is free to use or download from Github. Feel free to buy me a Coffee or a Beer.
    <hr class="my-4">
    <h4>Can I be forgotten from sensorslog service when I feel to ?</h4>
    Of course, a bit of privacy by design does not hurt. You can physically destroy your account and all linked measures taken. 
    And beforehand, you can download your measures (CSV format). This projects exists to help get a free iot backend quickly. There is no commercial use.
    <hr class="my-4">
    <h4>What data can I log ?</h4>
    3 values are necessary to log your IOT's data : the name of the data, the measure and the unit.
    And that's it. Nothing else except your api key.
    <hr class="my-4">
    <h4>What are the technologies used for this backend and frontend ?</h4>
    For the frontend I use <a href="" target="_blank">NuxtJs</a> (based on <a href="" target="_blank">Vuejs</a>) and for the backend I use <a href="" target="_blank">Laravel</a>. My First IOT project uses an
    Arduino MKR1000 and a temperature sensor. The presentation framework is Bootstrap 4 and it is integrated through <a href="https://bootstrap-vue.org/" target="_blank">BoostrapVue</a>.
    <hr class="my-4">
    <h4>Why this project ?</h4> 
    It is just a proof of concept and it exists mostly for learning purposes. I learned from it and the dev community, so I give it back to the dev community. That is also an easy and free tool for makers to test or go further on with their project.
    <hr class="my-4">
    <h4>Can I use a mobile app to access my data ?</h4>
    Since sensorslog exposes a simple REST API, you can use whatever technology you want to consume your data.
    <hr class="my-4">
    <h4>Can I hire you for one of my projects ?</h4>
    Yes you can, I'm a freelance with my own, unicelular, company, so feel free to contact me.
</section>
</template>
<script>
export default {
    data() {
      return {
        text: '',
      }
    }, //data
}
</script>