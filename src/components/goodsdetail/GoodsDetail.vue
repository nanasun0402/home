<template>
  <div style="padding: 20px; border: 1px solid #d0d0d0; margin-top: 30px" v-if="currentGoods">
      <div style="width: 100%; height: 550px">
          <div  id="img" class="goodsImage">
            <img-zoom :src="fImg" :bigsrc="fImg" alt="" width="400px" height="400px" :configs="configs" style="border: 1px solid #d0d0d0"></img-zoom>
            <div style="">
              <img :src="value.fileUrl" v-for="(value, index) in currentGoods.images" :key="value.id" style="max-width: 70px; height: 70px; margin-left: 5px; margin-top: 20px" @click="showImg(value, index)">
            </div>
          </div>
          <div class="goodsInformation">
              <div>
                  <span class="goodsName">{{currentGoods.name}}</span>
              </div>
              <div class="goodsDecription">
                  <span>{{currentGoods.description}}</span>
              </div>
              <div class="goodsPrice">
                  <div style="color: #ab2c2b; float: left">
                      <span>￥{{currentGoods.salePrice}}</span>
                  </div>
                  <div class="goodsLabel" v-if="currentGoods.label">
                      <span>{{currentGoods.label}}</span>
                  </div>
              </div>
              <div style="margin-top: 20px; font-size: 14px; border-top: 1px dashed #e0e0e0; border-bottom: 1px dashed #e0e0e0; height: 30px; line-height: 30px">
                  <span style="padding-left: 10px">销量</span>
                  <span style="padding-left: 50px" >共售出：<span style="color: #ab2c2b">{{saleCount}}</span>件</span>
                  <span style="padding-left: 50px; margin-left: 50px; border-left: 1px dashed #e0e0e0">库存：</span>
                  <span style="color: #ab2c2b">{{currentGoods.goodsCount}}</span>
              </div>
              <div v-if="currentGoods.sizes" style="width: 100%; margin-top: 30px; font-size: 14px; padding-left: 10px;">
                  <span>尺寸：</span>
                  <span v-for="size in currentGoods.sizes" :key="size.id">
                      <el-radio v-model="shoppingCartsSize" :label="size.name" border size="mini" style="margin-right: 10px">{{size.name}}</el-radio>
                  </span>
                  <!-- <el-row>
                      <el-col :span="8" v-for="size in currentGoods.sizes" :key="size.id">
                          <el-radio v-model="shoppingCartsSize" :label="size.name" border size="mini" style="margin-right: 10px">{{size.name}}</el-radio>
                      </el-col>
                  </el-row> -->
              </div>
              <div v-if="currentGoods.colors" style="margin-top: 30px; font-size: 14px; padding-left: 10px;height: 20px">
                  <span>颜色：</span>
                  <span v-for="color in currentGoods.colors" :key="color.id">
                    <el-radio v-model="shoppingCartsColor" :label="color.name" border size="mini" style="margin-right: 10px">{{color.name}}</el-radio>
                  </span>
              </div>
              <div style="margin-top: 30px; font-size: 14px; padding-left: 10px;height: 20px">
                  <span>数量：</span>
                  <el-input-number v-model="count" :min="1" :max="100" size="mini" label="描述文字"></el-input-number>
              </div>
              <div style="margin-top: 80px; margin-left: 50px">
                
                <span v-if="currentCollectGoods && currentCollectGoods.id" style="font-size: 14px" @click="handleDeleteCollectGoods"><i class="fa fa-heart icon1" style="color: red"></i>&nbsp;&nbsp;<span>取消收藏</span></span>
                <span v-else style="font-size: 14px" @click="handleCollectGoods"><i class="fa fa-heart-o icon1"></i>&nbsp;&nbsp;<span>收藏商品</span></span>
                  
                  <button @click="handleAddShoppingCart" style="width: 120px;height: 50px; font-size: 18px; background: #01a854; border: none; color: #fff; border-radius: 5px; margin-left:20px">加入购物车</button>
                  <button @click="handlePurchaseGoods" style="width: 120px;height: 50px; font-size: 18px; background: #ab2c2b; border: none; color: #fff; border-radius: 5px; margin-left:20px">立即购买</button>
              </div>
          </div>
      </div>
      <div style="padding: 10px">
          <el-tabs tab-position="top">
                <el-tab-pane label="产品详情">
                    <div style="height: 100px; margin-left: 50px">
                        <div>
                            <span>规格与参数</span>
                        </div>
                        <div style="font-size: 14px; margin-top: 10px">
                            <span>品名：{{currentGoods.name}}</span>
                            <span style="padding-left: 200px">材质：{{currentGoods.material}}</span>
                        </div>
                        <div style="font-size: 14px; margin-top: 5px">
                            <span>说明：{{currentGoods.description}}</span>
                        </div>
                    </div>
                    <div style="text-align: center" v-for="image in currentGoods.detailImages" :key="image.id">
                        <img :src="image.fileUrl" alt="" style="margin-top: -5px">
                    </div>
                </el-tab-pane>
                <el-tab-pane label="会员评价">
                  <goods-detail :data="currentGoods"></goods-detail>
                </el-tab-pane>
          </el-tabs>
      </div>
  </div>
</template>

