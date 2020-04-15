<template>
  <div>
    <h3>Vue Test</h3>
    <p>{{$store.state.count}}</p>
    <button @click="add">add</button>
    <button @click="asyncadd">asyncadd</button>
  </div>
</template>

<script>
  export default {
    methods: {
      add(){
        this.$store.commit('add',1)
      },
      asyncadd(){
        this.$store.dispatch('asyncadd',1)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>