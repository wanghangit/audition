<template>
  <div>
    <p>具名和匿名插槽和作用域插槽</p>
    <parent>
      <template v-slot:content="slotProps">
        <div>this is content{{slotProps.slotData}}</div>
      </template>
      <template>
        <div>this is default</div>
      </template>
    </parent>
  </div>
</template>

<script>
import parent from "./parent";

export default {
  data: function() {
    return {
      root: "ROOT"
    };
  },
  components: {
    parent
  }
};
</script>

<style>
</style>