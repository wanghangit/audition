<template>
  <div>
    <input type="text" :value="value" @input="change" v-bind="$attrs">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    change: function(e){
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style>

</style>