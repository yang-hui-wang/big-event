$(function () {
    var form = layui.form;

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
                // console.log(backData);
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
                    if (backData.status === 0) {
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

    //删除功能
    $('tbody').on('click', '#del-btn', function (e) {
        //获取标准自定义属性的值
        // var id = e.target.dataset.id//原生js的方法
        //jq的方法
        // var id = $(e.target).data('id');
        var id = $(this).data('id');
        $.ajax({
            url: 'my/article/deletecate/' + id,
            type: 'get',
            // dataType: 'json',
            data: {
                id: id
            },
            success: function (backData) {
                if (backData.status === 0) {
                    //提示删除成功
                    layer.msg(backData.message)
                    //删除成功刷新页面
                    gitarticle();
                } else {
                    //删除失败,提示
                    layer.msg(backData.message)
                };
            }
        });
    })
    //编辑功能弹窗唯一标识
    var editIndex = null;
    $('tbody').on('click', '#set-btn', function (e) {
        //获取到要编辑的分类的id
        var id = $(this).data('id')
        //根据id查询详细分类数据
        $.ajax({
            url: 'my/article/cates/' + id,
            type: 'get',
            // dataType:'json',
            data: {
                id: id
            },
            success: function (backData) {
                // console.log(backData);
                //显示弹出层,且填充数据
                editIndex = layer.open({
                    type: 1,
                    title: '编辑分类',
                    content: $('#tpl-set').html(),
                    area: ['500px', '250px']
                });
                //把获取的数据填充到表单,表单需要提供一个属性lay-filter='editForm'
                form.val('editForm', backData.data)
                //提交编辑表单事件
                $('body').on('submit', '#set-form', function (e) {
                    //阻止表单的默认跳转
                    e.preventDefault()
                    //获取表单域内容
                    var fd = $(this).serialize();
                    //发送ajax请求
                    $.ajax({
                        url: 'my/article/updatecate',
                        type: 'post',
                        // dataType:'json',
                        data: fd,
                        success: function (backData) {
                            if (backData.status === 0) {
                                //提示编辑成功
                                layer.msg(backData.message)
                                //关闭弹层
                                layer.close(editIndex);
                                //修改成功刷新页面
                                gitarticle();
                            } else {
                                //编辑失败,提示
                                layer.msg(backData.message)
                            };
                        }
                    });
                })
            }
        })
    })
})