<template>
  <div class="shoppingCart">
      <div style="width: 200px; height: 80px; font-size: 30px; color: gray">
          <span>购物车</span>
      </div>
      <el-table
    ref="multipleTable"
    :data="shoppingCarts"
    tooltip-effect="dark"
    style="width: 100%; min-height: 200px"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label=""
      width="100">
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
      width="200">
      <template slot-scope="scope">
          <div>
            <router-link :to="{path: 'goodsDetail', query: { id: scope.row.goods.id }}" class="routerLink">
              <span>{{ scope.row.goods.name }}</span>
            </router-link>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="规格"
      width="240">
      <template slot-scope="scope">
          <div>
            <el-select v-if="scope.row.size" @change="handleChange(scope.row)" v-model="scope.row.size" placeholder="请选择尺寸" size="mini" style="width: 100px">
              <el-option
                  v-for="item in scope.row.goods.sizes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
              </el-option>
            </el-select>
            <el-select v-if="scope.row.color" @change="handleChange(scope.row)" v-model="scope.row.color" placeholder="请选择颜色" size="mini" style="width: 100px">
              <el-option
                  v-for="item in scope.row.goods.colors"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
              </el-option>
            </el-select>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="count"
      label="数量"
      width="140">
      <template slot-scope="scope"><el-input-number v-model="scope.row.count" @change="handleChange(scope.row)" :min="1" :max="100" size="mini" label="描述文字"></el-input-number></template>
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
    <el-table-column
      prop="operation"
      label="操作"
      show-overflow-tooltip>
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteShoppingCart(scope.$index, scope.row)"
          type="text"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="width: 100%; height: 60px; line-height: 60px; border-top: 1px solid #9b9b9b; border-bottom: 1px solid #9b9b9b">
    <el-button style="margin-left: 100px" @click="delectSelectGoods">删除选中商品</el-button>
  </div>
  <div style="width: 100%; height: 80px; line-height: 80px; border-bottom: 1px solid #9b9b9b">
    <div style="width: 400px; float: right">
      <span>已选商品</span>
      <span style="color: #ab2c2b; font-weight: bold">{{selectCount}}</span>
      <span>件</span>
      <span style="padding-left: 20px">总计：</span>
      <span style="color: #ab2c2b; font-weight: bold">￥{{selectPrice}}</span>
      <el-button @click="handlePurchase" style="width: 150px; height: 80px; float: right; font-size: 24px; background: #a7c773; color: #fff">去结算</el-button>
    </div>
  </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import * as types from "@/store/mutation-types";
import { api } from "@/api";
import Bus from "@/components/bus.js";
import { Message, MessageBox } from "element-ui";

export default {
  name: "shoppingCart",
  components: {},
  computed: {
    ...mapGetters({
      shoppingCarts: "getShoppingCarts",
      currentMember: "getCurrentMember"
    })
  },
  methods: {
    ...mapActions(["getShoppingCartsByMemberId", "deleteShoppingCart"]),
    ...mapMutations({
      setShoppingCartFilter: types.SET_SHOPPING_CART_FILTER
    }),
    // 数量 规格改变
    handleChange(row) {
      api.editShoppingCart(row).then(res => {
        console.log(1111111111111, res)
        // this.getShoppingCartsByMemberId({
        //   filter: { memberId: this.currentMember.id }
        // });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.selectCount = 0;
      this.selectPrice = 0;
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.selectCount += this.multipleSelection[i].count;
        this.selectPrice +=
          this.multipleSelection[i].goods.salePrice *
          this.multipleSelection[i].count;
      }
    },
    delectSelectGoods() {
      for (let oneShoppingCart of this.multipleSelection) {
        api.deleteShoppingCart(oneShoppingCart.id).then(res => {
          this.getShoppingCartsByMemberId({
            filter: { memberId: this.currentMember.id }
          });
        });
        Message({
          message: "所选商品已删除！",
          type: "success"
        });
      }
    },
    deleteShoppingCart(index, row) {
      MessageBox.confirm("确定要删除该商品么？")
        .then(() => {
          api.deleteShoppingCart(row.id).then(res => {
            this.getShoppingCartsByMemberId({
              filter: { memberId: this.currentMember.id }
            });
          });
          Message({
            message: "该商品已从购物车中删除！",
            type: "success"
          });
        })
        .catch(() => console.log("cancel deleting"));
    },
    handlePurchase() {
      if (this.currentMember) {
        if (this.multipleSelection.length > 0) {
          this.$router.push({ path: "goodsOrder", query: {orderGoods: this.multipleSelection}});
        } else {
          Message.error("请选择商品！");
        }
      } else {
        Message.error("您还未登录，请先登录！");
      }
    }
  },
  mounted() {
    this.getShoppingCartsByMemberId({
      filter: { memberId: this.currentMember.id }
    });
  },
  data() {
    return {
      multipleSelection: [],
      selectCount: 0,
      selectPrice: 0
    };
  }
};
</script>

