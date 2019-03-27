var JZFQ = {};

JZFQ.h5PopClass = {
    getBody: document.querySelectorAll("body")[0],
    init: function (opts) {
        var _this = this;
        if (opts && typeof opts == "object") {
            _this.popMainRun(opts);
            _this.bindEvent(opts);
        }
    },
    isMobile: function () {
        var _this = this;
        var UA = navigator.userAgent,
            IsAndroid = /Android|HTC/i.test(UA),
            IsIPad = !IsAndroid && /iPad/i.test(UA),
            IsIPhone = !IsAndroid && /iPod|iPhone/i.test(UA),
            IsIOS = IsIPad || IsIPhone;
        if (IsIOS || IsAndroid) {
            _this.getBody.classList.add("mobile");
            _this.getBody.classList.add(IsIOS ? "ios" : "android");
        }
    },
    popMainRun: function (opts) {
        var _this = this;
        var createDiv = document.createElement("div");
        var createMask = document.createElement("div");
        createMask.className = "h5pop-mask";
        createMask.id = "h5PopMasks";
        createDiv.className = "h5pop-main clearfix";
        createDiv.id = "h5PopMainEle";
        var popHtml = '';
        if (!!opts['isHideClose']) {
            popHtml += '<a href="javascript:;" class="h5pop-close">×</a>';
        }
        if (!!opts['title']) {
            popHtml += '<h3 class="h5tips-title">' + opts["title"] + '</h3>';
        }
        if (!!opts['tipTxt']) {
            popHtml += '<div class="h5pop-content clearfix">' + opts["tipTxt"] + '</div>';
        }
        popHtml += '<div class="h5pop-footer">';
        if (!!opts['cancelBtn']) {
            popHtml += '<a type="button" class="h5pop-cancel" href="javascript:;">' + opts["cancelBtn"] + '</a>';
        }
        if (!!opts['confirmBtn']) {
            popHtml += '<a type="button" class="h5pop-confirm" href="javascript:;">' + opts["confirmBtn"] + '</a>';
        }
        popHtml += '</div>';
        createDiv.innerHTML = popHtml;
        _this.getBody.appendChild(createDiv);
        _this.getBody.appendChild(createMask);
    },
    bindEvent: function (opts) {
        var _this = this;
        var isEvent = true;
        _this.getBody.onclick = function () {
            var e = e || window.event;
            var target = e.target || e.srcElement;
            var targetType = target.className.toLowerCase() || target.id;
            if (isEvent) {
                if (targetType == "h5pop-close") {
                    e.preventDefault();
                    _this.removePop();
                    isEvent = false;
                    return;
                }
                if (targetType == "h5pop-cancel") {
                    e.preventDefault();
                    if (opts["cancelBtnRun"] && typeof opts["cancelBtnRun"] === "function") {
                        opts["cancelBtnRun"]();
                    }
                    _this.removePop();
                    isEvent = false;
                    return;
                }
                if (targetType == "h5pop-confirm") {
                    e.preventDefault();
                    if (opts["confirmBtnRun"] && typeof opts["confirmBtnRun"] === "function") {
                        opts["confirmBtnRun"]();
                    }
                    _this.removePop();
                    isEvent = false;
                    return;
                }
            }
        };
    },
    removePop: function () {
        var getMasks = document.getElementById("h5PopMasks");
        var getPopMains = document.getElementById("h5PopMainEle");
        if (getMasks.parentNode && getPopMains.parentNode) {
            getMasks.parentNode.removeChild(getMasks);
            getPopMains.parentNode.removeChild(getPopMains);
        }
    }
};

JZFQ.h5PopClass.isMobile();

