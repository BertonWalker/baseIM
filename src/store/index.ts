import { InjectionKey } from 'vue';
import {createStore, Store} from 'vuex'

export interface State {
  userId: string,
  nickName: string,
  currentSelectChat: string,
}


export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    userId: '',
    nickName: '',
    currentSelectChat: '',
  },
  getters: {
    getUserId: (state) => state.userId,
    getNickName: (state) => state.nickName,
    getCurrentSelectChat: (state) => state.currentSelectChat,
  },
  mutations: {
    setGetUserId: (state, payload) => {
      state.userId = payload.userId;
    },
    setNickName: (state, payload) => {
      state.nickName = payload.nickName;
    },
    setCurrentSelectChat: (state, payload) => {
      state.currentSelectChat = payload.currentSelectChat;
    },
  },
  actions: {
  },
  modules: {
  }
})
