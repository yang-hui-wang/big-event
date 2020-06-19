$(function () {
    // 处理表单验证
    var form = layui.form
    //自定义检测规则
    //1.新密码和原来密码不能一致
    //2.确认密码必须一致
    form.verify({
        diff: function (value) {
            //1.新密码和原来密码不能一致
            //获取原密码
            var oldPwd = $('#form input[name=oldPwd]').val()
            // console.log(oldPwd);
            // console.log(value);
            // var newPwd = $('#form input[name = newPwd]').val()
            // console.log(value == newPwd);//true
            //此时的value指向的就是newPwd;
            if (oldPwd === value) {
                return '新密码不能和原密码相同'
            }
        },
        same: function (value) {
            //2.确认密码必须一致
            //获取新密码
            var newPwd = $('#form input[name=newPwd]').val()
            // console.log(newPwd);
            if (newPwd !== value) {
                return '两次输入的密码不一致'
            }
        }
    })

    $('#form').submit(function (e) {
        e.preventDefault();
        var fd = $(this).serializeArray()
        // console.log(fd);
        $.ajax({
            url: 'my/updatepwd',
            type: 'post',
            // dataType:'json',
            data: fd,
            success: function (backData) {
                // console.log(backData);
                if (backData.status === 1) {
                    layer.msg(backData.message);
                };
                layer.msg(backData.message);
            }
        });

    });
})