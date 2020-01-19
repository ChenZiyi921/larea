class JZFQ {
    head = document.querySelector("head");
    constructor() {
        if (new.target === JZFQ) {
            
        }
        this.body = document.body;
    }
    get prop() {
        return 'set prop'
    }
    set prop(val) {
        console.log(val)
    }
    ranStr(n) {
        for (let e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIZKLMNOPQRSTUVWXYZ0123456789", a = "", r = 0; r < n; r++) {
            let i = ~~(Math.random() * (e.length - 1));
            a += e.charAt(i);
        }
        return a;
    }
    uploadImg(opts) {
        if (this.typeOf(opts, 'Object')) {
            let [formData, xhr] = [new FormData(), new XMLHttpRequest()];
            formData.append("image", opts.ele.files[0]);
            xhr.open("post", opts.url, true);
            xhr.onreadystatechange = () => {
                if (4 === xhr.readyState) {
                    if (200 === xhr.status) {
                        let res = JSON.parse(xhr.responseText);
                        opts.cb(res)
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
    loadJS(pageUrl, insetPos, cb, id) {
        if (!document.getElementById(id)) {
            let loadJs = document.createElement("script");
            // Object.assign(loadJs, { src: pageUrl, type: "text/javascript", id: id })
            loadJs.src = pageUrl, loadJs.type = "text/javascript", loadJs.id = id;
            document.querySelector(insetPos || "body").appendChild(loadJs);
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
        if (document.getElementById("systemTips")) return;
        let clear = null;
        let div = document.createElement("div");
        div.id = "systemTips";
        div.innerHTML = txt.toString();
        this.body.appendChild(div);
        clear = setTimeout(() => { this.body.removeChild(div), clearTimeout(clear) }, 2000)
    }
    browserInfo() {
        return {
            isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
            isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
            isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
            isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
            isAli: Boolean(navigator.userAgent.match(/AlipayClient/ig)),
            isPhone: Boolean(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent))
        }
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
            this.body.className.includes('ios') ? input.setSelectionRange(0, text.length) : input.select();
            document.execCommand("Copy");
            input.className = 'cInpt';
            input.style.display = 'none';
            this.tips(tips || '复制成功');
            setTimeout(() => this.body.removeChild(input), 2e3);
        }
    }
    typeOf(tgt, type) {
        const dataType = Object.prototype.toString.call(tgt).replace(/\[object (\w+)\]/, "$1");
        return type ? dataType === type : dataType;
    }
    extNumber(str) {
        return str.replace(/[^0-9]/ig, "") * 1
    }
    getStyle(obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, null)[attr]
    }
    GBCR(obj) {
        return obj.getBoundingClientRect()
    }
    inverse(number) {
        return - number || 0
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
        let [clear, isLoad, imgs] = [null, true, []];
        for (let i = 0; i < imgList.length; i++) {
            if (imgList[i].height === 0) isLoad = false, imgs.push(imgList[i])
        }
        isLoad ? (clearTimeout(clear), callback()) : clear = setTimeout(() => imgLoaded(imgs, callback), 300)
    }
    turnArray(nodeList) { return [].slice.call(nodeList) }
    toThousands(num) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }
    setDate(format) {
        setInterval(() => {
            return new Date().format(format); // "yyyy-MM-dd hh:mm:ss w"
        }, 1000);
        Date.prototype.format = function (fmt) {
            let o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": ~~((this.getMonth() + 3) / 3),
                "S": this.getMilliseconds(),
                'w': ['日', '一', '二', '三', '四', '五', '六'][this.getDay()]
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (let k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt
        }
    }
}
class Pop extends JZFQ {
    constructor(opts) {
        super();
        if (/Object/.test(Object.prototype.toString.call(opts))) {
            this.main(opts, opts => {
                this.event(opts);
            })
        }
    }
    main(opts, cb) {
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
    event(opts) {
        let isEvent = true;
        document.querySelector('#h5PopMainEle').addEventListener('click', e => {
            let target = (e = e || window.event).target || e.srcElement;
            let targetType = target.className.toLowerCase() || target.id;
            if (isEvent) {
                let isExist = key => {
                    if (opts[key] && this.typeOf(opts[key], 'Function')) {
                        opts[key]()
                    }
                }
                switch (targetType) {
                    case "h5pop-cancel":
                        isExist('cancelBtnRun')
                        break;
                    case "h5pop-confirm":
                        isExist('confirmBtnRun')
                        break;
                }
                if (targetType == "h5pop-close" || targetType == "h5pop-cancel" || targetType == "h5pop-confirm") {
                    return this.remove(), e.preventDefault(), isEvent = false;
                }
            }
        });
    }
    remove() {
        let popMask = document.getElementById("h5PopMasks");
        let popMain = document.getElementById("h5PopMainEle");
        if (popMask.parentNode && popMain.parentNode) {
            popMask.parentNode.removeChild(popMask);
            popMain.parentNode.removeChild(popMain);
        }
    }
}

HTMLElement.prototype.css = function (opts) {
    if (/Object/.test(Object.prototype.toString.call(opts))) {
        for (let key in opts) {
            opts[key] && (this.style[key] = opts[key].toString())
        }
    }
};
HTMLElement.prototype.removeAttr = function (attr) {
    if (this.getAttribute('style')) {
        !Array.isArray(attr) && (attr = attr.split(','))
        let styles = this.getAttribute('style').replace(/\s+/g, '');
        for (let i = 0; i < attr.length; i++) {
            styles = styles.replace(new RegExp(attr[i] + ':.+?;'), '')
            this.setAttribute('style', styles)
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
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (let i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}