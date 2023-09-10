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
                    $.ajax({
                        url:"",
                        type:"post",
                        data:{uid:userid},
                        success:function(res){

                        }
                    })
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
    //获取cookie里面的用户id
    let userid=0;
    if($.cookie("uid")!=null){
        userid=$.cookie("uid")
    }
    //数据
    let data2=[];
    let data4=[];
    let data3=[];
    let flag=[];

    //已经展示的数据
    let Show=[]
    let start=0
    //用过的随机数
    let rand=[];
    //关注名单
    let followd=[];
    //喜欢的帖子名单
    let Like=[];
    //违规词数据
    let Word=[]
    //帖子的数据
    let posts=[];
    //点击发布帖子
    $(".nav-center-liuyan").click(function(){
        if($.cookie("uid")!=null){
            $(".put").toggle();
        }else{
            if(confirm("你还未登录，是否跳转登录")){
                window.location.href="Login.html"
            }
        }

        
    })

    //点击帖子进入详情界面
    $(document).on("click",".xq",function(){
        let id=$(this).attr("id")
        $.ajax({
            url:"https://localhost:44364/api/Click?id="+id,
            type:"get",
            success:function(res){
                res==true? window.location.href="PostDetail.html?pid="+id:console.log("sb")
            }
        })
        
    })
    //获取用户的关注
    $.ajax({
        url:"https://localhost:44364/api/GetByUid?uid="+userid,
        type:"GET",
        success:function(res){
            console.log(res)
            if(res!=null){
                $.each(res,function(i,v){
                    let f=[
                        fid=res[i].FollowUserID,
                        ftime=res[i].FollowTime
                    ]
                    followd.push(f)
                })
                
            }
        }
    })

    //获取用户的喜爱
    $.ajax({
        url:"https://localhost:44364/api/Like/GetByUid?uid="+userid,
        type:"GET",
        success:function(res){
            console.log(res)
            if(res!=null){
                $.each(res,function(i,v){
                    let l=[
                        pid=res[i].PostID
                    ]
                    Like.push(l)
                })
                
            }
        }
    })
    
    //获取违禁词表
    $.ajax({
        url:"https://localhost:44364/api/SensitiveWords",
        type:"GET",
        success:function(res){
            Word=res;
        }
    })
    
    //获取帖子数据
    $.ajax({
        url:"https://localhost:44364/api/Posts",
        type:"GET",
        success:function(res){
            let r=[]
            $.each(res,function(i,v){
                let d=[
                    pid=res[i].pid,
                    content=res[i].PostContent,
                    time=convertDateFromString(res[i].PostTime),
                    user=res[i].username,
                    pl=res[i].ContentS,
                    zf=res[i].Forwards,
                    dz=res[i].Likes,
                    f1=(res[i].pic!="无"&&res[i]!=""),
                    pic=!f1?"./Content/img/"+res[i].pic:res[i].pic,
                    vidio=res[i].vidio,
                    tx="/Content/img/tx/"+res[i].tx,
                    click=res[i].ClickSum,
                    followd=fl(res[i].UserID,1),
                    like=fl(res[i].pid,2),
                    uid=res[i].UserID,
                    uidf=res[i].UserID!=userid
                ]
                if(res[i].pic.indexOf("base64")!=-1){
                    var str = res[i].pic;      
                    var str = str.substring(1,str.length-1);
                    d[8]=str
                }else if(d[8].indexOf("无")!=-1){
                    d[8]="./Content/img/01.png"
                }
                posts.push(d);
                r[i]=d[0]
            })
            
            rand1(r);
            loadData(posts)
            
            }
    })
    //加载数据
    function loadData(res){
        let a=[];
        a=res;
        // let b=a.splice(start,end);
        let c=5;
        for(let n=start;n<c+start;n++){
            let i=rand[n];
            for(s=0;s<a.length;s++){
                if(posts[s][0]==i){
                    let data1={
                        pid:a[s][0],
                        content:a[s][1],
                        time:a[s][2],
                        user:a[s][3],
                        pl:a[s][4],
                        zf:a[s][5],
                        dz:a[s][6],
                        pic:a[s][8],
                        vidio:a[s][9],
                        f1:a[s][7],
                        tx:a[s][10],
                        click:a[s][11],
                        followd:a[s][12],
                        like:a[s][13],
                        uid:a[s][14],
                        uidf:a[s][15]
                    } 
                    data2.push(data1) 
                    console.log(data1)
                }
            }
                     
        }   
        start+=data2.length-1;   
    } 
    // 判断帖子是否被当前用户喜欢 1代表判断是否被关注、2代表判断是否被喜欢
    function fl(x,sign){
        for(i=0;i<followd.length;i++){
            switch(sign){
                case 1:{
                    if(followd.length>0){
                        if(followd[i][0]==x){
                            console.log("被关注："+followd[i][0]+"选择用户"+x)
                            return true
                        }
                    }   
                }
                case 2:{
                    if(Like.length>0){
                        if(Like[i][0]==x){
                            return true
                        }
                    }
                        
                }
            }
        }
        return false   
    }
    //产生随机数
    function rand1(r){
        let length = r.length;    // 原数组一开始的长度
        for (var i = 0; i < length; i++) {     // 注意，这里是length，不是arr.length
            var index = Math.floor(Math.random() * (length - i));   // 注意，这里是length
            rand[i] = r[index];
            arr.splice(index, 1);   // 删除该元素
        }
        console.log(rand)
    }
    // 判断发布帖子多久了
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
    

    //随机加载帖子数据
    let id=[]
    // $.ajax({
    //     url:"https://localhost:44364/api/Posts",
    //     type:"GET",
    //     success:function(res){ 
    //         let a=[]
    //         let sum=0
    //         for(i=0;i<res.length;i++){
    //             sum++
    //         }
    //         for(i=0;i<sum;i++){
    //             a[i]=res[i]
    //         }
    //         rand1(res);     
    //         loadData();
    //         window.addEventListener('scroll',function(){
    //             var timer;//闭包
    //             var startTime=new Date();
    //                 return function(){
    //                     var curTime=new Date();
    //                     if(curTime-startTime>=2000){
    //                         timer=setTimeout(function(){
    //                             loadData();
    //                         },5000)
    //                         startTime=curTime;
    //                     }
    //             } 
    //         }());
            
            
    //     }
    // })
    
    //滚动加载数据
    $(document).scroll(function() {
        var scroH =parseInt($(document).scrollTop());   //滚动高度
        var viewH = $(window).height();  //可见高度 
        var contentH = $(document).height();  //内容高度
        if(scroH <=700){  //距离顶部小于500px时
            $("#login").removeClass("login1")
        }
        if(scroH >700){  //距离顶部大于500px时
            $("#login").addClass("login1")
        }  
        if(contentH-(scroH+viewH)<10){
            loadData(posts);
        }                                  
        });

    //获取帖子数据判断热门
    let arr = data2.sort(compare(data2.ClickSum));
            let arr1=data2.sort(function(a,b){
                if(a.click>b.click) return 1;
                if(a.click<b.click) return -1;
                return 0
            })
            // for(i=0;i<arr.length;i++){
            //     console.log("升序排序"+arr[i].click)
            // } 
            // for(i=0;i<arr1.length;i++){
            //     console.log("1升序排序"+arr1[i].click)
            // } 
    //对数组进行排序
    function compare(property) {
        return (firstobj, secondobj) => {
        const firstValue = firstobj[property];
        const secondValue = secondobj[property];
        return firstValue - secondValue ; //升序
        };
    }

    // 点击评论区出现
    $(document).on("click",".icon-pinglun",function(){ 
        let v1=new Vue({
            el:".main-bottom-template .coment",
            data(){return{data4}}
        })      
        let id=$(this).parent().next().attr("id")
        let pid=id.substr(1);
        $("#"+id+"").toggle()
        let pl=[];
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
                    ctime:res[v].ContentTime
                    }
                    pl.push(pl1)
                })
                data4=pl;
                v1.data4=data4
                console.log(v1.data4)
            }

        })       
        });
    // 点击发布评论
    $(document).on("click",".plbtn",function(){  
        if($.cookie("uid")!=null){
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
    }
        else{
            if(confirm("你未登录是否登录")){
                window.location.href="Login.html"
            }
        }
        });

    // 点击图片后选择文件
    $(document).on("click",".img",function(){  
        $(this).prev('input[type="file"]')[0].click();        
    });
    //点击图片选择文件
    $(document).on("click",".pic",function(){  
            $(this).prev('input[type="file"]')[0].click();        
        });
    
    $(document).on("change","#submit1",function(e){
        loadimg(e,1);
    })
    $(document).on("change","#submit2",function(e){
        loadimg(e,2);               
    })
       
        

    // 发布微博
    $(document).on("click",".fs",function(){  
        // 点击发送后的状态提示信息
        let message="";
        let why="";

        // 获取帖子内容
        let text=$(".puts").val();
        // 获取图片
        var pic = $('.imgs .imgs-img').css('backgroundImage');
        var pic1 = pic.replace('url(','').replace(')','');
        if(pic1=="none"){
            pic1="无"
        }
        // 获取帖子状态
        let sta=$(".select select option:selected").val();

        // 内容不为空就发布帖子
        if(text!=""){
            let flag=true;
            for(i=0;i<Word.length;i++){
                let a=$.base64.decode(Word[i].SensitiveContent).trim()
                if(a.indexOf(text)!=-1){
                    flag=false
                }
            }
                if(flag){
                    let post1={PostPic:pic1,PostContent:text,UserID:userid,StatusID:sta}
                    $.ajax({
                        url:"https://localhost:44364/api/Posts",
                        type:"POST",
                        data:post1,
                        success:function(res){
                            if(res==true){
                                message="发送成功";
                                $(".message").css("color","green");
                                $(".message").html(""+message+"");
                                window.location.reload();
                                loadData();
                            }else{
                                message="发布失败"
                                $(".message").css("color","red")
                                $(".message").html(""+message+"")
                            }   
                        }
                    })  
                } else{
                    message="发送失败"
                    why="内容有违禁词"
                    $(".message").css("color","red")
                    $(".message").html(""+message+why+"")
                }
        }else{
            message="发送失败"
            why="内容不能为空"
            $(".message").css("color","red")
            $(".message").html(""+message+why+"")
        }
        
        
        });
    // 举报按钮
    $(document).on("click",".jb",function(){
        if($.cookie("uid")!=null){
        window.location.href="report.html?id="+$(this).attr("id")}
        else{
            if(confirm("你未登录是否登录")){
                window.location.href="Login.html"
            }
        }
    })    
    // 加载选择的图片
    function loadimg(e,index){
        var file = e.target.files[0] || e.dataTransfer.files[0];
        if (file) {
            console.log("有文件")
            var reader = new FileReader();
            reader.onload = function () {
                console.log("加载了")
                if(index==1){
                    $(".img1").css("background-image","url("+this.result+")").css(" background-repeat","no-repeat").css('background-size','100% 100%')
                }
                else{
                    $(".imgs .imgs-img").css("background-image","url("+this.result+")").css(" background-repeat","no-repeat").css('background-size','100% 100%')
                    .css("display","block")
                }
            }
            reader.readAsDataURL(file);
        }
    }
    

    $(document).on("click",".imgs-x",function(){  
        $(".imgs .imgs-img").css("display","none").css("background-image","none")    
        });
    // 帖子的数据    
    let t=new Vue({
        el:".main-bottom-template",
        data(){return{data2,flag,followd}}
    })
    // 判断是否登录
    let u=new Vue({
        el:"#nav",
        data(){return{falg:(userid==0)}}
    })
    let u1=new Vue({
        el:"#main",
        data(){return{falg:(userid==0)}}
    })
    
    // 绑定跳转页面事件
    $(".nav-center-login").click(function(){
        window.open("Login.html")
    })
    $(".nav-center-register").click(function(){
        window.open("register.html")
    })

    // 点击搜索后绑定帖子数据
    $(".header-center-input-search").click(function(){
        let data3=[];
        let gjc=$(".header-center-input-form").val();
        $.ajax({
            url:"https://localhost:44364/api/GJC?gjc="+gjc,
            type:"GET",
            success:function(res){
                $.each(res,function(n,value) {   
                    let data1={
                        pid:res[n].pid,
                        content:res[n].PostContent,
                        time:res[n].PostTime,
                        user:res[n].username,
                        pl:res[n].ContentS,
                        zf:res[n].Forwards,
                        dz:res[n].Likes,
                        pic:"./Content/img/"+res[n].pic,
                        vidio:res[n].vidio,
                        f1:res[n].pic!="无",
                        tx:"/Content/img/tx/"+res[n].tx,
                        click:res[i].ClickSum,
                        bg:fl(res[i].UserID),
                        uid:res[i].UserID,
                        uidf:res[i].UserID!=userid
                            }  
                            if(res[n].pic.indexOf("base64")!=-1){
                                var str = res[n].pic;      
                                var str = str.substring(1,str.length-1);
                                data1.pic=str
                                    }
                    data3.push(data1)
                }); 
            }
        })
        t.data2=data3;
    })

})