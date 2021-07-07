<template>
<div>
    <b-container>
        <b-form-group>
    <b-form-file ref="file"
                 v-model="file"
                 accept="gpx"
                 :state="Boolean(file)"
                 placeholder="Choose a file..."
                 @input="Submit">
                 </b-form-file>
    <b-progress v-show="uploadPercentage > 0 && uploadPercentage !== 100"
                striped
                animated
                :max="100"
                class="mt-3"
                :value="uploadPercentage"></b-progress>
  </b-form-group>
    </b-container>
</div>

</template>
<script>
export default {
    data () {
        return {
file:'',
uploadPercentage: 0
        }
    },
    methods:{
        Submit(event)
        {
           // event.preventDefault()
           let formData = new FormData
           formData.append('file',this.file)
            this.$axios
            .post('http://localhost/microlumen2/public/v1/gps/filein',formData,{'content-type': 'multipart/form-data'})
            .then((response) => {
                console.log(response)
            })
        }
    }
}
</script>