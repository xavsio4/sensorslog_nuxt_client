<template>
  <div class="mx-auto p-1 w-50 mt-5 mb-5">
    <b-overlay :show="show">
      <div class="p-3">
        <h2>Login</h2>
        <b-form
          @submit.prevent="submit"
          action="#"
          method="POST"
          ref="loginform"
        >
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="email"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              aria-label="Email address"
              name="email"
              type="email"
              v-model="form.email"
              placeholder="Email address"
              required
            />
          </b-form-group>
          <b-form-group id="password" label="Password" label-for="Password">
            <b-form-input
              aria-label="Password"
              name="password"
              v-model="form.password"
              type="password"
              placeholder="Password"
              required
            />
          </b-form-group>

          <div>
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
              <a href="#"> Forgot your password? </a>
            </div>
            <div class="mb-2 mt-3">
              <nuxt-link to="/register">
                Don't have an account yet ?
              </nuxt-link>
            </div>
          </div>

          <div class="mt-3">
            <b-button type="submit"> Sign in </b-button>
            <div class="text-danger">
              {{ errors }}
            </div>
          </div>
        </b-form>
      </div>
    </b-overlay>
  </div>
</template>


<script>
import Logo from '~/components/Logo'

export default {
  layout: 'auth',
  auth: 'guest',
  components: {
    Logo,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember_me: false,
      },
      errors: '',
      show: false,
    }
  },

  methods: {
    async submit() {
      this.errors = {}
      this.show = true
      try {
        await this.$auth
          .loginWith('local', {
            data: {
              email: this.form.email,
              password: this.form.password,
              remember_me: this.form.remember_me,
            },
          })
          .then((res) => {
            console.log('Auth Success')
            console.log(this.$auth.token)
            console.log(this.$auth.loggedIn)
          })
          .catch((error) => {
            this.show = false
            console.log(error)
            /*  this.$notify({
            title: 'Important message',
            text: err
            }) */
            this.errors = 'Wrong login password'
          })
      } catch (e) {
        this.errors = 'Wrong login password'
      }
    },
  },
}
</script>
