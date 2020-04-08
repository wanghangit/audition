<template>
  <div>
    <input :value="value" @input="change" v-bind="$attrs">
  </div>
</template>

<script>
export default {
  inheritAttrs: false, // 避免顶层容器继承属性
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    change: function(e){
      this.$emit('input', e.target.value)
      this.$parent.$emit('validate')
    }
  }
}
</script>

<style>

</style>