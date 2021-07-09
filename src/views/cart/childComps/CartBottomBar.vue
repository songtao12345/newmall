<template>
    <div class="bottom-bar">
        <div class="check-content" >
            <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
            <span>全选</span>
        </div>
        <div class="price">
          合计:{{totalPrice}}
        </div>
        <div class="calculate" @click="calcClick">
            去计算({{checkedLength}})
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
    name: 'CartBottomBar',
    methods: {
        checkClick() {
            if(this.isSelectAll) {
                this.$store.state.cartList.forEach(item => item.checked = false)
            }else {
                this.$store.state.cartList.forEach(item => item.checked = true)
            }
        },
        calcClick() {
            if(!this.isSelectAll) {
                this.$toast.show('请选择购买商品',2000)
            }
        }
    },
    computed: {
        totalPrice() {
            return '￥' + this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue,item) => {
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        checkedLength() {
            return this.$store.state.cartList.filter(item => {
                return item.checked
            }).length
        },
        isSelectAll() {
            if(this.$store.state.cartList.length === 0) return false
            return !this.$store.state.cartList.find(item => {
                return !item.checked
            })
            // find 只要能找到就停止
        }
    },
    components: {
        CheckButton
    }
}
</script>

<style scoped>
.bottom-bar {
    height: 40px;
    background-color: #eee;
    position:relative;
    line-height: 40px;
    display: flex;
}
.check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    width: 60px;
}
.check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
}
.price {
    flex: 1
}
.calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
}
</style>