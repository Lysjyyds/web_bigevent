$(function() {
    //登陆注册切换功能
    $('#link_reg').click(() => {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').click(() => {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //从LayUI中获取form对象
    const form = layui.form;
     // 获取 layui 弹窗
    const layer = layui.layer;

    //自定义校验规则
    form.verify({
     // 自定义一个叫 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    //确认密码验证
    repwd: (value) => {
        //1.先通过形参拿到确认密码框的内容
        //2.拿到密码框中的内容
        //3.进行判断是否一样
        //4.判断失败，return即可
        const pwd = $('#form_reg [name=password]').val();
        if(pwd !== value) return'两次密码不一致'
    },
    });

    //设置根路径
    // const baseUrl = 'http://www.liulongbin.top:3007';

    //监听注册表单，发送注册请求
    $('#form_reg').on('submit',(e) => {
        //阻止默认事件
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/api/reguser',
            data:{
                username:$('#form_reg [name=username]').val(),
                password:$('#form_reg [name=password]').val(),
            },
            success:(res) => {
                if(res.status !== 0) return layer.msg('注册失败')
                layer.msg('注册成功');
                //注册成功后跳转到登陆页面
                $('#link_login').click();
            }
        })
    })

    //登陆功能
    $('#form_login').on('submit',function (e) {
        e.preventDefault();
        $.ajax({
            type:'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success:(res) => {
               if(res.status !== 0) return layer.msg('登陆失败')
               layer.msg('登陆成功')
               //登陆成功后把token令牌存到本地
               localStorage.setItem('token',res.token);
               //跳转到主页
               location.href = '/index.html';
            }
        })
    })
})