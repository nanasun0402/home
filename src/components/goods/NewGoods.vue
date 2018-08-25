<template>
<div>
    <el-row style="width: calc(100% - 26px)">
        <el-col :span="24">
            <!-- <img :src="goods[0].images[0].fileUrl" alt="" height="200px" width="100%" style="padding: 10px"> -->
        </el-col>
    </el-row>
  <el-row>
  <el-col :span="6" v-for="(oneGoods, index) in goods" :key="oneGoods.id" :offset="index > 0 ? 0 : 0">
    <div style="padding: 10px">
      <router-link :to="{path: 'goodsDetail', query: { id: oneGoods.id }}" class="routerLink">
          <img :src="oneGoods.images[0].fileUrl" class="image" width="260px" height="200px">
      </router-link>
      <div style="padding: 5px;">
        <span class="title">
            <router-link :to="{}" class="routerLink">{{oneGoods.name}}</router-link>
        </span>
        <span class="title" style="color: #ab2c2b">￥{{oneGoods.startPrice}}</span>
      </div>
    </div>
  </el-col>
</el-row>
</div>
</template>

<script>
import { api } from "@/api";
import { mapGetters, mapActions, mapMutations } from "vuex";
import * as types from "@/store/mutation-types";

export default {
  name: "newgoods",
  props: ['label'],
  computed: mapGetters({
    // goods: "getGoods",
    currentGoods: "getCurrentGoods",
    pageSize: "getGoodsPageSize",
    currentPage: "getCurrerntGoodsPage",
    totalPage: "getGoodsTotalPage",
    dataCount: "getGoodsDataCount",
    page: "getGoodsPage"
  }),
  methods: {
    ...mapActions([
      "getGoodsByPage",
      "addGoods",
      "editGoods",
      "deleteGoods",
      "getGoodsById"
    ]),
    ...mapMutations({
      setCurrentGoods: types.SET_CURRENT_GOODS,
      setGoodsFilter: types.SET_GOODS_FILTER
    })
  },
  mounted() {
    api.getGoods({ filter: { label: this.label } }, res => {
      this.goods = res.data.content;
    });
    this.fileUrl =
      this.goods.images && this.goods.images.length > 0
        ? this.goods.images[0].fileUrl
        : "";
  },
  data() {
    return {
      fileUrl: "",
      goods: ""
    };
  }
};
</script>

<style>
.title {
  display: block;
  padding: 5px;
  text-align: center;
}
</style>

