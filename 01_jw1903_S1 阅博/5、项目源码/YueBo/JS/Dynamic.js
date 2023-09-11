 //清除所有cookie
 function clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();//清除当前域名下的,例如：m.kevis.com
            document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();//清除当前域名下的，例如 .m.kevis.com
            document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的，例如 .kevis.com
        }
    }
    console.log('已清除');
}

//创建Cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//退出清除指定cookie
function clearCookie(name) {
    setCookie(name, "", -1)
}

// alert(UserID)
$(document).ready(function(){

let data=[]
let u=new Vue({
    el:"#Content",
    data(){
        return{
            data
        }
    }

})
post()
function post(){
    var uid = getCookie("uid");
    $.ajax({
        url:"https://localhost:44364/api/GetmyPost?uid="+uid,
        type:"GET",
        success:function(res){  
            console.log(res)
            var folderName = "Uploads";
            url1="https://localhost:44364//api/GeiPic?folderName=" + encodeURIComponent(folderName) + "&fileName=";  
            //console.log(res[0].vidio)  
            $.each(res,function(i,index){

                 
            let d={
                pid:res[i].Postid,
                content:res[i].PostContent,
                time:convertDateFromString(res[i].PostTime),
                user:res[i].username,
                pl:res[i].ContentS,
                zf:res[i].Forwards,
                dz:res[i].Likes,
                pic:pic1(res[i].pic),
                vidio:vid1(res[i].vidio),
                f1:res[i].pic!="无",
                tx:pic1(res[i].tx),
                click:res[i].ClickSum,
                v1:(res[i].vidio!="无"&&res[i].vidio!=""),
                
            }    
            data.push(d)
        })
            function pic1(p){
                if(p=="无"||p==""||p==null){
                    return "./Content/img/01.png";
                }else{
                    return url1+encodeURIComponent(p)
                }
            }
            function vid1(p){
                if(p=="无"||p==""||p==null){
                    return "无";
                }else{
                    return url2+p
                }
            }
            function followme(x){
                for(i=0;i<followd1.length;i++){
                    if(followd1[i][0]==x){
                        return true
                    }
                    
                }
                return false
            }
            // 判断帖子是否被当前用户喜欢 1代表判断是否被关注、2代表判断是否被喜欢
    function fl(x,sign){
        
        switch(sign){
            case 1:{
                if(followd1.length>0){
                    for(i=0;i<followd1.length;i++){
                        if(followd1[i][0]==x){
                            return true
                        }
                    }
                }   
            }
            case 2:{
                if(Like.length>0){
                    for(i=0;i<Like.length;i++){
                        if(Like[i][0]==x){
                            return true
                        }
                }
                }
                    
            }
        }
    
    return false   
}
            //console.log(data[0])
            
        }
        })
    console.log(u.data) 
}
function convertDateFromString(dateString) { 
    let date1=dateString.substr(0,10)
    let time=dateString.substr(11,12)
    let datetime=date1+" "+time
    let datetime1=datetime.substring(0,19)
    
    // return datetime1
    if (datetime1) { 
        let data=new Date(datetime1)
        var year = data.getFullYear();//年
        var month = data.getMonth();//月
        var day = data.getDate();//日
        var hours = data.getHours();//时
        var min = data.getMinutes();//分
        var second = data.getSeconds();//秒
        
        
        let a=year + "-" +
            ((month + 1) > 9 ? (month + 1) : "0" + (month + 1)) + "-" +
            (day > 9 ? day : ("0" + day)) + " " +
            (hours > 9 ? hours : ("0" + hours)) + ":" +
            (min > 9 ? min : ("0" + min)) + ":" +
            (second > 9 ? second : ("0" + second));
        let date=new Date();
        let a1=new Date(a);
        let a2=date.getTime()-a1.getTime();
        let s1=parseInt(a2/1000)
        if(s1>60){
            let minute=parseInt(s1/60)
            if(minute>60){
                let hour=parseInt(minute/60)
                if(hour>24){
                    let day=parseInt(hour/60)
                    if(day>31){
                        let month=parseInt(day/31)
                        if(month>12){
                            let year=parseInt(month/12)
                            return year+"年前"
                        }
                        return month+"月前"
                    }
                    return day+"天前"
                }
                return hour+"小时前"
            }
            return minute+"分前"
        }
        return s1+"秒前"
    } 
}

})
//读取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
