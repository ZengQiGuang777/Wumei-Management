<template>
    <div><h1>hello</h1></div>

    <slot></slot>
</template>

<style scoped>
:slotted(.inner) {
    background: red;
}
</style>