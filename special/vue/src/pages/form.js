import Vue from 'vue'
import ELForm from '../components/el-form/Form.vue'

console.log(Vue)

new Vue({
  render: h => h(ELForm),
}).$mount("#root")