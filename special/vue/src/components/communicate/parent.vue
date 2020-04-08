<template>
  <div>
    <p>1.父组件给子组件传值</p>
    <child :parentName="parentName" ref="child" @fromChild="fromChild" :slibing="slibing"></child>
    <child2></child2>
    <p>4.子组件给父组件传值</p>
    <p>fromChild: {{childData}}</p>
  </div>
</template>

<script>
import child from "./child";
import child2 from "./child2";
export default {
  data: function(){
    return {
      parentName: '通过props传入xiaoming',
      childData: '',
      slibing:''
    }
  },
  components: {
    child,
    child2
  },
  mounted(){
    this.$refs.child.childName="通过ref改变"
    this.$children[0].child="通过$children改变"
    this.$on('slibing', function(msg){
      this.slibing = msg
    })
    console.log(this.$refs)
  },
  methods:{
    fromChild(msg){
      this.childData = msg
    }
  }
}
</script>

<style>

</style>