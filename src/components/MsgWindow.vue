<template>
  <el-scrollbar ref="scrollbarRef" height="500px" always @scroll="scroll">
    <div ref="innerRef">
      <template v-for="(item, index) in props.msgList" :key="index">
        <MsgTab v-if="item" :msgVersion="item.msgVersion" :content="item.content" :is-sender="item.isSender"/>
      </template>
    </div>
  </el-scrollbar>

</template>

<script lang="ts" setup>
import {onMounted, ref, defineProps, watch} from 'vue';
import type {ElScrollbar} from 'element-plus';
import MsgTab from './MsgTab.vue';


const max = ref(0)
const value = ref(0)
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()


interface Msg {
  msgVersion: number
  content: string
  isSender?: boolean
}


const props = defineProps<{ msgList: Msg[] }>()

watch(props, () => {
  console.log('msgwindow props changed ::::', props.msgList);
  max.value = innerRef.value!.clientHeight - 380;
  inputSlider(max.value)
})

onMounted(() => {
  max.value = innerRef.value!.clientHeight - 380;
})

// eslint-disable-next-line no-unused-vars
const inputSlider = (value: number) => {
  scrollbarRef.value!.setScrollTop(value)
}
const scroll = ({scrollTop}) => {
  value.value = scrollTop
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
