import Vue from "vue";
import router from "@/router";
import VueResource from "vue-resource";
import { setCookie } from "tiny-cookie";
import { Message, MessageBox, Loading } from "element-ui";
import * as types from "@/store/mutation-types";
import "element-ui/lib/theme-chalk/index.css";

window.$ = require("jquery");

Vue.use(VueResource);
export const LoginUser = {
  currentMember: null,
  get: () => {
    if (!this.currentMember) {
      let currentMemberStorage = window.localStorage.getItem("currentMember");
      this.currentMember = currentMemberStorage
        ? JSON.parse(currentMemberStorage)
        : null;
    }
    return this.currentMember;
  },
  save: currentMember => {
    this.currentMember = currentMember;
    window.localStorage.setItem(
      "currentMember",
      currentMember ? JSON.stringify(currentMember) : null
    );
    if (currentMember) {
      setCookie(
        types.X_MG_AUTH_TOKEN,
        currentMember.token[types.X_MG_AUTH_TOKEN]
      );
    }
  },
  // isAuthenticated: () => {
  //     let currentMember = this.get()
  //     return currentMember && currentMember.token
  // }
  isAuthenticated: () => {
    if (!this.currentMember) {
      let item = window.localStorage.getItem("currentMember");
      this.currentMember =
        item && item !== "undefined" && item != "null"
          ? JSON.parse(item)
          : null;
    }
    return this.currentMember && this.currentMember.token;
  }
  // isRole(role) {
  //     if (!this.isAuthenticated()) {
  //         return false
  //     }
  //     let user = this.get().user
  //     if (user && user.username === types.ADMIN) {
  //         return true
  //     } else if (user && user.authorities) {
  //         for (let authority of user.authorities) {
  //             if (role === authority.key) {
  //                 return true
  //             }
  //         }
  //     }
  //     return false
  // }
};

Vue.http.interceptors.push(function(request, next) {
  console.log("Vue-resource >>", request);
  let loadingInstance = null;
  const closeLoading = () => {
    if (loadingInstance) {
      loadingInstance.close();
      loadingInstance = null;
    }
  };
  const responseHandler = response => {
    closeLoading();
    if (!response.ok) {
      if (response.body && response.body.message) {
        if (
          request.method === "DELETE" &&
          response.body.message.indexOf("SQL") >= 0
        ) {
          // Message.error('删除错误，数据可能被引用，不能被删除')
        } else {
          Message.error(response.body.message);
        }
      } else {
        Message.error("操作错误");
      }
      console.log(response.statusText, response.bodyText);
    } else if (request.method === "PUT") {
      console.log(request);
      // Message.success('保存成功')
    } else if (request.method === "DELETE") {
      // Message.success('删除成功')
    }
    console.log("Vue-resource <<", response);
  };

  if (LoginUser.isAuthenticated()) {
    request.headers.set(
      types.X_MG_AUTH_TOKEN,
      LoginUser.get().token[types.X_MG_AUTH_TOKEN]
    );
  }
  if (request.method === "POST") {
    loadingInstance = Loading.service({
      fullscreen: true,
      text: "玩命加载中 ...",
      target: "#loadingTarget"
    });
    setTimeout(() => closeLoading(), 20000);
    next(responseHandler);
  } else if (request.method === "DELETE") {
    // MessageBox.confirm('确定要删除么？')
    //     .then(() => {
    //         next(responseHandler)
    //     })
    //     .catch(() => console.log('cancel deleting'))
  } else {
    next(responseHandler);
  }
  // continue to next interceptor
});
class Api {
  register(member) {
    return Vue.http.post("/api/member/register", member);
  }

  login(username, password, cb) {
    Vue.http
      .post("/api/member/login", { username, password })
      .then(response => {
        LoginUser.save(response.data);
        cb ? cb(response) : undefined;
      });
  }

  editMember(member) {
    return Vue.http.put("/api/member", member);
  }

  // 商品
  getGoods(filter, cb) {
    Vue.http
      .post("/api/goods", filter)
      .then(response => (cb ? cb(response) : undefined));
  }
editGoods(goods) {
        return Vue.http.put('/api/goods', goods)
    }
  getGoodsById(id, cb) {
    Vue.http
      .get(`/api/goods/${id}`)
      .then(response => (cb ? cb(response) : undefined));
  }

  // 购物车
  getShoppingCarts(filter, cb) {
    Vue.http
      .post("/api/shoppingCart", filter)
      .then(response => (cb ? cb(response) : undefined));
  }
  saveShoppingCart(shoppingCart) {
    return Vue.http.put("/api/shoppingCart", shoppingCart);
  }
  editShoppingCart(shoppingCart) {
    return Vue.http.put("/api/shoppingCart", shoppingCart);
  }
  deleteShoppingCart(id) {
    return Vue.http.delete("/api/shoppingCart/" + id);
  }

  // 收藏商品
  getCollectGoods(filter, cb) {
    Vue.http
      .post("/api/collectGoods", filter)
      .then(response => (cb ? cb(response) : undefined));
  }
  saveCollectGoods(collectGoods) {
    return Vue.http.put("/api/collectGoods", collectGoods);
  }
  deleteCollectGoods(id) {
    return Vue.http.delete("/api/collectGoods/" + id);
  }

  getCollectGoodsByGoodsIdAndMemberId(goodsId, memberId, cb) {
    Vue.http
      .get(`/api/collectGoods/one?goodsId=${goodsId}&memberId=${memberId}`)
      .then(response => (cb ? cb(response) : undefined));
  }

  //收货地址
  getAddresses(filter, cb) {
    Vue.http
      .post("/api/address", filter)
      .then(response => (cb ? cb(response) : undefined));
  }

  saveAddress(address) {
    return Vue.http.put("/api/address", address);
  }
  editAddress(address) {
    return Vue.http.put("/api/address", address);
  }
  deleteAddressById(id) {
    return Vue.http.delete("/api/address/" + id);
  }

  // 订单
  getOrders(filter, cb) {
    Vue.http
      .post("/api/order", filter)
      .then(response => (cb ? cb(response) : undefined));
  }

  saveOrder(order) {
    return Vue.http.put("/api/order", order);
  }
  editOrder(order) {
    return Vue.http.put("/api/order", order);
  }
  deleteOrderById(id) {
    return Vue.http.delete("/api/order/" + id);
  }

  // 评论
  getComments(filter, cb) {
    Vue.http
      .post("/api/comment", filter)
      .then(response => (cb ? cb(response) : undefined));
  }

  saveComment(comment) {
    return Vue.http.put("/api/comment", comment);
  }

  getCommentByOrderIdAndMemberId(orderId, memberId, cb) {
    Vue.http
      .get(`/api/comment?orderId=${orderId}&memberId=${memberId}`)
      .then(response => (cb ? cb(response) : undefined));
  }
}

export const api = new Api();
