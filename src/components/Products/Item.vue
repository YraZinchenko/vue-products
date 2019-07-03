<template>
    <div class="card">
        <img :src="product.img">
        <div class="card-info">
            <a :href="product.link" class="card-link">{{cutName(product.name)}}</a>
            <div class="card-price">Price: {{product.price}}</div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    product: Object
  },
  methods: {
    cutName (name) {
      return name.slice(0, 15)
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
    width: 320px;
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    margin: 5px 15px;
    img{
        width: 320px;
        height: 240px;
    }
    .card-info{
        display: flex;
        justify-content: space-between;
        padding: 10px 7px;
        width: 100%;
        .card-link{
            color: #000000;
            text-decoration: none;
            &:hover{
                text-decoration: underline;
            }
        }
        .card-price{
            font-size: 18px;
        }
    }
}
</style>
