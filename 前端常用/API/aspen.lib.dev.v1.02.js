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

aspenLib.h5PopClass.isMobile(function () {});

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
        success: function () {},
        error: function () {}
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
                        } catch (e) {}
                    } else {
                        try {
                            defaults["success"].call(oXhr, oXhr.responseText);
                        } catch (e) {}
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
    var UA = window.navigator.userAgent;
    if (UA.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
};

aspenLib.loadJS = function (pageUrl, insetPage, callback) {
    var loadJs = document.createElement("script");
    loadJs.src = pageUrl, loadJs.type = "text/javascript";
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
};

aspenLib.tips = function (txt) {
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
};

aspenLib.jsonpAjax = function (opts) {
    if (typeof opts != "undefined" && typeof opts == "object") {
        window.jsonpCallback = function (data) {
            createScript.parentNode.removeChild(createScript);
            if (typeof data === "string") {
                try {
                    opts.success(JSON.parse(data));
                } catch (e) {}
            }
            opts.success(data);
        };
        if (opts.url.indexOf("?") == -1) {
            opts.url += "?callback=jsonpCallback";
        } else {
            opts.url += "&callback=jsonpCallback";
        }
        var createScript = document.createElement("script");
        var m = document.getElementsByTagName("script")[0];
        createScript.type = "text/javascript";
        createScript.async = 1;
        createScript.src = opts.url;
        createScript.onerror = function (e) {
            createScript.parentNode.removeChild(createScript);
            opts.error(e);
        };
        m.parentNode.insertBefore(createScript, m);
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

aspenLib.getUrlValue = function (url, name) {
    var getUrl = url || location.href;
    var getName = name || 'token';
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
                if (splitUrl[i].match(new RegExp(name || 'token'))) {
                    setArray.push(splitUrl[i]);
                }
            }
            if (setArray.length > 0) {
                return setArray[setArray.length - 1].split('=')[1];
            }
        } catch (e) {}
    } else if (getUrl.indexOf('?') != -1) {
        var splitUrl = getUrl.split('?');
        for (var i = 0; i < splitUrl.length; i++) {
            if (splitUrl[i].match(new RegExp(name || 'token'))) {
                setArray.push(splitUrl[i]);
            }
        }
        if (setArray.length > 0) {
            return setArray[setArray.length - 1].split('=')[1];
        }
    } else {
        return false;
    }
}