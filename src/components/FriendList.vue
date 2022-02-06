<template>
  <el-row>
    <el-col :span="24">
      <el-menu>
        <el-menu-item
            v-for="item in props.friendList"
            :key="item.userId"
            :index="item.userId"
            @click="handleChatWith(item.userId)"
            class="menu"
        >
          <span>{{ item.userId }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>


</template>

<script lang="ts" setup>

import {defineProps} from 'vue';
import {useStore} from "vuex";
import {key} from "@/store";

interface FriendItemData {
  nickName: string
  userId: string
}

const store = useStore(key);

const props = defineProps<{ friendList: FriendItemData[] }>()


const handleChatWith = (userId: string) => {
  store.commit({type: 'setCurrentSelectChat', currentSelectChat: userId})
}

</script>

<style scoped>
.menu {
  border-bottom: 1px solid #EBEEF5;
}
</style>