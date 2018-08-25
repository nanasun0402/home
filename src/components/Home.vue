<template>
  <div class="home">
    <el-row>
      <header-bar></header-bar>
    </el-row>
    <el-row>
      <search-bar></search-bar>
    </el-row>
    <el-row>
      <nav-bar></nav-bar>
    </el-row>
    <el-row>
    <div id="loadingTarget" :style="{width:'100%', height: '100%'}">
      <div class="container">
        <router-view></router-view>
      </div>     
    </div>
    </el-row>
    <el-row>
      <footer-bar></footer-bar>
    </el-row>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Search from "@/components/Search";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { mapActions, mapMutations } from 'vuex'

export default {
  name: "Home",
  components: {
    "header-bar": Header,
    "search-bar": Search,
    "nav-bar": Nav,
    "footer-bar": Footer,
  },
  created() {
    console.log("###", this.$children);
  },
  methods: {
    ...mapActions([
      "getCollectGoodsByMemberId",
      "getShoppingCartsByMemberId"
    ]),
    ...mapMutations({
      // setCurrentMember: types.SET_CURRENT_MEMBER
    })
    
  },
  mounted() {
    this.getShoppingCartsByMemberId({ filter: { memberId: this.currentMember.id } });
    this.getCollectGoodsByMemberId({ filter: { memberId: this.currentMember.id } });
  },
  data() {
    return {
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.home {
  width: 100%;
  height: 100%;
  /* background-color: #f1f1f1; */
  background-color: #fff;
  overflow: scroll;
}
.link {
  text-decoration: none;
}
.el-header {
  background-color: #ffffff;
  height: 100px;
  border: 1px solid red;
}
.el-footer {
  background-color: #e0e0e0;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.container {
  width: calc(100% - 200px);
  height: 100%;
  margin: 0 auto;
  margin-top: 10px;
  min-height: 500px;
}
</style>
