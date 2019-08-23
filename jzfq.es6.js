class JZFQ {
    // body = document.querySelector("body");
    constructor() {
        this.body = document.querySelector("body");
        this.head = document.querySelector("head");
    }
    ajax(opts) {
        let defaults = {
            type: "GET",
            url: "",
            data: "",
            dataType: "json",
            async: true,
            cache: true,
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            param: "",
            success() { },
            error() { }
        };
        Object.assign(defaults, opts)
        if (this.typeOf(defaults["data"]) === 'Object') {
            let str = "";
            for (let key in defaults["data"]) {
                str += key + "=" + defaults["data"][key] + "&";
            }
            defaults["data"] = str.substring(0, str.length - 1);
        }
        defaults["type"] = defaults["type"].toUpperCase();
        defaults["cache"] = defaults["cache"] ? "" : "&" + new Date().getTime();
        if (defaults["type"] === "GET" && (defaults["data"] || defaults["cache"])) {
            defaults["url"] += "?" + defaults["data"] + defaults["cache"];
        }
        let oXhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        oXhr.param = defaults["param"];
        oXhr.open(defaults["type"], defaults["url"], defaults["async"]);
        if (defaults["headers"]) {
            for (let k in defaults["headers"]) {
                oXhr.setRequestHeader(k, defaults["headers"][k]);
            }
        }
        if (defaults["type"] === "GET") {
            oXhr.send(null);
        } else {
            oXhr.setRequestHeader("Content-type", defaults["contentType"]);
            oXhr.send(defaults["data"]);
        }
        if (defaults["setToken"] && this.typeOf(defaults["setToken"]) === "Function") defaults["setToken"](oXhr);
        oXhr.onreadystatechange = () => {
            if (oXhr.readyState === 4) {
                if (oXhr.status === 200) {
                    if (this.typeOf(defaults["success"]) === "Function") {
                        defaults["dataType"] == "json"
                            ? defaults["success"].call(oXhr, JSON.parse(oXhr.responseText))
                            : defaults["success"].call(oXhr, oXhr.responseText);
                    }
                } else {
                    if (this.typeOf(defaults["error"]) === "Function") defaults["error"]();
                }
            }
        };
    }
    ranStr(n) {
        for (let e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIZKLMNOPQRSTUVWXYZ0123456789", a = "", r = 0; r < n; r++) {
            let i = ~~(Math.random() * (e.length - 1));
            a += e.charAt(i);
        }
        return a;
    }
    jsonpAjax(opts = { // 未测试移除 removeNode中this有问题
        url: '',
        data: {} || [],
        success() { },
        error() { }
    }) {
        let [paraArr, paraString] = [[], ''],
            [urlArr, cbName] = ['', ''],
            creatScript = null,
            supportLoad = '',
            onEvent,
            timeout = opts.timeout || 0,
            ranTxt = this.ranStr(10);

        for (let i in opts.data) {
            if (opts.data.hasOwnProperty(i)) {
                paraArr.push(encodeURIComponent(i) + "=" + encodeURIComponent(opts.data[i]));
            }
        }

        urlArr = opts.url.split("?");
        urlArr.length > 1 && paraArr.push(urlArr[1]);

        cbName = 'cb' + ranTxt;
        paraArr.push('cb=' + cbName);
        paraString = paraArr.join("&");
        opts.url = urlArr[0] + "?" + paraString;

        creatScript = document.createElement("script");
        creatScript.loaded = false;
        window[cbName] = data => {
            if (!typeof opts.success == 'function') return;
            opts.success(data)
            creatScript.loaded = true;
        }

        this.head.insertBefore(creatScript, this.head.firstChild);
        creatScript.src = opts.url;

        supportLoad = "onload" in creatScript;

        onEvent = supportLoad ? "onload" : "onreadystatechange";
        creatScript[onEvent] = () => {
            if (creatScript.readyState && creatScript.readyState != "loaded") {
                return;
            }
            if (creatScript.readyState == 'loaded' && creatScript.loaded == false) {
                return creatScript.onerror()
            }
            setTimeout(() => {
                (creatScript.parentNode && creatScript.parentNode.removeChild(creatScript)) && (this.head.removeNode && this.head.removeNode(this));
                creatScript = creatScript[onEvent] = creatScript.onerror = window[cbName] = null;
            }, 1000);
        }

        creatScript.onerror = () => {
            if (window[cbName] == null) {
                this.tips("请求超时，请重试！");
            }
            opts.error && opts.error();
            (creatScript.parentNode && creatScript.parentNode.removeChild(creatScript)) && (this.head.removeNode && this.head.removeNode(this));
            creatScript = creatScript[onEvent] = creatScript.onerror = window[cbName] = null;
        }

        if (timeout != 0) {
            setTimeout(() => {
                if (creatScript && creatScript.loaded == false) {
                    window[cbName] = null;
                    creatScript.onerror();
                }
            }, timeout);
        }
    }
    uploadImg(opts) {
        if (this.typeOf(opts) === 'Object') {
            let [formData, xhr] = [new FormData(), new XMLHttpRequest()];
            formData.append("image", opts.ele.files[0]);
            xhr.open("post", opts.url, true);
            xhr.onreadystatechange = () => {
                if (4 === xhr.readyState) {
                    if (200 === xhr.status) {
                        let data = JSON.parse(xhr.responseText);
                        data.status == "200" ? this.typeOf(opts.cb) === "Function" && opts.cb() : this.tips(data.msg);
                    } else {
                        this.tips("error");
                    }
                }
            };
            xhr.send(formData);
        }
    }
    loading() {
        if (!document.getElementById('loadingWrap')) {
            let lhtml = '', mainHtml = '';
            let classArray = ['loadfirst', 'second', 'loadlast'];
            let loading = document.createElement('div');
            loading.id = 'loadingWrap';
            for (let l = 1; l < 5; l++) {
                lhtml += '<div class="circle' + l + '"></div>';
            }
            Array.from(new Array(3).keys()).forEach(i => {
                mainHtml += `<div class="loading-container ${classArray[i]}">${lhtml}</div>`;
            });
            loading.innerHTML = `<div class="loading">${mainHtml}</div>`;
            this.body.appendChild(loading);
        }
    }
    removeLoading() {
        let loading = document.getElementById('loadingWrap');
        loading && this.body.removeChild(loading);
    }
    getQueryString(name) {
        let url = window.location.href;
        if (/\?(.+)/.test(url)) {
            let args = url.split('?');
            if (args[0] !== url) {
                let arr = args[1].split('&');
                let obj = {};
                for (let i = 0; i < arr.length; i++) {
                    let arg = arr[i].split('=');
                    obj[arg[0]] = arg[1];
                }
                return !name ? obj : obj[name];
            }
        }
    }
    urlSplicing(name, value) {
        if (Array.isArray(name)) {
            for (let i = 0; i < name.length; i++) {
                for (let k in name[i]) {
                    if (!this.getQueryString(k)) {
                        location.search += `${/^\?/.test(location.search) ? '&' : '?'}${k + '=' + name[i][k]}`
                    }
                }
            }
        } else {
            if (!this.getQueryString(name)) {
                location.search += `${/^\?/.test(location.search) ? '&' : '?'}${name + '=' + value}`
            } else {
                let search = this.getQueryString();
                let searchStr = '';
                search[name] = value;
                for (const key in search) {
                    if (search.hasOwnProperty(key)) {
                        const val = search[key];
                        searchStr += (/\?/.test(searchStr) ? '&' : '?') + key + '=' + val;
                    }
                }
                location.search = searchStr
            }
        }
    }
    loadJS(pageUrl, insetPos, cb, id) {
        if (!document.getElementById(id)) {
            let loadJs = document.createElement("script");
            loadJs.src = pageUrl, loadJs.type = "text/javascript", loadJs.id = id || '';
            document.querySelectorAll(insetPos || "body")[0].appendChild(loadJs);
            if (loadJs.readyState) {
                loadJs.onreadystatechange = () => {
                    if (loadJs.readyState == "loaded" || loadJs.readyState == "complete") {
                        loadJs.onreadystatechange = null;
                        return cb()
                    }
                };
            }
            loadJs.onload = () => cb();
        }
    }
    tips(txt) {
        let systemTips = document.getElementById("systemTips");
        if (systemTips || !txt) return;
        let clear = null;
        let div = document.createElement("div");
        div.id = "systemTips";
        div.innerHTML = txt.toString();
        this.body.appendChild(div);
        if (systemTips.parentNode) {
            clear = setTimeout(() => {
                systemTips.parentNode.removeChild(systemTips);
                clearTimeout(clear);
            }, 2000)
        }
    }
    isweixin() {
        return "micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
    }
    isPC() {
        let userAgentInfo = navigator.userAgent;
        let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) return false
        }
        return true;
    }
    isMobile() {
        let UA = navigator.userAgent,
            IsAndroid = /Android|HTC/i.test(UA),
            IsIPad = !IsAndroid && /iPad/i.test(UA),
            IsIPhone = !IsAndroid && /iPod|iPhone/i.test(UA),
            IsIOS = IsIPad || IsIPhone;
        if (IsIOS || IsAndroid) {
            this.body.classList.add("mobile");
            this.body.classList.add(IsIOS ? "ios" : "android");
        }
    }
    toThousands(num) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }
    goTop(ele, scrToShow) {
        window.animation = window.requestAnimationFrame || function (fn) { return setTimeout(fn, 1000 / 60) };
        let el = document.querySelector(ele);
        window.addEventListener('scroll', () => {
            let currentScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            let clientH = document.documentElement.clientHeight || document.body.clientHeight;
            currentScroll >= (Math.abs(scrToShow) || clientH) ? (el.style.display = 'block') : (el.style.display = 'none');
        }, !1);
        el.addEventListener('click', function fn() {
            let currentScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            if (currentScroll > 0) {
                window.animation(fn);
                window.scrollTo(0, currentScroll - (currentScroll / 30));
            }
        }, !1);
    }
    copy(text, tips) {
        if (!this.body.querySelector('.cInpt')) {
            let input = document.createElement('input');
            input.setAttribute('readonly', 'readonly');
            input.value = text;
            this.body.appendChild(input);
            this.body.className.indexOf('ios') != -1 ? input.setSelectionRange(0, text.length) : input.select();
            document.execCommand("Copy");
            input.className = 'cInpt';
            input.style.display = 'none';
            this.tips(tips || '复制成功');
            setTimeout(() => this.body.removeChild(input), 2e3);
        }
    }
    typeOf(value) {
        let typeArray = ['Number', 'String', 'Boolean', 'Object', 'Array', 'Null', 'Undefined', 'Function'];
        let i = 0, l = typeArray.length;
        let v = Object.prototype.toString.call(value);
        let type = v.substring(0, v.length - 1).split(' ')[1];
        while (i < l) {
            if (type === typeArray[i]) return type;
            i++;
        }
    }
    // 同 getBoundingClientRect
    offsetTop(ele) {
        let top = ele.offsetTop;
        let parent = ele.offsetParent;
        while (parent) {
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return top
    }
    offsetLeft(ele) {
        let left = ele.offsetLeft;
        let parent = ele.offsetParent;
        while (parent) {
            left += parent.offsetLeft;
            parent = parent.offsetParent;
        }
        return left
    }
    parents(ele, selector) {
        let matchesSelector = ele.matches || ele.webkitMatchesSelector || ele.mozMatchesSelector || ele.msMatchesSelector;
        while (ele) {
            if (matchesSelector.call(ele, selector)) break;
            ele = ele.parentElement;
        }
        return ele
    }
    imgLoaded(imgList, callback) {
        let clear, isLoad = true, imgs = [];
        for (let i = 0; i < imgList.length; i++) {
            if (imgList[i].height === 0) isLoad = false, imgs.push(imgList[i])
        }
        if (isLoad) {
            clearTimeout(clear), callback()
        } else {
            clear = setTimeout(function () {
                imgLoaded(imgs, callback)
            }, 300)
        }
    }
}
class h5PopClass extends JZFQ {
    constructor(opts) {
        super();
        if (/Object/.test(Object.prototype.toString.call(opts))) {
            this.popMainRun(opts, opts => {
                this.bindEvent(opts);
            })
        }
    }
    popMainRun(opts, cb) {
        let [div, mask] = [document.createElement("div"), document.createElement("div")];
        mask.className = "h5pop-mask";
        mask.id = "h5PopMasks";
        div.className = "h5pop-main clearfix";
        div.id = "h5PopMainEle";
        let popHtml = '';
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
        div.innerHTML = popHtml;
        this.body.appendChild(div), this.body.appendChild(mask);
        cb(opts)
    }
    bindEvent(opts) {
        let isEvent = true;
        document.querySelector('#h5PopMainEle').addEventListener('click', e => {
            let target = (e = e || window.event).target || e.srcElement;
            let targetType = target.className.toLowerCase() || target.id;
            if (isEvent) {
                if (targetType == "h5pop-close" || targetType == "h5pop-cancel" || targetType == "h5pop-confirm") {
                    return this.removePop(), e.preventDefault(), isEvent = false;
                }
                switch (targetType) {
                    case "h5pop-cancel":
                        if (opts["cancelBtnRun"] && typeof opts["cancelBtnRun"] === "function") {
                            opts["cancelBtnRun"]();
                        }
                        break;
                    case "h5pop-confirm":
                        if (opts["confirmBtnRun"] && typeof opts["confirmBtnRun"] === "function") {
                            opts["confirmBtnRun"]();
                        }
                        break;
                }
            }
        });
    }
    removePop() {
        let getMasks = document.getElementById("h5PopMasks");
        let getPopMains = document.getElementById("h5PopMainEle");
        if (getMasks.parentNode && getPopMains.parentNode) {
            getMasks.parentNode.removeChild(getMasks);
            getPopMains.parentNode.removeChild(getPopMains);
        }
    }
}
Array.prototype.isInArray = function (value, type) {
    if (this.indexOf && Jzfq.typeOf(this.indexOf) === 'Function') {
        let index = this.indexOf(value);
        if (index >= 0) {
            return type == 'i' ? index : type == 'v' ? value : true;
        }
    }
};
HTMLElement.prototype.css = function (opts) {
    if (/Object/.test(Object.prototype.toString.call(opts))) {
        for (let key in opts) {
            if (opts[key]) {
                this.style[key] = opts[key].toString();
            }
        }
    }
};
HTMLElement.prototype.removeAttr = function (attr) {
    if (this.getAttribute('style')) {
        !Array.isArray(attr) && (attr = attr.split(','))
        let getStyles = this.getAttribute('style').replace(/\s+/g, '');
        for (let i = 0; i < attr.length; i++) {
            getStyles = getStyles.replace(new RegExp(attr[i] + ':.+?;'), '')
            this.setAttribute('style', getStyles)
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

const Jzfq = new JZFQ