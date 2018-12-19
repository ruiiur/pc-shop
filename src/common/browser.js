function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
        console.log('userAgentuserAgentuserAgentuserAgent',userAgent);
    return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }
    // 因为IE11已经不含MSIE字段，所以使用一下适配
    if(!!window["ActiveXObject"] || "ActiveXObject" in window){
        return 'IE';
    }
    // else{
    //     console.log('userAgentuserAgentuserAgentuserAgent',userAgent);
    // }; //判断是否IE浏览器
}
let mb=myBrowser();
export {
    mb
}
