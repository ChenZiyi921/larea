var aspenLib = {};

aspenLib.h5PopClass = {
    getBody: document.querySelectorAll("body")[0],
    init: function (opts) {
        var _this = this;
        var setTimes;
        if (opts && typeof opts == "object") {
            _this.isMobile(function () {
                clearTimeout(setTimes);
                setTimes = setTimeout(function () {
                    _this.popMainRun(opts);
                    _this.bindEvent(opts);
                }, 100);
            });
        }
    },
    isMobile: function (callback) {
        var _this = this;
        var UA = window.navigator.userAgent,
            IsAndroid = /Android|HTC/i.test(UA),
            IsIPad = !IsAndroid && /iPad/i.test(UA),
            IsIPhone = !IsAndroid && /iPod|iPhone/i.test(UA),
            IsIOS = IsIPad || IsIPhone;
        if (!!document.addEventListener && (IsIOS || IsAndroid)) {
            callback.call(this);
            document.addEventListener("DOMContentLoaded", function () {
                _this.getBody.classList.add("mobile");
                if (IsIOS) {
                    _this.getBody.classList.add("ios");
                } else if (IsAndroid) {
                    _this.getBody.classList.add("android");
                }
            }, false);
        } else {
            return false;
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
        if (opts.hasOwnProperty('isHideClose') && opts['isHideClose'] == true) {
            popHtml += '<a href="javascript:;" class="h5pop-close">×</a>';
        }
        if (opts.hasOwnProperty('title') && opts['title'] != '') {
            popHtml += '<h3 class="h5tips-title">' + opts["title"] + '</h3>';
        }
        if (opts.hasOwnProperty('tipTxt') && opts['tipTxt'] != '') {
            popHtml += '<div class="h5pop-content clearfix">' + opts["tipTxt"] + '</div>';
        }
        popHtml += '<div class="h5pop-footer">';
        if (opts.hasOwnProperty('cancelBtn') && opts['cancelBtn'] != '') {
            popHtml += '<a type="button" class="h5pop-cancel" href="javascript:;">' + opts["cancelBtn"] + '</a>';
        }
        if (opts.hasOwnProperty('confirmBtn') && opts['confirmBtn'] != '') {
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
            var targetType = target.className.toLowerCase() ? target.className.toLowerCase() : target.id;
            if (isEvent == true) {
                if (targetType == "h5pop-close") {
                    e.preventDefault();
                    _this.removePop();
                    isEvent = false;
                    return;
                }
                if (targetType == "h5pop-cancel") {
                    e.preventDefault();
                    if (opts.hasOwnProperty("cancelBtnRun") && typeof opts["cancelBtnRun"] === "function") {
                        opts["cancelBtnRun"]();
                    }
                    _this.removePop();
                    isEvent = false;
                    return;
                }
                if (targetType == "h5pop-confirm") {
                    e.preventDefault();
                    if (opts.hasOwnProperty("confirmBtnRun") && typeof opts["confirmBtnRun"] === "function") {
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
        var _this = this;
        var getMasks = document.getElementById("h5PopMasks");
        var getPopMains = document.getElementById("h5PopMainEle");
        if (getMasks.parentNode && getPopMains.parentNode) {
            getMasks.parentNode.removeChild(getMasks);
            getPopMains.parentNode.removeChild(getPopMains);
        } else {
            return false;
        }
    }
};

aspenLib.h5PopClass.isMobile(function () { });

aspenLib.ajax = function (opts) {
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

aspenLib.uploadImg = function (opts) {
    if (typeof opts == "object") {
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
                        aspenLib.tips(data.msg);
                    }
                } else {
                    aspenLib.tips("ajax error");
                }
            }
        };
        xhr.send(formData);
    }
};

aspenLib.isweixin = function () {
    return "micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
};

aspenLib.loadJS = function (pageUrl, insetPage, callback, id) {
    if (!document.getElementById(id)) {
        var loadJs = document.createElement("script");
        loadJs.src = pageUrl, loadJs.type = "text/javascript", loadJs.id = id || '';
        if (insetPage == "after") {
            document.querySelectorAll("body")[0].appendChild(loadJs);
        } else {
            document.querySelectorAll("head")[0].appendChild(loadJs);
        }
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
    } else {
        return false;
    }
};

aspenLib.tips = function (txt) {
    if (!document.getElementById("systemTips")) {
        if (txt && txt != "") {
            var tout = null;
            var createDiv = document.createElement("div");
            createDiv.id = "systemTips";
            createDiv.innerHTML = txt.toString() || "";
            document.querySelectorAll("body")[0].appendChild(createDiv);
            var getSystemTips = document.getElementById("systemTips");
            if (getSystemTips) {
                tout = setTimeout(function () {
                    if (getSystemTips.parentNode) {
                        getSystemTips.parentNode.removeChild(getSystemTips);
                        clearTimeout(tout);
                    }
                }, 2000);
            } else {
                return;
            }
        }
    }
};

aspenLib.ranStr = function (n) {
    for (var e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIZKLMNOPQRSTUVWXYZ0123456789", a = "", r = 0; r < n; r++) {
        var i = Math.floor(Math.random() * (e.length - 1));
        a += e.charAt(i);
    }
    return a;
};

aspenLib.jsonpAjax = function (opt) {
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

aspenLib.parents = function (ele, selector) {
    var matchesSelector = ele.matches || ele.webkitMatchesSelector || ele.mozMatchesSelector || ele.msMatchesSelector;
    while (ele) {
        if (matchesSelector.call(ele, selector)) {
            break;
        }
        ele = ele.parentElement;
    }
    return ele;
};

aspenLib.css = function (ele, opts) {
    if (typeof opts == "object") {
        for (var key in opts) {
            if (opts[key]) {
                ele.style[key] = opts[key].toString();
            }
        }
    }
    return ele;
};

aspenLib.offsetTop = function (ele) {
    var top = ele.offsetTop;
    var parent = ele.offsetParent;
    while (parent) {
        top += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return top;
};

aspenLib.offsetLeft = function (ele) {
    var left = ele.offsetLeft;
    var parent = ele.offsetParent;
    while (parent) {
        left += parent.offsetLeft;
        parent = parent.offsetParent;
    }
    return left;
};

aspenLib.getUrlValue = function (name) {
    var getUrl = location.href;
    var getName = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i") || 'token';
    var setArray = [];
    if (getUrl.indexOf('?') != -1 && getUrl.indexOf('&') != -1) {
        var splitUrl = '';
        try {
            if (getUrl.indexOf('&') != -1) {
                splitUrl = getUrl.split('?').reverse()[0].split('&');
            } else {
                splitUrl = getUrl.split('?');
            }
            for (var i = 0; i < splitUrl.length; i++) {
                if (splitUrl[i].match(getName)) {
                    setArray.push(splitUrl[i]);
                }
            }
            if (setArray.length > 0) {
                return setArray[setArray.length - 1].split('=')[1];
            }
        } catch (e) { }
    } else if (getUrl.indexOf('?') != -1) {
        var splitUrl = getUrl.split('?');
        for (var i = 0; i < splitUrl.length; i++) {
            if (splitUrl[i].match(getName)) {
                setArray.push(splitUrl[i]);
            }
        }
        if (setArray.length > 0) {
            return setArray[setArray.length - 1].split('=')[1];
        }
    } else {
        return false;
    }
};

aspenLib.urlSplicing = function (name, value) {
    var _this = this;
    if (name instanceof Array && name.length > 0) {
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

aspenLib.CreateLoading = function () {
    if (!document.getElementById('loadingWrap')) {
        var createLoading = document.createElement('div');
        createLoading.id = 'loadingWrap';
        createLoading.innerHTML = '<div class="loading"><div class="loading-container first"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="loading-container second"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="loading-container last"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div>';
        document.body.appendChild(createLoading);
    }
};
aspenLib.RemoveLoading = function () {
    var removeLoading = document.getElementById('loadingWrap');
    if (removeLoading) {
        document.body.removeChild(removeLoading);
    }
};

aspenLib.formatNumber = function (num) {
    var num = (num || 0).toString();
    if (!/\,/.test(num)) {
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
        if (num) {
            result = num + result;
        }
        if (/\./.test(num + floatNum)) {
            return result + floatNum;
        } else {
            return result;
        }
    } else {
        return num;
    }
};

aspenLib.goTop = function (id, scrollHeight) {
    var id = document.getElementById(id);
    var documentBody = document.documentElement ? document.documentElement : document.body;
    window.addEventListener('scroll', function () {
        var getScrTop = documentBody.scrollTop || window.pageYOffset;
        getScrTop >= (Math.abs(scrollHeight) || documentBody.clientHeight) ? (id.style.display = 'block') : (id.style.display = 'none');
    }, !1), id.addEventListener('click', function fn() {
        var scrHeight = documentBody.scrollTop;
        scrHeight = parseInt(scrHeight - scrHeight / 30);
        if (scrHeight != 0) {
            documentBody.scrollTop = scrHeight;
            setTimeout(fn, 1);
        } else {
            documentBody.scrollTop = 0;
            return false;
        }
    }, !1);
};

aspenLib.copy = function (ele, target, tips) {
    var id = document.getElementById(ele);
    id.addEventListener('click', function () {
        if (!document.body.querySelectorAll('.cInpt')[0]) {
            var copyText = document.getElementById(target).innerText,
                createInput = document.createElement('input');
            createInput.setAttribute('readonly', 'readonly');
            createInput.value = copyText;
            document.body.appendChild(createInput);
            document.body.className.indexOf('ios') != -1 ? createInput.setSelectionRange(0, copyText.length) : createInput.select();
            document.execCommand("Copy");
            createInput.className = 'cInpt', createInput.style.display = 'none';
            aspenLib.tips(tips || '复制成功');
            setTimeout(function () {
                document.body.removeChild(createInput);
            }, 2e3);
        }
    }, false);
};

HTMLElement.prototype.removeAttr = function (attr) {
    if (this.getAttribute('style')) {
        if (!(attr instanceof Array)) {
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
    if (this.indexOf && this.indexOf instanceof Function) {
        var index = this.indexOf(value);
        if (index >= 0) {
            if (type == 'i') {
                return index;
            } else if (type == 'v') {
                return value;
            } else {
                return true;
            }
        }
    }
    return false;
};

function Time(opts) {
    this.obj = document.getElementById(opts.id);
};
Time.prototype = {
    bindEvent: function (opts) {
        var _this = this;
        var date = new Date();
        if (opts.date == true) {
            var year = date.getFullYear(),
                month = _this.addZero(date.getMonth() + 1),
                day = _this.addZero(date.getDate()),
                dateT = year + "年" + month + "月" + day + "日 ";
        } else {
            var dateT = '';
        }
        if (opts.time == true) {
            var hour = _this.addZero(date.getHours()),
                minute = _this.addZero(date.getMinutes()),
                second = _this.addZero(date.getSeconds()),
                timeT = hour + ":" + minute + ":" + second;
        } else {
            var timeT = '';
        }
        var week = '';
        if (opts.week == true) {
            switch (date.getDay()) {
                case 0:
                    week = "星期天";
                    break;
                case 1:
                    week = "星期一";
                    break;
                case 2:
                    week = "星期二";
                    break;
                case 3:
                    week = "星期三";
                    break;
                case 4:
                    week = "星期四";
                    break;
                case 5:
                    week = "星期五";
                    break;
                case 6:
                    week = "星期六";
                    break;
            }
        } else {
            week = '';
        }
        this.obj.innerHTML = dateT + timeT + " " + week;
    },
    addZero: function (temp) {
        return (temp <= 9) ? ("0" + temp) : temp;
    }
};