
let data=[];
function s1(){
    $(".loader1").show();
    $("#img1").hide();
    $("#text1").hide();
    let op=1;
    let c=setInterval(() => {
        if(op<0){
            $(".loader1").hide();
            $("#img1").show();
            $("#text1").show(); 
            clearInterval(c);
        }
        $(".loader1").css("opacity",op)
        op-=0.4
    }, 100);
}

$(document).ready(function(){
    let Posts=[];
    let start=0
    let rand=[];
    ss();   
    // $.ajax({
    //     url:"https://localhost:44364/api/Posts",
    //     type:"get",
    //     success:function(res){
    //         Posts=res;
    //         console.log(Posts)
    //     }
    // })
    
    function ss(){
        if($.cookie('ss')!=null){
            let c=$.cookie('ss')
            let wrod=[];
            let click=[];
            c=JSON.parse(c);
            console.log(c);
            for(i=0;i<c.length;i++){
                click.push({a:c[i].click,b:i})
            }
            for(i=0;i<c.length;i++){
                wrod.push(c[i].word)
                click.push({a:c[i].click,b:i})
                if(wrod.length>=6){
                    break;
                }
            }
            console.log(wrod)
            let vm=null;
            console.log(vm)
            vm=new Vue({
                el:"#search1",
                data:{
                    wd:wrod
                }
            })
            console.log(vm.wd)
        }
        
        
    }
    $("#ss").click(function(){
        var keyword={word:$("#search2").val(),click:1};
        var keywords=[]
        if(keyword){
            if($.cookie('ss')!=null||$.cookie('ss')!=undefined){                
                    keywords=$.cookie('ss')
                    keywords=JSON.parse(keywords);                           
            } 
            if(keywords.length>0){
                let f=true;
                for(i=0;i<keywords.length;i++){
                    if(keyword.word==keywords[i].word){
                        keywords[i].click+=1
                        f=false;
                    }
                }  
                if(f){
                    keywords.push(keyword);
                }
            }else{
                keywords.push(keyword);
            }
            $.cookie('ss',JSON.stringify(keywords), { expires: 7 });
            ss();            
            // window.open("index?text="+$("#search2").val()+".html")
            window.location.href="index1.html";
        }
    });
    $("#search1 ul li").click(function(){ //点击可通过标签，id，类名等                           
        $("#search2").val($(this).html().trim())
                        
    })
    $("#Loginsub").click(function(){
        let user=$("#Login-user").val()
        let pwd=$("#Login-pwd").val()
        let name=""
        let userid;
        $.ajax({
            url:"https://localhost:44364/api/GetUser?user="+user+"&pwd="+pwd,
            type:"GET",
            success:function(res){
                if(res==null){
                    alert("账号或密码错误")
                }else{
                    alert("登录成功")
                    console.log(res)
                    $.each(res,function(n,i){
                        name=i.UserNick
                        userid=i.uid
                    })
                    
                    console.log(name+"   "+userid)
                    $("#ydl").attr("class","s")
                    $("#wdl").attr("class","f")
                    $("#ydl").find(".name").html(""+name+"");
                    var flag = $('#rember').prop("checked");
                    if(flag==true){
                        $.cookie('user',user)
                        $.cookie('pwd',pwd)
                    }
                    $.cookie('name',name)
                    $.cookie('uid',userid)
                    window.open("index1.html");
                }                                          
            },
            error:function(res){
                console.error(res)
            }
        })
        $("#Login-user").val("")
        $("#Login-pwd").val("")
    })
    let r1="";
    let r=[];
    let remen="";
    let value=$("#choose").children();
    let user1=$.cookie('user');
    let pwd1=$.cookie('pwd');
    let name1=$.cookie('name');
    if(user1!=""&&pwd1!=""){

    }
    //获取搜索历史
    $.getJSON("data/remen.json",function(result){
        $.each(result, function(i, field){
            remen=field
            r1="<div id='phb1'>"+
                    "<div class='left'>"+
                        "<img src='Content/img/01.png' alt=''>"+
                    "</div>"+
                    "<div class='right'>"+
                        "<p><a href=''>#"+remen.bt+"#</a></p>"+
                        "<p><a href=''>"+remen.clicks+" "+remen.pl+"</a></p>"+
                    "</div>"+   
                "</div>"
            r.push(r1);
        });
        $("#phb").append(r);
        let s1=$("#phb").children().length;
        let height1=$("#phb1").height();
        $("#phb").css("height",height1*s1)
    });
                //写入
                // $.getJSON("data/remen.json",function(data){
                //     console.log("得到了")
                //     r=data;
                //     r.push(r1);
                //     var jsonData=JSON.stringify(r);
                //     var blob=new Blob([jsonData],{type:"application/json"});
                //     var url=URL.createObjectURL(blob);
                //     URL.revokeObjectURL(url);
                // });
    

    // 切换登录方式↓
    $("#UserL1").click(function(){
        $("#userL").addClass("s")
        $("#userL").removeClass("f")
        $("#SmL").addClass("f")
        $("#SmL").removeClass("s")
        if($("#UserL1").hasClass("x3")){
            $("#SmL1").removeClass("x3")
        }else{
            $("#SmL1").removeClass("x3")
            $(this).addClass("x3")
        }
    })
    $("#SmL1").click(function(){
        $("#SmL").addClass("s")
        $("#SmL").removeClass("f")
        $("#userL").addClass("f")
        $("#userL").removeClass("s")
        if($("#SmL1").hasClass("x3")){
            $("#UserL1").removeClass("x3") 
        }else{
            $("#UserL1").removeClass("x3")
            $(this).addClass("x3")
        }
        })
         // 切换登录方式↑
        // 判断是否记住密码
        if(user1!=undefined&&pwd1!=undefined&&name1!=undefined){
            $("#ydl").attr("class","s")
            $("#wdl").attr("class","f")
            $("#ydl").find(".name").html(""+name1+"");
            $("#Login-user").val(user1)
            $("#Login-pwd").val(pwd1)
            $('#rember').attr("checked",true)
        }
        let span=$("#left ul").children()
        
        $("#left ul li").click(function(){ //点击可通过标签，id，类名等                           
            for(i=0;i<span.length;i++){
                if(span[i].className=="x1"){
                    span[i].className="x2"
                }
            }
            if($(this).hasClass("x2")){
                $(this).attr("class","x1");
            }else{
                $(this).attr("class","x2");
            }
        })     

        // 获取帖子数据
        $.ajax({
            url:"https://localhost:44364/api/Posts",
            type:"GET",
            success:function(res){     
                console.log(res)
                let r=[]    
                $.each(res,function(n,value) {   
                    let data1=res[n]; 
                    data.push(data1)
                    r[n]=res[n].pid
                });
                rand1(r)
                loadData(data) 
            },
            error:function(res){
                console.log(res)
            }
        })
        function rand1(r){
            let length = r.length;    // 原数组一开始的长度
            for (var i = 0; i < length; i++) {     // 注意，这里是length，不是arr.length
                var index = Math.floor(Math.random() * (length - i));   // 注意，这里是length
                rand[i] = r[index];
                // arr.splice(index, 1);   // 删除该元素
            }
        }
        //加载数据
    function loadData(res){
        let a=[];
        a=res;
        let c=5;
        console.log(a.length)
        for(let n=start;n<c+start;n++){
            let i=rand[n];
            for(s=0;s<a.length;s++){
                if(data[s].pid==i){
                    let data1=data[s]
                    Posts.push(data1) 
                }
            }
                     
        }   
        t.Posts=Posts
        start+=Posts.length-1; 
        let index=Posts.length
        let height=$("#tz").height()+22;
        $("#center").css("height",index*height+$(".shell").height())  
        console.log(t.Posts)
        console.log(Posts)
    } 
    let t=new Vue({
        el:"#zhongjian",
        data(){return{Posts}}
    })
        $("#cs").click(function(){
            flash(data)  
        })     
        $("#gotop1").click(function(){
            // $(document).scrollTop(0)
            $("html,body").animate({ scrollTop: 0 }, 500);
        })   
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
        loadData(data)
    }                                  
    });                                   
});   
function pl(){
    alert("你评论了");
}
function zf(){
    alert("你转发了")
}
//判断点赞
function dz(x){
    let sum=$(x).find("span").attr("class");
    let pic=$(x).find("img").attr("class");
    if($("."+pic+"").attr("src")!="Content/img/点赞 (1).png"){
        let val=parseInt($("."+sum+"").html())
        $("."+sum+"").html(val+1)
        $("."+pic+"").attr("src", "Content/img/点赞 (1).png" )
    }else{
        let val=parseInt($("."+sum+"").html())
        $("."+sum+"").html(val-1)
        $("."+pic+"").attr("src", "Content/img/点赞.png" )
    } 
}  
let sjc=[];
//随机加载数据
// function flash(data){
    
