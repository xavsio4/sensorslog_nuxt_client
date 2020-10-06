# sensorslog nuxt client

This is a Nuxt project which layout is based on Bootstrap Vue. It is the actual client web app to sensorslog.eu backend (Laravel). 

Sensorslog is a free platform to log your iot's project data into a database via a Rest Api endpoint. 

The usage is quite easy. Register on the platform, generate your public key to access the service, begin posting data from your iot device through the posting endpoint.

You can destroy your account and all your data anytime (privacy by design). The platform is free to use. And if you don't want to use the online service, then make yours. 

To help with it, I've made the client source (nuxt), the backend source (Laravel) and an iot example (arduino mkr1000 C++) available through github so you can do whatever you want with it and build your own rest api platform.

Also, feel free to improve this service with pull requests/suggestions/...


## Build Setup

Download or for this repository

then

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


## Aknowledgments & credits

Built using NUXT and several official Nuxt's modules
https://nuxtjs.org/

Bootstrap Vue for the UI
https://bootstrap-vue.org/

Used on the registration screen for password strength
https://github.com/apertureless/vue-password-strength-meter


