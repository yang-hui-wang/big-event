$(function () {
    function gitarticle() {
        //获取文章列表
        $.ajax({
            url: 'my/article/cates',
            type: 'get',
            // dataType:'json',
            // data:'',
            // headers: {
            //     Authorization: localStorage.getItem('mytoken')
            // },
            success: function (backData) {
                console.log(backData);
                //4. 把数据添加到模板中
                var res = template('tpl-list', backData)
                //5. 渲染到页面
                $('tbody').html(res)
            }
        });
    };
    gitarticle();

    //添加分类(使用弹层实现)
    var addIndex = null;
    $('#showAdd').click(function () {
        addIndex = layer.open({
            type: 1,
            title: '添加分类',
            content: $('#tpl-add').html(),
            area: ['500px', '250px']
        });
        //注册添加功能
        $('#add-form').submit(function (e) {
            //阻止默认跳转
            e.preventDefault()
            //获取表单数据
            var fd = $(this).serialize()
            console.log(fd);
            $.ajax({
                url: 'my/article/addcates',
                type: 'post',
                // dataType:'json',
                data: fd,
                success: function (backData) {
                    console.log(backData);
                    if(backData.status === 0){
                        //添加成功提示
                        layer.msg(backData.message);
                        //关闭弹层
                        layer.close(addIndex);
                        //刷新页面
                        gitarticle();
                    }
                    
                }
            });
        })
    })


})