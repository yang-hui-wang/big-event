$(function () {
    //通用配置文件
    // var base = 'http://ajax.frontend.itheima.net/'
    var base = 'http://www.liulongbin.top:3007/'
    $.ajaxPrefilter(function (option) {
        //形参option是jQuery请求方式配置
        //发送请求之前会触发beforeSend
        option.beforeSend = function () {
            //发送请求前开始进度条(将Nprogress添加到window的方法)
            window.NProgress && window.NProgress.start()
            //等同于 : 
            // if(window.Nprogress){
            //     windward.Nprogress.start()
            // }
        }
        //1.配置接口地址
        option.url = base + option.url
        //2.配置请求头
        if (option.url.lastIndexOf('/my/') !== -1) {
            ///my 开头的请求路径，需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功
            //header默认不存在,需要设置一个对象
            option.headers = {
                Authorization: localStorage.getItem('mytoken')
            }
        }
        //3.处理通用的响应异常情况
        //服务器响应结束时触发
        option.complete = function (backData) {
            //请求完成结束进度条
            window.NProgress && window.NProgress.done()
            //处理失败的情况
            if (backData.responseJSON.status === 1 && backData.responseJSON.message === '身份认证失败！') {
                //把无效的token清除
                localStorage.removeItem("mytoken");
                //跳转到登录页
                // location.href = './login.html'
            }
        }
    })
})