JZFQ.ajax = function (opts) {
    var defaults = {
        type: "GET",
        url: "",
        data: "",
        dataType: "json",
        async: true,
        cache: true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        param: "",
        success: function () { },
        error: function () { }
    };
    for (var key in opts) {
        defaults[key] = opts[key];
    }
    if (typeof defaults["data"] === "object") {
        var str = "";
        for (var key in defaults["data"]) {
            str += key + "=" + defaults["data"][key] + "&";
        }
        defaults["data"] = str.substring(0, str.length - 1);
    }
    defaults["type"] = defaults["type"].toUpperCase();
    defaults["cache"] = defaults["cache"] ? "" : "&" + new Date().getTime();
    if (defaults["type"] === "GET" && (defaults["data"] || defaults["cache"])) {
        defaults["url"] += "?" + defaults["data"] + defaults["cache"];
    }
    var oXhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    oXhr.param = defaults["param"];
    oXhr.open(defaults["type"], defaults["url"], defaults["async"]);
    if (defaults["headers"]) {
        for (var k in defaults["headers"]) {
            oXhr.setRequestHeader(k, defaults["headers"][k]);
        }
    }
    if (defaults["type"] === "GET") {
        oXhr["send"](null);
    } else {
        oXhr.setRequestHeader("Content-type", defaults["contentType"]);
        oXhr.send(defaults["data"]);
    }
    if (typeof defaults["setToken"] != "undefined" && typeof defaults["setToken"] == "function") {
        defaults["setToken"](oXhr);
    }
    oXhr.onreadystatechange = function () {
        if (oXhr.readyState === 4) {
            if (oXhr.status === 200) {
                if (typeof defaults["success"] == "function") {
                    if (defaults["dataType"] == "json") {
                        try {
                            defaults["success"].call(oXhr, eval("(" + oXhr.responseText + ")"));
                        } catch (e) { }
                    } else {
                        try {
                            defaults["success"].call(oXhr, oXhr.responseText);
                        } catch (e) { }
                    }
                }
            } else {
                if (typeof defaults["error"] == "function") {
                    defaults["error"]();
                }
            }
        }
    };
};

JZFQ.uploadImg = function (opts) {
    if (typeof opts == "object") {
        var _this = this;
        var formData = new FormData();
        var xhr = new XMLHttpRequest();
        formData.append("image", opts.ele.files[0]);
        xhr.open("post", opts.url, true);
        xhr.onreadystatechange = function (data) {
            if (4 === xhr.readyState) {
                if (200 === xhr.status) {
                    var data = JSON.parse(xhr.responseText);
                    if (data.status == "200") {
                        if (typeof opts.callback == "function") {
                            opts.callback.call(this);
                        }
                    } else {
                        _this.tips(data.msg);
                    }
                } else {
                    _this.tips("ajax error");
                }
            }
        };
        xhr.send(formData);
    }
};

JZFQ.isweixin = function () {
    return "micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
};

JZFQ.loadJS = function (pageUrl, insetPos, callback, id) {
    if (!document.getElementById(id)) {
        var loadJs = document.createElement("script");
        loadJs.src = pageUrl, loadJs.type = "text/javascript", loadJs.id = id || '';
        document.querySelectorAll(insetPos || "body")[0].appendChild(loadJs);
        if (loadJs.readyState) {
            loadJs.onreadystatechange = function () {
                if (loadJs.readyState == "loaded" || loadJs.readyState == "complete") {
                    loadJs.onreadystatechange = null;
                    callback.call(this);
                }
            };
        } else {
            loadJs.onload = function () {
                callback.call(this);
            };
        }
    }
};

JZFQ.tips = function (txt) {
    if (document.getElementById("systemTips") || !txt) return;
    var tout = null;
    var createDiv = document.createElement("div");
    createDiv.id = "systemTips";
    createDiv.innerHTML = txt.toString();
    document.querySelector("body").appendChild(createDiv);
    var getSystemTips = document.getElementById("systemTips");
    if (getSystemTips) {
        tout = setTimeout(function () {
            if (getSystemTips.parentNode) {
                getSystemTips.parentNode.removeChild(getSystemTips);
                clearTimeout(tout);
            }
        }, 2000);
    }
};

JZFQ.ranStr = function (n) {
    for (var e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIZKLMNOPQRSTUVWXYZ0123456789", a = "", r = 0; r < n; r++) {
        var i = Math.floor(Math.random() * (e.length - 1));
        a += e.charAt(i);
    }
    return a;
};

