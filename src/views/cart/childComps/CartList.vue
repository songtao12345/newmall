<template>
    <div class="cart-list">
        <cart-list-item v-for="(item ,index) in cartList" :key="index" :item-info="item"></cart-list-item>
      
        
        <!-- <ul>
            <li>内容*</li>
        </ul> -->
        <!-- <li v-for="(item,index) in cartList" :key="index">{{item}}</li> -->
        <!-- <scroll class="conetnt"> -->
            <!-- <li v-for="(item,index) in cartList" :key="index">{{item}}</li> -->
           
        <!-- </scroll> -->
    </div>
</template>

<script>
import CartListItem from './CartListItem.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'CartList',
    components: {
        CartListItem
    },
    computed: {
        ...mapGetters(['cartList'])
    }
}
</script>

<style scoped>

</style>