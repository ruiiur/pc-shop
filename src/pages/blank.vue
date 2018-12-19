<!--这是空白页面-->
<template>
    <div class="blank">
        <div>
             <img src="../assets/images/lose.png" alt="">
             <p>{{tip}}</p>
        </div>
    </div>
</template>
<script>
import tools from "../common/tools";
export default {
    data(){
        return{
            tip:'',
        }
    },
    methods: {
        blankInit(){
            this.tip=tools.getLocalStorage("tip");
            console.log(tools.getLocalStorage("tipUrl"));
            if(tools.getLocalStorage("tipUrl")!=''){
                setTimeout(()=>{
                    window.location.href=tools.getLocalStorage("tipUrl");
                },3000)
            }
        }
    },
    mounted(){
        this.blankInit();
    }
}
</script>

<style lang="scss">
.blank{
    div{
        margin-top:100px;
        text-align: center;
        >p{
            @include sc(18px,red);
            margin-top: 10px;
        }
    }
}
</style>
