<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="errorMessage">{{errorMessage}}</p>
  </div>
</template>

<script>
import Schema from "async-validator";
export default {
  data: function() {
    return {
      errorMessage: ""
    };
  },
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: String
  },
  mounted() {
    this.$on("validate", function() {
      this.validate();
    });
  },
  methods: {
    validate: function() {
      const prop = this.prop
      // 获取规则
      const rule = this.form.rules[prop];
      // 获取值
      const values = this.form.model[prop];
      // 进行校验
      console.log(rule, values);
      const desc = {
        [prop]: rule
      };
      const schema = new Schema(desc);
      schema.validate({ [prop]: values }, err => {
        console.log(err)
        if (err) {
          this.errorMessage = err[0].message;
        } else {
          this.errorMessage = "";
        }
      });
    }
  }
};
</script>

<style>
</style>