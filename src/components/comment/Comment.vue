<template>
  <div class="comment">
      <div style="margin-bottom: 20px">
          <span>已购买的商品</span>
      </div>
      <el-row>
          <el-col :span="8">
              <div>
                 <img :src="goodsImage" alt="" width="200px" height="200px">
              </div>
              <div>
                  <span style="font-size: 14px; color: blue">{{this.$route.query.order.goods.name}}</span>
              </div>
          </el-col>
          <el-col :span="14">
              <div style="margin-bottom: 20px">
                  <div style="width: 100%; height: 50px;">
                      <div style="float: left; width: 60px; height: 50px">
                          <img :src="currentMember.headImage ? currentMember.headImage.fileUrl : ''" alt="" width="50px" height="50px" style="border-radius: 50%">
                      </div>
                      <div style="float: left; width: 100px; height: 50px; line-height: 50px; font-size: 14px">
                          <span>{{currentMember.username}}</span>
                      </div>
                  </div>
                  <div v-if="currentComment && currentComment.id">
                      <div style="margin-top: 50px">
                          <span>{{currentComment.description}}</span>
                      </div>
                      <div style="margin-top: 50px">
                          <img v-for="image in currentComment.images" :key="image.id" :src="image ? image.fileUrl : ''" alt="" width="200px" height="200px" style="margin-left: 10px">
                      </div>
                        
                  </div>
                  <div v-else>
                      <div style="margin-top: 20px">
                        <textarea v-model="description" name="" id="" cols="30" rows="10" style="width: 100%" placeholder="宝贝用的好吗？来分享一下您的使用感受吧！"></textarea>
                      </div>
                      <el-upload
                        action="/api/file/doctor/head_image"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="handleSucess"
                        :file-list="fileList">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog>
                      <el-button @click="submitComment" style="margin-top: 20px">发表评论</el-button>
                  </div>
              </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
    import { mapMutations, mapGetters, mapActions } from 'vuex'
    import { api } from '@/api'
    import { Message, MessageBox } from 'element-ui'

    export default {
        name: 'comment',
        computed: mapGetters({
            currentMember: 'getCurrentMember'
        }),
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList)
                this.fileList = fileList
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.fileUrl
                this.dialogVisible = true
                console.log(11111111111, file)
            },
            handleSucess(file) {
                this.dialogImageUrl = file.fileUrl
                this.fileList.push(file)
                this.dialogVisible = false
            },
            submitComment() {
                api
                    .saveComment({
                        description: this.description,
                        order: this.$route.query.order,
                        member: this.currentMember,
                        images: this.fileList
                    })
                    .then(
                        api.editOrder({
                            ...this.$route.query.order,
                            delivery: '已评论'
                        }),
                        Message({
                            message: '您已成功评论该商品！',
                            type: 'success'
                        })
                    )
            }
        },
        mounted() {
            for (let file of this.fileList) {
                this.dialogImageUrl = file.fileUrl
            }
            this.goodsImage = this.$route.query.order.goods.images[0].fileUrl

            api.getCommentByOrderIdAndMemberId(this.$route.query.order.id, this.currentMember.id, res => {
                console.log(1122, res.data)
                this.currentComment = res.data
            })
        },
        data() {
            return {
                goodsImage: '',
                dialogImageUrl: '',
                dialogVisible: false,
                description: '',
                fileList: [],
                currentComment: ''
            }
        }
    }
</script>

