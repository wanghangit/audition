<template>
  <el-form :model="model" :rules="rules">
    <form-item label="用户名" prop="name">
      <el-input v-model="model.name"></el-input>
    </form-item>
    <form-item label="密码" prop="password">
      <el-input v-model="model.password" type="password"></el-input>
    </form-item>
    <p>name: {{model.name}}password:{{model.password}}</p>
  </el-form>
</template>

<script>
import ElInput from "./Input";
import FormItem from "./FormItem";
import ElForm from "./Form";
export default {
  components: {
    ElInput,
    FormItem,
    ElForm
  },
  data: function() {
    return {
      model: {
        name: "foo",
        password: "123"
      },
      rules: {
        name: [{ required: true, message: "用户名必填" }],
        password: [{ required: true, message: "密码必填" }]
      }
    };
  }
};
</script>

<style>
</style>