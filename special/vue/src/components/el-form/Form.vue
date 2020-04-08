<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide: function(){
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
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