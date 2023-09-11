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
        // console.log($("#sun").attr('class'))
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
                                // load("https://localhost:44364/api/Posts")
                                loading()
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
    
        
})
let fatherid=0;
$(document).ready(function(){
    let userid=0;
    if($.cookie("uid")!=null){
        userid=$.cookie("uid")
    }
    let data=[];
    let data4=[];
    let data6=[];
    let data5=[]
    let flag=[];
    let f=[];
    let upic=[]
    let iszz=false;
    fatherid=0
    const pid=getid('pid')
    // console.log(pid)
    let id;
    //关注名单
    let followd1=[];
    let Like=[];
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
    
    $(document).on("click",".share .icon-pinglun",function(){ 
        $("#a22").hide()
        $("#a11").show()
    })
    $(document).on("click",".three .icon-pinglun",function(){  
        
        let a=$(this).parent().parent().parent().parent().parent().parent().prev().find(".btn")
        id=$(this).parent().parent().prev().find("a").attr("id")
        
        if(a.html()=="发送"){
            a.html("回复");
            
            $("#te1").attr("placeholder","回复  "+$(this).parent().parent().prev().find("a").html());
            fatherid=id
        }else{
           a.html("发送");
           
           $("#te1").attr("placeholder","请写下你的评论");
           fatherid=0
        }
        // $(this).parent().parent().next().toggle();
        // data5.length=0;
        // Vue.component('app', {
        //     template: `
        //         <div class="right-end" v-for="item in data5" :key="item.cid">
        //         <div class="top" v-if="item.nr">
        //             <a href="" v-if="item.name">{{item.name}}</a>
        //             {{item.nr}}
        //         </div>
        //         <div class="center">
        //             <div class="time" v-if="item.time">{{item.time}}</div>
        //             <div class="three">
        //                 <div class="iconfont icon-fenxiang"></div>
        //                 <div class="iconfont icon-fenxiang"></div>
        //                 <div class="iconfont icon-pinglun"></div>
        //                 <div class="iconfont icon-dianzan"></div>
        //             </div>
        //         </div>
        //     </div>
        //     `,
        //     data() {
        //       return {
                
        //       };
        //     },
        //     methods: {
                
        //     }
        //   });
        });
    $(document).on("click",".icon-fenxiang",function(){
        forward(pid)
        $("#a11").hide()
        $("#a22").show()
    })
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
    //获取用户的关注
    $.ajax({
        url:"https://localhost:44364/api/GetByUid?uid="+userid,
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
    function son(x){
        $.ajax({
            url:"https://localhost:44364/api/GetSon?id="+x,
            type:"GET",
            success:function(res){
                if(res!=null){
                    // console.log(res.length)
                    return res.length
                }
                return 0
            }
        })
    }
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
    mine()
    function loading(){
        data4.length=0
        data6.length=0
        data.length=0
        data5.length=0
        post(pid);
        // forward(pid);
        content(pid)
        }
        // console.log(data)
        // console.log(data4)
        // console.log(data5)
        function pic1(p){
            if(p=="无"||p==""||p==null){
                return "./Content/img/01.png";
            }else{
                return url1+encodeURIComponent(p)
            }
        }
        function content(pid){
            var folderName = "Uploads";
            url1="https://localhost:44364//api/GeiPic?folderName=" + encodeURIComponent(folderName) + "&fileName=";
            url2="https://localhost:44364//api/Geivi?fileName=";
            $.ajax({
                url:"https://localhost:44364/api/Contents/"+pid,
                type:"GET",
                success:function(res){
                    //console.log(res)
                    $.each(res,function(v,i){
                        let pl1={
                            nr:res[v].ContentDesc,//评论内容
                            name:res[v].UserNick,//评论人
                            upic:pic1(res[v].UserPic),//评论人头像
                            ctime:convertDateFromString(res[v].ContentTime),//评论时间
                            f:son(res[v].ContentID)>0,//评论是否有回复
                            uid:res[v].UserID,//评论人id
                            cid:res[v].ContentID,//评论id
                            fid:res[v].FatherContentID//是否有父级评论id是什么
                        }
                        pl.push(pl1)
                        data4.push(pl1)
                        })                        
                    }
                })
                $.ajax({
                    url:"https://localhost:44364/api/GetSon1",
                    type:"GET",
                    success:function(res){
                        //console.log("子评论"+res)
                        $.each(res,function(v,i){
                            let pl1={
                            nr:res[v].ContentDesc,
                            name:res[v].UserNick,
                            upic:pic1(res[v].UserPic),
                            ctime:convertDateFromString(res[v].ContentTime),
                            f:son(res[v].ContentID)>0,
                            uid:res[v].UserID,
                            cid:res[v].ContentID,
                            fid:res[v].FatherContentID
                            }
                            pl.push(pl1)
                            data5.push(pl1)
                        })
                        
                        
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
                            name:res[v].UserNick,
                            upic:pic1(res[v].UserPic),
                            pid:res[v].PostID,
                            fid:res[v].ForwardID,
                        }
                        pl2.push(pl1)
                    })
                    s.data6=pl2;
                    for(i=0;i<s.data6.length;i++){
                        //console.log(" pl"+s.data6[i])
                    }                   
                }
                })
            }
        function post(pid){
            $.ajax({
                url:"https://localhost:44364/api/Posts/"+pid,
                type:"GET",
                success:function(res){  
                    var folderName = "Uploads";
                    url1="https://localhost:44364//api/GeiPic?folderName=" + encodeURIComponent(folderName) + "&fileName=";  
                    //console.log(res[0].vidio)       
                    let d={
                        pid:res[0].Postid,
                        content:res[0].PostContent,
                        time:convertDateFromString(res[0].PostTime),
                        user:res[0].username,
                        pl:res[0].ContentS,
                        zf:res[0].Forwards,
                        dz:res[0].Likes,
                        pic:pic1(res[0].pic),
                        vidio:vid1(res[0].vidio),
                        f1:res[0].pic!="无",
                        tx:pic1(res[0].tx),
                        click:res[0].ClickSum,
                        uid:res[0].UserID,
                        uidf:res[0].UserID!=userid,
                        v1:(res[0].vidio!="无"&&res[0].vidio!=""),
                        // fv1:(!f1==v1)
                        bg:!followme(res[0].UserID)
                        
                    }
                    if(d.uid==userid){
                        iszz=true;
                    }       
                    data.push(d)
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
                    //console.log(data[0])
                
                }
        })
        }
        function mine(){
            // console.log(userid)
            $.ajax({
                url:"https://localhost:44364/api/UserInfoes/"+userid,
                type:"get",
                success:function(res){
                    var folderName = "Uploads";
                    url1="https://localhost:44364//api/GeiPic?folderName=" + encodeURIComponent(folderName) + "&fileName=";
                    
                    upic.push(url1+encodeURIComponent(res[0].UserPic))
                }
                
            })
            // console.log(upic)
        }
    $("#back").click(function(){
        window.history.go(-1)
    })
    // 判断帖子是否被当前用户喜欢 1代表判断是否被关注、2代表判断是否被喜欢
    // function fl(x,sign){
    //     for(i=0;i<followd1.length;i++){
    //         switch(sign){
    //             case 1:{
    //                 if(followd1.length>0){
    //                     if(followd1[i][0]==x){
    //                         return true
    //                     }
    //                 }   
    //             }
    //             case 2:{
    //                 if(Like.length>0){
    //                     if(Like[i][0]==x){
    //                         return true
    //                     }
    //                 }
                        
    //             }
    //         }
    //     }
    //     return false   
    // }
    //获取用户的喜爱
    $.ajax({
        url:"https://localhost:44364/api/Like/GetByUid?uid="+userid,
        type:"GET",
        success:function(res){
            if(res!=null){
                $.each(res,function(i,v){
                    let l=[
                        pid1=res[i].PostID
                    ]
                    Like.push(l)
                })
                
            }
        }
    })
    $(".btn").click(function(){
        if($.cookie("uid")!=null){
            let cont=$("#te1").val();
            let pid=getid('pid')
            let uid=$.cookie("uid")
            let data1={ContentDesc:cont,PostID:pid,FatherContentID:fatherid,UserID:uid}
        if(cont!=""){
            $.ajax({
                url:"https://localhost:44364/api/Contents",
                type:"post",
                data:data1,
                success:function(res){

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
    $(".zfbtn").click(function(){
        if($.cookie("uid")!=null){
        let c=$("#te2")
        let cont=$("#te2").val();
        let pid=getid('pid')
        let uid=$.cookie("uid")
        let data1={ForwardContent:cont,PostID:pid,UserID:uid}
        
        if(cont!=""){
            $.ajax({
                url:"https://localhost:44364/api/Forwards",
                    type:"post",
                    data:data1,
                    success:function(res){
                        c.val("")
                        forward(pid);
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
    let Hots=[]
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
                hot.Hots=Hots
            }
        })
        
    }

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
    let hot=new Vue({
        el:".main-right-hotsearch",
        data(){return{Hots}}
    })
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
        data(){
            return{
                data4,
                data5,
                data6,
                upic,
                iszz
            }
        },
        methods:{
            filteredArray2(pid) {
                return this.data5.filter(item => item.fid === pid);
              }
        }
    })
    $(".main-left div").click(function(){
        qh(this)
    })
    $(".nav-center-five div").click(function(){
        qh1(this)
    })
    function qh(x){        
        if($(x).hasClass("show")){
            // console.log($(x).siblings(".show").attr("class"))
        }else{
            $(x).addClass("show")
            $(x).siblings(".show").removeClass("show")                    
        }
    }
    function qh1(x){
        if($(x).hasClass("show1")){
            // console.log($(x).siblings(".show1").attr("class"))
        }else{
            $(x).addClass("show1")
            $(x).siblings(".show1").removeClass("show1")
        }
    }
    let u1=new Vue({
        el:"#main",
        data(){return{falg:(userid==0)}}
    })
})