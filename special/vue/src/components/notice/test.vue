<template>
  <div>
  </div>
</template>
<script>
import { create } from '../../utils/create'
import Notice from './index'
export default {
  mounted(){
    const notice = create(Notice, {
      title: 'xxx',
      message: 'this is a message',
      duration: 10000
    })
    notice.show()
  },
  methods:{

  }
}
</script>