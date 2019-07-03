<template>
    <layout-default>
      <div class="main">
        <div class="sidebar">
          <div v-for="(category, index) in filterCategory"
          :key="index"
          v-on:click="handleClick(category)"
          class="sidebar-link"
          active-class="sidebar-link__active"
          // код стайл где? должно быть все в одну линию a
                                                         b
                                                         c
                                                         d
                                                         e
                                                         f
          >
            {{category}}
          </div>
          <div>
            <input type="text" class="searchInput" placeholder="Search" v-model="searchInput">
            <button @click="handleSubmit">Search</button>
          </div>
        </div>
        <div class="list">
          <Item v-for="(product, index) in filterProducts" :key="index" :product="product"/>
          // что за айтем такой не понятно, если не смотреть в структуру папок то вообще не знаешь что это, лучше сменить название
        </div>
      </div>
    </layout-default>
</template>

<script>
import LayoutDefault from '../Layout/LayoutDefault'
import Item from './Item'
import { getProducts } from '../../api/index'

export default {
  name: `Products`,
  components: {
    LayoutDefault,
    Item
  },
  data () {
    return {
      products: [],
      filterCategory: [],
      filterProducts: [],
      searchInput: ''
    }
  },
  created () {
    getProducts()
      .then((response) => {
        this.products = response.data
        this.filterProducts = response.data
        this.products.forEach(product => this.filterCategory.push(product.bsr_category))
        this.filterCategory = Array.from(new Set(this.filterCategory))

        if (this.$route.params.category || this.$route.params.name) {
          this.handleFilterProducts()
        }
      })
      .catch((err) => console.log(err))
  },
  methods: {
    handleClick (category) {
      this.$router.push({ name: 'ProductsCategory',
        params: {
          category: category
        } })
      this.handleFilterProducts(category)
      // а вот здесь вызов метод после пуша роутинга вообще работает? даже если работает лучше вынести перед пуш
    },
    handleFilterProducts (category = this.$route.params.category) {
      this.filterProducts = this.products.filter(product => product.bsr_category === category)
      if (this.$route.params.name) {
        this.filterProducts = this.products.filter(product => product.name.includes(this.$route.params.name))
      }
    },
    handleSubmit () {
      if (this.$route.params.category) {
        this.$router.push({ name: 'ProductsCategoryName',
          params: {
            name: this.searchInput
          } })
      } else {
        this.$router.push({ name: 'ProductsName',
          params: {
            name: this.searchInput
          } })
      }
      this.handleFilterProducts()
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  display: flex;
  .sidebar{
    width: calc(100% - 1024px);
    display: flex;
    flex-direction: column;
    .sidebar-link{
      padding: 15px 5px;
      text-decoration: none;
      background: #eeeeee;
      cursor: pointer;
    }
    .searchInput{
            border: none;
            padding: 5px;
            font-size: 18px;
            border-radius: 5px;
        }
  }
  .list{
    width: 1200px;
    display: flex;
    flex-wrap: wrap;
  }
}

</style>
