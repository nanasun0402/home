<template>
  <div class="goodsComment" style="padding: 20px">
      <div v-for="goodsComment in goodsComments" :key="goodsComment.id" style="margin-bottom: 20px">
          <el-row>
          <el-col :span="4">
              <div style="float: left">
            <img :src="goodsComment.order.member.headImage.fileUrl" style="border-radius: 50%" alt="" width="40px" height="40px">
          </div>
          <div style="float: left; margin-left: 20px">
            <span style="font-size: 14px; color: blue; line-height: 40px">{{goodsComment.order.member  ? goodsComment.order.member.username : '111'}}</span>
          </div>
          </el-col>
          <el-col :span="4">
              <div>
                  <span style="line-height: 40px; font-size: 12px; color: gray">{{goodsComment.created}}</span>
              </div>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="8" :offset="6">
              <div>
                  {{goodsComment.description}}
              </div>
              <div v-for="image in goodsComment.images" :key="image.id">
                  <img :src="image.fileUrl" alt="" width="100px" height="100px" style="float: left; margin-left: 10px; margin-top: 20px">
              </div>
          </el-col>
      </el-row>
      </div>
  </div>
</template>

<script>
import { api } from "@/api";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
    name: 'goodsComment',
    props: ['data'],
    computed: {
    ...mapGetters({
      shoppingCarts: "getShoppingCarts",
      currentMember: "getCurrentMember",
      collectGoods: "getCollectGoods",
      collectOfGoods: "getCollectGoodsByGoods"
    })
  },
    mounted() {
        api.getComments({filter: {goodsId: this.data.id}}, res => {
            console.log(222222222222222, res)
            this.goodsComments = res.data.content
        })
        console.log(11122211111, this.goodsComments)
    },
    data() {
        return {
            goodsComments: []
        }
    }
  
}
</script>

