function getUserInfo(){
   $.ajax({
       type: "GET",
       url: "/my/userinfo",
    //    headers:{
    //     Authorization:localStorage.getItem("token"),
    //     },
        success: function(res){
            if(res.status !== 0) return layer.msg('获取用户信息失败！');
            layer.msg('获取用户信息成功！')

            renderAvatar(res.data)
       },
   });
}

//渲染用户信息
const renderAvatar = (user) => {
    console.log(user);
    let uname = user.nickname || user.username;
    //渲染欢迎语
    $('#welcome').html(`${uname}`)
    //按照需求渲染头像

    if(user.user_pic !==null)
    {$('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide();
    }else{
        $('.layui-nav-img').hide();
        $('.text-avatar').html(uname[0].toUpperCase());
    }
};

//退出
$("#btnOut").click( () => {
    layer.confirm('Are you sure you want to',{icon: 3,title: '提示'},function(index){
        localStorage.removeItem('token');
        location.href ='/login.html';
    })
});

getUserInfo()