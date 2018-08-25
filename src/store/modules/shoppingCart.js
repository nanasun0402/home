import { api } from '@/api'
import * as types from '@/store/mutation-types'

const filterInit = {
    currentMember: ''
}

const state = {
    data: {
        shoppingCarts: [],
        currentShoppingCart: null
    },
    ui: {
        page: {
            size: 10, number: 0, total: 0, pages: 0,
            filter: { ...filterInit }
        }
    }
}

const getters = {
    getShoppingCarts: state => state.data.shoppingCarts,
    getCurrentShoppingCart: state => state.data.currentShoppingCart,
    // getCurrentGoodsId: state => state.data.currentGoodsId,
    getShoppingCartPage: state => state.ui.page,
    getShoppingCartPageSize: state => state.ui.page.size,
    getCurrerntShoppingCartPage: state => (state.ui.page.number + 1),
    getShoppingCartTotalPage: state => state.ui.page.total,
    getShoppingCartDataCount: state => state.ui.page.pages,
    getShoppingCartFilter: state => state.ui.page.filter,
    getGoodsImages: state =>  state.data.currentGoods && state.data.currentGoods.images?state.data.currentGoods.images:[]
}

const actions = {
    getShoppingCartsByMemberId({ commit, state }, filter) {
        api.getShoppingCarts(filter? filter : state.ui.page.filter, response => {
            // commit(types.SET_GOODS_PAGE, { pages: response.data.pages, total: response.data.total })
            commit(types.SET_SHOPPING_CARTS, { shoppingCarts: response.data.content })
            console.log(888, response)
            // commit(types.SET_SHOPPING_CART_FILTER, { shppingCarts: response.data.content })
        })
    },
    getGoodsById({ commit, state }, id) {
        commit(types.SET_CURRENT_GOODS_ID, id)
        if (id) {
            api.getGoodsById(id).then(res => {
                commit(types.SET_CURRENT_GOODS, res.data)
            })
        }
    },
    saveShoppingCart({ commit, dispatch }, shoppingCart) {
        api.saveShoppingCart(shoppingCart).then(res => {
            commit(types.SET_CURRENT_SHOPPING_CART, res.data)
            // dispatch('getShoppingCarts')
        })
    },
    editShoppingCart({ commit, dispatch }, shoppingCart) {
        api.editShoppingCart(shoppingCart).then(res => {
            commit(types.SET_CURRENT_SHOPPING_CART, res.data)
            dispatch('getShoppingCarts')
        })
    },
    deleteShoppingCart({ commit, dispatch }, id) {
        api.deleteShoppingCart(id).then(res => {
            dispatch('getShoppingCartsByMemberId')
        })
    }

}

const mutations = {
    [types.SET_SHOPPING_CARTS](state, { shoppingCarts }) {
        state.data.shoppingCarts = shoppingCarts
    },
    [types.SET_CURRENT_SHOPPING_CART](state, shoppingCart) {
        state.data.currentShoppingCart = shoppingCart
    },
    [types.SET_SHOPPING_CART_FILTER](state, { filter }) {
        state.ui.page.filter = filter
    },
    [types.SET_SHOPPING_CART_PAGE](state, { pageSize, currentPage, pages, total }) {
        if (pageSize) {
            state.ui.page.size = pageSize
        }
        if (currentPage) {
            state.ui.page.number = currentPage - 1
        }
        if (pages) {
            state.ui.page.pages = total
        }
        if (total) {
            state.ui.page.total = pages
        }

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
