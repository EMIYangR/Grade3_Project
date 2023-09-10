// let data=[{
//     content:"123456",
//     time:"2011-12-02 14:12:00",
//     user:"王励",
//     zf:20,
//     pl:50,
//     dz:60,
// },{
//     content:"1234567",
//     time:"2011-12-02 14:12:00",
//     user:"王励1",
//     zf:201,
//     pl:501,
//     dz:601,
// }]
let data = [];
function s1() {
    $(".loader1").show();
    $("#img1").hide();
    $("#text1").hide();
    let op = 1;
    let c = setInterval(() => {
        if (op < 0) {
            $(".loader1").hide();
            $("#img1").show();
            $("#text1").show();
            clearInterval(c);
        }
        $(".loader1").css("opacity", op)
        op -= 0.4
    }, 100);
}
$("#tz").ready(function () {
    $(".loader1").show();
    $("#img1").hide();
    $("#text1").hide();
    let op = 1;
    let c = setInterval(() => {
        if (op < 0) {
            $(".loader1").hide();
            $("#img1").show();
            $("#text1").show();
            clearInterval(c);
        }
        $(".loader1").css("opacity", op)
        op -= 0.4
    }, 100);

})

$(document).ready(function () {
    ss();
    function ss() {
        let c = $.cookie('ss')
        let wrod = [];
        let click = [];
        c = JSON.parse(c);
        console.log(c);
        for (i = 0; i < c.length; i++) {
            click.push({ a: c[i].click, b: i })
        }
        console.log(click.sort())
        for (i = 0; i < c.length; i++) {
            wrod.push(c[i].word)
            click.push({ a: c[i].click, b: i })
            if (wrod.length >= 6) {
                break;
            }
        }
        console.log(wrod)
        console.log(click)
        let vm = null;
        if (vm == null || vm == undefined) {
            vm = new Vue({
                el: "#search1",
                data: {
                    wd: wrod
                }
            })
        } else {
            vue.set(this.vm, { data: wrod })
        }

    }
    $("#ss").click(function () {
        var keyword = { word: $("#search2").val(), click: 1 };
        var keywords = []
        if (keyword) {
            if ($.cookie('ss') != null || $.cookie('ss') != undefined) {
                keywords = $.cookie('ss')
                keywords = JSON.parse(keywords);
            }
            if (keywords.length > 0) {
                let f = true;
                for (i = 0; i < keywords.length; i++) {
                    if (keyword.word == keywords[i].word) {
                        keywords[i].click += 1
                        f = false;
                    }
                }
                if (f) {
                    keywords.push(keyword);
                }
            } else {
                keywords.push(keyword);
            }
            $.cookie('ss', JSON.stringify(keywords), { expires: 7 });
            ss();
            // window.open("index?text="+$("#search2").val()+".html")
            window.open("index.html");
        }
    });
    $("#search1 ul li").click(function () { //点击可通过标签，id，类名等                           
        $("#search2").val($(this).html().trim())

    })
    $("#Loginsub").click(function () {
        let user = $("#Login-user").val()
        let pwd = $("#Login-pwd").val()
        let data = { user: user, pwd: pwd }
        let name = ""
        $.ajax({
            url: "https://localhost:44364/api/UserInfoes?user=" + user + "&pwd=" + pwd,
            type: "GET",
            success: function (res) {
                if (res == null) {
                    alert("账号或密码错误")
                } else {
                    alert("登录成功")
                    $.each(res, function (n, value) {
                        name = value.UserName
                    });
                    $("#ydl").attr("class", "s")
                    $("#wdl").attr("class", "f")
                    $("#ydl").find(".name").html("" + name + "");
                    var res = $('#rember').prop("checked");
                    if (res == true) {
                        $.cookie('user', user)
                        $.cookie('pwd', pwd)
                        $.cookie('name', name)
                    }
                    window.open("index.html");
                }
            },
            error: function (res) {
                console.error(res)
            }
        })
        $("#Login-user").val("")
        $("#Login-pwd").val("")
    })
    let r1 = "";
    let r = [];
    let remen = "";
    let value = $("#choose").children();
    let user1 = $.cookie('user');
    let pwd1 = $.cookie('pwd');
    let name1 = $.cookie('name');
    $.getJSON("data/remen.json", function (result) {
        $.each(result, function (i, field) {
            remen = field
            r1 = "<div id='phb1'>" +
                "<div class='left'>" +
                "<img src='Content/img/01.png' alt=''>" +
                "</div>" +
                "<div class='right'>" +
                "<p><a href=''>#" + remen.bt + "#</a></p>" +
                "<p><a href=''>" + remen.clicks + " " + remen.pl + "</a></p>" +
                "</div>" +
                "</div>"
            r.push(r1);
        });
        $("#phb").append(r);
        let s1 = $("#phb").children().length;
        let height1 = $("#phb1").height();
        $("#phb").css("height", height1 * s1)
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


    $("#UserL1").click(function () {
        $("#userL").addClass("s")
        $("#userL").removeClass("f")
        $("#SmL").addClass("f")
        $("#SmL").removeClass("s")
        if ($("#UserL1").hasClass("x3")) {
            $("#SmL1").removeClass("x3")
        } else {
            $("#SmL1").removeClass("x3")
            $(this).addClass("x3")
        }
        // $(this).css("border-bottom","1px solid orange")
    })
    $("#SmL1").click(function () {
        $("#SmL").addClass("s")
        $("#SmL").removeClass("f")
        $("#userL").addClass("f")
        $("#userL").removeClass("s")
        if ($("#SmL1").hasClass("x3")) {
            $("#UserL1").removeClass("x3")
        } else {
            $("#UserL1").removeClass("x3")
            $(this).addClass("x3")
        }
        // $(this).css("border-bottom","1px solid orange")
    })

    if (user1 != undefined && pwd1 != undefined && name1 != undefined) {
        $("#ydl").attr("class", "s")
        $("#wdl").attr("class", "f")
        $("#ydl").find(".name").html("" + name1 + "");
        $("#Login-user").val(user1)
        $("#Login-pwd").val(pwd1)
        $('#rember').attr("checked", true)
    }
    let span = $("#left ul").children()

    $("#left ul li").click(function () { //点击可通过标签，id，类名等                           
        for (i = 0; i < span.length; i++) {
            if (span[i].className == "x1") {
                span[i].className = "x2"
            }
        }
        if ($(this).hasClass("x2")) {
            $(this).attr("class", "x1");
        } else {
            $(this).attr("class", "x2");
        }
    })
    $.ajax({
        url: "https://localhost:44364/api/Posts",
        type: "GET",
        success: function (res) {
            // console.log(res);

            $.each(res, function (n, value) {

                let data1 = {
                    pid: res[n].PostID,
                    content: res[n].PostContent,
                    time: res[n].PostTime,
                    user: res[n].username,
                    pl: res[n].ContentS,
                    zf: res[n].Forwards,
                    dz: res[n].Likes
                }
                data.push(data1)
            });
        },
        error: function (res) {
            console.log(res)
        }
    })
    $("#cs").click(function () {
        flash(data)
    })
    $("#gotop1").click(function () {
        // $(document).scrollTop(0)
        $("html,body").animate({ scrollTop: 0 }, 500);
    })
});
function pl() {
    alert("你评论了");
}
function zf() {
    alert("你转发了")
}
function dz(x) {
    let sum = $(x).find("span").attr("class");
    let pic = $(x).find("i").attr("class");
    if ($("." + pic + "").attr("src") != "Content/img/点赞 (1).png") {
        let val = parseInt($("." + sum + "").html())
        $("." + sum + "").html(val + 1)
        $("." + pic + "").html('<i class="bi bi-hand-thumbs-up-fill"></i>')
        // $("." + pic + "").attr("src", "Content/img/点赞 (1).png")
    } else {
        let val = parseInt($("." + sum + "").html())
        $("." + sum + "").html(val - 1)
         $("." + pic + "").html('<i class="bi bi-hand-thumbs-up"></i>')
        // $("." + pic + "").attr("src", "Content/img/点赞.png")
    }
}
let sjc = [];
function flash(data) {

    let x = data.length;
    let y = 1;
    let sj = parseInt(Math.random() * (x - y + 1) + y)

    let sum = $("#text").children();
    let index = sum.length
    let height = $("#tz").height() + 22;
    let te = ""
    let te1 = ""
    // $.each(sjc,function(n,a){
    if (sjc.length == x) {
        alert("帖子已加载完毕")
    } else {
        data.forEach(item => {
            // console.log("随机数"+sj+"已随机数"+sjc+"帖子id"+item.pid)                
            if (item.pid == sj && sjc.indexOf(sj) == -1) {
                let u = ""
                let g = ""
                let text = item.content
                let index1 = item.content.indexOf("@")
                let index2 = item.content.indexOf(" ")
                let index3 = item.content.indexOf("#")
                if (index1 != -1) {
                    u = item.content.substr(index1, index2)
                    let ui = item.content.indexOf(u)
                    text = item.content.substr(0, ui) + item.content.substr(ui + u.length)
                    index1 = text.indexOf("@")
                    index2 = text.indexOf(" ")
                    index3 = text.indexOf("#")
                }
                if (index3 != -1) {
                    g = text.substr(index3, index2)
                    let gi = text.indexOf(g)
                    text = text.substr(0, gi) + text.substr(gi + g.length)
                    index1 = text.indexOf("@")
                    index2 = text.indexOf(" ")
                    index3 = text.indexOf("#")
                }
                if (text.length > 20) {
                    text = text.substr(0, 20)
                }
                let sj1 = parseInt(Math.random() * 5 + 1)
                te = "<div id='tz'>" +
                    "<div class='loader1'>" +
                    "</div>" +
                    "<div id='img1' class='img1'>" +
                    "<a href='javascript:void (0);''><img src='Content/img/0" + sj1 + ".png' alt=''></a>" +
                    "</div>" +
                    "<div id='text1' style='overflow: hidden;''>" +
                    "<div class='nr'>" +
                    "<a href=''><p style='margin-top: 20px;''>" + text + "<span class='person'>" + u + "</span><span class='gjc'>" + g + "</span></p></a>" +
                    "<p style='margin-top: 20px;''><a href='' class='mz'>" + item.user + "</a><span class='time'> " + item.time + "</span></p>" +
                    "</div>" +
                    "<div class='dz'>" +
                    "<ul>" +
                    "<li class='zf1' onclick='zf()'><a href='javascript:void (0);'><img src='Content/img/3.1转发.png' alt=''><span>" + item.zf + "</span></a></li>" +
                    "<li>丨</li>" +
                    "<li class='pl1' onclick='pl()'><a href='javascript:void (0);'><img src='Content/img/3.1_评论.png' alt=''><span>" + item.pl + "</span></a></li>" +
                    "<li>丨</li>" +
                    "<li class='dz1' onclick='dz(this)'><a href='javascript:void (0);'><img class='dzpic" + index + "' src='Content/img/点赞.png' alt=''><span class='dzsum" + index + "'>" + item.dz + "</span></a></li>" +
                    "</ul>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
                index++;
                te1 += te;
            }
        });
    }
    if (sjc.length == 0) {
        sjc.push(sj)
    } else {
        if (sjc.indexOf(sj) == -1) {
            sjc.push(sj)
        }
    }

    // })
    $("#text").append(te1);
    te1.length = 0;
    $("#center").css("height", index * height + $(".shell").height())
}

$(document).scroll(function () {
    var scroH = parseInt($(document).scrollTop());   //滚动高度
    var viewH = $(window).height();  //可见高度 
    var contentH = $(document).height();  //内容高度
    if (scroH <= 700) {  //距离顶部小于500px时
        $("#login").removeClass("login1")
    }
    if (scroH > 700) {  //距离顶部大于500px时
        $("#login").addClass("login1")
    }
    if (contentH - (scroH + viewH) < 10) {
        flash(data)
    }
});

$(".diy-post-follow").click(function () {
    alert("你关注了")
})