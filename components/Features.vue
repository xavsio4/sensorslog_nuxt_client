<template>
    <section class="mt-5 mb-5 pt-5 pb-5">
        <b-row>
            <b-col>
                <b-container>
                    <h3><FontAwesomeIcon :icon="fas.faRocket"/> Very Simple Concept</h3>
                    <p>Once you account is created, use the api key to log and retrieve your data.</p>
                    <p>Just four values: the measure, a label, the origin and the unit of the measure.</p>
                    <em><i>Example: 23.12,'External Temp.','Luxemburg','C°'</i></em> 
                </b-container>
            </b-col>
            <b-col>
                <b-container>
                    <h3><FontAwesomeIcon :icon="fas.faCoffee"/> Free Saas or Self Hosted</h3>
                    <p>You can download the backend source and this frontend source if you feel like hosting it yourself.
                    Or just use sensorslog.com service to test your IOT project.</p><p>Or use the whole project as a POC or a template for your next webapp</p>
                    
                </b-container>
            </b-col>
            <b-col>
                <b-container>
                    <h3><FontAwesomeIcon :icon="fab.faGithub"/> Open Source</h3>
                    <p>It is there for you to fork and refactor at will.</p>
                    <p>Feel free to submit pull requests or consider an alternative solution by using, for example, Firebase.</p>
                    
                </b-container>
            </b-col>
             
        </b-row>
    </section>
</template>
<script>
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

export default {
    computed: {
    fas () {
       return fas // NOT RECOMMENDED
    },
    fab () {
       return fab
    }
  },
}
</script>
<style scoped>

</style>