JZFQ.jsonpAjax = function (opt) {
    var _this = this;
    var opts = opt || {
        url: '',
        data: {} || [],
        success: function () { },
        error: function () { }
    }
    var paraArr = [],
        paraString = '';
    var urlArr = '';
    var callbackName;
    var creatScript = null;
    var getHead = null;
    var supportLoad = '';
    var onEvent;
    var timeout = opts.timeout || 0;
    var ranTxt = _this.ranStr(10);

    for (var i in opts.data) {
        if (opts.data.hasOwnProperty(i)) {
            paraArr.push(encodeURIComponent(i) + "=" + encodeURIComponent(opts.data[i]));
        }
    }

    urlArr = opts.url.split("?");
    urlArr.length > 1 && paraArr.push(urlArr[1]);

    callbackName = 'callback' + ranTxt;
    paraArr.push('callback=' + callbackName);
    paraString = paraArr.join("&");
    opts.url = urlArr[0] + "?" + paraString;

    creatScript = document.createElement("script");
    creatScript.loaded = false;
    window[callbackName] = function (data) {
        if (!typeof opts.success == 'function') {
            return;
        } else {
            opts.success(data)

            creatScript.loaded = true;
        }
    }

    getHead = document.getElementsByTagName("head")[0];
    getHead.insertBefore(creatScript, getHead.firstChild);
    creatScript.src = opts.url;

    supportLoad = "onload" in creatScript;

    onEvent = supportLoad ? "onload" : "onreadystatechange";
    creatScript[onEvent] = function () {

        if (creatScript.readyState && creatScript.readyState != "loaded") {
            return;
        }
        if (creatScript.readyState == 'loaded' && creatScript.loaded == false) {
            creatScript.onerror();
            return;
        }
        setTimeout(function () {
            (creatScript.parentNode && creatScript.parentNode.removeChild(creatScript)) && (getHead.removeNode && getHead.removeNode(this));
            creatScript = creatScript[onEvent] = creatScript.onerror = window[callbackName] = null;
        }, 1000);
    }

    creatScript.onerror = function () {
        if (window[callbackName] == null) {
            _this.tips("请求超时，请重试！");
        }
        opts.error && opts.error();
        (creatScript.parentNode && creatScript.parentNode.removeChild(creatScript)) && (getHead.removeNode && getHead.removeNode(this));
        creatScript = creatScript[onEvent] = creatScript.onerror = window[callbackName] = null;
    }

    if (timeout != 0) {
        setTimeout(function () {
            if (creatScript && creatScript.loaded == false) {
                window[callbackName] = null;
                creatScript.onerror();
            }
        }, timeout);
    }
};

JZFQ.parents = function (ele, selector) {
    var matchesSelector = ele.matches || ele.webkitMatchesSelector || ele.mozMatchesSelector || ele.msMatchesSelector;
    while (ele) {
        if (matchesSelector.call(ele, selector)) {
            break;
        }
        ele = ele.parentElement;
    }
    return ele;
};

JZFQ.css = function (ele, opts) {
    if (/Object/.test(Object.prototype.toString.call(opts))) {
        for (var key in opts) {
            if (opts[key]) {
                ele.style[key] = opts[key].toString();
            }
        }
    }
    return ele;
};

