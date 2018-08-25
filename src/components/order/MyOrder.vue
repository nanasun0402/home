<template>
  <div class="myAddress">
      <div style="width: 600px; height: 80px; font-size: 26px; color: gray">
          <span>我的订单</span>
      </div>
      <el-table
    ref="multipleTable"
    :data="orders"
    tooltip-effect="dark"
    style="width: 100%; min-height: 200px; margin-top: 50px"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label=""
      width="150">
      <template slot-scope="scope">
          <div>
            <router-link :to="{path: 'goodsDetail', query: { id: scope.row.goods.id }}" class="routerLink">
              <img :src="scope.row.goods && scope.row.goods.images ? scope.row.goods.images[0].fileUrl : ''" alt="" width="100px" height="100px">
            </router-link>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="商品"
      width="240">
      <template slot-scope="scope">
          <div>
            <router-link :to="{path: 'goodsDetail', query: { id: scope.row.goods.id }}" class="routerLink">
              <span>{{ scope.row.goods.name }}</span>
            </router-link>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="数量"
      width="80">
      <template slot-scope="scope">
          <div>
              <span>{{ scope.row.count }}</span>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="规格"
      width="150">
      <template slot-scope="scope">
          <div>
              <span>{{ scope.row.size ? scope.row.size : '' }}</span>
              <span style="padding-left: 10px">{{ scope.row.color ? scope.row.color : '' }}</span>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="正常售价（元）"
      width="100">
      <template slot-scope="scope">
          <div>
              <span>{{ scope.row.goods.startPrice }}</span>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="促销价（元）"
      width="100">
      <template slot-scope="scope">
          <div>
              <span>{{ scope.row.goods.salePrice }}</span>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="状态"
      width="80">
      <template slot-scope="scope">
          <div>
              <span>{{ scope.row.delivery }}</span>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="operation"
      label="操作"
      width="190px"
      show-overflow-tooltip>
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="confirmReceipt(scope.$index, scope.row)"
          type="text"
          size="small"
          v-if="scope.row.delivery=== '已发货'">
          确认收货
        </el-button>
        <el-button
          @click.native.prevent="commentOrder(scope.$index, scope.row)"
          type="text"
          size="small"
          v-else-if="scope.row.delivery=== '已收货'">
          评论商品
        </el-button>
        <el-button
          @click.native.prevent="commentOrder(scope.$index, scope.row)"
          type="text"
          size="small"
          v-else-if="scope.row.delivery=== '已评论'">
          查看评论
        </el-button>
        <el-button
          @click.native.prevent="deleteOrder(scope.$index, scope.row)"
          type="text"
          size="small"
          v-else-if="scope.row.delivery=== '未发货'">
          取消订单
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- <div style="width: 100%; height: 60px; line-height: 60px; border-top: 1px solid #9b9b9b; border-bottom: 1px solid #9b9b9b">
    <el-button style="margin-left: 100px" @click="delectSelectOrders">取消选中订单</el-button>
  </div> -->
  </div>
</template>

<script>
  import { mapMutations, mapGetters, mapActions } from 'vuex'
  import { LoginUser, api } from '@/api'
  import { Message, MessageBox } from 'element-ui'

  export default {
      name: 'myOrder',
      computed: mapGetters({
          currentMember: 'getCurrentMember'
      }),
      methods: {
          deleteOrder(index, row) {
              MessageBox.confirm('确定取消该订单么？')
                  .then(() => {
                      api
                          .editOrder({
                              ...row,
                              delivery: '已取消'
                          })
                          .then(res => {
                              api.getOrders({ filter: { memberId: this.currentMember.id } }, res => {
                                  this.orders = res.data.content
                              })
                          })
                      Message({
                          message: '已取消订单！',
                          type: 'success'
                      })
                  })
                  .catch(() => console.log('cancel deleting'))
          },
          handleSelectionChange(val) {
              this.multipleSelection = val
          },
          delectSelectOrders() {
              for (let oneOrder of this.multipleSelection) {
                  api.deleteOrderById(oneOrder.id).then(res => {
                      api.getOrders({ filter: { memberId: this.currentMember.id } }, res => {
                          this.orders = res.data.content
                      })
                  })
                  Message({
                      message: '已取消所选订单！',
                      type: 'success'
                  })
              }
          },
          commentOrder(index, row) {
              this.$router.push({ path: 'comment', query: { order: row } })
          },
          confirmReceipt(index, row) {
              MessageBox.confirm('确定收货么？')
                  .then(() => {
                      api
                          .editOrder({
                              ...row,
                              delivery: '已收货'
                          })
                          .then(res => {
                              api.getOrders({ filter: { memberId: this.currentMember.id } }, res => {
                                  this.orders = res.data.content
                              })
                          })
                  })
                  .catch(() => console.log('cancel deleting'))
          }
      },
      mounted() {
          api.getOrders({ filter: { memberId: this.currentMember.id } }, res => {
              this.orders = res.data.content
          })
      },
      data() {
          return {
              orders: [],
              multipleSelection: null,
              commentVisible: true
          }
      }
  }
</script>

