<template>
  <div class="goodsOrder">
      <div style="width: 200px; height: 50px; font-size: 30px; color: gray">
          <span>我的订单</span>
      </div>
      <address-bar v-if="addressVisible" :on-cancel="cancelAddress" />
      <div style="width: 100%">
          <div style="width: 200px; height: 20px; margin-top: 20px">
           <span style="font-size: 16px; color: #000; ">选择收货地址</span>
           <span style="font-size: 12px; color: orange; cursor: pointer" @click="manageAddress">管理收货地址</span>
          </div>
          <div style="width: 100%; margin-top: 20px">
            <el-row :gutter="20">
              <el-col :span="6" v-for="address in addresses" :key="address.id">
                <div>
                    <el-radio style="height: 100%" v-model="selectedAddress" :label="address" border>
                      <el-card class="box-card" style="min-width: 200px">
                        <!-- <div slot="header">
                          <el-button style="float: left; padding: 3px 0" type="text">修改</el-button>
                          <el-button style="float: right; padding: 3px 0" type="text"  @click="deleteAddress(address)">删除</el-button>
                        </div> -->
                        <div>
                          <span>姓名：{{address.name}}</span>
                        </div>
                        <div style="margin-top: 10px">
                          <span>手机号：{{address.mobile}}</span>
                        </div>
                        <div style="margin-top: 10px">
                          <span>地址：{{address.address}}</span>
                        </div>
                        <div style="margin-top: 10px">
                          <span>邮编：{{address.postCode}}</span>
                        </div>
                      </el-card>
                    </el-radio>
                </div>
              </el-col>
            </el-row>
          </div>
      </div>
      <div>
        <div style="width: 200px; height: 60px; margin-top: 40px">
          <span style="font-size: 16px; color: #000;">确认订单信息</span>
        </div>
        <el-table
    ref="multipleTable"
    :data="orderGoods"
    tooltip-effect="dark"
    style="width: 100%; min-height: 200px">
    <el-table-column
      label=""
      width="100">
      <template slot-scope="scope">
          <div>
              <img :src="scope.row.goods && scope.row.goods.images ? scope.row.goods.images[0].fileUrl : ''" alt="" width="100px" height="100px">
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="商品"
      width="200">
      <template slot-scope="scope">
          <div>
              <span>{{ scope.row.goods.name }}</span>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="规格"
      width="240">
      <template slot-scope="scope">
        <span>{{scope.row.size}}</span>
        <span>{{scope.row.color}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="count"
      label="数量"
      width="140">
      <template slot-scope="scope">{{scope.row.count}}</template>
    </el-table-column>
    <el-table-column
      prop="startPrice"
      label="正常售价（元）"
      show-overflow-tooltip>
      <template slot-scope="scope">{{ scope.row.goods.startPrice }}</template>
    </el-table-column>
    <el-table-column
      prop="salePrice"
      label="促销（元）"
      show-overflow-tooltip>
      <template slot-scope="scope">{{ scope.row.goods.salePrice }}</template>
    </el-table-column>
    <el-table-column
      prop="allPrice"
      label="小计（元）"
      show-overflow-tooltip>
      <template slot-scope="scope">
        <span style="color: #ab2c2b; font-weight: bold">
          {{ scope.row.goods.salePrice && scope.row.count ? scope.row.goods.salePrice * scope.row.count : '' }}
        </span>
      </template>
    </el-table-column>
  </el-table>
  <div style="width: 100%; height: 80px; line-height: 80px; border-bottom: 1px solid #9b9b9b">
    <div style="float: right; margin-right: 110px">
      <span>已选商品</span>
      <span style="color: #ab2c2b; font-weight: bold">{{orderCount}}</span>
      <span>件</span>
      <span style="padding-left: 20px">总计：</span>
      <span style="color: #ab2c2b; font-weight: bold">￥{{orderPrice}}</span>
    </div>
  </div>
  <div style="width: 100%; height: 150px;">
    <div style="width: 400px; height: 120px; border: 1px solid #ab2c2b; float: right; margin-right: 100px; margin-top: 20px">
      <div style="width: 100%; height: 70px">
        <div style="float: right; margin-top: 20px; margin-right: 10px">
          <span style="font-size: 14px; color: #000; font-weight: bold">实付款：</span>
          <span style="color: gray; font-size: 26px">￥</span>
          <span style="font-size: 26px; color: #ab2c2b; font-weight: bold">{{orderPrice}}</span>
        </div>
      </div>
      <div style="width: 100%; height: 20px">
        <div style="float: right; margin-right: 10px;">
          <span style="font-size: 14px; color: #000; font-weight: bold">寄送至：</span>
          <span style="color: gray; font-size: 14px">{{selectedAddress && selectedAddress.city ? selectedAddress.city : ''}}{{selectedAddress && selectedAddress.address ? selectedAddress.address : ''}}</span>
        </div>
      </div>
      <div style="width: 100%; height: 20px">
        <div style="margin-right: 10px; float: right">
          <span style="font-size: 14px; color: #000; font-weight: bold">收货人：</span>
          <span style="color: gray; font-size: 14px">{{selectedAddress && selectedAddress.name ? selectedAddress.name : ''}}</span>
        </div>
      </div>
    </div>
  </div>
  <div style="width: 100%; height: 40px;">
      <div style="float: right; height: 120px; margin-right: 100px;">
        <span style="cursor: pointer; font-size: 14px; color: blue" @click="handleReturnShoppingCart">返回购物车</span>
        <el-button @click="handleSubmitOrder" style="width: 100px; height: 40px; font-size: 14px; background: #ab2c2b; color: #fff; border: none">提交订单</el-button>
      </div>
  </div>
      </div>
  </div>
</template>

<script>
  import { mapMutations, mapGetters, mapActions } from 'vuex'
  import { LoginUser, api } from '@/api'
  import * as types from '@/store/mutation-types'
  import Address from '@/components/address/Address.vue'
  import { Message, MessageBox } from 'element-ui'
  import Bus from '@/components/bus.js'
  import { typeOf } from '../../../node_modules1/uri-js/dist/esnext/util'
  export default {
      name: 'Address',
      components: {
          'address-bar': Address
      },
      computed: mapGetters({
          currentMember: 'getCurrentMember',
          shoppingCarts: 'getShoppingCarts'
      }),
      methods: {
          addAddress() {
              this.addressVisible = true
          },
          cancelAddress() {
              this.addressVisible = false
          },
          deleteAddress(address) {
              console.log(888, address)
              MessageBox.confirm('确定要删除么？')
                  .then(() => {
                      api.deleteAddressById(address.id)
                      Message({
                          message: '该地址已删除！',
                          type: 'success'
                      })
                  })
                  .catch(() => console.log('cancel deleting'))
          },
          manageAddress() {
              this.$router.push({ path: 'myAddress' })
          },
          handleReturnShoppingCart() {
              this.$router.push({ path: 'shoppingCart' })
          },
          handleSubmitOrder() {
              if (!this.selectedAddress) {
                  Message.error('请选择收货地址！')
              } else {
                  for (let oneOrderGoods of this.orderGoods) {
                      api
                          .saveOrder({
                              ...oneOrderGoods,
                              address: this.selectedAddress,
                              delivery: '未发货'
                          })
                          .then(res => {
                              console.log(1111, res.data.count)
                              api.editGoods({
                                  ...res.data.goods,
                                  goodsCount: res.data.goods.goodsCount - res.data.count
                              })
                          })
                      Message({
                          message: '您的订单已提交！',
                          type: 'success'
                      })
                  }
                  this.$router.push({ path: 'submitOrder' })
              }
          }
      },
      mounted() {
          this.orderGoods = this.$route.query.orderGoods
          console.log(11111111111111111, this.orderGoods)
          api.getAddresses({ filter: { memberId: this.currentMember.id } }, res => {
              this.addresses = res.data.content
          })
          this.orderCount = 0
          this.orderPrice = 0
          for (let i = 0; i < this.orderGoods.length; i++) {
              this.orderCount += this.orderGoods[i].count
              this.orderPrice += this.orderGoods[i].goods.salePrice * this.orderGoods[i].count
          }
      },
      data() {
          return {
              addressVisible: false,
              addresses: [],
              selectedAddress: null,
              currentGoods: null,
              orderGoods: [],
              orderCount: '',
              orderPrice: ''
          }
      }
  }
</script>

