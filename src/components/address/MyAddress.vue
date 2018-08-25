<template>
  <div class="myAddress">
      <div style="width: 600px; height: 80px; font-size: 26px; color: gray">
          <span>我的收货地址</span>
          <el-button @click="addAddress">新增收货地址</el-button>
          <el-button @click="delectSelectedAddress">删除选中地址</el-button>
          <address-bar v-if="addAddressVisible" :on-confirm="handleAdd" :on-cancel="cancelAdd" />
          <address-bar v-if="editAddressVisible" :on-confirm="handleEdit" :init-data="currentAddress" :on-cancel="cancelEdit" />
      </div>

      <el-table
    ref="multipleTable"
    :data="addresses"
    tooltip-effect="dark"
    style="width: 100%; min-height: 200px; margin-top: 50px"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="收货人"
      width="100">
      <template slot-scope="scope">
          <div>
              <span>{{ scope.row.name }}</span>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="所在区域"
      width="300">
      <template slot-scope="scope">
          <div>
              <span>{{ scope.row.city }}</span>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="详细地址"
      width="300">
      <template slot-scope="scope">
          <div>
              <span>{{ scope.row.address }}</span>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="邮编"
      width="100">
      <template slot-scope="scope">
          <div>
              <span>{{ scope.row.postCode }}</span>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="电话"
      width="120">
      <template slot-scope="scope">
          <div>
              <span>{{ scope.row.mobile }}</span>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="operation"
      label="操作"
      show-overflow-tooltip>
      <template slot-scope="scope">
          <el-button
          @click.native.prevent="editAddressById(scope.$index, scope.row)"
          type="text"
          size="small">
          修改
        </el-button>
        <el-button
          @click.native.prevent="deleteAddressById(scope.$index, scope.row)"
          type="text"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { LoginUser, api } from "@/api";
import Address from "@/components/address/Address.vue";
import { Message, MessageBox } from "element-ui";

export default {
  name: "myAddress",
  components: {
    "address-bar": Address
  },
  computed: mapGetters({
    currentMember: "getCurrentMember"
  }),
  methods: {
    addAddress() {
      this.addAddressVisible = true;
    },
    handleAdd(form) {
      api.saveAddress(form).then(res => {
        api.getAddresses(
          { filter: { memberId: this.currentMember.id } },
          res => {
            this.addresses = res.data.content;
          }
        );
      });
      this.addAddressVisible = false;
    },
    cancelAdd() {
      this.addAddressVisible = false;
    },
    handleEdit(form) {
      api.editAddress(form).then(res => {
        api.getAddresses(
          { filter: { memberId: this.currentMember.id } },
          res => {
            this.addresses = res.data.content;
          }
        );
      });
      this.editAddressVisible = false;
    },
    cancelEdit() {
      this.editAddressVisible = false;
    },
    deleteAddressById(index, row) {
      MessageBox.confirm("确定要删除么？")
        .then(() => {
          api.deleteAddressById(row.id).then(res => {
            api.getAddresses(
              { filter: { memberId: this.currentMember.id } },
              res => {
                this.addresses = res.data.content;
              }
            );
          });
          Message({
            message: "该地址已删除！",
            type: "success"
          });
        })
        .catch(() => console.log("cancel deleting"));
    },
    editAddressById(index, row) {
      this.currentAddress = {
        ...row
      };
      this.editAddressVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    delectSelectedAddress() {
      for (let oneAddress of this.multipleSelection) {
        api.deleteAddressById(oneAddress.id).then(res => {
          api.getAddresses(
            { filter: { memberId: this.currentMember.id } },
            res => {
              this.addresses = res.data.content;
            }
          );
        });
        Message({
          message: "所选地址已删除！",
          type: "success"
        });
      }
    }
  },
  mounted() {
    api.getAddresses({ filter: { memberId: this.currentMember.id } }, res => {
      this.addresses = res.data.content;
    });
  },
  data() {
    return {
      addAddressVisible: false,
      editAddressVisible: false,
      addresses: [],
      currentAddress: {},
      multipleSelection: null
    };
  }
};
</script>

