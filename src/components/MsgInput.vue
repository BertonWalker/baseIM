<template>
  <el-input
      v-model="textarea"
      :rows="4"
      type="textarea"
      @keyup.enter="handleInput"
      placeholder="请输入要发送的文本"
  />
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
// import defaultProps from "element-plus/lib/components/table/src/table-body/defaults";
// interface Props {
//   commit: Function,
// }
//
// const props = withDefaults(defaultProps<Props>(), {
//   commit: (): string => ''
// })
const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (event: 'commit', content: string): void
}>();
const textarea = ref('')

const handleInput = (event: KeyboardEvent) => {
  console.log('+++++++++++', event);
  if(!event.altKey) {
    emit('commit', textarea.value);
    textarea.value = '';
  }
}
//
// defineExpose({
//   handleInput,
// })

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
