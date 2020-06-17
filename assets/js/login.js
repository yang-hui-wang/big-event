$(function () {
    // layui是全局对象，通过它可以得到form对象
    var form = layui.form
    // 基于LayUI自定义表单验证规则
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
        }
    })
    // 自定义校验规则
    form.verify({
        // 键：值
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            // 1. 通过形参，获取到确认密码框中的值
            // 2. 通过 jQuery 获取到密码框中的值
            var pwd = $('.reg-box [name=password]').val()
            // 3. 进行 if 判断
            if (value !== pwd) {
                // return 一个错误消息
                return '两次的密码不一致！'
            }
        }
    })

    //注册表单提交事件
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
                    localStorage.setltem('mytoken','backData.token')
                    location.href = 'index.html'
                    $('.username').val("")
                    $('.password').val("")
                };
            },
        });
    });

    keyCode13('#form-reg', 'submit')
    //注册账户事件
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

    //注册事件
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
                //无论成功还是失败,都要提示
                alert(backData.message)
                //登录成功,跳转页面到主页面
                if (backData.status === 0) {
                    $('.form-2').hide().prev().show();
                    $('.uname').val("")
                    $('.pwod').val("")
                };
            },
        });
    });

});