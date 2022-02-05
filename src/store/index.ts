import { InjectionKey } from 'vue';
import {createStore, Store} from 'vuex'

export interface State {
  userId: string,
}


export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    userId: '',
  },
  getters: {
    getUserId: (state) => state.userId
  },
  mutations: {
    setGetUserId: (state, payload) => {
      state.userId = payload.userId;
    }
  },
  actions: {
  },
  modules: {
  }
})
