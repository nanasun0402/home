<template>
  <div class="myAddress">
      <div style="width: 600px; height: 80px; font-size: 26px; color: gray">
          <span>我的收藏</span>
      </div>
      <el-table
    ref="multipleTable"
    :data="collects"
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
      width="300">
      <template slot-scope="scope">
          <div>
            <router-link :to="{path: 'goodsDetail', query: { id: scope.row.goods.id }}" class="routerLink">
              <span>{{ scope.row.goods.name }}</span>
            </router-link>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="正常售价（元）"
      width="130">
      <template slot-scope="scope">
          <div>
              <span>{{ scope.row.goods.startPrice }}</span>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="促销价（元）"
      width="130">
      <template slot-scope="scope">
          <div>
              <span>{{ scope.row.goods.salePrice }}</span>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="operation"
      label="操作"
      show-overflow-tooltip>
      <template slot-scope="scope">
          <el-button
          @click.native.prevent="deleteCollection(scope.$index, scope.row)"
          type="text"
          size="small">
          取消收藏
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="width: 100%; height: 60px; line-height: 60px; border-top: 1px solid #9b9b9b; border-bottom: 1px solid #9b9b9b">
    <el-button style="margin-left: 100px" @click="delectSelectCollections">取消选中收藏</el-button>
  </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { LoginUser, api } from "@/api";
import { Message, MessageBox } from "element-ui";

export default {
  name: "myAddress",
  computed: mapGetters({
    currentMember: "getCurrentMember"
  }),
  methods: {
    deleteCollection(index, row) {
      MessageBox.confirm("确定取消收藏么？")
        .then(() => {
          api.deleteCollectGoods(row.id).then(res => {
            api.getCollectGoods(
              { filter: { memberId: this.currentMember.id } },
              res => {
                this.collects = res.data.content;
              }
            );
          });
          Message({
            message: "已取消收藏！",
            type: "success"
          });
        })
        .catch(() => console.log("cancel deleting"));
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delectSelectCollections() {
      for (let oneCollection of this.multipleSelection) {
        api.deleteCollectGoods(oneCollection.id).then(res => {
          api.getCollectGoods(
            { filter: { memberId: this.currentMember.id } },
            res => {
              this.collects = res.data.content;
            }
          );
        });
        Message({
          message: "已取消所选收藏！",
          type: "success"
        });
      }
    }
  },
  mounted() {
    api.getCollectGoods({ filter: { memberId: this.currentMember.id } }, res => {
      this.collects = res.data.content;
    });
  },
  data() {
    return {
      collects: [],
      multipleSelection: null
    };
  }
};
</script>

