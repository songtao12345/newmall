<template>
    <div id="home">
         <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
         <tab-control ref="tabControl1" class="tab-control" 
                         :titles= "['流行','新款','精选']" 
                         @tabClick="tabClick" v-show="isTabFixed"></tab-control>
        <scroll class="content" ref="scroll" 
                :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadmore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control ref="tabControl2" class="tab-control" 
                         :titles= "['流行','新款','精选']" 
                         @tabClick="tabClick"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
        <!-- 组件是不能直接监听事件的 -->
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'


import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils.js'
import {itemListenerMixin} from 'common/mixin.js'

// 用export 导出的话需要加 { }
export default {
    name: 'Home',
    components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    mixins: [itemListenerMixin],
    data() {
        return {
            result: '',
            banners: [],
            recommends: [],
            goods: {
                'pop': {page: 0, list: []},
                'new': {page: 0,list: []},
                'sell': {page: 0,list: []}
            },
            currentType: 'pop',
            isShowBackTop: false,
            tabOffsetTop: 0,
            isTabFixed: false,
            savaY: 0,
            // itemImgListener: null
        }
    },
    computed: {
        showGoods() {
           return this.goods[this.currentType].list
        }
    },
    activated() {
      
        this.$refs.scroll.scrollTo(0,this.savaY,0)
        this.$refs.scroll.refresh()
    },
    deactivated() {
        //保存Y值
        this.savaY = this.$refs.scroll.getScrollY()

        //取消全局事件监听
        this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    created() {
        // 请求多个数据
        this.getHomeMultidata()
        // 当方法执行完成后 res的值也就不存在了，所以需要一个新的变量去接收res的值
        // 垃圾回收： res 不存在之后，引用指向也不存在，故对象因没有任何指向故被销毁，但是 this.result = res 之后
        // result也指向这个对象，故不会因为res的消失而被垃圾回收掉

        //请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

        
    },
    mounted() {
        // const refresh = debounce(this.$refs.scroll.refresh,200)

        // this.itemImgListener = ()=>{
        //     // this.$refs.scroll.refresh()
        //     refresh()
        // }
        // this.$bus.$on('itemImgLoad',this.itemImgListener)

        
    },
    updated() {
       
    },
    methods: {
        swiperImageLoad() {
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            //  console.log(this.$refs.tabControl.$el.offsetTop)
        },
      
        /**
         * 
         * 事件监听相关方法
         */
        backClick() {
            console.log(this.$refs.scroll.scroll)
            // this.$refs.scroll.scroll.scrollTo(0,0,500)
            this.$refs.scroll.scrollTo(0,0)
        },
        contentScroll(position) {
            // 判断backTop是否出现
            // console.log(position.y)
            // position.y < -1000 ? this.isShowBackTop=true : this.isShowBackTop=false
            this.isShowBackTop = position.y <-1000 ? true : false
            //判断是否吸顶
            this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
        loadmore() {
            console.log('上拉加载更多...')
            this.getHomeGoods(this.currentType)
        },
        
        tabClick(index) {
            // console.log(index)
            switch(index) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
            this.$refs.tabControl1.currentIndex = index
            this.$refs.tabControl2.currentIndex = index
        },
        /**
         *   网络请求相关方法
         */
        getHomeMultidata() {
            getHomeMultidata().then(res => {
            // console.log(res)
            this.result = res
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list
        })
        },
        getHomeGoods(type) {
            const page = this.goods[type].page + 1
            getHomeGoods(type, page).then(res => {
            // console.log(res)
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1
        })
        }
    }
}
</script>

<style scoped>
#home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
}
.home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0; */
    width: 100%;
}
.tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
}
.content {
    /* height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}

</style>