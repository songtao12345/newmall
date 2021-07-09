<template>
    <div id="detail">
        <!-- 详情页+{{iid}} -->
       <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="nav"></detail-nav-bar>
       <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
           <!-- <div>{{$store.state.cartList.length}}</div> -->
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
            <goods-list :goods="recommends" ref="recommends"></goods-list>
       </scroll>
            <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
            <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
            <toast :message="message" :show="show"></toast>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'
import Toast from 'components/common/toast/Toast'

import {debounce} from 'common/utils.js'
import {itemListenerMixin} from 'common/mixin.js'
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail.js'
export default {
    name: 'Detail',
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        Scroll,
        DetailCommentInfo,
        DetailBottomBar,
        GoodsList,
        BackTop,
        Toast
    },
    mixins: [itemListenerMixin],
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            getThemeTopY: null,
            currentIndex: 0,
            isShowBackTop: false,
            message: '',
            show: false
            // itemImgListener: null
        }
    },
    methods: {
        addToCart() {
           //获取购物车需要展示的信息
           const product = {}
           product.image = this.topImages[0]
           product.title = this.goods.title
           product.desc = this.goods.desc
           product.price = this.goods.realPrice
           product.iid = this.iid

           //将商品添加进购物车
        //    this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product).then(res => {
            console.log(res)
            // this.show = true;
            // this.message = res;

            // setTimeout(() => {
            //     this.show = false
            //     this.message = ''
            // }, 1500);

            this.$toast.show(res,1500)
        })

        },
        //回到顶部
    backClick() {
            console.log(this.$refs.scroll.scroll)
            // this.$refs.scroll.scroll.scrollTo(0,0,500)
            this.$refs.scroll.scrollTo(0,0)
        },
        imageLoad() {
            this.$refs.scroll.refresh()
            this.getThemeTopY()
                //图片加载之后获取offsetTop
                // this.themeTopYs = []
                // this.themeTopYs.push(0)
                // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
                // console.log(this.themeTopYs)
        },
        itemClick(index) {
            // console.log(index)
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
        },
        contentScroll(position) {
            //获取y值
            const positionY = -position.y
            // console.log(positionY)
            //positionY和主题中的值进行对比
            let length = this.themeTopYs.length
            for(let i = 0; i<length; i++){
                if(this.currentIndex !== i && ((i <length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length-1 && positionY >= this.themeTopYs[i]))) {
                    this.currentIndex = i
                    // console.log(this.currentIndex)
                    this.$refs.nav.currentIndex = this.currentIndex
                }
               
            }

            // 判断是否显示回到顶部
            this.isShowBackTop = position.y <-1000 ? true : false
        }
    },
    
    created() {
        // console.log(this.$route.params.iid)
        this.iid = this.$route.params.iid
        // 请求详情数据
        getDetail(this.iid).then(res => {
            // console.log(res)
            const data = res.result
            // 获取顶部图片
            this.topImages = data.itemInfo.topImages

            // 获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

            // 获取店铺信息
            this.shop = new Shop(data.shopInfo)

            //获取商品详情数据
            this.detailInfo = data.detailInfo

            // 获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

            //获取评论信息
       
            if(data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0]
            }
                // 图片没加载出来这时候
            // this.$nextTick(()=>{
            //     this.themeTopYs = []
            //     this.themeTopYs.push(0)
            //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
            //     console.log(this.themeTopYs)
            // })
        })

        // 请求推荐数据
        getRecommend().then(res => {
            console.log(res)
            this.recommends = res.data.list
        })

        //给getThemeTopY赋值
        this.getThemeTopY = debounce(()=>{
             this.themeTopYs = []
                this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
                console.log(this.themeTopYs)
        },500)
    },
    mounted() {
        //   const refresh = debounce(this.$refs.scroll.refresh,200)
        //  this.itemImgListener = ()=>{
        //      refresh()
        // }
        // this.$bus.$on('itemImgLoad',this.itemImgListener)
     
    },
    updated() {
        // this.themeTopYs = []
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        // console.log(this.themeTopYs)
    },
    destroyed() {
        // console.log('destroyed')
        //取消全局事件监听
        this.$bus.$off('itemImgLoad',this.itemImgListener)
    }
}
</script>

<style scoped>
#detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
}
.content {
    height: calc(100% - 44px - 49px);
}
.detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
}
</style>