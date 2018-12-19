<!--这是底部导航组件-->
<template>
    <div class="footer">
        <p>技术支持：上海竞界科技有限公司   | © 2018 laolvyou.vip, All rights reserved.    |   沪ICP备18020065号-2</p>
    </div>
</template>
<script>

export default {
  props: {},
  data() {
    return {
    
    };
  },
  methods: {
  
  },
  mounted() {
  
  }
};
</script>

<style lang="scss">
.footer{
    width:100%;
    height: 91px;
    background: #202121;
    padding-top: 40px;
    box-sizing: border-box;
    >p{
        @include sc(14px,#fff);
        text-align: center; 
    }
}
</style>
