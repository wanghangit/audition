<template>
  <div>
    <div v-for="(item,index) in channels" :key="index">
      {{item.flag}}
    </div>
    <button @click="add()">add</button>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        channels: [{
          flag: 1
        },{
          flag:2
        }]
      }
    },
    methods: {
      add(){
        this.channels[0]={flag:3}
        const ch = this.channels[0]
        // this.$set(ch, "flag", 4)
        this.$set(this.channels, 0, {flag:5})
        // this.channels = [this.channels
      },
      asyncadd(){
        this.$store.dispatch('asyncadd',1)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>