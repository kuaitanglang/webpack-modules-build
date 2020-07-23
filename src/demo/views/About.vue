<template>
  <div class="about">
    <h1 @click="show=true">This is an about page</h1>

    <van-popup
            v-model="show"
            closeable
            close-icon="close"
            position="bottom"
            :style="{ height: '30%' }"
    />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        show: false
      }
    }
  }
</script>