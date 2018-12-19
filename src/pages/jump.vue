<!--过渡提示页面-->
<template>
    <div class="jump">
        <img src="../assets/images/jump.gif" alt="">
        <p>加载中...</p>
    </div>
</template>
<script>
import { erpLogin } from '../services/index'
import tools from '../common/tools'
export default {
    data(){
        return{
            orgId:'',
            status:'',
            userId:'',
        }
    },
    methods: {
        // 关于店铺页面初始化
        jumpInit(){
            if(window.location.hash.indexOf('&')>-1){
                this.orgId=window.location.hash.split("=")[1].split('&')[0];
            }
            else{
                this.orgId = window.location.hash.split("=")[1];
            }
            console.log(this.orgId);
            tools.setLocalStorage("orgId", this.orgId);
            // B端登录
            // if(window.location.href.indexOf('userid')!=-1){
                let params = window.location.href.split("?")[1];
                console.log(params);
                erpLogin(params).then(response => {
                    console.log(response);
                    if (response.meta.success == true) {
                        console.log("ERP登录成功");
                        this.$store.commit("setLogin", "1");
                        if(response.code==0){
                            tools.setLocalStorage("mobile",response.data.userName);
                            tools.setLocalStorage("userType", 1);
                            tools.setSessionStorage('deptName',response.data.deptName);
                            tools.setSessionStorage('userName',response.data.userName);
                            tools.setSessionStorage('uOrgID',response.data.orgID);
                            tools.setSessionStorage('deptId',response.data.deptID);
                            tools.setSessionStorage('uOrgName',response.data.orgName);
                            tools.setSessionStorage('userId',response.data.userID);
                            tools.setSessionStorage('domain',response.data.domain);
                            if(window.location.href.indexOf('redirtPage')>-1){
                                this.$router.push('/search-store');
                            }
                            else{
                                this.$router.push('/supplier?'+window.location.href.split("?")[1]);
                            }
                        }
                        else if(response.code==-1){
                            tools.setLocalStorage("tip", response.data.msg);
                            tools.setLocalStorage("tipUrl", response.data.url);
                            this.$router.push('/blank');
                        }
                        else if(response.code==-2){
                            if(response.data.data==true){
                                 setTimeout(()=>{
                                    window.location.href=response.data.url;
                                },1000)
                            }
                            else{
                                tools.setLocalStorage("tip", response.data.msg);
                                tools.setLocalStorage("tipUrl", '');
                                this.$router.push('/blank');
                            }
                        }
                    } else {
                        console.log("ERP登录失败");
                    }
                });
            // }
        },
    },
    mounted(){
        this.jumpInit();
    },
    components: {
    },
}
</script>

<style lang="scss">
.jump{
    text-align: center;
    padding-top: 100px;
    >p{
        @include sc(18px,#999);
        margin-top: 30px;
    }
}
</style>

