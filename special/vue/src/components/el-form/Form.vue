<template>
  <div>
    <el-input v-model="model.name"></el-input>
    <el-input v-model="model.password" type="password"></el-input>
    <p>name: {{model.name}}password:{{model.password}}</p>
  </div>
</template>

<script>
import ElInput from './Input'
export default {
  inheritAttrs: false,
  components: {
    ElInput
  },
  data: function(){
    return {
      model: {
        name: 'foo',
        password: '123'
      }
    }
  }
}
</script>

<style>

</style>