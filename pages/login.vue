<template>
    <b-card class="mx-auto p-1 w-25 mt-5 mb-5" >
        <b-overlay>
       <div class="">
           <h2>Login</h2>
        <b-form @submit.prevent="submit"  action="#" method="POST" ref="loginform">
       
             <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="email"
        description="We'll never share your email with anyone else."
      >
                <b-form-input aria-label="Email address" name="email" type="email" v-model="form.email"  placeholder="Email address" required/>
                <div v-if="errors.email" class="text-red-400 text-xs mb-4 mt-2">{{ errors.email[0] }}</div>
            </b-form-group>
            <b-form-group
        id="password"
        label="Password"
        label-for="Password"
      >
                <b-form-input aria-label="Password" name="password"  v-model="form.password" type="password"  placeholder="Password" required/>
                <div v-if="errors.password" class="text-red-400 text-xs mb-4 mt-2">{{ errors.password[0] }}</div>
            </b-form-group>

        <div >

            <b-form-checkbox
      id="remember_me"
      v-model="form.remember_me"
      name="remember_me"
      value="accepted"
      unchecked-value="not_accepted"
    >
      Remember me
    </b-form-checkbox>

            <div class="mb-2 mt-3">
            <a href="#">
                Forgot your password?
            </a>
            </div>
            <div class="mb-2 mt-3">
            <nuxt-link to="/register">
                Don't have an account yet ?
            </nuxt-link>
            </div>
        </div>

        <div class="mt-3">
            <b-button type="submit" >
            Sign in
            </b-button>
            <span>{{errors}}</span>
        </div>
        </b-form>
    </div>
    </b-overlay>
    </b-card>
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
                    email: '',
                    password: ''
                },
                errors: ''
            }
        },

        methods: {
       submit () {
                this.errors = {};
                
        return this.$auth.loginWith('local',  { 
            data : {
                    //grant_type: 'password',
                    //scope: '*',
                    // client_id: process.env.APP_CLIENT_ID,
                    // client_secret: process.env.APP_CLIENT_SECRET,
                    email: this.form.email,
                    password: this.form.password
                }
            })
            .then((res) => {
          console.log('Auth Success')
          console.log(this.$auth.token)
          console.log(this.$auth.loggedIn)
        })
        .catch((err) => {
          console.log(err)
        /*  this.$notify({
            title: 'Important message',
            text: err
            }) */
            this.errors = err

        })
            
            //console.log('reer'+response.data);
           /* if (response.data.access_token)
                this.$router.push({
                path: '/dashboard',
            });
          }
          catch (err) {
              console.log(err)
          }*/
       
        }
        },
    mounted() {
      // Before loading login page, obtain csrf cookie from the server.
  //    this.$axios.$get('/sanctum/csrf-cookie');
    }
    }
</script>
