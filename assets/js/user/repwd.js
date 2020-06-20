$(function () {
    //获取Layui的form对象
    var form = layui.form

    //调用接口获取用户信息
    function gitUserInfo() {
        $.ajax({
            url: 'my/userinfo',
            type: 'get',
            // dataType:'json',
            // data:'',
            success: function (backData) {
                // console.log(backData);
                //把数据填充到表单
                //隐域数据
                // $('#form input').eq(0).val(backData.data.id);
                // $('#form input').eq(1).val(backData.data.username);
                // $('#form input').eq(2).val(backData.data.nickname);
                // $('#form input').eq(3).val(backData.data.email);
                //基于layui的快速填充方式
                // basicForm是form标签的lay-filter属性值,用于表单的数据填充
                // form.val是layui提供的方法
                form.val('basicForm', backData.data)
            }
        });
    };
    gitUserInfo();

    //修改用户信息表单的提交
    $('#form').submit(function (e) {
        e.preventDefault();
        // var fd = $(this).serialize()
        // console.log(fd);
        //id=206&username=000000&nickname=0000&email=000%4011.com
        //此时用serializeArray获取表单数据为数组
        var fd = $(this).serializeArray()
        // console.log(fd);
        //此时数组中name为username的项在发送请求的接口是多余的,应该删掉
        //从数组中删除一个元素,使用数组的filter方法,参数是item,return的是条件
        fd = fd.filter(function (item) {
            //方法返回类名不为username的所有项
            return item.name !== 'username'
        });
        // console.log(fd);
        $.ajax({
            url: 'my/userinfo',
            type: 'post',
            // dataType:'json',
            data: fd,
            success: function (backData) {
                if (backData.status === 0) {
                    layer.msg(backData.message);
                    window.parent.$.localStorInfo();
                }
            }
        });
    })
})