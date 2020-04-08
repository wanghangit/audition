<template>
  <div>
    <slot></slot>
    <slot name="content" :slotData="slotData"></slot>
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      slotData: 'slotData'
    }
  },
}
</script>

<style>

</style>