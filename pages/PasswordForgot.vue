<template>
<div class="mx-auto p-1 w-50 mt-5 mb-5">
    <b-overlay :show="show">
      <div class="p-3">
        <h2>I forgot my password</h2>
        <b-form
          @submit.prevent="submit"
          action="#"
          method="POST"
          ref="forgotform"
        >
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="email"
            description="You'll get an email with instructions...check your spam in case of"
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
          

          <div class="mt-3">
            <b-button type="submit"> Send </b-button>
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
export default {
  layout: 'auth',
  auth: 'guest',
  components: {
  },
  data() {
    return {
      form: {
        email: '',
      },
      errors: '',
      show: false,
    }
  },

  methods: {
        async submit(evt) {
      if (this.password_validation) {
        // evt.preventDefault()
        this.show = true
        try {
          await this.$axios.$post('auth/passwordforgot', this.form)
          //.catch(e=>{console.log(e)})

          await this.$auth.loginWith('local', {
            data: {
              email: this.form.email,
              password: this.form.password,
            },
          })
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