JZFQ.offsetTop = function (ele) {
    var top = ele.offsetTop;
    var parent = ele.offsetParent;
    while (parent) {
        top += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return top;
};

JZFQ.offsetLeft = function (ele) {
    var left = ele.offsetLeft;
    var parent = ele.offsetParent;
    while (parent) {
        left += parent.offsetLeft;
        parent = parent.offsetParent;
    }
    return left;
};

JZFQ.getQueryString = function (name) {
    var url = window.location.href;
    if (/\?/.test(url) && !/\?$/.test(url) && /\?(.+)/.test(url)) {
        var args = url.split('?');
        if (args[0] !== url) {
            var arr = args[1].split('&');
            var obj = {};
            for (var i = 0; i < arr.length; i++) {
                var arg = arr[i].split('=');
                obj[arg[0]] = arg[1];
            }
            return !name ? obj : obj[name];
        }
    }
};

JZFQ.urlSplicing = function (name, value) {
    var _this = this;
    if (name instanceof Array) {
        for (var i = 0; i < name.length; i++) {
            for (var k in name[i]) {
                if (!_this.getUrlValue(k)) {
                    if (/^\?/.test(location.search)) {
                        location.search += '&' + k + '=' + name[i][k];
                    } else {
                        location.search += '?' + k + '=' + name[i][k];
                    }
                }
            }
        }
    } else {
        if (!_this.getUrlValue(name)) {
            if (/^\?/.test(location.search)) {
                location.search += '&' + name + '=' + value;
            } else {
                location.search += '?' + name + '=' + value;
            }
        }
    }
};

JZFQ.CreateLoading = function () {
    if (!document.getElementById('loadingWrap')) {
        var lhtml = '', mainHtml = '';
        var classArray = ['loadfirst', 'second', 'loadlast'];
        var createLoading = document.createElement('div');
        createLoading.id = 'loadingWrap';
        for (var l = 1; l < 5; l++) {
            lhtml += '<div class="circle' + l + '"></div>';
        }
        for (var i = 0; i < 3; i++) {
            mainHtml += '<div class="loading-container ' + classArray[i] + '">' + lhtml + '</div>';
        }
        createLoading.innerHTML = '<div class="loading">' + mainHtml + '</div>';
        document.body.appendChild(createLoading);
    }
};
JZFQ.RemoveLoading = function () {
    var loading = document.getElementById('loadingWrap');
    loading && document.body.removeChild(loading);
};

JZFQ.formatNumber = function (num) {
    var num = (num || 0).toString();
    if (/\,/.test(num)) return num;
    if (/\./.test(num)) {
        var floatNum = '.' + num.split('.')[1];
        num = num.split('.')[0];
    } else {
        var floatNum = '';
    }
    var re = /\d{3}$/,
        result = '';
    while (re.test(num)) {
        result = RegExp.lastMatch + result;
        if (num !== RegExp.lastMatch) {
            result = ',' + result;
            num = RegExp.leftContext;
        } else {
            num = '';
            break;
        }
    }
    if (num) result = num + result;
    return /\./.test(num + floatNum) ? result + floatNum : result;
};

JZFQ.goTop = function (el, scrToShow) {
    window.animation = window.requestAnimationFrame || function (fn) { return setTimeout(fn, 1000 / 60) };
    var el = document.querySelector(el);
    window.addEventListener('scroll', function () {
        var currentScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        var clientH = document.documentElement.clientHeight || document.body.clientHeight;
        currentScroll >= (Math.abs(scrToShow) || clientH) ? (el.style.display = 'block') : (el.style.display = 'none');
    }, !1);
    el.addEventListener('click', function fn() {
        var currentScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (currentScroll > 0) {
            window.animation(fn);
            window.scrollTo(0, currentScroll - (currentScroll / 30));
        }
    }, !1);
};

JZFQ.copy = function (text, tips) {
    var _this = this;
    if (!document.body.querySelector('.cInpt')) {
        createInput = document.createElement('input');
        createInput.setAttribute('readonly', 'readonly');
        createInput.value = text;
        document.body.appendChild(createInput);
        document.body.className.indexOf('ios') != -1 ? createInput.setSelectionRange(0, text.length) : createInput.select();
        document.execCommand("Copy");
        createInput.className = 'cInpt';
        createInput.style.display = 'none';
        _this.tips(tips || '复制成功');
        setTimeout(function () {
            document.body.removeChild(createInput);
        }, 2e3);
    }
};

JZFQ.typeOf = function (value) {
    var typeArray = ['Number', 'String', 'Boolean', 'Object', 'Array', 'Null', 'Undefined', 'Function'];
    var i = 0, l = typeArray.length;
    var value = Object.prototype.toString.call(arguments[0]);
    var type = value.substring(0, value.length - 1).split(' ')[1];
    while (i < l) {
        if (type === typeArray[i]) {
            return type;
        }
        i++;
    }
};

JZFQ.getTimes = function (opts) {
    var clearI = null;
    var ele = document.getElementById(opts.id);
    var dateT = '', timeT = '', week = '';
    clearI = setInterval(function () {
        var date = new Date();
        if (opts.date) {
            var year = date.getFullYear(),
                month = addZero(date.getMonth() + 1),
                day = addZero(date.getDate());
            dateT = year + "年" + month + "月" + day + "日 ";
        } else dateT = '';
        if (opts.timeT) {
            var hour = addZero(date.getHours()),
                minute = addZero(date.getMinutes()),
                second = addZero(date.getSeconds());
            timeT = hour + ":" + minute + ":" + second;
        } else timeT = '';
        if (opts.week) {
            switch (date.getDay()) {
                case 0: week = "星期天";
                    break;
                case 1: week = "星期一";
                    break;
                case 2: week = "星期二";
                    break;
                case 3: week = "星期三";
                    break;
                case 4: week = "星期四";
                    break;
                case 5: week = "星期五";
                    break;
                case 6: week = "星期六";
                    break;
            }
        } else week = '';
        ele.innerHTML = dateT + timeT + " " + week;
        clearI = null;
    }, 1000);
    function addZero(t) {
        return t <= 9 ? "0" + t : t;
    }
};

JZFQ.IsPC = function () {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

HTMLElement.prototype.removeAttr = function (attr) {
    if (this.getAttribute('style')) {
        if (JZFQ.typeOf(attr) !== 'Array') {
            attr = attr.split(',')
        }
        var getStyles = this.getAttribute('style').replace(/\s+/g, '');
        for (var i = 0; i < attr.length; i++) {
            getStyles = getStyles.replace(new RegExp(attr[i] + ':.+?;'), '')
            this.setAttribute('style', getStyles)
        }
    }
};

Array.prototype.isInArray = function (value, type) {
    if (this.indexOf && JZFQ.typeOf(this.indexOf) === 'Function') {
        var index = this.indexOf(value);
        if (index >= 0) {
            return type == 'i' ? index : type == 'v' ? value : true;
        }
    }
};

HTMLElement.prototype.replaceClass = function replaceClass(...args) {
    return this.classList.replace.apply(this.classList, args);
};
NodeList.prototype.replaceClass = function replaceClass(...args) {
    this.forEach(item => item.replaceClass(...args));
    return this;
};