<template>
  <el-container class="common-layout">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>{{ store.state.userId }}</el-header>
      <el-main class="chat-window">
        <MsgWindow />
      </el-main>
      <el-footer>
        <MsgInput @commit="handleSendStrMsg" />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import MsgInput from '@/components/MsgInput';
import MsgWindow from '@/components/MsgWindow';
import { Client } from '@/sdk';
import { useStore } from "vuex";
import { key } from '@/store'
import {useRouter} from "vue-router";

let client: Client | undefined;
const store = useStore(key);
const router = useRouter();


onMounted(() => {
  if (!store.state.userId) {
    router.push('/');
    return;
  }
  client = new Client(store.state.userId)
  client.onConnect = () => {
    console.log('连接服务成功');
  }

  client.onDisonnect = (reason: any) => {
    console.log('服务断开，请检查网络', reason);
  }
})



const handleSendStrMsg = (content: string) => {
  if (client)
  client.sendText('13333333341', content).then(() => {
    console.log('发送成功');
  }).catch((err: any) => {
    console.error('发送失败', err);
  })

  // TODO  send msg to server
}
</script>

<style scoped>
.common-layout .el-header,
.common-layout .el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}
.common-layout .el-footer {
  line-height: 60px;
}

.common-layout .el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.common-layout .el-main {
  background-color: #FFF;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}

.common-layout > .el-container {
  margin-bottom: 40px;
}

.common-layout .el-container:nth-child(5) .el-aside,
.common-layout .el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.common-layout .el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

</style>