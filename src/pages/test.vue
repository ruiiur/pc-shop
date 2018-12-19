<template>

	<div class="point-list-container-wrap container-fluid">
		<!--导航条-->
		<div class="point-list-nav">
			<span v-for="(item, index) in navArr" :key="index" class="text inline-block padding-left20 padding-right20 padding-bottom15" 
		
            @click="changeTab(item)">{{item.label}}
             <i  class="line" :class="item.isChoosed?'show':'hide'"></i>
            </span>
           
            
		</div>
	</div>
					
</template>
	// :class="{'line' : item.isChoosed}" 
<script>
export default {
	data() {
		return {
			//导航
			navArr: [
				{
					id: 0,
					label: "已发布",
					isChoosed: true
				},
				{
					id: 1,
					label: "未设置完成",
					isChoosed: false
				}
			],
		}
	},
	methods: {
		//导航切换
		changeTab(item) {
			console.log('item==',item);
			if (item.isChoosed) {
				return;
			} else {
				this.navArr.forEach(item => {
					item.isChoosed = false;
				});
				item.isChoosed = true;
			}
		},

		
	}
}
</script>
<style lang="scss" scoped>
.line-block{
    display:inline-block;
}
.padding-left20{
    padding-left:20px;
}
.padding-right20{
    padding-right:20px;
} 
.padding-bottom15{
    padding-bottom:15px;
}

//导航
.point-list-nav {
    font-size: 0;
	border-bottom: 1px solid #ccc;
	margin-top:10px;
    .text {
      font-size: 16px;
	  text-align: center;
	  color:#333;
      cursor: pointer;
       position: relative;
     overflow: hidden;
    }
    .line {
        border-bottom: 2px solid $main-color;
        color:$main-color;
        display: block;
        width: 100px;
        position: absolute;
        left:0px;
        transition:width 0.2s;
        -moz-transition:width 0.2s;
        -webkit-transition:width 0.2s; 
        -o-transition:width 0.2s; 
    }
    .show{
       width: 100px;
    }
    .hide{
        width: 0;
    }
}
.font-size-0{
	font-size:0;
}
</style>