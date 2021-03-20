<template>
<div>
  <div class="clock" v-if="hourtime != ''">
    <span class="clock__hours">
      <span class="clock__hourtime" v-text="hourtime"></span>
      <span v-text="hours"></span>
    </span>:<span class="clock__minutes" v-text="minutes"></span>:<span class="clock__seconds" v-text="seconds"></span>
  </div>
  </div>
</template>

<script>
//import { SECOND, HOUR, getHourTime, getZeroPad } from './Filters';
export default {
  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      hourtime: '',
      SECOND:1000,
    HOUR: 12
    };
  },
  mounted() {
    this.$options.timer = window.setTimeout(this.updateDateTime, this.SECOND);
  },
  beforeDestroy() {
    window.clearTimeout(this.$options.timer);
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      this.hours = now.getHours();
      this.minutes = this.getZeroPad(now.getMinutes());
      this.seconds = this.getZeroPad(now.getSeconds());
      this.hourtime = this.getHourTime(this.hours);
      this.hours = this.hours % this.HOUR || this.HOUR;
      this.$options.timer = window.setTimeout(this.updateDateTime, this.SECOND);
    },
    getHourTime (h) {
  return h >= 12 ? 'PM' : 'AM'
},
    getZeroPad (n) {
  return (parseInt(n, 10) >= 10 ? '' : '0') + n
}
  },
};
</script>

<style scoped>
/*.clock {
  background: #fff;
  border: 0.3rem solid #fff;
  border-radius: 0.5rem;
  display: inline-block;
  margin-bottom: 1em;
}
.clock__hours,
.clock__minutes,
.clock__seconds {
  background: linear-gradient(to bottom, #26303b 50%, #2c3540 50%);
  display: inline-block;
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 2rem;
  font-weight: 300;
  padding: 0.5rem 1rem;
  text-align: center;
  position: relative;
}
.clock__hours {
  border-right: 0.15rem solid #fff;
  border-radius: 0.5rem 0 0 0.5rem;
}
.clock__minutes {
  border-right: 0.15rem solid #fff;
}
.clock__seconds {
  border-radius: 0 0.5rem 0.5rem 0;
}
.clock__hourtime {
  font-size: 1rem;
  position: absolute;
  top: 2px;
  left: 8px;
}*/
</style>
