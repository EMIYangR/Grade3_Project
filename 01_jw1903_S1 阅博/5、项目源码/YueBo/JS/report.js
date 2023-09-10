$(document).ready(function(){
    let pid=getid('id')
    let uid=$.cookie("uid");
    let data=[];
    // $.ajax({
    //     url:"",
    //     type:"POST",
    //     data:123,
    //     success:function(res){
    //         if(res==true){
    //             alert("举报成功")
    //         }
    //     }
    // })
    $(document).on("click",".cx",function(){
        $.cookie("pid",pid)
        if($.cookie("pid")){
            window.location.href="PostDetail.html?pid="+pid;
        }
    })
    function getid(name)
    {
    var reg= new RegExp("(^|&)"+
    name +"=([^&]*)(&|$)");
    var r= window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
    }
    $.ajax({
        url:"https://localhost:44364/api/Posts/"+pid,
        type:"GET",
        success:function(res){           
            let d={
                pid:res[0].PostID,
                content:res[0].PostContent,
                user:res[0].username
            }    
            console.log(res)   
            data.push(d)    
            Post.data=data
        }
    })
    let vm=new Vue({
        el:"#Rtype",
        data:{
            type:["人身攻击","不友好发言","涉黄信息","低俗信息","垃圾营销","诈骗信息","诱导信息","违法信息","破坏社区环境"],
            pid:pid
        }
    })
    let Post=new Vue({
        el:"#center",
        data(){return{data}}
    })
    $("#btn").click(function(){
        
        let cont=$("#desc").val();
        let type=$("#select option:selected").val();
        console.log("内容"+cont+"类型"+type+"用户"+uid+"帖子"+pid)
    })
    $("#btn1").click(function(){
        window.location.href="index1.html"
    })
})