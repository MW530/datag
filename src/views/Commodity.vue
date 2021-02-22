<!-- 商品页面 -->
<template>
  <div>
    <el-container>
      <el-header @click.native="logData">Headr</el-header>
      <el-main>
        <ComCommodity
          v-for="item in commodity"
          :key="item.id"
          :title="item.name"
          :description="item.description"
          :imgSrc="item.imgSrc"
          v-listen:summer="{direction: 'bottom', subType: item.type}"
          @click.native="logCard(item)"
        ></ComCommodity>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import { commodity } from '../mock/index'
import ComCommodity from '../components/Com-Card.vue'

export default {
  name: 'Commodity',
  components: {
    ComCommodity,
  },
  data() {
    return {
      commodity: [],
      userInfo: {},
    }
  },

  mounted() {
    this.commodity = commodity()
    let baseData = this.$datag.enviData(2)
    console.log(baseData)
  },

  methods: {
    logData() {
      console.log(this.$datag)
    },
    logCard(item) {
      console.log(item.type)
    },
  },
}
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
body > .el-container {
  margin-bottom: 40px;
}
.mw-card:last-child{
  margin-right: auto;
  background-color: rgb(255, 155, 155) !important;
}
</style>
