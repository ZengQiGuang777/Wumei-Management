<template>
  <!-- <Lifecycle a="1" b="2"></Lifecycle> -->
  <!-- <VoteDemo1></VoteDemo1> -->
  <VoteDemo4
    title="Vue3 composition Api"
    :supChange="supChange"
    @oppChange="oppChange"
    ref="vote"
    a="1"
    b="2"
    c="3"
  >
    <template #content="{ title }">
      <h3>{{ title }}</h3>
    </template>
  </VoteDemo4>
</template>

<script>
// import Lifecycle from './components/lifecycle.vue'
import VoteDemo4 from "./components/voteDemo-4.vue"
import {onMounted, ref} from 'vue'
export default {
  components: {
    VoteDemo4
  },
  setup() {
    const vote = ref(null);
    const supChange = (val) => {
      alert(val)
    }
    const oppChange = (val) => {
      alert(val)
    }
    onMounted(() => {
      console.log(vote.value)
    })
    return {
      supChange,
      oppChange,
      vote
    }
  }
}
</script>
