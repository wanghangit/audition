<template>
  <div>
    <p>childname: {{childName}}</p>
    <p>parentname: {{parentName}}</p>
    <p>child: {{child}}</p>
    <p>2.跨组件传值</p>
    <p>inject:{{root}}</p>
    <p>3.兄弟传值</p>
    <p>slibing:{{slibing}}</p>
  </div>
</template>

<script>
export default {
  inject: ['root'],
  data: function(){
    return {
      childName: 'xiaoming',
      child: 'child'
    }
  },
  props: {
    parentName: String,
    slibing: String
  },
  mounted(){
    this.$emit('fromChild','fromChild')
  }
}
</script>

<style>

</style>