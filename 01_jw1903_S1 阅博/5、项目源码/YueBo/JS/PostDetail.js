$(function(){
    let sun="#fff";
    let yueliang="black";
    //导航条的显示隐藏
    $(window).scroll(function(){
        //获取垂直滚筒条的距离
        let scrollY=parseInt($(document).scrollTop())
        // console.log(scrollY)
        //滚筒条距离大于200px就显示导航条
        if(scrollY>200){
            $("#nav").slideDown(600);
        }else{
            $("#nav").slideUp(600);
        }
    })
    //搜索下拉框
    $(".nav-center-search input").focus(function(){
        $(".nav-center-search .content").show();
        $(".nav-center-search .active").css('color','#ff8200');
    })
    $(".nav-center-search input").blur(function(){
        $(".nav-center-search .content").hide();
        $(".nav-center-search .active").css('color','#000');
    })
    //点击切换背景色
    $(".nav-center-four .nav-center-sun").click(function(){
        console.log($("#sun").attr('class'))
        if($("#sun").is('.icon-sun')){
            $(".nav-center-four .nav-center-sun").attr('class','nav-center-sun iconfont icon-yueliang')
            $("body").css("background-color",yueliang)
            $("#nav").css("background-color",yueliang)
            $(".nav-center").css({
                "background-color":yueliang,"color":"white"
                }
                )
            $("#main").css("background-color",yueliang)
            $(".main-center").css({
                "background-color":yueliang,"color":"white"
                })
            $(".main-left").css({
                "background-color":"#191919","color":"white"
                })
            $(".main-top").css({
                "background-color":"#191919","color":"white"
                })
            $(".main-bottom").css({
                "background-color":"#191919","color":"white"
                })
            $(".main-bottom-blog").css({
                "background-color":"#191919","color":"white"
                })
            $(".hot").css({
                "background-color":"#191919","color":"white"
                })
            $(".hot div:nth-child(2)").css("color","white")
            $(".hotsearch").css({
                "background-color":"#191919","color":"white"
                })
            $(".template").css({
                "background-color":"#191919","color":"white"
                })
            $(".main-right-footer").css({
                "background-color":"#191919","color":"white"
                })
            $(".main-right").css({
                "background-color":yueliang,"color":"white"
                })
            $(".help").css({
                "background-color":"#191919","color":"white"
                })
                $(".blog div").css("color","white")
        }else{
            $(".nav-center-four .nav-center-sun").attr('class','nav-center-sun iconfont icon-sun')
            $("body").css("background-color","#F5F5F5")
            $("#nav").css("background-color","white")
            $(".nav-center").css({
                "background-color":"white","color":"black"
                }
                )
            $("#main").css("background-color","#f5f5f5")
            $(".main-center").css("background-color","#f5f5f5")
            $(".main-left").css({
                "background-color":"#fff","color":"black"
                })
            $(".main-top").css({
                "background-color":"#fff","color":"black"
                })
            $(".main-bottom").css({
                "background-color":"#fff","color":"black"
                })
            $(".main-bottom-blog").css({
                "background-color":"white","color":"black"
                })
            $(".hot").css({
                "background-color":"#fff","color":"black"
                })
            $(".hotsearch").css({
                "background-color":"#fff","color":"black"
                })
            $(".template").css({
                "background-color":"#fff","color":"black"
                })
            $(".main-right-footer").css({
                "background-color":"#f5f5f5","color":"black"
                })
            $(".main-right").css({
                "background-color":"#f5f5f5","color":"black"
                })
            $(".help").css({
                "background-color":"#f5f5f5","color":"black"
                })
                $(".blog div").css("color","black")
                $(".hot div:nth-child(2)").css("color","#333")

        }
    })
    //点击关注
    $(document).on("click",".title-name-focus",function(x){
        if($.cookie("uid")!=null){
            let icon="<span class='iconfont icon-jiahao1'></span>";
            if($(this).children().length>0){
                if(confirm("是否关注？")){
                    $(this).children().remove()
                    $(this).addClass('f1')
                    $(this).html("已关注")
                } 
            }else{
                if(confirm("是否取消关注？")){
                    $(this).removeClass('f1')
                    $(this).html("关注")
                    prepend:$(this).append(icon)  
                }
            }
        }else{
            if(confirm("你未登录是否登录")){
                window.location.href="Login.html"
            }
        }
        
    })
    
        
})
$(document).ready(function(){
    
    let userid=0;
    if($.cookie("uid")!=null){
        userid=$.cookie("uid")
    }
    let data=[];
    let data4=[];
    let flag=[];
    let f=true;
    let pid=getid('pid')
    // $(document).on("click",".icon-pinglun",function(){ 
    //     let v1=new Vue({
    //         el:".main-bottom-template .coment",
    //         data(){return{data4}}
    //     })      
    //     let id=$(this).parent().next().attr("id")
    //     let pid=id.substr(1);
    //     $("#"+id+"").toggle()
    //     let pl=[];
        
        
        
    //     });
    $(document).on("click",".plbtn",function(){  
        let content=$("#text").val();
        let pid=$(this).parent().parent().parent().attr("id").substr(1)
        console.log("父级元素"+pid)
        console.log("输入内容"+pid)
        $(".pic").click(function(){
            $(this).prev()('input[type="file"]')[0].click();
        })
        // $.ajax({
        //     url:"https://localhost:44364/api/Contents?comtent="+content,
        //     type:"GET",
        //     success:function(res){
        //         console.log(res)
        //         if(res.length>0){
        //             console.log("评论成功")
        //         }
                
        //     }

        // })
        
        
        });
        // 点击图片后选择文件
        $(document).on("click",".img",function(){  
            $(this).prev('input[type="file"]')[0].click();        
        });
    $(document).on("click",".pic",function(){  
            $(this).prev('input[type="file"]')[0].click();        
        });
    
        $(document).on("change","#submit1",function(e){
            loadimg(e,1);
                    
        })
        $(document).on("change","#submit2",function(e){
            loadimg(e,2);               
        })
    // 加载图片
    // function loadimg(e,index){
    //     var file = e.target.files[0] || e.dataTransfer.files[0];
    //     if (file) {
    //         console.log("有文件")
    //         var reader = new FileReader();
    //         reader.onload = function () {
    //             console.log("加载了")
    //             if(index==1){
    //                 $(".img1").css("background-image","url("+this.result+")").css(" background-repeat","no-repeat").css('background-size','100% 100%')
    //             }
    //             else{
    //                 $(".imgs .imgs-img").css("background-image","url("+this.result+")").css(" background-repeat","no-repeat").css('background-size','100% 100%')
    //                 .css("display","block")
    //             }
    //         }
    //         reader.readAsDataURL(file);
    //     }
    // }
    
    function getid(name)
    {
    var reg= new RegExp("(^|&)"+
    name +"=([^&]*)(&|$)");
    var r= window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
    }
    $(document).on("click",".imgs-x",function(){  
        $(".imgs .imgs-img").css("display","none").css("background-image","none")    
        });
        let pl=[]
        loading();
        function loading(){
            data4.length=0
            data.length=0
            $.ajax({
                url:"https://localhost:44364/api/Contents/"+pid,
                type:"GET",
                success:function(res){
                    console.log(res)
                    $.each(res,function(v,i){
                        let pl1={
                        nr:res[v].ContentDesc,
                        name:res[v].UserName,
                        upic:"/Content/img/tx/"+res[v].UserPic,
                        ctime:convertDateFromString(res[v].ContentTime),
                        f:pl.length>0
                        }
                        pl.push(pl1)
                    })
                    data4=pl;
                    f=data4.length>0
                    aaaaaaaa.f=f
                    s.data4=data4               
                    console.log(s.data4)
                    console.log(aaaaaaaa.f)
                }
    
            })
            $.ajax({
                url:"https://localhost:44364/api/Posts/"+pid,
                type:"GET",
                success:function(res){           
                    let d={
                        pid:res[0].Postid,
                        content:res[0].PostContent,
                        time:convertDateFromString(res[0].PostTime),
                        user:res[0].username,
                        pl:res[0].ContentS,
                        zf:res[0].Forwards,
                        dz:res[0].Likes,
                        pic:"./Content/img/"+res[0].pic,
                        vidio:res[0].vidio,
                        f1:res[0].pic!="无",
                        tx:"/Content/img/tx/"+res[0].tx
                    }
                    if(res[0].pic.indexOf("base64")!=-1){
                        var str = res[0].pic;      
                        var str = str.substring(1,str.length-1);
                        console.log(str)
                        d.pic=str
                    }        
                    data.push(d)
                
                }
            })
        }
    $("#back").click(function(){
        window.history.back(-1)
    })
    let fid=0;   
    $(".btn").click(function(){
        if($.cookie("uid")!=null){
        let cont=$("#te1").val();
        let pid=getid('pid')
        let uid=$.cookie("uid")
        let data1={ContentDesc:cont,PostID:pid,FatherContentID:fid,UserID:uid}
        if(cont!=""){
            $.ajax({
                url:"https://localhost:44364/api/Contents",
                type:"post",
                data:data1,
                success:function(res){
                    console.log(res);
                    $("#te1").val("")
                    loading();
                }
            })
        }else{
            alert("内容不能为空")
        }
    }
        else{
            if(confirm("你未登录是否登录")){
                window.location.href="Login.html"
            }
        }
    })
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
    let t=new Vue({
        el:".main-bottom-template",
        data(){return{data}},computed: {
            activeUsers: function () {
                return this.users.filter(function (data) {
                    return data.f;//返回isShow=true的项，添加到activeUsers数组
                })
            }
        }
    })
    let u=new Vue({
        el:"#nav",
        data(){return{falg:(userid==0)}}
    })
    let s=new Vue({
        el:".main",
        data(){return{data4}}
    })
    let aaaaaaaa=new Vue({
        el:"#app",
        data(){return{f}}
    })
    let u1=new Vue({
        el:"#main",
        data(){return{falg:(userid==0)}}
    })
})