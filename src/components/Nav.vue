<template>
<div class="nav" style="margin-left: 350px">
  <el-menu :default-active="currentKey" :default-openeds="defaultOpens" :router="true"  class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="hello">首页</el-menu-item>
    <el-menu-item index="dailygoods">生活用品</el-menu-item>
    <el-menu-item index="cookroomgoods">厨房用品</el-menu-item>
    <el-menu-item index="bedroomgoods">卧室用品</el-menu-item>
    <el-menu-item index="saloongoods">客厅用品</el-menu-item>
    <el-menu-item index="bathroomgoods">浴室用品</el-menu-item>
    <el-menu-item index="allgoods">全部用品</el-menu-item>
    <!-- <el-menu-item index="searchGoods"></el-menu-item> -->

</el-menu>
</div>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      defaultOpens: [],
      currentKey: this.currentKey
    };
  },
  mounted() {
    this.updateSidebarStatus();
  },
  watch: {
    $route: "updateSidebarStatus"
  },
  methods: {
    handleSelect(key, keyPath) {},
    isRole(role) {
      return LoginUser.isRole(role);
    },
    updateSidebarStatus() {
      console.log("Sidebar::", this.$route.name);
      this.currentKey = this.$route.name === "" ? "home" : this.$route.name;
    }
  }
};
</script>