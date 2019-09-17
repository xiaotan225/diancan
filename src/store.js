import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义是否注册成功
    IsRegisterSuc: false,
    // 定义是否登录成功
    IsLoginSuc: {
      IsLogin: false,
      UserName: ''
    },
    // 删除菜品数据
    Greens: [],
    // 定义订单数据
    orderData: []
  },
  getters: {
    // 获取是否注册成功
    GetIsRegisterSuc(state) {
      return state.IsRegisterSuc
    },
    // 获取删除菜品数据
    GetGreens(state) {
      return state.Greens
    },
    // 获取是否登录成功
    GetIsLoginSuc(state) {
      return state.IsLoginSuc
    },
    // 获取订单数据
    GetorderData(state) {
      return state.orderData
    }
  },
  mutations: {
    // 设置订单数据
    SettorderData(state,data) {
      state.orderData = data
    },
     // 删除订单数据
     DeltorderData(state,index) {
      state.orderData.splice(index,1)
    },
    // 设置是否登录成功
    SetIsLoginSuc(state, data) {
      state.IsLoginSuc = data
    },
    // 设置是否注册成功
    SetIsRegisterSuc(state, data) {
    
      state.IsRegisterSuc = data
    },
    // 设置菜品数据
    SetGreens(state, data) {
      state.Greens = data
    },
    // 添加菜品数据
    AddGreens(state, data) {
      state.Greens.push(data)
    },
    // 删除菜品数据
    DelGreens(state, data) {
      state.Greens.filter((item, index) => {
        if (data.name == item.name) {
          state.Greens.splice(index, 1)
        }

        return state.Greens
      })

    }
  },
  actions: {

  }
})
