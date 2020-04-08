# vue

## vue组件化

### 父组件给子组件传值

1. props
2. this.$refs
3. this.$children

### 子组件给父组件传值

1. this.$emit
2. this.$parent

### 兄弟组件传值

1. this.$parent

### 跨组件传值
1. provide和inject

### 全局管理状态
1. new Vue()来监听数据变化
2. Vuex

## slot插槽

1. slot默认插槽
2. slot具名插槽 v-slot:name <template name="name">
3. 作用域插槽 v-slot:name="slotProps" <template name="name" data="slotData"> 可以子元素给父元素传值

