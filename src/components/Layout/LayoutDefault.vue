<template>
    <div>
        <Header/>
        <div class="main">
                <div class="wrapper">
                    <slot/>
                    <!-- вот здесь слот вообще супер непонятный, есть <router-view></router-view> -->
                </div>
            </div>
        <Footer/>
    </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
.main{
    background: #f5f5f5;
}
.wrapper{
    width: 1360px;
    margin: 0 auto;
    min-height: calc(100vh - 92px);
    background: #eeeeee;
}
</style>
