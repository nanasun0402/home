<template>
  <span>
        <el-dialog title="添加地址" :visible="true" :before-close="() => onCancel()" width="700px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item label="所在区域">
                    <el-input v-model="form.city"></el-input>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="邮编">
                    <el-input v-model="form.postCode"></el-input>
                </el-form-item>
                <!-- <el-form-item>
                  <span>设为默认地址</span>
                  <el-switch
                      v-model="defaultAddress"
                      active-color="#13ce66"
                      @change="defaultChange"
                      >
                  </el-switch>
                </el-form-item> -->
                <el-form-item>
                    <el-button @click="onCancelDialog">取消</el-button>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </span>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { LoginUser, api } from "@/api";
import * as types from "@/store/mutation-types";
export default {
  name: "login",
  props: ["onConfirm", "onCancel", "initData"],
  computed: mapGetters({
    currentMember: "getCurrentMember",
    shoppingCarts: "getShoppingCarts"
  }),
  methods: {
    ...mapActions(["getAddresses"]),
    ...mapMutations({
      setCurrentMember: types.SET_CURRENT_MEMBER,
      setShoppingCartFilter: types.SET_SHOPPING_CART_FILTER
    }),
    onSubmit() {
      if (this.onConfirm) {
        if (this.currentMember) {
          this.form = {
            ...this.form,
            member: this.currentMember
          };
        }
        this.onConfirm(this.form);
      }
    },
    onCancelDialog() {
      if (this.onCancel) {
        this.onCancel(this.form);
      }
    },
    defaultChange() {
      if (this.defaultAddress === true) {
        this.form.isDefault = true;
      }
    }
  },
  mounted() {
    console.log("In Login mounted");
    if (this.initData) {
      this.form = this.initData
        ? { ...this.initData }
        : {
            name: "",
            mobile: "",
            city: "",
            address: "",
            postCode: "",
            isDefault: false,
            member: this.currentMember
          };
    }
  },
  data() {
    return {
      form: {
        name: "",
        mobile: "",
        city: "",
        address: "",
        postCode: "",
        isDefault: false,
        member: this.currentMember
      },
      defaultAddress: false
    };
  }
};
</script>

