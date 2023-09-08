<template>
  <!-- <Lifecycle a="1" b="2"></Lifecycle> -->
  <!-- <VoteDemo1></VoteDemo1> -->
  <VoteDemo5
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
  </VoteDemo5>
</template>

<script setup>
import { onMounted ,ref} from 'vue';
import VoteDemo5 from './components/VoteDemo-5.vue'
function supChange(type) {
    alert(type)
}
function oppChange(type) {
    alert(type)
}
const vote = ref(null);
onMounted(() => {
  console.log(vote.value)
})
</script>
