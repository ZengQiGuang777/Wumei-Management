
<script>
import Emit from "./components/emit.vue"
import Scoped from './components/scoped.vue'
import AsyncDemo from "./components/async-demo.vue";
import { Suspense } from "vue";

export default {
  componets: {
    Emit,
    Scoped,
    AsyncDemo
  },
  mounted() {
    setTimeout(() => {
      this.color = 'blue'
    }, 1000); 
  },  
  data() {
    return { color:'red'}  
  },  
  methods: {
    handleClick(type) {
      alert(type)
    }
  }
}
</script>
<template>
  <Emit @click="handleClick"></Emit>
  <div class="custorm" >绑定样式</div>
  <div class="parent">
    <Scoped>
      <h2 class="inner">这是插槽内容</h2>
    </Scoped>
  </div>
  <Suspense>
     <template #default>
       <AsyncDemo></AsyncDemo>
     </template>
     <template #fallback>
        loading
     </template>
  </Suspense>
</template>

<style scoped>
.parent :deep(h1){
  color:yellow
}
h2{
  color:blue
}
</style>
<style scoped>
.custorm{
  background: v-bind(color);
}
:global(#root){
  color:red
}
</style>