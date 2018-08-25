import { api } from '@/api'
import * as types from '@/store/mutation-types'

const filterInit = {
  name: '',
  mobile: '',
  sex: '',
  institution: ''
}

const state = {
  data: {
    members: [],
    currentMember: null
  },
  ui: {
    page: {
      size: 10,
      number: 0,
      total: 0,
      pages: 0,
      filter: { ...filterInit }
    }
  }
}

const getters = {
  getMembers: state => state.data.members,
  getCurrentMember: state => state.data.currentMember,
  // getCurrentMember: state => state.data.currentMember && state.data.currentMember.user ? state.data.currenMember.user : null,
  // getCurrentGoodsId: state => state.data.currentGoodsId,
  getMemberPage: state => state.ui.page,
  getMemberPageSize: state => state.ui.page.size,
  getCurrerntMemberPage: state => state.ui.page.number + 1,
  getMemberTotalPage: state => state.ui.page.total,
  getMemberDataCount: state => state.ui.page.pages,
  getMemberFilter: state => state.ui.page.filter
  // getGoodsImages: state =>  state.data.currentGoods && state.data.currentGoods.images?state.data.currentGoods.images:[]
}

const actions = {
  // getMembersByPage({ commit, state }, filter) {
  //     api.getMembers(filter, response => {
  //         commit(types.SET_GOODS_PAGE, { pages: response.data.pages, total: response.data.total })
  //         commit(types.SET_GOODS, { goods: response.data.content })
  //         commit(types.SET_GOODS_FILTER, { goods: response.data.content })
  //     })
  // },
  // getGoodsById({ commit, state }, id) {
  //     commit(types.SET_CURRENT_GOODS_ID, id)
  //     if (id) {
  //         api.getGoodsById(id).then(res => {
  //             commit(types.SET_CURRENT_GOODS, res.data)
  //         })
  //     }
  // },
  register({ commit }, member) {
    api.register(member).then(res => {
      commit(types.SET_CURRENT_MEMBER, res.data)
      console.log(1234567, res.data)
      // dispatch('getGoodsByPage')
    })
  }
  // editGoods({ commit, dispatch }, goods) {
  //     api.editGoods(goods).then(res => {
  //         commit(types.SET_CURRENT_GOODS, res.data)
  //         commit(types.SET_CURRENT_GOODS_ID, res.data.id)
  //         dispatch('getGoodsByPage')
  //     })
  // },
  // deleteGoods({ commit, dispatch }, id) {
  //     api.deleteGoods(id).then(res => {
  //         dispatch('getGoodsByPage')
  //     })
  // },
}

const mutations = {
  // [types.SET_MEMBERS](state, { goods }) {
  //     state.data.goods = goods
  // },
  [types.SET_CURRENT_MEMBER](state, { currentMember }) {
    state.data.currentMember = currentMember
  },
  [types.SET_CURRENT_MEMBER_ID](state, id) {
    state.data.currentMemberId = id
  }
  // [types.SET_GOODS_FILTER](state, { filter }) {
  //     state.ui.page.filter = filter
  // },
  // [types.RESET_GOODS_FILTER](state) {
  //     state.ui.page.filter = { ...filterInit }
  // },
  // [types.SET_GOODS_PAGE](state, { pageSize, currentPage, pages, total }) {
  //     if (pageSize) {
  //         state.ui.page.size = pageSize
  //     }
  //     if (currentPage) {
  //         state.ui.page.number = currentPage - 1
  //     }
  //     if (pages) {
  //         state.ui.page.pages = total
  //     }
  //     if (total) {
  //         state.ui.page.total = pages
  //     }

  // }
}

export default {
  state,
  getters,
  actions,
  mutations
}
