<template>
  <div class="box" :style="{justifyContent: props.isSender? 'flex-end' : 'flex-start'}">
    <p class="msg-block">
      {{ props.content }}
    </p>
  </div>
</template>

<script lang="ts" setup>

import { defineProps, onMounted } from 'vue';

interface Msg {
  msgVersion: number
  content: string
  isSender?: boolean
}
const props = defineProps<Msg>()

onMounted(() => {
  console.log('content::::::', props);
})

</script>

<style scoped>
.box {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: flex-end;
}
  .msg-block {
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    max-width: 70%;
    padding: 8px 20px;
    height: auto;
    text-align: left;
    margin: 10px 20px;
    line-height: 25px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>