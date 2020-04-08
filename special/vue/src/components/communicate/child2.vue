<template>
  <div>
    <p @click="slibing">给child传值</p>
  </div>
</template>

<script>
export default {
  inject: ['root'],
  data: function(){
    return {
      child2: 'child2'
    }
  },
  props: {
    parentName: String
  },
  mounted(){
    this.$emit('fromChild','fromChild')
  },
  methods:{
    slibing(){
      this.$parent.$emit('slibing','slibing')
      console.log(this.$parent)
    }
  }
}
</script>

<style>

</style>