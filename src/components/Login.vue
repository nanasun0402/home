<template>
  <span>
        <el-dialog title="用户登录" :visible="true" :before-close="() => onCancel()" width="400px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onCancelDialog">取消</el-button>
                    <el-button type="primary" @click="onSubmit">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </span>
</template>

<script>
  import { mapMutations, mapGetters, mapActions } from 'vuex'
  import { LoginUser, api } from '@/api'
  import * as types from '@/store/mutation-types'
  import { Message, MessageBox } from 'element-ui'

  export default {
      name: 'login',
      props: ['onCancel'],
      data() {
          return {
              form: {
                  username: '',
                  password: ''
              }
          }
      },
      computed: mapGetters({
          currentMember: 'getCurrentMember',
          shoppingCarts: 'getShoppingCarts'
      }),
      mounted() {
          console.log('In Login mounted')
      },
      methods: {
          ...mapActions(['getShoppingCartsByMemberId']),
          ...mapMutations({
              setCurrentMember: types.SET_CURRENT_MEMBER,
              setShoppingCartFilter: types.SET_SHOPPING_CART_FILTER
          }),
          onSubmit() {
              api.login(this.form.username, this.form.password, res => {
                  if (res.data.user.forbid === true) {
                      Message.error("您的账号已被禁用，请联系管理员！")
                  } else {
                      this.setCurrentMember({ currentMember: LoginUser.get().user })
                      this.getShoppingCartsByMemberId({ filter: { memberId: this.currentMember.id } })
                  }
              })
              if (this.onCancel) {
                  this.onCancel(this.form)
              }
          },
          onCancelDialog() {
              if (this.onCancel) {
                  this.onCancel(this.form)
              }
          }
      }
  }
</script>

