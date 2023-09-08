<template>
  <div>哈哈</div>
</template>

<script setup>
await new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 1000)
})
</script>

<!-- <script>
export default {
  async setup() {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }
}
</script> -->
