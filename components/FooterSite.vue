<template>
  <section id="footer" class="footer-dark pt-5 pb-3">
    <b-container>
      <div class="row">
        <div class="col-sm-12 col-lg-3">
          <!-- Begin footer block (text) -->
          <div class="footer-block">
            <h4 class="footer-block-heading">About</h4>
            <div class="footer-block-content">
              <div class="">
                Sensorslog is an "as is" project provided freely and from which
                you can vanish without a trace. There is no commercial usage of
                the data you log in. In case of, you can hire me to help you on
                your web project.
              </div>
            </div>
            <!-- /.footer-block-content -->
          </div>
          <!-- End footer block -->
        </div>
        <!-- /.col -->

        <div class="col-sm-4 col-lg-2">
          <ul><li><nuxt-link to="/releases">Release Notes</nuxt-link></li>
          <li><nuxt-link to="/doc">Documentation</nuxt-link></li>
          <li><nuxt-link to="/privacy">Privacy and Terms of use</nuxt-link></li></ul>
          
        </div>
        <!-- /.col -->

        <div class="col-sm-4 col-lg-2"></div>
        <!-- /.col -->

        <div class="col-sm-4 col-lg-2"></div>
        <!-- /.col -->

        <div class="col-sm-12 col-lg-3">
          <!-- Begin footer block (text) -->
          <div class="footer-block">
            <h4 class="footer-block-heading">Sources</h4>
            Get Sensorslog for yourself
            <div class="footer-block-content">
              <ul class="list-unstyled">
                <li>
                  <FontAwesomeIcon :icon="fab.faGithub" />
                  <a
                    target="_blank"
                    href="https://github.com/xavsio4/sensorslog_nuxt_client"
                    class=""
                    >Sensorslog Nuxt Frontend</a
                  >
                </li>
                <li>
                  <FontAwesomeIcon :icon="fab.faGithub" />
                  <a
                    target="_blank"
                    href="https://github.com/xavsio4/sensorslog_laravel_backend"
                    class=""
                    >Sensorslog Laravel Backend</a
                  >
                </li>
                <li>
                  <FontAwesomeIcon :icon="fab.faGithub" />
                  <a
                    target="_blank"
                    href="https://github.com/xavsio4/arduino_mkr1000_temp_log"
                    class=""
                    >Arduino's MKR1000 iot project</a
                  >
                </li>
              </ul>
            </div>
            <!-- /.footer-block-content -->
          </div>
          <!-- End footer block -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </b-container>
    <!-- /.footer-inner -->
  </section>
</template>
<script>
import { fab } from '@fortawesome/free-brands-svg-icons'
export default {
  computed: {
    fab() {
      return fab
    },
  },
}
</script>

<style>
.footer-dark {
  background-color: black;
  color: #fff;
}
</style>