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
        // 阻止表单默认提交行为
        e.preventDefault()
        // 获取表单输入域的用户名和密码
        // username=asdf&password=asdffffff
        var formData = $(this).serialize()
        // 提交表单之前需要做表单验证，如果自己实现有点繁琐，所以可以借助LayUI实现

        // 调用后台接口验证是否正确
        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/api/login',
            data: formData,
            success: function (res) {
                // 登录成功后，跳转到主页面
                // console.log(res);
                if (res.status === 0) {
                    // 把登录成功的标志位存储在客户端
                    localStorage.setItem('mytoken', res.token);
                    // 跳转到主页面
                    location.href = './index.html'
                } else {
                    layer.msg(res.message)
                }
            }
        })
    });
    //注册表单事件
    $('#form-reg2').on('submit', function (e) {
        //阻止按钮默认跳转事件
        e.preventDefault()
        // 获取表单数据(表单输入域必须提供name属性，name的值必须和接口文档要求一致)
        var formData = $(this).serialize()
        console.log(formData);
        // 调用接口进行注册
        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: formData,
            success: function (res) {
                console.log(res);
                if (res.status === 0) {
                    // 注册成功，显示登陆框
                    $('#link-2').click()
                    // 成功后进行提示
                    layer.msg(res.message)
                } else {
                    // 注册失败
                    // layer是一个独立的模块，默认可以直接使用
                    layer.msg(res.message)
                }
            }
        })
    })
    // keyCode13('#form-reg','submit')

    $('#link-1').on('click', function (e) {
        e.preventDefault();
        $('.form-2').show().prev().hide();
    })

    $('#link-2').on('click', function (e) {
        e.preventDefault();
        $('.form-2').hide().prev().show();
    })

});