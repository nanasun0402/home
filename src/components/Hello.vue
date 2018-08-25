<template>
  <div class="hello">
      <!--轮播 -->
      <div :style="{marginTop: '20px'}">
          <el-carousel trigger="click" width="100%" height="500px">
                <el-carousel-item>
                    <img src='@/assets/lunbo_1.png' alt="" width="100%" height="500px">
                </el-carousel-item>
                <el-carousel-item>
                    <img src='@/assets/lunbo_2.png' alt="" width="1200px" height="500px">
                </el-carousel-item>
                <el-carousel-item>
                    <img src='@/assets/lunbo_3.png' alt="" width="1200px" height="500px">
                </el-carousel-item>
                <el-carousel-item>
                    <img src='@/assets/lunbo_4.png' alt="" width="1200px" height="500px">
                </el-carousel-item>
          </el-carousel>
      </div>
      <!--今日新品 -->
      <div class="shops">
          <div class="new">
              <div style="text-align: center; height: 80px; line-height: 80px">
                <p style="color: #ac2c2b; font-size: 24px; font-weight: blod">今日新品</p>
             </div>
             <div>
                <new-goods :label="label1"></new-goods>
             </div>
          </div>
          <!-- 本周热销 -->
          <div class="hot">
            <div style="text-align: center; height: 80px; line-height: 80px">
              <p style="color: #ac2c2b; font-size: 24px; font-weight: blod">本周热销</p>
            </div>
            <div>
                <new-goods :label="label2"></new-goods>
            </div>
          </div>
          <!-- 优品特惠 -->
          <div class="hot">
            <div style="text-align: center; height: 80px; line-height: 80px">
              <p style="color: #ac2c2b; font-size: 24px; font-weight: blod">优品特惠</p>
            </div>
            <div>
                <new-goods :label="label3"></new-goods>
            </div>
          </div>
      </div>
      
      
  </div>
</template>

<script>
import NewGoods from "@/components/goods/NewGoods";
export default {
  name: 'Hello',
  components: {
      "new-goods" : NewGoods
  },
  data() {
      return {
          carousels:[
              '@/assets/lunbo_1.png',
              '@/assets/lunbo_2.png',
              '@/assets/lunbo_3.png',
              '@/assets/lunbo_4.png'
          ],
          label1: '今日新品',
          label2: '本周热销',
          label3: '优品特惠'
      }
  }
}
</script>

<style>
.hello {
    width: 100%;
    height: 100%;
}
.shops {
    width: 100%;
    height: 100%;
}
</style>


