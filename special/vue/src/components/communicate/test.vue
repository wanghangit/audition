<template>
  <div>
    <parent>
    </parent>
  </div>
</template>

<script>
import parent from "./parent";

export default {
  provide: function(){
    return {
      root: this.$data.root
    }
  },
  data: function() {
    return {
      root: 'ROOT'
    };
  },
  components: {
    parent,
  },
};
</script>

<style>
</style>