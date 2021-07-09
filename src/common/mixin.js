import {debounce} from './utils.js'
import BackTop from 'components/content/backTop/BackTop'
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh,200)
         this.itemImgListener = ()=>{
             refresh()
        }
        this.$bus.$on('itemImgLoad',this.itemImgListener)
        // console.log('我是混入中的内容')
    }
}

// export const backTopMixin = {
//     data() {
//         return {
//             isShowBackTop: false
//         }
//     },
//     components: {
//         BackTop
//     },
//     methods: {
//         backClick() {
//             console.log(this.$refs.scroll.scroll)
//             // this.$refs.scroll.scroll.scrollTo(0,0,500)
//             this.$refs.scroll.scrollTo(0,0)
//         },
//         listenShowBackTop() {
         
//         }
//     }
// }