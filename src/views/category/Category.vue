<template>
<div class="wrapper" ref="wrap">
     <div class="content">
        category
        <ul>分类列表1</ul>
        <ul>分类列表2</ul>
        <ul>分类列表3</ul>
        <ul>分类列表4</ul>
        <ul>分类列表5</ul>
        <ul>分类列表6</ul>
        <ul>分类列表7</ul>
        <ul>分类列表8</ul>
        <ul>分类列表9</ul>
        <ul>分类列表10</ul>
        <ul>分类列表11</ul>
        <ul>分类列表12</ul>
        <ul>分类列表13</ul>
        <ul>分类列表14</ul>
        <ul>分类列表15</ul>
        <ul>分类列表16</ul>
        <ul>分类列表17</ul>
        <ul>分类列表18</ul>
        <ul>分类列表19</ul>
        <ul>分类列表20</ul>
        <ul>分类列表21</ul>
        <ul>分类列表22</ul>
        <ul>分类列表23</ul>
        <ul>分类列表24</ul>
        <ul>分类列表25</ul>
        <ul>分类列表26</ul>
        <ul>分类列表27</ul>
        <ul>分类列表28</ul>
        <ul>分类列表29</ul>
        <ul>分类列表30</ul>
        <ul>分类列表31</ul>
        <ul>分类列表32</ul>
        <ul>分类列表33</ul>
        <ul>分类列表34</ul>
        <ul>分类列表35</ul>
        <ul>分类列表36</ul>
        <ul>分类列表37</ul>
        <ul>分类列表38</ul>
        <ul>分类列表39</ul>
        <ul>分类列表40</ul>
        <ul>分类列表41</ul>
        <ul>分类列表42</ul>
        <ul>分类列表43</ul>
        <ul>分类列表44</ul>
        <ul>分类列表45</ul>
        <ul>分类列表46</ul>
        <ul>分类列表47</ul>
        <ul>分类列表48</ul>
        <ul>分类列表49</ul>
        <ul>分类列表50</ul>
        <ul>分类列表51</ul>
        <ul>分类列表52</ul>
        <ul>分类列表53</ul>
        <ul>分类列表54</ul>
        <ul>分类列表55</ul>
        <ul>分类列表56</ul>
        <ul>分类列表57</ul>
        <ul>分类列表58</ul>
        <ul>分类列表59</ul>
        <ul>分类列表60</ul>
        <ul>分类列表61</ul>
        <ul>分类列表62</ul>
        <ul>分类列表63</ul>
        <ul>分类列表64</ul>
        <ul>分类列表65</ul>
        <ul>分类列表66</ul>
        <ul>分类列表67</ul>
        <ul>分类列表68</ul>
        <ul>分类列表69</ul>
        <ul>分类列表70</ul>
        <ul>分类列表71</ul>
        <ul>分类列表72</ul>
        <ul>分类列表73</ul>
        <ul>分类列表74</ul>
        <ul>分类列表75</ul>
        <ul>分类列表76</ul>
        <ul>分类列表77</ul>
        <ul>分类列表78</ul>
        <ul>分类列表79</ul>
        <ul>分类列表80</ul>
        <ul>分类列表81</ul>
        <ul>分类列表82</ul>
        <ul>分类列表83</ul>
        <ul>分类列表84</ul>
        <ul>分类列表85</ul>
        <ul>分类列表86</ul>
        <ul>分类列表87</ul>
        <ul>分类列表88</ul>
        <ul>分类列表89</ul>
        <ul>分类列表90</ul>
        <ul>分类列表91</ul>
        <ul>分类列表92</ul>
        <ul>分类列表93</ul>
        <ul>分类列表94</ul>
        <ul>分类列表95</ul>
        <ul>分类列表96</ul>
        <ul>分类列表97</ul>
        <ul>分类列表98</ul>
        <ul>分类列表99</ul>
        <ul>分类列表100</ul>
    </div>
</div>
   
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'Category',
    data() {
        return {
            scroll: null
        }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrap,{
            probeType: 2,
            click: true,
            pullUpLoad: true
        })
        this.scroll.on('scroll',(position)=> {
            // console.log(position)
        })
        this.scroll.on('pullingUp', ()=>{
            console.log('上拉加载更多...')
            setTimeout(() => {
                this.scroll.finishPullUp()
            }, 2000);
        })
    }
    // mounted() {
    //     // console.log(this.$refs.wrap)
    //  this.scroll = new BScroll('.wrapper',{
    //      probeType: 2,
    //      click: true,
    //      pullUpLoad: true
    //   })
    //   this.scroll.on('scroll',(position) => {
    //     //   console.log(position)
    //   })
    //   this.scroll.on('pullingUp',() => {
    //       console.log('上拉加载更多...')


    //       setTimeout(() => {
    //         this.scroll.finishPullUp()
    //       }, 2000);
    //   })
    // }
}
</script>

<style scoped>
.wrapper {
    height: 150px;
    background-color: red;
    overflow: hidden;
    /* overflow-y: scroll; */
}
</style>