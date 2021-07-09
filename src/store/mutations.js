export default {
    addCounter(state, payLoad) {
        payLoad.count++
    },
    addToCart(state,payLoad) {
        payLoad.checked = false
     state.cartList.push(payLoad)
    }
 }

 