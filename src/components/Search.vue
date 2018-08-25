<template>
  <div class="search">
    <el-row style="height: 100px; line-height: 100px">
      <el-col :span="6" style="margin-left: 100px">
          <img src="@/assets/logo.png" alt="" width="140px" height="70px" style="padding-top: 15px">
      </el-col>
      <el-col :span="12" :offset="2" style="margin-top: -10px">
          <el-input v-model="searchValue">
                <el-button slot="append" @click="startSearch">搜索</el-button>
          </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { api } from "@/api";
import * as types from "@/store/mutation-types";

export default {
  name: "search",
  methods: {
    ...mapMutations({
      setGoodsFilter: types.SET_GOODS_FILTER
    }),
    startSearch() {
      this.$router.push({path: 'searchGoods', query:{searchValue: this.searchValue}})
      this.$router.go(0)
    }
  },
  mounted() {},
  data() {
    return {
      searchValue: '',
      goods: []
    };
  }
};
</script>

