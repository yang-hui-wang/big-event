$(function () {
    //导入表单对象
    var form = layui.form

    //当前页码
    var pagenum = 1
    //每页显示的条数
    var pagesize = 10

    // 补零函数
    function addZero(n) {
        return n < 10 ? '0' + n : n;
    }

    //处理日期格式化:基于模板引擎的过滤器
    template.defaults.imports.formData = function (data) {
        //实现日期的格式化:把参数data日期字符串转为日期对象
        var d = new Date(data)
        var year = d.getFullYear()
        var month = addZero(d.getMonth() + 1)
        var day = addZero(d.getDate())
        var hour = addZero(d.getHours())
        var minutes = addZero(d.getMinutes())
        var seconds = addZero(d.getSeconds())
        // return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
        return year + '-' + month + '-' + day
    }

    //获取所有的文章分类数据
    function getCateData() {
        $.ajax({
            type: 'get',
            url: 'my/article/cates',
            // dataType:'json',
            // data:'',
            success: function (backData) {
                //基于模板填充
                var res = template('cate-tpl', backData)
                $('#category').html(res);
                //重新渲染下拉列表(layui的方法)
                form.render('select')
            }
        })
    }
    getCateData();

    //获取表格列表数据
    function loadTableData(params) {
        $.ajax({
            url: 'my/article/list',
            type: 'get',
            // dataType:'json',
            data: params,
            success: function (backData) {
                if (backData.status === 0) {
                    //基于模板填充
                    var res = template('table-tpl', backData)
                    $('.layui-table tbody').html(res);
                }
            }
        });
    }
    loadTableData({
        // 页码：必须从1开始
        pagenum: pagenum,
        // 每页显示多少条数据
        pagesize: pagesize
    })

    //筛选功能
    $('#search-form').submit(function (e) {
        e.preventDefault()
        // 获取筛选条件的所有参数
        var fd = $(this).serializeArray()
        // 组合接口调用参数
        var params = {
            // 页码：必须从1开始
            pagenum: pagenum,
            // 每页显示多少条数据
            pagesize: pagesize
        }
        // 把筛选条件参数添加param对象中
        fd.forEach(function (item) {
            // 向param对象中动态添加属性
            params[item.name] = item.value
        })
        // 刷新列表数据
        loadTableData(params)
    })

    //删除文章功能
    $('.layui-table tbody').on('click', '#delete', function () {
        //获取需要删除的文章id
        var id = $(this).data('id')
        //确认是否删除
        layer.confirm('确定要删除吗?', function (index) {
            //确认删除,调用接口删除文章
            $.ajax({
                url: 'my/article/delete/' + id,
                type: 'get',
                // dataType:'json',
                data: {
                    id: id,
                },
                success: function (backData) {
                    if (backData.status === 0) {
                        //关闭弹窗
                        layer.close(index);
                        //弹出提示
                        layer.msg(backData.message)
                        //刷新列表
                        loadTableData({
                            // 页码：必须从1开始
                            pagenum: pagenum,
                            // 每页显示多少条数据
                            pagesize: pagesize
                        })
                    } else {
                        //弹出提示
                        layer.msg(backData.message)
                    }
                }
            });
        })
    })
})