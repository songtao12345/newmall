export default {
    addCart(context,payLoad) {
     return new Promise((resolve,reject) => {
            // state.cartList.push(payLoad)
            let oldProduct = null 
            for(let item of context.state.cartList) {
                // console.log(item)
                if(item.iid === payLoad.iid) {
                    oldProduct = item
                }
    
            }
            if(oldProduct) {
                // oldProduct.count += 1
                context.commit('addCounter', oldProduct)
                resolve('当前商品数量加1')
            }else {
                payLoad.count = 1
                // context.state.cartList.push(payLoad)
                context.commit('addToCart',payLoad)
                resolve('添加了新的商品')
            }
    })

    }
}