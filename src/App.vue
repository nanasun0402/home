<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import * as types from "@/store/mutation-types";
import { LoginUser, api } from "@/api";
export default {
  name: 'App',
  methods: {
    ...mapActions(["getConstants", "getShoppingCartsByMemberId"]),
    ...mapMutations({
      setCurrentMember: types.SET_CURRENT_MEMBER,
      setShoppingCartFilter: types.SET_SHOPPING_CART_FILTER
    })
  },
  mounted() {
    // if (LoginUser.isAuthenticated()) {
      this.setCurrentMember({ currentMember: LoginUser.get().user });
      this.getShoppingCartsByMemberId({ filter: { memberId: this.currentMember.id } });
    // }
  },
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
* {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

html,
body {
    margin: 0;
    height: 100%;
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    padding: 0;
    min-height: 680px;
    min-width: 800px;
}

#app {
    height: 100%;
    margin: 0;
    padding: 0;
}

.routerLink {
    text-decoration: none;
    color: #000;
}
</style>
