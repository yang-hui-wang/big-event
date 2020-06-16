/**
* @description:回车键触发事件函数封装
* @param {type} : ele  : 事件元素
* @param {type} : event  : 事件名称
* @return: 
*/

function keyCode13(ele, eventName) {
    $(document).keydown(function (e) {
        if (e.keyCode == 13) {
            //触发器
            $(ele).trigger(eventName);
            // $(ele) + '.' + eventName + '()';
        };
    });
};
