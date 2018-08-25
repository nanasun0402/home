<template>
  <div class="header">
    <el-row>
        <el-col v-if="currentMember" :span="6" :style="{fontSize: '14px', lineHeight: '30px', paddingLeft: '100px'}">
            <span class="link">
              <img :src="currentMember.headImage ? currentMember.headImage.fileUrl : ''" alt="" width="30px" height="30px" style="border-radius: 50%; display: block; float: left">
              <span style="display: block; float: left; margin-left: 10px">{{currentMember.username}},欢迎您！</span>
            </span>
            <span class="link" @click="handleLoginout">退出</span>
        </el-col>
        <el-col v-else :span="4" :style="{fontSize: '14px', lineHeight: '30px', paddingLeft: '100px'}">
            <span class="link" @click="handleLogin">登录</span>
            <span class="link" @click="handleRegister">注册</span>
        </el-col>
        <el-col :span="2" :offset="12" :style="{lineHeight: '30px'}">
            <el-dropdown>
            <span class="el-dropdown-link">
              我的账户<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button  @click="myInformation" style="border: none">个人信息</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button  @click="myAddress" style="border: none">收货地址</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button  @click="myOrder" style="border: none">我的订单</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button  @click="myCollection" style="border: none">我的收藏</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="4" :style="{fontSize: '14px', lineHeight: '30px'}">
            <router-link :to="{path: 'shoppingCart'}" class="routerLink">我的购物车
            </router-link>
        </el-col>
    </el-row>
    <login-dialog v-if="loginVisible" :on-cancel="cancelLogin"></login-dialog>
    <register-dialog v-if="registerVisible" :on-cancel="cancelRegister"></register-dialog>
  </div>
</template>

<script>
  import { mapMutations, mapGetters, mapActions } from 'vuex'
  import Login from '@/components/Login'
  import Register from '@/components/Register'
  import { LoginUser } from '@/api'
  import * as types from '@/store/mutation-types'

  export default {
      name: 'header',
      components: {
          'login-dialog': Login,
          'register-dialog': Register
      },
      computed: mapGetters({
          currentMember: 'getCurrentMember',
          shoppingCarts: 'getShoppingCarts'
      }),

      methods: {
          ...mapActions(['getShoppingCartsByMemberId']),
          ...mapMutations({
              setCurrentMember: types.SET_CURRENT_MEMBER
          }),
          handleLogin() {
              this.loginVisible = true
          },
          cancelLogin() {
              this.loginVisible = false
          },
          handleLoginout() {
              LoginUser.save(null)
              this.setCurrentMember({ currentMember: null })
              console.log(1212, this.currentMember)
          },
          handleRegister() {
              this.registerVisible = true
          },
          cancelRegister() {
              this.registerVisible = false
          },
          myAddress() {
              this.$router.push({ path: 'myAddress' })
          },
          myInformation() {
              this.$router.push({ path: 'myInformation' })
          },
          myCollection() {
              this.$router.push({ path: 'myCollection' })
          },
          myOrder() {
              this.$router.push({ path: 'myOrder' })
          }
      },
      mounted() {
          console.log(1111, this.currentMember, LoginUser.get().user)
          // this.setCurrentMember({currentMember:LoginUser.get().user})
          this.getShoppingCartsByMemberId({
              filter: { memberId: this.currentMember.id }
          })
          // this.price = 0
          for (let i = 0; i < this.shoppingCarts.length; i++) {
              this.price += this.shoppingCarts[i].count * this.shoppingCarts[i].goods.salePrice
              console.log(1212, this.price)
          }
      },
      data() {
          return {
              loginVisible: false,
              registerVisible: false,
              price: 0
          }
      }
  }
</script>

<style>
.header {
    background-color: #e0e0e0;
    height: 30px;
}
</style>


