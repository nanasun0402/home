<template>
<div>
    <el-row style="width: calc(100% - 26px)">
        <el-col :span="24">
            <!-- <img :src="goods[0].images[0].fileUrl" alt="" height="200px" width="100%" style="padding: 10px"> -->
        </el-col>
    </el-row>
  <el-row>
  <el-col :span="6" v-for="oneGoods in goods" :key="oneGoods.id">
    <div style="padding: 10px">
      <router-link :to="{path: 'goodsDetail', query: { id: oneGoods.id }}" class="routerLink">
          <img :src="oneGoods.images ? oneGoods.images[0].fileUrl : ''" class="image" width="260px" height="200px">
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
  name: "searchGoods",
  computed: {
    ...mapGetters({
      // goods: "getGoods",
      currentGoods: "getCurrentGoods",
      pageSize: "getGoodsPageSize",
      currentPage: "getCurrerntGoodsPage",
      totalPage: "getGoodsTotalPage",
      dataCount: "getGoodsDataCount",
      page: "getGoodsPage"
    }),
    path() {
      return this.$route.path;
    }
  },
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
    if (this.$route.name === types.PATH_DAILY) {
      // this.setGoodsFilter({ filter: {} })
      this.titleImage = "@/assets/lunbo_2.png";
      api.getGoods({ filter: { type: "生活用品" } }, res => {
        console.log(121212, res);
        this.goods = res.data.content;
      });
    }
    if (this.$route.name === types.PATH_BEDROOM) {
      api.getGoods({ filter: { type: "卧室用品" } }, res => {
        this.goods = res.data.content;
      });
    }
    if (this.$route.name === types.PATH_BATHROOM) {
      api.getGoods({ filter: { type: "浴室用品" } }, res => {
        this.goods = res.data.content;
      });
    }
    if (this.$route.name === types.PATH_COOKROOM) {
      api.getGoods({ filter: { type: "厨房用品" } }, res => {
        this.goods = res.data.content;
      });
    }
    if (this.$route.name === types.PATH_SALOON) {
      api.getGoods({ filter: { type: "客厅用品" } }, res => {
        this.goods = res.data.content;
      });
    }
    if (this.$route.name === types.PATH_ALL) {
      api.getGoods({ filter: {} }, res => {
        this.goods = res.data.content;
      });
    }
    // api.getGoods({ filter: { name: "舒适" } }, res => {
    //   console.log(121212, res);
    //   this.goods = res.data.content;
    // });
    this.fileUrl =
      this.goods.images && this.goods.images.length > 0
        ? this.goods.images[0].fileUrl
        : "";
  },
  watch: {
    path: function() {
      if (this.$route.name === types.PATH_DAILY) {
        this.titleImage = "@/assets/lunbo_2.png";
        api.getGoods({ filter: { type: "生活用品" } }, res => {
          this.goods = res.data.content;
        });
      }
      if (this.$route.name === types.PATH_BEDROOM) {
        api.getGoods({ filter: { type: "卧室用品" } }, res => {
          this.goods = res.data.content;
        });
      }
      if (this.$route.name === types.PATH_BATHROOM) {
        api.getGoods({ filter: { type: "浴室用品" } }, res => {
          this.goods = res.data.content;
        });
      }
      if (this.$route.name === types.PATH_COOKROOM) {
        api.getGoods({ filter: { type: "厨房用品" } }, res => {
          this.goods = res.data.content;
        });
      }
      if (this.$route.name === types.PATH_SALOON) {
        api.getGoods({ filter: { type: "客厅用品" } }, res => {
          this.goods = res.data.content;
        });
      }
      if (this.$route.name === types.PATH_ALL) {
        api.getGoods({ filter: {} }, res => {
          this.goods = res.data.content;
        });
      }
    }
  },
  data() {
    return {
      fileUrl: "",
      goods: [],
      titleImage: ""
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

