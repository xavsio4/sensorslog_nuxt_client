<template>
    <section class="pt-5">
        
            
            <b-row>
                <b-col class="bg-circuit">
                    <b-container class="p-5">
                    <h2>Register</h2>
            <p>Fill this form and that's it.</p>
                    </b-container>
            </b-col>
                <b-col class="pl-5 pr-5 pt-1 mb-5 mt-5">
                    <h4>Create an account that you can destroy any time.</h4>
                    <b-form @submit.prevent="submit"  action="#" method="POST">
<b-form-group
        id="name_label"
        label="How do you want to be named:"
        label-for="name"
        description="it is nice to be named in your dashboard"
      >
                        <b-form-input aria-label="Name" type="text" name="name" v-model="form.name" required/>
                       
</b-form-group>
                        <b-form-group
        id="name_label"
        label="your email"
        label-for="email"
        description="We'll never share your email with anyone else."
      >
                        <b-form-input type="email"  aria-label="Email address" name="email" v-model="form.email" required/>
                        </b-form-group>
<b-form-group
        id="password_label"
        label="Password"
        label-for="password"
        description="Put something hard"
      >
                         <b-form-input type="password"  aria-label="Password" name="password" v-model="form.password" required/>
                         </b-form-group>

                         <b-form-group
        id="password_label"
        label="Password confirmation"
        label-for="password_confirmation"
        description="Put something hard"
      >
                         <b-form-input type="password"  aria-label="Password" name="password_confirmation" v-model="form.password_confirmation" required/>
                         </b-form-group>
<span>{{ errors }}</span>
                        <b-button type="submit" >Register</b-button>
                    </b-form>
                </b-col>
            </b-row>
    </section>
</template>
<script>
import Logo from '~/components/Logo'

    export default {
       layout: 'auth',
        auth: 'guest',
        components: {
            Logo
        },
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
                errors: {},
                mustVerifyEmail: false
            }
        },
        methods: {
     submit(evt) {
       // evt.preventDefault()
         this.$axios.$post('auth/register', this.form)
         .then(response => {console.log(response)})
          //.then(({token, expiresIn}) => {
           // this.$store.dispatch('setToken', {token, expiresIn});
           // this.$router.push({name: 'secret'});
          .catch(errors => {
              console.log(errors)
    if(errors.status === 400) {
     // redirect('/')
     this.errors = 'Email has already been taken';
    }
  }); 

       // alert(JSON.stringify(this.form))
      },
        },
    
}
</script>
<style>

</style>