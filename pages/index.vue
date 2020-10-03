<template>
<div>
     <hero></hero>
    <features></features>
    <hr class="my-4">
     <section class="mb-5">
       <a name="faq"></a>
       <b-row>
         <b-col>
           <b-container>
           <faq></faq>
           </b-container>
         </b-col>
         <b-col class="bg-circuit">
           <b-container class="p-5">
             <h1 class="page-header-title">FAQ</h1>
           </b-container>
         </b-col>
       </b-row>
     </section>
     <hr class="my-4">
  <section><cta></cta></section>   


     </div>
</template>

<script>
import Hero from '~/components/Hero'
import Faq from '~/components/FaqPlain'
import Features from '~/components/Features'
import Cta from '~/components/Cta'
export default {
  components: {
    Hero,Faq,Features,Cta
  }

}
</script>

<style>

</style>
