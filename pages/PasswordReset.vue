<template>
  <section class="pt-5">
    <b-row>
      <b-col class="pl-5 pr-5 pt-1 mb-5 mt-5">
        <h4>Password Reset</h4>
        <b-overlay :show="show">
          <b-form @submit.prevent="submit" action="#" method="POST">
              <input type="hidden" name="token" />
            <b-form-group
              id="name_label"
              label="your email"
              label-for="email"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                type="email"
                aria-label="Email address"
                name="email"
                v-model="form.email"
                required
              />
            </b-form-group>
            <b-form-group
              id="password_label"
              label="Password"
              label-for="password"
              description="Put something hard. Min. 7 caracters"
            >
              <b-form-input
                type="password"
                aria-label="Password"
                name="password"
                v-model="form.password"
                required
              />
              <password
                v-model="form.password"
                :strength-meter-only="true"
                :badge="true"
                :toggle="true"
              />
            </b-form-group>

            <b-form-group
              id="password_label"
              label="Password confirmation"
              label-for="password_confirmation"
            >
              <b-form-input
                type="password"
                aria-label="Password"
                name="password_confirmation"
                v-model="form.password_confirmation"
                required
              />
              <b-form-invalid-feedback :state="password_validation">
                It's got to be the same as above
              </b-form-invalid-feedback>
              <b-form-valid-feedback :state="password_validation">
                Yep...it looks like the one above.
              </b-form-valid-feedback>
            </b-form-group>
            <b-button :disabled="!password_validation" type="submit"
              >Register</b-button
            >
            <div class="text-danger">
              <ul class="mt-3">
                <li v-for="item in errors">{{ item[0] }}</li>
              </ul>
            </div>
          </b-form>
        </b-overlay>
      </b-col>
    </b-row>
  </section>
</template>
<script>
import Logo from '~/components/Logo'
import Password from 'vue-password-strength-meter'

export default {
  layout: 'auth',
  auth: 'guest',
  components: {
    Logo,
    Password,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
        password_confirmation: '',
      },
      errors: '',
      show: false,
      mustVerifyEmail: false,
    }
  }, //data
  computed: {
    password_validation() {
      return this.form.password === this.form.password_confirmation
    },
  },
  methods: {
    async submit(evt) {
      if (this.password_validation) {
        // evt.preventDefault()
        this.show = true
        try {
          await this.$axios.$post('auth/passwordreset', this.form)
          //.catch(e=>{console.log(e)})

         /* await this.$auth.loginWith('local', {
            data: {
              email: this.form.email,
              password: this.form.password,
            },
          }) */
          this.$router.push('/')
        } catch (e) {
          this.show = false
          this.errors = e.response.data.errors
        }
      } //password validation condition
    },
  },
}
</script>
<style>
</style>