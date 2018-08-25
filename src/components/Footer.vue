<template>
  <div class="footer">
    <!-- <div style="width: 60%; height: 50px; margin: 0 auto; line-height: 50px">
      <span style="font-size: 18px; font-weight: bold">关于创优家居&nbsp;&nbsp;&nbsp;： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0瑕疵高质量&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客服满意率95%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;支持质量退换货&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8小时快速退款 </span>
    </div> -->
    <el-row :gutter="'20'" style="width: 90%; height: 80px; margin: 0 auto">
      <el-col :span="6">
        <ul>
          <li>关于我们</li>
          <li>关于快递</li>
          <li>关于运费</li>
        </ul>
      </el-col>
      <el-col :span="6">
        <ul>
          <li>付款方式</li>
          <li>联系客服</li>
          <li>其他合作</li>
        </ul>
      </el-col>
      <el-col :span="6">
        <span style="line-height: 80px; font-size: 14px">客服热线：<span style="font-size: 18px">000-000-000</span></span>
      </el-col>
      <el-col :span="6">
        <span style="line-height: 80px; font-size: 14px">运营时间：全天候 <span style="font-size: 18px; color: #ab2c2b">24</span> 小时</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="10">
        <span style="font-size: 14px">&copy;江苏师范大学</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
.footer {
    background-color: #E0E0E0;
    height: 150px;
}
li {
  list-style: none;
  font-size: 14px;
}
</style>


