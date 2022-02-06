<template>
  <div class="box">
    <p class="msg-block">测试数据=测试数据=测试数据=测试数据=测试数据=测试数据=测试数据=
      测试数据=测试数据=测试数据=测试数据=测试数据=测试数据=测试数据=
      测试数据=测试数据=测试数据=测试数据=测试数据=测试数据=测试数据=
      测试数据=测试数据=测试数据=测试数据=测试数据=测试数据=测试数据=
    </p>
  </div>
</template>

<script>
export default {
name: "MsgSender"
}
</script>

<style scoped>
.box {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: flex-start;
}
  .msg-block {
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    max-width: 70%;
    padding: 8px 20px;
    height: auto;
    text-align: left;
    margin-left: 20px;
    line-height: 25px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>