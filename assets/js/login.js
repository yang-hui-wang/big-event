$(function () {
    // layui是全局对象，通过它可以得到form对象
    var form = layui.form
    // // 基于LayUI自定义表单验证规则
    form.verify({
        // 必须是6-8位字符,不包括空格
        uname: [/^[\S]{6,8}$/, '用户名必须是6-8位字符'],
        // 密码必须是6位数字
        pwd: function (value, item) {
            // 形参value标书对应输入域的值
            // item表示DOM元素
            // 验证6位数字
            var reg = /^\d{6}$/
            // 如果规则不匹配就返回提示
            if (!reg.test(value)) {
                return '密码必须是6位数字'
            }
        },
        //验证确认密码必须和原有密码一致
        same: function (value) {
            //获取原始密码
            var pwd = $('.form-2 input[name=password]').val()
            if (value !== pwd) {
                return '两次输入的密码必须一致'
            }

        }
    })

    //登录表单提交事件
    $('#form-reg').on('submit', function (e) {
        //阻止按钮默认跳转事件
        e.preventDefault();
        //快速获取表单输入域内容
        var formData = $(this).serialize()
        console.log(formData);
        // var username = $('.username').val().trim();
        // var password = $('.password').val().trim();
        // console.log(username , password);
        //发送ajax请求
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            type: 'post',
            // dataType:'json',
            data:/* {
                username : username,
                password : password
            } */formData,
            success: function (backData) {
                console.log(backData);
                //登录成功,跳转页面到主页面
                if (backData.status === 0) {
                    //把登录成功的标志存储在客户端
                    localStorage.setItem('mytoken', 'backData.token')
                    console.log(backData.token);
                    //跳转到主页面
                    location.href = 'index.html'
                    $('.username').val("")
                    $('.password').val("")
                }else{
                    layer.msg(backData.message)
                };
            },
        });
    });

    keyCode13('#form-reg', 'submit')

    $('.links').on('click', function () {

    })

    $('#link-1').on('click', function (e) {
        e.preventDefault();
        $('.form-2').show().prev().hide();
    })

    $('#link-2').on('click', function (e) {
        e.preventDefault();
        $('.form-2').hide().prev().show();
    })

    //注册表单事件
    $('#form-reg2').on('submit', function (e) {
        //阻止按钮默认跳转事件
        e.preventDefault();
        //快速获取表单输入域内容
        var formData = $(this).serialize()
        console.log(formData);
        // var username = $('.username').val().trim();
        // var password = $('.password').val().trim();
        // console.log(username , password);
        //发送ajax请求
        $.ajax({
            url: 'http://btapi.ehomespace.com/api/reguser',
            type: 'post',
            // dataType:'json',
            data:/* {
                username : username,
                password : password
            } */formData,
            success: function (backData) {
                console.log(backData);
                if (backData.status === 0) {
                    //登录成功,跳转页面到登录框
                    $('.form-2').hide().prev().show();
                    $('.uname').val("")
                    $('.pwod').val("")
                    //成功后进行提示
                    layer.msg(backData.message)
                } else {
                    //注册失败
                    layer.msg(backData.message)
                };
            },
        });
    });
});