<script>
    import { api } from '@/api'
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import * as types from '@/store/mutation-types'
    import { Message } from 'element-ui'
    import imgZoom from 'vue2.0-zoom'
    import VDistpicker from 'v-distpicker'
    import GoodsComment from '@/components/goodsdetail/GoodsComment'

    export default {
        name: 'GoodsDetail',
        components: { imgZoom, VDistpicker, 'goods-detail': GoodsComment },
        computed: {
            ...mapGetters({
                shoppingCarts: 'getShoppingCarts',
                currentMember: 'getCurrentMember',
                collectGoods: 'getCollectGoods',
                collectOfGoods: 'getCollectGoodsByGoods'
            })
        },
        methods: {
            ...mapActions(['saveShoppingCart', 'saveCollectGoods', 'deleteCollectGoods', 'getCollectGoodsByMemberId', 'getCollectGoodsByGoodsId']),
            handleAddShoppingCart() {
                if (this.currentMember) {
                    if ((this.currentGoods.sizes && this.shoppingCartsSize === null) || (this.currentGoods.colors && this.shoppingCartsColor === null)) {
                        Message.error('请选择商品规格！')
                    } else {
                        this.saveShoppingCart({
                            goods: this.currentGoods,
                            member: this.currentMember,
                            count: this.count,
                            size: this.shoppingCartsSize,
                            color: this.shoppingCartsColor
                        })
                        Message({
                            message: '已加入购物车！',
                            type: 'success'
                        })
                    }
                } else {
                    Message.error('您还未登录，请先登录！')
                }
            },
            showImg(v, i) {
                var self = this
                if (this.fImg != v.fileUrl) {
                    this.fImg = v.fileUrl
                }
            },
            add() {
                this.count++
            },
            reduce() {
                if (this.count > 0) {
                    this.count--
                }
            },
            handleCollectGoods() {
                if (this.currentMember) {
                    this.saveCollectGoods({
                        goods: this.currentGoods,
                        member: this.currentMember
                    }).then(res => {
                        Message({
                            message: '已收藏！',
                            type: 'success'
                        })
                    })
                    api.getCollectGoodsByGoodsIdAndMemberId(this.$route.query.id, this.currentMember.id, res => {
                        this.currentCollectGoods = res.data
                    })
                } else {
                    Message.error('您还未登录，请先登录！')
                }
            },
            handleDeleteCollectGoods() {
                if (this.currentMember && this.currentCollectGoods) {
                    this.deleteCollectGoods(this.currentCollectGoods.id)
                }
                this.currentCollectGoods = null
                Message({
                    message: '已取消收藏！',
                    type: 'success'
                })
            },
            handlePurchaseGoods() {
                if (this.currentMember) {
                    if ((this.currentGoods.sizes && this.shoppingCartsSize === null) || (this.currentGoods.colors && this.shoppingCartsColor === null)) {
                        Message.error('请选择商品规格！')
                    } else {
                        if (this.count <= this.currentGoods.goodsCount) {
                            this.purchaseGoods.push({
                                goods: this.currentGoods,
                                member: this.currentMember,
                                count: this.count,
                                size: this.shoppingCartsSize ? this.shoppingCartsSize : '',
                                color: this.shoppingCartsColor ? this.shoppingCartsColor : ''
                            })

                            this.$router.push({
                                path: 'goodsOrder',
                                query: {
                                    goodsId: this.$route.query.id,
                                    orderGoods: this.purchaseGoods
                                }
                            })
                        } else {
                            Message.error('该商品库存不足，请重新选择！')
                        }
                    }
                } else {
                    Message.error('您还未登录，请先登录！')
                }
            }
        },
        mounted() {
            api.getGoodsById(this.$route.query.id, res => {
                console.log(222, res)
                this.currentGoods = res.data
                this.fImg = this.currentGoods.images[0].fileUrl
                api.getCollectGoodsByGoodsIdAndMemberId(this.$route.query.id, this.currentMember.id, res => {
                    this.currentCollectGoods = res.data
                })
                api.getOrders({ filter: { goodsId: this.currentGoods.id } }, res => {
                    this.saleCount = 0
                    for (let i = 0; i < res.data.content.length; i++) {
                        this.saleCount += res.data.content[i].count
                    }
                })
            })
        },
        data() {
            return {
                saleCount: 0,
                currentGoods: null,
                purchaseGoods: [],
                currentCollectGoods: null,
                fImg: '',
                count: '1',
                shoppingCartsSize: null,
                shoppingCartsColor: null,
                active: true,
                collectGoodsVisible: true,
                deleteCollectGoodsVisible: false,
                configs: {
                    width: 500,
                    height: 500,
                    maskWidth: 100,
                    maskHeight: 100,
                    maskColor: 'red',
                    maskOpacity: 0.2
                }
            }
        }
    }
</script>

<style>
.goodsImage {
    width: 400px;
    height: 400px;
    float: left;
}

.goodsInformation {
    width: 600px;
    height: 500px;
    /* border: 1px solid yellow; */
    float: right;
}

.goodsLabel {
    width: 80px;
    height: 20px;
    background: #ab2c2b;
    color: #ffffff;
    font-size: 16px;
    line-height: 20px;
    float: left;
    text-align: center;
    margin-left: 100px;
    margin-top: 15px;
}

.goodsName {
    font-size: 20px;
}

.goodsDecription {
    font-size: 14px;
    color: gray;
    margin-top: 10px;
    margin-bottom: 10px;
}

.goodsPrice {
    width: 100%;
    height: 50px;
    background-color: #e0e0e0;
    margin-top: 10px;
    line-height: 50px;
    font-size: 18px;
}
</style>


