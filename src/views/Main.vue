<template>
  <el-container class="common-layout">
    <el-aside width="200px">
      <div style="margin-top: 20px">
        当前登录用户： {{ store.state.userId }}
      </div>
      <FriendList :friend-list="friendList" />
    </el-aside>
    <el-container>
      <el-header>{{ store.state.currentSelectChat }}</el-header>
      <el-main class="chat-window">
        <MsgWindow :msg-list="currentMsgList" />
      </el-main>
      <el-footer>
        <MsgInput @commit="handleSendStrMsg" />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import MsgInput from '@/components/MsgInput';
import MsgWindow from '@/components/MsgWindow';
import FriendList from '@/components/FriendList';
import { Client } from '@/sdk';
import { useStore } from "vuex";
import { key } from '@/store'
import {useRouter} from "vue-router";
import {EmitTextMsg, FriendListResp} from '@/sdk/msg';
import { ElMessage, ElNotification } from 'element-plus'

const MsgMap = reactive(new Map());
let client: Client | undefined;
const store = useStore(key);
const router = useRouter();
const friendList = ref([]);
const currentMsgList = ref([]);

watch(store.state, (newValue) => {
  const newMsgList = MsgMap.get(newValue.currentSelectChat);
  currentMsgList.value = newMsgList;
}, {deep: true});


watch(MsgMap, () => {
  const newMsgList = MsgMap.get(store.state.currentSelectChat);
  currentMsgList.value = Object.assign([], newMsgList);
})


const addToMsgMap = (key: string, value: any) => {
  if (MsgMap.has(key)) {
    MsgMap.get(key).push(value);
  } else {
    MsgMap.set(key, [value]);
  }
}


onMounted(() => {
  if (!store.state.userId) {
    router.push('/');
    return;
  }
  client = new Client(store.state.userId)
  client.onConnect = () => {
    console.log('连接服务成功');
    ElMessage({
      message: '连接服务成功',
      type: 'success',
    })
  }

  client.onDisonnect = (reason: any) => {
    console.log('服务断开，请检查网络', reason);
    ElMessage({
      message: '服务断开，请检查网络',
      type: 'warning',
    })
  }

  client.onMessage = (msg: EmitTextMsg) => {
    console.log('收到远端消息：', msg);

    const { msgSender, content } = msg;
    ElNotification({
      title: `来自${msgSender}的消息`,
      message: `说：${content}`,
    })
    addToMsgMap(msgSender, msg);
  }

  client.onFriendList = (list: FriendListResp[]) => { // 好友列表
    friendList.value = list;
  }
})



const handleSendStrMsg = (content: string) => {
  if (client) {
    const sendMsg = {
      msgVersion: new Date(),
      content,
      isSender: true
    }
    addToMsgMap(store.state.currentSelectChat, sendMsg);


    client.sendText(store.state.currentSelectChat, content).then(() => {
      console.log('发送成功');

    }).catch((err: any) => {
      console.error('发送失败', err);
    })
  }

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
  line-height: 35px;
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