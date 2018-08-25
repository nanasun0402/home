import { api } from "@/api";
import * as types from "@/store/mutation-types";

const filterInit = {
  currentMember: ""
};

const state = {
  data: {
    collectGoods: [],
    currentCollectGoods: null,
    collectOfGoods: null
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
};

const getters = {
  getCollectGoods: state => state.data.collectGoods,
  getCurrentCollectGoods: state => state.data.currentCollectGoods,
  getCollectGoodsFilter: state => state.ui.page.filter,
  getCollectGoodsByGoods: state => state.data.collectOfGoods
};

const actions = {
  getCollectGoodsByMemberId({ commit, state }, filter) {
    api.getCollectGoods(filter ? filter : state.ui.page.filter, response => {
      // commit(types.SET_GOODS_PAGE, { pages: response.data.pages, total: response.data.total })
      commit(types.SET_COLLECT_GOODS, { collectGoods: response.data.content });
      console.log(888, response);
      // commit(types.SET_SHOPPING_CART_FILTER, { shppingCarts: response.data.content })
    });
  },
  getGoodsById({ commit, state }, id) {
    commit(types.SET_CURRENT_GOODS_ID, id);
    if (id) {
      api.getGoodsById(id).then(res => {
        commit(types.SET_CURRENT_GOODS, res.data);
      });
    }
  },
  getCollectGoodsByGoodsId({ commit }, id ) {
    api.getCollectGoodsByGoodsId(id, res => {
      console.log(888, res);
      commit(types.SET_COLLECT_OF_GOODS, {collectOfGoods: res.data});
      console.log(999, this.collectOfGoods)
    });
  },
  saveCollectGoods({ commit, dispatch }, collectGoods) {
    api.saveCollectGoods(collectGoods).then(res => {
      commit(types.SET_CURRENT_COLLECT_GOODS, res.data);
      dispatch("getCollectGoodsByMemberId");
      console.log(111, res);
    });
  },
  // editShoppingCart({ commit, dispatch }, shoppingCart) {
  //     api.editShoppingCart(shoppingCart).then(res => {
  //         commit(types.SET_CURRENT_COLLECT_GOODS, res.data)
  //         dispatch('getCollectGoodsByMemberId')
  //     })
  // },
  deleteCollectGoods({ commit, dispatch }, id) {
    api.deleteCollectGoods(id).then(res => {
      console.log(111, res);
      dispatch("getCollectGoodsByMemberId");
    });
  }
};

const mutations = {
  [types.SET_COLLECT_GOODS](state, { collectGoods }) {
    state.data.collectGoods = collectGoods;
  },
  [types.SET_CURRENT_COLLECT_GOODS](state, collectGoods) {
    state.data.currentCollectGoods = collectGoods;
  },
  [types.SET_COLLECT_GOODS_FILTER](state, { filter }) {
    state.ui.page.filter = filter;
  },
  [types.SET_COLLECT_OF_GOODS](state, { collectOfGoods }) {
    state.data.collectOfGoods = collectOfGoods;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
