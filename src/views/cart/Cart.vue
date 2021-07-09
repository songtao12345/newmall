<template>
    <div class="cart">
        <!-- 导航部 -->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
        <!-- 商品列表 -->
        <scroll class="content" ref="scroll">
            <div class="cart-list">
                 <cart-list></cart-list>
            </div> 
        </scroll>
        

        <!-- 底部 -->
        <cart-bottom-bar></cart-bottom-bar>

    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'
import Scroll from 'components/common/scroll/Scroll'
import {mapGetters} from 'vuex'
export default {
    name: 'Cart',
    components: {
        NavBar,
        CartList,
        Scroll,
        CartBottomBar
    },
    activated() {
        this.$refs.scroll.refresh()
    },
    computed: {
        // cartLength() {
        //     // return this.$store.state.cartList.length
        //     return this.$store.getters.cartLength
        // }
        // ...mapGetters(['cartLength'])
        ...mapGetters({
            cartLength: 'cartLength',
            cartList: 'cartList'
        })
    }
}
</script>

<style scoped>
.cart {
    height: 100vh;
    /* height: calc(100vh - 44px - 49px); */
}
.nav-bar {
    background-color: var(--color-tint);
    color: #fff;
}

.content {
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
}
.cart-list {
    /* height: calc(100% - 44px - 49px); */
    height: 100%;
}

</style>