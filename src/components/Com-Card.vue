<!--  -->
<template>
  <div class="mw-card" :style="cardSize">
    <img :src="imgSrc" :alt="title" />
    <div class="footer">
      <h3 class="title">{{ title }}</h3>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComCard',
  props: {
    height: {
      default: 215,
      type: Number,
    },
    width: {
      default: 325,
      type: Number,
    },
    bgc: {
      default: '#CCCCCC',
      type: String,
    },
    imgSrc: {
      default: '',
      type: String,
    },
    title: {
      default: '',
      type: String,
    },
    description: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      cardSize: {
        height: this.height + 'px',
        width: this.width + 'px',
        'background-color': this.bgc,
      },
    }
  },

  mounted() {},

  methods: {},
}
</script>
<style scoped>
.mw-card {
  border-radius: 3px;
  transition: all 0.5s ease;
  margin:20px 20px ;
  cursor: pointer;
}
.mw-card:hover {
  box-shadow: 3px 3px 3px 1px snow;
}
img {
  height: 65%;
  width: 100%;
}
.footer {
  height: 35%;
  width: 100%;
  padding-left: 5px;
}
h3{
  padding: 0;
  margin: 0;
}
</style>