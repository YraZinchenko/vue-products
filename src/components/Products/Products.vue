<template>
    <!-- вот здесь тоже очень непонятно, почему слотом вставляеться страница, где роутинг на страницу юзаеться непонятно хотя роутинг есть -->
    <layout-default>
      <div class="main">
        <div class="sidebar">
          <div v-for="(category, index) in filterCategory"
               :key="index"
               v-on:click="handleClick(category)"
               class="sidebar-link"
               active-class="sidebar-link__active"
          >
          <!-- снова таки код стайл, сейчас читать код неудобно, лучше писать вcе в столбик -->
          <!-- непонятно зачем index здесь если filterCategory это просто массив,а не обьект, в :key индекс никогда не пишемь, юзаем в данном случаем category -->
            {{category}}
            <!-- код стайл тоже бы неполохо учитывать, лучше переменные писать {{category}} -->
          </div>
          <div>
            <input type="text" class="searchInput" placeholder="Search" v-model="searchInput">
            <button @click="handleSubmit">Search</button>
          </div>
        </div>
        <div class="list">
          <Item v-for="(product, index) in filterProducts" :key="index" :product="product"/>
          <!-- Непонятно что за айтем, название лучше сменить -->
          <!-- тут с :key таже ситуацыя что и выше. в данном случае в key юзаем product.name -->
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
      // юзаем двойные кавычки ""
    }
  },
  created () {
    getProducts()
      .then((response) => {
        // лишние () в (response)
        this.products = response.data
        this.filterProducts = response.data
        // почему у нас из response.data идет и продукты и фильтр продукты. Непонятно
        this.products.forEach(product => this.filterCategory.push(product.bsr_category))
        this.filterCategory = Array.from(new Set(this.filterCategory))
        // лишняя логика скорее всего, зачем Array.from еще здесь, непонятно
        if (this.$route.params.category || this.$route.params.name) {
          this.handleFilterProducts()
        }
      })
      .catch((err) => console.log(err))
      // лишние () в (err)
  },
  methods: {
    handleClick (category) {
      this.$router.push({ name: 'ProductsCategory',
        params: {
          category: category
        } })
      // почему вызов метода после пуша? очень непонятная структура
      this.handleFilterProducts(category)
    },
    handleFilterProducts (category = this.$route.params.category) {
      this.filterProducts = this.products.filter(product => product.bsr_category === category)
      if (this.$route.params.name) {
        // параметр name очень не удачный, непонятно что это и как это есть, почему при name другое действие, вот с category все понятно, а с этим нет
        this.filterProducts = this.products.filter(product => product.name.includes(this.$route.params.name))
      }
    },
    handleSubmit () {
      if (this.$route.params.category) {
        this.$router.push({ name: 'ProductsCategoryName',
          params: {
            name: this.searchInput
          } })
        // код стайл учитываем. }
        //                     })
      } else {
        this.$router.push({ name: 'ProductsName',
          params: {
            name: this.searchInput
          } })
        // код стайл учитываем. }
        //                     })
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
