<template>
  <section class="app_main">
      <transition name="fade" mode="out-in">
        <router-view :key="key"></router-view>
      </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
    }
  }
}
</script>
 
 <style lang="less" scoped>
 .app_main{
   padding: 70px 30px 0;
   position: absolute;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   overflow: auto;
 }
 </style>
 