//     let x=data.length;
//     console.log(data)
//     let y=1;
//     let sj=parseInt(Math.random() * (x - y + 1) + y)
    
//     let sum=$("#text").children();
//             let index=sum.length
//             let height=$("#tz").height()+22;
//             let te=""
//             let te1=""
//             // $.each(sjc,function(n,a){
//             if(sjc.length==x){
//                 alert("帖子已加载完毕")
//             }else{
//             data.forEach(item => {
//                 console.log("随机数"+sj+"已随机数"+sjc+"帖子id"+item.pid)                
//                 if(item.pid==sj&&sjc.indexOf(sj)==-1){
//                 let u=""
//                 let g=""
//                 let text=item.content
//                 let index1=item.content.indexOf("@")
//                 let index2=item.content.indexOf(" ")
//                 let index3=item.content.indexOf("#")
//                     if(index1!=-1){
//                         u=item.content.substr(index1,index2)
//                         let ui=item.content.indexOf(u)
//                         text=item.content.substr(0,ui)+item.content.substr(ui+u.length)
//                         index1=text.indexOf("@")
//                         index2=text.indexOf(" ")
//                         index3=text.indexOf("#")
//                     }
//                     if(index3!=-1){
//                         g=text.substr(index3,index2)
//                         let gi=text.indexOf(g)
//                         text=text.substr(0,gi)+text.substr(gi+g.length)
//                         index1=text.indexOf("@")
//                         index2=text.indexOf(" ")
//                         index3=text.indexOf("#")
//                     }
//                     if(text.length>20){
//                         text=text.substr(0,20)
//                     }
//                 let sj1=parseInt(Math.random() * 5 + 1)
//                 te="<div id='tz'>"+
//                             "<div id='img1' class='img1'>"+
//                                 "<a href='javascript:void (0);''><img src='Content/img/0"+sj1+".png' alt=''></a>"+
//                             "</div>"+
//                             "<div id='text1' style='overflow: hidden;''>"+
//                             "<div class='nr'>"+
//                                 "<a href=''><p style='margin-top: 20px;''>"+text+"<span class='person'>"+u+"</span><span class='gjc'>"+g+"</span></p></a>"+
//                                 "<p style='margin-top: 20px;''><a href='' class='mz'>"+item.user+"</a><span class='time'> "+item.time+"</span></p>"+
//                             "</div>"+
//                             "<div class='dz'>"+
//                                 "<ul>"+
//                                     "<li class='zf1' onclick='zf()'><a href='javascript:void (0);'><img src='Content/img/3.1转发.png' alt=''><span>"+item.zf+"</span></a></li>"+
//                                     "<li>丨</li>"+
//                                     "<li class='pl1' onclick='pl()'><a href='javascript:void (0);'><img src='Content/img/3.1_评论.png' alt=''><span>"+item.pl+"</span></a></li>"+
//                                     "<li>丨</li>"+
//                                     "<li class='dz1' onclick='dz(this)'><a href='javascript:void (0);'><img class='dzpic"+index+"' src='Content/img/点赞.png' alt=''><span class='dzsum"+index+"'>"+item.dz+"</span></a></li>"+
//                                 "</ul>"+
//                             "</div>"+
//                             "</div>"+
//                         "</div>";
//                         console.log(te)
//                         index++;
//                 te1+=te;
//                 }
//             });
//         }
//             if(sjc.length==0){
//                 sjc.push(sj)
//             }else{
//             if(sjc.indexOf(sj)==-1){
//                 sjc.push(sj)
//             }
//             }

//         // })
//             $("#text").append(te1);
//             te1.length=0;
//             $("#center").css("height",index*height+$(".shell").height())
// }

