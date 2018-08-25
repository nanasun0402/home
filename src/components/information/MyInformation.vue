<template>
  <el-form ref="myInformation" label-width="120px" label-position="right">
                <el-form-item label="头像">
                    <el-upload class="avatar-uploader" action="/api/file/doctor/head_image" :show-file-list="false" :on-success="handleAvatarSuccess">
                        <img v-if="headImageUrl" :src="headImageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input placeholder="手机号" v-model="member.mobile" style="width:30%;"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input placeholder="用户名" v-model="member.username" style="width:30%;"></el-input>
                </el-form-item>
                <!-- <el-form-item label="密码">
                    <el-input placeholder="密码" type="password" v-model="member.password" style="width:30%;"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" @click="onConfirm">提交</el-button>
                </el-form-item>
            </el-form>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import { api } from '@/api'
  import * as types from '@/store/mutation-types'
  import { LoginUser } from '@/api'
  import { Message } from 'element-ui'

  export default {
      name: 'myInformation',
      computed: {
          ...mapGetters({
              currentMember: 'getCurrentMember'
          })
      },
      methods: {
          ...mapMutations({
              setCurrentMember: types.SET_CURRENT_MEMBER
          }),
          handleAvatarSuccess(res) {
              this.member.headImage = res
              this.headImageUrl = res.fileUrl
          },
          onConfirm() {
              api.editMember(this.member).then(res => {
                  this.setCurrentMember({ currentMember: res.data })
              })
              Message({
                  message: '个人信息已修改！',
                  type: 'success'
              })
          }
      },
      mounted() {
          this.member = this.currentMember
              ? {
                    ...this.currentMember,
                    headImage: this.currentMember.headImage ? this.currentMember.headImage : ''
                }
              : {
                    name: ''
                }
          this.setCurrentMember({ currentMember: this.currentMember })
          this.headImageUrl = this.currentMember.headImage ? this.currentMember.headImage.fileUrl : null
      },
      data() {
          return {
              headImageUrl: null,
              member: {
                  headImage: null,
                  username: '',
                  mobile: ''
              }
          }
      }
  }
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}
.avatar {
    width: 100px;
    height: 100px;
    display: block;
}
</style>


