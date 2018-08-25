<template>
    <div>
        <div v-if="goods">
          <el-row>
            <el-col :span="6" v-for="oneGoods in goods" :key="oneGoods.id">
              <div style="padding: 10px">
                <router-link :to="{path: 'goodsDetail', query: { id: oneGoods.id }}" class="routerLink">
                  <img :src="oneGoods.images[0].fileUrl" class="image" width="260px" height="200px">
                </router-link>
                <div style="padding: 5px;">
                  <span class="title">
                    <router-link :to="{}" class="routerLink">{{oneGoods.name}}</router-link>
                  </span>
                  <span class="title" style="color: red">￥{{oneGoods.startPrice}}</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div v-else>
          <div style="width: 100%; text-align: center; height: 100px; margin: 0 auto; margin-top: 20px; font-size: 20px; font-weight: bold">
              <p>对不起，没有找到您所搜索的商品！</p>
              <p>看看下面的商品有没有中意的！</p>
          </div>
          <div style="margin-top: 100px">
            <p>向您推荐以下商品：</p>
            <el-row>
              <el-col :span="6" v-for="oneGoods in recommendGoods.slice(0, 8)" :key="oneGoods.id">
                <div style="padding: 10px">
                  <router-link :to="{path: 'goodsDetail', query: { id: oneGoods.id }}" class="routerLink">
                    <img :src="oneGoods.images[0].fileUrl" class="image" width="260px" height="200px">
                  </router-link>
                  <div style="padding: 5px;">
                    <span class="title">
                      <router-link :to="{}" class="routerLink">{{oneGoods.name}}</router-link>
                    </span>
                    <span class="title" style="color: red">￥{{oneGoods.startPrice}}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
    </div>
</div>
</template>

<script>
  import { api } from '@/api'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import * as types from '@/store/mutation-types'

  export default {
      name: 'searchGoods',
      computed: {
          ...mapGetters({
              // goods: "getGoods",
              currentGoods: 'getCurrentGoods',
              pageSize: 'getGoodsPageSize',
              currentPage: 'getCurrerntGoodsPage',
              totalPage: 'getGoodsTotalPage',
              dataCount: 'getGoodsDataCount',
              page: 'getGoodsPage'
          }),
          path() {
              return this.$route.path
          }
      },
      methods: {
          ...mapActions(['getGoodsByPage', 'addGoods', 'editGoods', 'deleteGoods', 'getGoodsById']),
          ...mapMutations({
              setCurrentGoods: types.SET_CURRENT_GOODS,
              setGoodsFilter: types.SET_GOODS_FILTER
          })
      },
      mounted() {
          api.getGoods({ filter: { name: this.$route.query.searchValue } }, res => {
              console.log(121212, res)
              this.goods = res.data.content
          })
          api.getGoods({ filter: { label: '新品' } }, res => {
              console.log(121212, res)
              this.recommendGoods = res.data.content
          })
          this.fileUrl = this.goods.images && this.goods.images.length > 0 ? this.goods.images[0].fileUrl : ''
      },
      data() {
          return {
              fileUrl: '',
              goods: [],
              recommendGoods: [],
              titleImage: ''
          }
      }
  }
</script>

<style>
.title {
    display: block;
    padding: 5px;
    text-align: center;
}
</style>

