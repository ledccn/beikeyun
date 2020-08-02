
var isRestartSysFadein = false;
var checkSysRestartStatus = function () {
    if (!isRestartSysFadein) {
        $(".main > .loading").fadeIn("fast");
        isRestartSysFadein = true;
    }
    //https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
    var external = location.href;
    if (window.fetch) {
        // must be chrome or firefox which have native fetch
        fetch(external, {'mode':'no-cors'})
            .then(function (r) {
                // external is reachable; but failed due to cors
                // fetch will pass though if it's a cors error
                alertify.notify('Reboot successfully.', 'success', 5, function(){  console.log('Reboot Done.'); });
                console.log(r);
                location.reload();
            })
            .catch(function () {
                console.log('external is _not_ reachable');
                setTimeout('checkSysRestartStatus()', 1000);
            });
    } else {
        // must be non-updated safari or older IE...
        // I don't know how to find error type in this case
        alert("your browser does not support native fetch api. please reload page manually.");
    }
};

var processCheck = function (process_name, target_ele) {
    let targetBtn = $(target_ele);
    let fail_class = 'cbi-input-remove';
    let succ_class = 'cbi-input-save';
    $.get("/api/system/process/status?name="+process_name, function (resp) {
        if (resp.error == 0 && resp.data.is_running == 1) {
            targetBtn.removeClass(fail_class);
            targetBtn.addClass(succ_class);
            targetBtn.val(process_name + " Running");
        } else {
            targetBtn.removeClass(succ_class);
            targetBtn.addClass(fail_class);
            targetBtn.val(process_name + " Stopped");
        }
    });
};

// from Underscore.js
var isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
};

var statusCheck = function (api_url, target_ele, cb) {
    let targetBtn = $(target_ele);
    let fail_class = 'cbi-input-remove';
    let succ_class = 'cbi-input-save';
    let that = this;
    $.get(api_url, function (resp) {
        targetBtn.val(resp.status);
        let succ = false;
        if (/work|ok|success/.test(resp.status)) {
            targetBtn.removeClass(fail_class);
            targetBtn.addClass(succ_class);
            succ = true;
        } else {
            targetBtn.removeClass(succ_class);
            targetBtn.addClass(fail_class);
        }
        if (isFunction(cb)) {
            cb.call(that, succ);
        }
    });
};

/*
 *JS动态翻译小钢炮
 *作者：大卫科技blog
 *网站：https://www.iyuu.cn
 *汉化下载：
    N1小钢炮汉化包20190411-2042
    https://www.iyuu.cn/archives/13/

    beikeyun贝壳云小钢炮汉化包20190506-0242
    https://www.iyuu.cn/archives/10/
 */
$(document).ready(function(){
    console.log('JS动态翻译小钢炮+自定义导航');
    console.log('作者：大卫');
    console.log('网站：https://www.iyuu.cn');
    console.log('项目仓库：https://github.com/ledccn/beikeyun');
    // 获取语言文件
    $.getJSON("/static/js/zh-cn.json", function (data){
        // 主菜单 选择器
        let menus = $(".menu");
        // 子菜单 选择器
        let smenus = $(".slide-menu");
        // 翻译主菜单
        for(i=0; i<menus.length; i++){
            let title = $(menus[i]).data('title');
            //console.log(title)
            $(menus[i]).html(data[title]);
            
            // 翻译子菜单
            let slide = $(smenus[i]).find('a');
            for (let index = 0; index < slide.length; index++) {
                let stitle = $(slide[index]).data('title');
                //console.log(stitle)
                if (data[stitle]) {
                    $(slide[index]).html(data[stitle]);
                }                
            }
        }
        // 退出登录
        $("#logout-button").html(data['Logout']);

        // 翻译overview页
        //console.log(luciLocation);
        if (luciLocation[1] == 'overview') {
            $("[name='content']").html('运行状态');
            let cbi = $(".cbi-section");
            for (let i = 0; i < cbi.length; i++) {
                // 翻译标题
                let legend = $(cbi[i]).find('legend');
                let title = $(legend).text();
                //console.log(title)
                $(legend).text(data[title]);
                // 翻译动态加入的内容
                $(cbi[i]).find('.panel-title').text(data[title]);

                // 翻译内容
                let td = $(cbi[i]).find('td:even'); //选择偶数
                for (let j = 0; j < td.length; j++) {
                    let name = $(td[j]).text();
                    //console.log(name)
                    $(td[j]).html(data[name]);
                }
            }
        }

        // 顶部导航自定义
        let setingNav = data.setingNav;
        let addNav = data.addNav;
		// 移除导航
        setingNav.forEach(function(item, index) {
            if (item.value == 0) {
                console.log('移除导航' + item.id);
				$("#"+item.id).remove();
            }
        });
        // 添加导航
		addNav.forEach(function(item, index) {
            console.log('添加导航' + item.name);
            if (/^http(s)?\:\/\//.test(item.url)) {
                let val = '<a target="_blank" href="'+ item.url +'"><button class="label success"><span class="mobile-hide">'+ item.name +'</span></button></a>';
                $(".pull-right").append(val);
            } else {
                let val = '<a target="_blank" href="'+ item.protocol + window.location.host + item.url +'"><button class="label success"><span class="mobile-hide">'+ item.name +'</span></button></a>';
                $(".pull-right").append(val);
            }			
        });
    })
});