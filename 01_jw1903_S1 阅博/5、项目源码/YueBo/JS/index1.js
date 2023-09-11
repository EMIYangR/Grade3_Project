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
    // $(".nav-center-search input").focus(function(){
    //     $(".nav-center-search .content").show();
    //     $(".nav-center-search .active").css('color','#ff8200');
    // })
    // $(".nav-center-search input").blur(function(){
    //     $(".nav-center-search .content").hide();
    //     $(".nav-center-search .active").css('color','#000');
    // })
    //点击切换背景色
    $(".nav-center-four .nav-center-sun").click(function(){
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
        
})
$(document).ready(function(){
    
    a=$('#main .main .main-bottom-template .main-bottom .main-bottom-blog .title #mos');
    a.hide()
    
    
    // b.hide();
    //获取cookie里面的用户id
    let userid=0;
    if($.cookie("uid")!=null){
        userid=$.cookie("uid")
    }
    
    //数据
    let data2=[];
    let data4=[];
    let data3=[];
    let data7=[];
    let flag=[];
    let imgpic=[];
    let Url="https://localhost:44364/api/Posts";
    let loadf=true;
    let choose=false;
    let ffff=0;
    let r=[]
    //已经展示的数据
    let Show=[]
    let start=0
    //用过的随机数
    let rand=[];
    //关注名单
    let followd1=[];
    //粉丝名单
    let Fans=[];
    //喜欢的帖子名单
    let Like=[];
    //违规词数据
    let Word=[]
    //帖子的数据
    let posts=[];
    // 热搜
    let Hots=[];
    // 图片
    let pic1=[];
    //帖子图片
    let images=[]
    //点击发布帖子
    $(".nav-center-liuyan").click(function(){
        if($.cookie("uid")!=null){
            $(".put").toggle();
            if(!$(".put").is(':hidden')){
                $("html,body").animate({ scrollTop: 0 }, 500);
            }
            
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
                res==true? window.location="PostDetail.html?pid="+id:console.log("sb")
            }
        })
        
    })
    //获取用户的关注
    guanzhu(userid)
    function guanzhu(id){
        $.ajax({
            url:"https://localhost:44364/api/GetByUid?uid="+id,
            type:"GET",
            success:function(res){            
                if(res!=null){
                    $.each(res,function(i,v){
                        let f=[
                            fid=res[i].FollowUserID,
                            ftime=res[i].FollowTime
                        ]
                        followd1.push(f)
                    })  
                }
            }
        })
    }
    
    //获取用户粉丝
    function fans(id){
        $.ajax({
            url:"https://localhost:44364/api/GetFans?uid="+id,
            type:"GET",
            success:function(res){            
                if(res!=null){
                    $.each(res,function(i,v){
                        let f=[
                            fid=res[i].FollowUserID,
                            ftime=res[i].FollowTime
                        ]
                        Fans.push(f)
                    })  
                }
            }
        })
    }
    
    
    

    //获取用户的喜爱
    $.ajax({
        url:"https://localhost:44364/api/Like/GetByUid?uid="+userid,
        type:"GET",
        success:function(res){
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
    load("https://localhost:44364/api/Posts")
    //获取帖子数据
    //点击热门
    $(document).on("click","#hotbtn",function(){
        qh(this)
        qh1(".nav-center-five .icon-huo")   
        qh(".main-left .1")
        loadf=true
        Url="https://localhost:44364/api/GetPostsHot?type=1";
        load(Url)
    })
    //点击我的关注
    $(document).on("click","#MyF",function(){
        if($.cookie("uid")!=null){
            loadf=false;
            qh(this)
            Url="https://localhost:44364/api/Posts";
            load1(Url)
        }else{
            if(confirm("你未登录是否登录")){
                window.location.href="Login.html"
            }
            choose=false;
        }
        
    })
    //点击首页
    $(document).on("click","#shouyebtn",function(){
        qh(this)
        qh1(".nav-center-five .icon-shouye") 
        qh2(".main-left .show")  
        loadf=true    
        Url="https://localhost:44364/api/Posts";
        load(Url)
    })
    function qh(x){        
        if($(x).hasClass("show")){
            //console.log($(x).siblings(".show").attr("class"))
        }else{
            $(x).addClass("show")
            $(x).siblings(".show").removeClass("show")                    
        }
    }
    function qh1(x){
        if($(x).hasClass("show1")){
            //console.log($(x).siblings(".show1").attr("class"))
        }else{
            $(x).addClass("show1")
            $(x).siblings(".show1").removeClass("show1")
        }
    }
    function qh2(x){       
        $(x).siblings(".show1").removeClass("show1")
    }
    $(".main-left div").click(function(){
        qh(this)
    })
    $(".nav-center-five div").click(function(){
        qh1(this)
    })
    function fanssum(id){
        var sum=0
        $.ajax({
            url:"https://localhost:44364/api/GetFans?uid="+id,
            type:"GET",
            async:false,
            success:function(res){  
                            
                if(res!=null){
                    $.each(res,function(i,v){
                        sum+=1;
                    }) 
                } 
            }
        })
        return sum
    }
    function guanzhusum(id){
        var sum=0
        $.ajax({
            url:"https://localhost:44364/api/GetByUid?uid="+id,
            type:"GET",
            async:false,
            success:function(res){  
                if(res!=null){
                    $.each(res,function(i,v){
                        sum+=1;
                    }) 
                }
            }
        })
        return sum
    }
    function load(u){
        start=0
        images.length=0;
        posts.length=0;
        data2.length=0;
        $.ajax({
            url:u,
            type:"GET",
            success:function(res){
                var folderName = "Uploads/images/tx/";
                var folderName1 = "Uploads/images";
                url1="https://localhost:44364//api/GeiPic?folderName=" + encodeURIComponent(folderName) + "&fileName=";
                url3="https://localhost:44364//api/GeiPic?folderName=" + encodeURIComponent(folderName1) + "&fileName=";
                url2="https://localhost:44364//api/Geivi?folderName=" + encodeURIComponent(folderName1) + "&fileName=";
                
                $.each(res,function(i,v){
                    if(res[i].pic!=null&&res[i].pic.indexOf(',')!=-1){ //是否包含一张以上图片
                        let p1=res[i].pic.split(',')//分割图片地址
                        //console.log(res[i].pic)
                        //console.log(p1)
                        $.each(p1,function(i1,v1){
                            if(i1!=(p1.length-1)){
                                //console.log(p1[i1])
                                images.push({pid:res[i].pid,pic:pic1(p1[i1])})//取出图片并保存
                            }    
                        })  
                    }
                    let d=[
                        pid=res[i].pid,
                        content=res[i].PostContent,
                        time=convertDateFromString(res[i].PostTime),
                        user=res[i].username,
                        pl=res[i].ContentS,
                        zf=res[i].Forwards,
                        dz=res[i].Likes,
                        f1=(res[i].pic!="无"&&res[i].pic!=""),
                        pic=pic1(res[i].pic,2),
                        vidio=vid1(res[i].vidio),
                        tx=pic1(res[i].tx,1),
                        click=res[i].ClickSum,
                        followd=!fl(res[i].UserID,1),
                        like=!fl(res[i].pid,2),
                        uid=res[i].UserID,
                        uidf=res[i].UserID!=userid,
                        v1=(res[i].vidio!="无"&&res[i].vidio!=""),
                        fv1=(!f1==v1),
                        fans1=fanssum(res[i].UserID),
                        guanzhu1=guanzhusum(res[i].UserID)
                    ]
                    posts.push(d);
                    if(!localStorage.getItem('rand')){
                        r[i]=d[0]
                    }
                    
                })
                function pic1(p,x){
                    if(x==1){
                        if(p=="无"||p==""||p==null){
                            return "./Content/img/01.png";
                        }else{
                            return url1+encodeURIComponent(p)
                        }
                    }else{
                        if(p=="无"||p==""||p==null){
                            return "./Content/img/01.png";
                        }else{
                            return url3+encodeURIComponent(p)
                        }
                    }
                    
                }
                function vid1(p){
                    if(p=="无"||p==""||p==null){
                        return "./Content/img/01.png";
                    }else{
                        return url2+encodeURIComponent(p)
                    }
                }
                if(localStorage.getItem('rand')){
                    var storedArray = localStorage.getItem('rand');
                    if (storedArray) {
                        var myArray = JSON.parse(storedArray);
                        for(i=0;i<myArray.length;i++){
                            rand[i]=myArray[i]
                        }
                    }
                     
                }else{
                    rand1(r) 
                    localStorage.setItem('rand', JSON.stringify(rand));                  
                }
                // rand1(r);
                loadData(posts)
                }
    })
    }

    $(".icon-geren").click(function(){
        window.location.href="../UserInfo.html";
    })
    
    $(".icon-duanxin").click(function(){
        window.location.href="../Personal.html";
    })
    
    $(".icon-shouye").click(function(){
        window.location.href="../index1.html";
    })
    function load1(u){
        posts.length=0;
        data2.length=0;
        $.ajax({    
            url:u,
            type:"GET",
            success:function(res){
                var folderName = "Uploads";
                url1="https://localhost:44364//api/GeiPic?folderName=" + encodeURIComponent(folderName) + "&fileName=";
                url2="https://localhost:44364//api/Geivi?fileName=";
                let r=[]
                $.each(res,function(i,v){
                    for(s1=0;s1<followd1.length;s1++){
                        if(res[i].UserID==followd1[s1][0]){
                            fans(res[i].UserID)
                            guanzhu(res[i].UserID)
                            let d=[
                                pid=res[i].pid,//帖子id
                                content=res[i].PostContent,//帖子内容
                                time=convertDateFromString(res[i].PostTime),//帖子发布时间
                                user=res[i].username,//帖子作者
                                pl=res[i].ContentS,//评论数量
                                zf=res[i].Forwards,//转发数量
                                dz=res[i].Likes,//点赞数量
                                f1=(res[i].pic!="无"&&res[i].pic!=""),//图片是否为空
                                pic=pic1(res[i].pic),//图片获取
                                vidio=vid1(res[i].vidio),//视频获取
                                tx=pic1(res[i].tx),//头像
                                click=res[i].ClickSum,//点击量
                                followd=!followme(res[i].UserID,1),//是否关注
                                like=fl(res[i].pid,2),//是否喜欢
                                uid=res[i].UserID,//作者id
                                uidf=res[i].UserID!=userid,//判断是否作者是自己
                                v1=(res[i].vidio!="无"&&res[i].vidio!=""),//判断视频是否为空
                                fv1=(!f1==v1),//判断视频和图片都是否为空
                                fans1=fanssum(res[i].UserID),//粉丝量
                                guanzhu1=guanzhusum(res[i].UserID)//关注量
                            ]
                            posts.push(d);
                            r[i]=d[0]
                        }                    
                }
                })
                function pic1(p){
                    if(p=="无"||p==""){
                        return "./Content/img/01.png";
                    }else{
                        return url1+encodeURIComponent(p)
                    }
                }
                function vid1(p){
                    if(p=="无"||p==""||p==null){
                        return "无";
                    }else{
                        return url2+encodeURIComponent(p)
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
                for(let n=0;n<posts.length;n++){
                        let data1={
                                pid:posts[n][0],
                                content:posts[n][1],
                                time:posts[n][2],
                                user:posts[n][3],
                                pl:posts[n][4],
                                zf:posts[n][5],
                                dz:posts[n][6],
                                pic:posts[n][8],
                                vidio:posts[n][9],
                                f1:posts[n][7],
                                tx:posts[n][10],
                                click:posts[n][11],
                                followd:posts[n][12],
                                like:posts[n][13],
                                uid:posts[n][14],
                                uidf:posts[n][15],
                                v1:posts[n][16],
                                fv1:posts[n][17],
                                bg:posts[n][18],
                                fans1:posts[n][19],
                                guanzhu1:posts[n][20]
                                
                            } 
                            data2.push(data1)     
                }  
                
                }
                
    })
    }
    //加载数据
    function loadData(res){
        let a=[];
        a=res;
        let c=5;
        for(let n=start;n<c+start;n++){
            let i=rand[n];
            console.log("前五个"+i)
            for(s=0;s<a.length;s++){
                if(posts[s][0]==i){
                    let data1={
                        pid:a[s][0],//帖子id
                        content:a[s][1],//评论id
                        time:a[s][2],//发布时间
                        user:a[s][3],//帖子作者姓名
                        pl:a[s][4],//评论
                        zf:a[s][5],//转发
                        dz:a[s][6],//点赞
                        pic:a[s][8],//图片
                        vidio:a[s][9],//视频
                        f1:a[s][7],//是否发布图片
                        tx:a[s][10],//用户头像
                        click:a[s][11],//点击量
                        followd:a[s][12],//是否关注
                        like:a[s][13],//是否喜欢
                        uid:a[s][14],//作者id
                        uidf:a[s][15],//是否是自己
                        v1:a[s][16],//是否发布视频
                        fv1:a[s][17],//是否视频和图片都发布
                        bg:a[s][18],
                        showActions:false,//展示资料
                        show:false,//一样
                        fans1:a[s][18],
                        guanzhu1:a[s][19]

                    } 
                    data2.push(data1)   
                }
            }
                     
        }   
        t.data2=data2
        start+=data2.length-1; 
        //console.log(t.data2)  
    } 
    
    $(document).on("click",".nav-center-four .nav-center-login",function(){
        window.location.href="Login.html"
    })
    //点击关注
    $(document).on("click",".title-name-focus",function(x){
        if($.cookie("uid")!=null){
            userid=$.cookie("uid");
            let icon="<span class='iconfont icon-jiahao1'></span>";
            let uid1=$(this).parent().parent().parent().attr("id")
            let a=$(this);
            let a1=a.children();
            if($(this).children().length>0){
                if(confirm("是否关注？")){
                    $.ajax({
                        url:"https://localhost:44364/api/Follows",
                        type:"post",
                        data:{UserID:userid,FollowUserID:uid1},
                        success:function(res){
                            if(res==true){
                                a1.remove()
                                a.addClass('f1')
                                a.html("已关注")
                                posts.length=0;
                                data2.length=0;
                                load("https://localhost:44364/api/Posts")
                            }
                        }
                    })                    
                } 
            }else{
                if(confirm("是否取消关注？")){
                    $.ajax({
                        url:"https://localhost:44364/api/Delete1?id="+userid+"&uid="+uid1,
                        type:"GET",
                        success:function(res){
                            if(res==true){
                                a.removeClass('f1')
                                a.html("关注")
                                prepend:a.append(icon)
                                posts.length=0;
                                data2.length=0; 
                                load("https://localhost:44364/api/Posts")
                            }
                        }
                    })
                     
                     
                }
            }
        }else{
            if(confirm("你未登录是否登录")){
                window.location.href="Login.html"
            }
        }
    }) 
    //产生随机数
    function rand1(r){
        let f=false;
        let length = r.length;    // 原数组一开始的长度
        for (var i = 0; i < length; i++) {     // 注意，这里是length，不是arr.length
            var index = Math.floor(Math.random() * (length - i));   // 注意，这里是length
                rand[i] = r[index];
            
            // arr.splice(index, 1);   // 删除该元素
        }
        //console.log(rand)
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
            if(loadf){
                loadData(posts);
            }
            
        }                                  
        });
        $(".hotsearch .refresh").click(function(){
            Hots.length=0;
            GetHot()
        })
        $(document).on("click",".main-right-hotsearch .hot div",function(){
            let id=$(this).parent(".hot").attr("id")
            $.ajax({
                url:"https://localhost:44364/api/Click?id="+id,
                type:"get",
                success:function(res){
                    res==true? window.location.href="PostDetail.html?pid="+id:console.log("sb")
                }
            })

        })
    GetHot()
    function GetHot(){
        $.ajax({
            url:"https://localhost:44364/api/GetPostsHot?type=3",
            type:"GET",
            success:function(res){
                for(i=res.length-1,sum=0;i>0,sum<10;i--){
                    sum++
                    Hots.push(res[i]);
                }
                //console.log(Hots)
                hot.Hots=Hots
                //console.log(hot.Hots)
            }
        })
        let hot=new Vue({
            el:".main-right-hotsearch",
            data(){return{Hots}}
        })
    }
    //对数组进行排序
    function compare(property) {
        return (firstobj, secondobj) => {
        const firstValue = firstobj[property];
        const secondValue = secondobj[property];
        return firstValue - secondValue ; //升序
        };
    }
    $("#title").on("mouseenter","#title-img",function(){
        var actions = $(this).siblings('.actions');
        var timeoutId = setTimeout(function() {
            // actions.addClass('visible');
            alert("6")
        }, 2000);  // 延迟2秒钟后显示
        $(this).data('timeoutId', timeoutId);
    })
    // 点击评论区出现
    $(document).on("click",".icon-pinglun",function(){ 
        // $(".coment").hide();

        if($(this).hasClass("pldpl")){

        }else{
            var a = $('.coment').is(':hidden');
            if(!a){
                $('.coment').hide();
            }
            let id=$(this).parent().next().attr("id")
            let pid=id.substr(1);
            $(this).parent().next().toggle()
            $(this).parent().next().next().hide()
            console.log(pid)
            conment(pid)   
            
        }     
        });
    //点击转发出现
    $(document).on("click",".icon-fenxiang",function(){
        let id=$(this).parent().next().attr("id")
        let pid=id.substr(1);
        $(this).parent().next().next().toggle()
        $(this).parent().next().hide()
        forward(pid);
    })
        
        //点击评论回复
        $(document).on("click",".pldpl",function(){ 
            let cid=$(this).attr('id');
            cid1=cid
            ffff=cid;
            let name=m(cid)
            let ss=$(this).parent().parent().parent().prev().find('#text')
            if(ss.attr('placeholder')=="请写下你的评论"){
                ss.attr('placeholder',"回复"+name)
            }else{
                ss.attr('placeholder',"请写下你的评论")
            }
            
                     
            });
        function m(cid){
            var c=""
            $.ajax({
                url:"https://localhost:44364/api/GetCo?id="+cid,
                type:"get",
                async:false,
                success:function(res){
                    c=res[0].UserNick  
                }
            }) 
            return c;
        }
        function m1(cid){
                var c
                $.ajax({
                    url:"https://localhost:44364/api/GetCo?id="+cid,
                    type:"get",
                    async:false,
                    success:function(res){
                       c=res[0].UserID  
                    }
                }) 
                return c;
        }
        $(document).on("click","#conment1",function(){ 
                
                let cid=$(this).attr("class")
                let name=m1(cid) 
                window.open('grzx.html?uid='+name, '_blank');
            });
        //点赞
        $(document).on("click","#dz",function(){
            if($.cookie("uid")!=null){
                let id=$(this).parent().next().attr("id").substr(1)
                let data1={PostID:id,UserID:userid}
                $.ajax({
                    url:"https://localhost:44364/api/Likes",
                    type:"post",
                    data:data1,
                    success:function(res){
                        load("https://localhost:44364/api/Posts")
                    },
                    error:function(res){
                        alert("你已点赞")
                    }
                }) 
            }else{
                if(confirm("你未登录是否登录")){
                    window.location.href="Login.html"
                }
            }
            
        })

    // 点击发布评论
    $(document).on("click",".plbtn",function(){  
        if($.cookie("uid")!=null){
        let c=$(this).parent().prev().find('#text')
        let content=c.val();
        let pid=$(this).parent().parent().parent().attr("id").substr(1)
        let uid=$.cookie("uid")
        let fid=0;
        if(c.attr('placeholder')!="请写下你的评论"){
            fid=ffff;
        }
        ffff=0;
        let data1={ContentDesc:content,PostID:pid,FatherContentID:fid,UserID:uid}
        if(content!=""){
            $.ajax({
                url:"https://localhost:44364/api/Contents",
                type:"post",
                data:data1,
                success:function(res){
                    c.val("")
                    c.attr("placeholder","请写下你的评论")
                    conment(pid);
                    load("https://localhost:44364/api/Posts")
                }
            })
        }else{
            alert("内容不能为空")
        }
        $(".pic").click(function(){
            $(this).prev()('input[type="file"]')[0].click();
        })
    }
        else{
            if(confirm("你未登录是否登录")){
                window.location.href="Login.html"
            }
        }
        });
    // 点击转发
    $(document).on("click",".zfbtn",function(){  
        if($.cookie("uid")!=null){
            let c=$(this).parent().prev().find('#text')
            let content=c.val();
            let pid=$(this).parent().parent().parent().attr("id").substr(1)
            let uid=$.cookie("uid")
            let data1={ForwardContent:content,PostID:pid,UserID:uid}
            if(content!=""){
                $.ajax({
                    url:"https://localhost:44364/api/Forwards",
                    type:"post",
                    data:data1,
                    success:function(res){
                        c.val("")
                        forward(pid);
                        load("https://localhost:44364/api/Posts")
                    }
                })
            }else{
                alert("转发评论不能为空")
            }  
        }
        else{
            if(confirm("你未登录是否登录")){
                window.location.href="Login.html"
            }
        }
        });
        function picf(p){
            if(p=="无"||p==""||p==null){
                return "./Content/img/01.png";
            }else{
                return url1+encodeURIComponent(p)
            }
        }
        function conment(p){
            let pl2=[]
            $.ajax({
                url:"https://localhost:44364/api/Contents/"+p,
                type:"GET",
                success:function(res){
                    $.each(res,function(v,i){
                        let pl1={
                        nr:res[v].ContentDesc,
                        name:res[v].UserNick,
                        upic:picf(res[v].UserPic),
                        ctime:convertDateFromString1(res[v].ContentTime),
                        pid:res[v].PostID,
                        cid:res[v].ContentID,
                        fname:name(res[v].FatherContentID),
                        fid:res[v].FatherContentID
                        }
                        pl2.push(pl1)
                    })
                    
                    t.data4=pl2;
                    for(i=0;i<t.data4.length;i++){
                    }
                    function name(x){
                        for(i=0;i<res.length;i++){
                            if(res[i].ContentID==x){
                                return res[i].UserNick
                            }
                        }
                        return 0
                    }
                    
                    
                }
    
            })
        }
        function forward(p){
            let pl2=[]
            $.ajax({
                url:"https://localhost:44364/api/GetByid?id="+p,
                type:"GET",
                success:function(res){
                    $.each(res,function(v,i){
                        let pl1={
                        nr:res[v].ForwardContent,
                        name:res[v].UserName,
                        upic:picf(res[v].UserPic),
                        pid:res[v].PostID,
                        fid:res[v].ForwardID,
                        }
                        pl2.push(pl1)
                    })
                    
                    t.data7=pl2;
                    for(i=0;i<t.data7.length;i++){
                        //console.log(" pl"+t.data7[i].nr)
                    }                   
                }
    
            })
        }
        function convertDateFromString1(dateString) { 
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
    // $(document).on("click",".fs",function(e){  
    //     点击发送后的状态提示信息
    //     let message="";
    //     let why="";

    //     获取帖子内容
    //     let text=$(".puts").val();
    //     获取图片
    //     var pic = $('.imgs .imgs-img').css('backgroundImage');
    //     var pic1 = pic.replace('url(','').replace(')','');
    //     if(pic1=="none"){
    //         pic1="无"
    //     }
    //     获取帖子状态
    //     let sta=$(".select select option:selected").val();

    //     内容不为空就发布帖子
    //     if(text!=""){
    //         let flag=true;
    //         for(i=0;i<Word.length;i++){
    //             let a=$.base64.decode(Word[i].SensitiveContent).trim()
    //             if(a.indexOf(text)!=-1){
    //                 flag=false
    //             }
    //         }
    //             if(flag){
    //                 let post1={PostPic:pic1,PostContent:text,UserID:userid,StatusID:sta}
    //                 $.ajax({
    //                     url:"https://localhost:44364/api/Posts",
    //                     type:"POST",
    //                     data:post1,
    //                     success:function(res){
    //                         if(res==true){
    //                             message="发送成功";
    //                             $(".message").css("color","green");
    //                             $(".message").html(""+message+"");
    //                             window.location.reload();
    //                             loadData();
    //                         }else{
    //                             message="发布失败"
    //                             $(".message").css("color","red")
    //                             $(".message").html(""+message+"")
    //                         }   
    //                     }
    //                 })
    //                 $.ajax({
    //                     url: 'https://localhost:44364/api/Pic2',
    //                     type: 'POST',
    //                     data: formData,
    //                     processData: false,
    //                     contentType: false,
    //                     success: function(response) {
    //                       console.log(response);
    //                     },
    //                     error: function(xhr, status, error) {
    //                       console.log(xhr.responseText);
    //                     }
    //                   });  
    //             } else{
    //                 message="发送失败"
    //                 why="内容有违禁词"
    //                 $(".message").css("color","red")
    //                 $(".message").html(""+message+why+"")
    //             }
    //     }else{
    //         message="发送失败"
    //         why="内容不能为空"
    //         $(".message").css("color","red")
    //         $(".message").html(""+message+why+"")
    //     }
        
        
    //     });
        $('#uploadForm').submit(function(e) {
            e.preventDefault();
            var formData = new FormData(this);
            formData.append('image', this);
            // 点击发送后的状态提示信息
        let message="";
        let why="";

        // 获取帖子内容
        let text=$(".puts").val();
        // 获取图片
        // var picsum=$(".imgs").children();
        // for(i=0;i<picsum.length;i++){
        //     console.log(picsum[i])
        //     for(j=0;j<picsum[i].length;j++){
        //         console.log(picsum[i][j])
        //     }
            
        // }
        // console.log(pic1)
        // for(j=0;j<pic1.length;j++){
        //     for(i=0;i<pic1[j].length;i++){
        //         pic1[j][i].replace('url(','').replace(')','')
        //     }
        //    console.log(pic1[j])
        //    console.log(pic1[j].length)
        // }

        
        // var pic = $('.imgs .imgs-img').css('backgroundImage');
        // for(i=0;i<pic.length;i++){
        //     var pic1 = pic.replace('url(','').replace(')','');
        // }
        //console.log(imgpic)
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
                    let pic1=''
                    let vid1=''
                    $.each(imgpic,function(i,v){
                        if(imgpic[i].split('.')[1]=="mp4"){
                            vid1+=(imgpic[i]+',')
                        }else{
                            pic1+=(imgpic[i]+',')
                        }
                        
                    })
                    // for(i=0;i<sum;i++){
                    //     if(i=0){
                    //         pic1+=imgpic[i]
                    //     }else{
                    //         pic1+=(','+imgpic[i])
                    //     }
                        
                    // }
                    let post1={PostPic:pic1,PostContent:text,UserID:userid,StatusID:sta,PostVideo:vid1}
                    $.ajax({
                        url:"https://localhost:44364/api/Posts",
                        type:"POST",
                        data:post1,
                        success:function(res){
                            if(res==true){
                                message="发送成功";
                                $(".message").css("color","green");
                                $(".message").html(""+message+"");
                                $(".put").toggle();
                                $(".imgs").children().remove()
                                imgpic.length=0;
                                // window.location.reload();
                                
                                load("https://localhost:44364/api/Posts");
                            }else{
                                message="发布失败"
                                $(".message").css("color","red")
                                $(".message").html(""+message+"")
                            }   
                        }
                    })
                    $.ajax({
                        url: 'https://localhost:44364/api/Pic2',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(response) {
                          //console.log(response);
                        },
                        error: function(xhr, status, error) {
                          //console.log(xhr.responseText);
                        }
                      });  
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
            // $.ajax({
            //   url: 'https://localhost:44364/api/Pic2',
            //   type: 'POST',
            //   data: formData,
            //   processData: false,
            //   contentType: false,
            //   success: function(response) {
            //     console.log(response);
            //   },
            //   error: function(xhr, status, error) {
            //     console.log(xhr.responseText);
            //   }
            // });
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
            imgpic.push(file.name);
            var reader = new FileReader();
            reader.onload = function () {

                if(index==1){
                    $(".img1").css("background-image","url("+this.result+")").css(" background-repeat","no-repeat").css('background-size','100% 100%')
                }
                else{
                    pic1.push(this.result);
                    let s=
                    "<div class='imgs-img' style='background-image:url("+this.result+");display:block;'>"+
                        "<span class='imgs-x'>X</span>"+
                    "</div>"
                    $(".imgs").append(s);
                    // $(".imgs .imgs-img").css("background-image","url("+this.result+")").css(" background-repeat","no-repeat").css('background-size','100% 100%')
                    // .css("display","block")
                }
            }
            reader.readAsDataURL(file);
        }
    }
    

    $(document).on("click",".imgs-x",function(){  
        $(this).parent(".imgs-img").css("display","none").css("background-image","none")    
        });
    // 帖子的数据    
    let t=new Vue({
        el:".main-bottom-template",
        data(){
            return{
                data2,
                flag,
                followd1,
                images,
                commont:"",
                data4,
                data3,
                data7
            }
        },
        methods: {
            showActions(postId) {
                const post = this.data2.find(post => post.pid === postId);
                
                if (post) {
                  post.timeoutId = setTimeout(() => {
                    post.showActions = true;
                    post.show=true
                  }, 500);  // 延迟2秒钟后隐藏
                }
              },
              hideActions(postId) {
                const post = this.data2.find(post => post.pid === postId);
                if (post) {
                  clearTimeout(post.timeoutId);
                  post.showActions = false;
                }
              },
              show(postId){
                const post = this.data2.find(post => post.pid === postId);
                if (post) {
                    post.showActions = true;
                }
              },
              hide(postId){
                const post = this.data2.find(post => post.pid === postId);
                if (post) {
                    post.showActions = false;
                }
              },
              
        },
    })
    // let t1=new Vue({
    //     el:".main-bottom-template",
    //     data(){
    //         return{
                
    //         }
    //     }
    // })
    // 判断是否登录
    let u=new Vue({
        el:"#nav",
        data(){
            return{
                falg:(userid==0)
            }
        }
    })
    let u1=new Vue({
        el:"#main",
        data(){return{falg:(userid==0)}}
    })
    // let u2=new Vue({
    //     el:"#main",
    //     data(){return{images}}
    // })
    

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
        let gjc=$(".header-center-input-form").val().trim();
        if(gjc!=""||gjc!=null){
            $.ajax({
                url:"https://localhost:44364/api/GJC?gjc="+gjc,
                type:"GET",
                success:function(res){
                    //console.log(res)
                    var folderName = "Uploads";
                    url1="https://localhost:44364//api/GeiPic?folderName=" + encodeURIComponent(folderName) + "&fileName=";
                    $.each(res,function(n,value) {   
                        let data1={
                            
                            pid:res[n].pid,
                            content:res[n].PostContent,
                            time:convertDateFromString1(res[n].PostTime),
                            user:res[n].username,
                            pl:res[n].ContentS,
                            zf:res[n].Forwards,
                            dz:res[n].Likes,
                            pic:pic1(res[n].pic,2),
                            vidio:res[n].vidio,
                            f1:res[n].pic!="无",
                            tx:pic1(res[n].tx,1),
                            click:res[n].ClickSum,
                            uid:res[n].UserID,
                            uidf:res[n].UserID!=userid,
                            v1:(res[n].vidio!="无"&&res[n].vidio!=""),
                            fv1:(!f1==v1),
                            followd:!fl(res[n].UserID,1),
                            like:!fl(res[n].pid,2)
                                }  
                                function pic1(p,x){
                                    if(x==1){
                                        if(p=="无"||p==""){
                                            return "./Content/img/01.png";
                                        }else{
                                            return url1+encodeURIComponent(p)
                                        }
                                    }else{
                                        if(p=="无"||p==""){
                                            return "./Content/img/01.png";
                                        }else{
                                            return url3+encodeURIComponent(p)
                                        }
                                    }

                                    
                                }
                        data3.push(data1)
                        console.log("搜索后的"+data3[0].content)
                    }); 
                }
            })
        }else{
            t.data2.length=0;
            load();
        }
        
        t.data2=data3;
        console.log("搜索后的"+t.data2)
        loadf=false
    })
    $("#header").show()
    $("#nav").show()
    $("#main").show()
})

b=$("#main .main .main-bottom-template .main-bottom .main-bottom-blog .title .title-img");
b.mouseenter(function () {
    b.hide();
     alert('5')
 })
b.mouseover(function () {
     alert('5')
     b.hide();
 })
b.hover(function () {
    //console.log("移入")
    b.hide();
  }, function () {
    //console.log("移出")
  })