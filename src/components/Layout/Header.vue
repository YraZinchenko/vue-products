<template>
  <div class="header">
      <div class="wrapper">
          <span class="logo-title">Products</span>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchInput: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header{
    width: 100%;
    background: #3d5afe;
    .wrapper{
        width: 1024px;
        margin: 0 auto;
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo-title{
            color: #ffffff;
            font-size: 22px
        }
        .searchInput{
            border: none;
            padding: 5px;
            font-size: 18px;
            border-radius: 5px;
        }
    }
}

</style>
