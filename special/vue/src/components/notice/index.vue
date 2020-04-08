<template>
  <div>
    <p>{{title}}</p>
    <div>{{message}}</div>
  </div>
</template>
<script>
export default {
  props: {
    title:String,
    message:String,
    duration:Number
  },
  data: function(){
    return {
      isShow: false
    }
  },
  methods:{
    show(){
      this.isShow = true
      setTimeout(() => {
        this.hide()
      }, this.duration)
    },
    hide(){
      this.isShow = false
      this.remove()
    }
  }
}
</script>