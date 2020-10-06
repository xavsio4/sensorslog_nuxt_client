<template>
  <b-container fluid>
    <h2>Destroy my account</h2>
    <b-alert variant="danger" show>
      This is the place where you destroy your account and all associated data.
      It is like you've never existed here. So you get forgotten. It is not
      magical. It is like it should be for any webapp.
    </b-alert>
    <b-alert variant="danger" show>
      Easy to do. Just write your user name in the input field and click on the
      "destroy my account" button ...and you're gone.
      <b
        >If you've recorded some values and would like to retrieve them, please,
        do so in your <nuxt-link to="/dashboard">dashboard</nuxt-link> before
        destroying your account.</b
      >
    </b-alert>
    <b-overlay :show="show">
      <b-card>
        <b-form @submit.prevent="submit" action="#" method="POST">
          <b-form-group
            id="input-group-1"
            label="User name"
            label-for="input-1"
            description="Type your username up here. It is displayed somewhere up this screen :-)"
          >
            <b-form-input
              id="input-1"
              v-model="form.username"
              type="text"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="valid_uname">
              put your user name here..check on screen up left !
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="valid_uname">
              Ok, Goodbye and Godspeed
            </b-form-valid-feedback>
          </b-form-group>
          <b-form-group>
            <b-alert variant="warning" :show="baduname">{{ errors }}</b-alert>
            <b-button :disabled="!valid_uname" type="submit"
              >Adios and forget I was ever here !</b-button
            >
          </b-form-group>
        </b-form>
      </b-card>
    </b-overlay>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      baduname: false,
      errors: '',
      form: {
        username: '',
      },
    }
  },
  computed: {
    valid_uname() {
      return this.form.username === this.$auth.user.name
    },
  },
  methods: {
    async submit() {
      if (this.form.username == this.$auth.user.name) {
        this.baduname = false
        await this.$axios
          .$post('auth/destroy', this.form)
          .then((response) => {
            this.$auth.logout()
          })
          .catch((errors) => {
            console.log(errors)
            if (errors.status === 400) {
              this.errors = 'Oooops, something went wrong !'
            }
          })
      } else {
        this.baduname = true
        this.errors = 'It looks like your username is not well typed.'
      }
    },
  },
}
</script>