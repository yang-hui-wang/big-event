$(function () {
    //获取文章列表
    $.ajax({
        url: 'http://ajax.frontend.itheima.net/my/article/cates',
        type: 'get',
        // dataType:'json',
        // data:'',
        headers: {
            Authorization: localStorage.getItem('mytoken')
        },
        success: function (backData) {
            console.log(backData);
            //4. 把数据添加到模板中
            var res = template('tpl-list', backData)
            //5. 渲染到页面
            $('tbody').html(res)
        }
    });
})