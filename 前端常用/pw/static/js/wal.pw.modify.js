/*
 * author: UED - Xue Ying
 * email:  xueying@juzifenqi.com
 */
(function(walPw, doc, $, undefined) {
    walPw.pwSetRun = {
        getBody: $('body'),
        init: function() {
            var _this = this;
            _this.autoNext (); 
        },
        autoNext: function() {  
            var _this = this;
            var regNum = new RegExp("^[0-9]*$");
            $('.pw-form input').eq(0).focus();
            _this.getBody.on('keyup', '.pw-form input', function() {
                if($.trim($(this).val()).length != '' && regNum.test($(this).val())){
                    $(this).next().focus();
                }else{
                    $(this).val('');
                    $(this).prev().focus();
                }
            });
        },
    }
    $(function() {
        walPw.pwSetRun.init();
    });
})(window, document, jQuery);
;(function(jzfq, undefined) {
    /*
     * author: UED - Yang Gang
     * email:  yanggang@juzifenqi.com
     */
    jzfq.flowPassword = {
        setUsedRun: function(options) {
            var _this = this;
            if (typeof options != 'undefined') {
                _this.addFocus(options['wrap']);
                var getWrap = document.querySelector(options['wrap']);
                var getPwInpt0 = getWrap.querySelector(options['curEle0']);
                var getPwInpt = getWrap.querySelector(options['curEle']);
                var getInptList = getWrap.querySelectorAll(options['inptList']);
                var setEvent = "input" in document ? 'input' : 'keyup';
                getPwInpt0.onfocus;
                getPwInpt0.addEventListener(setEvent, function() {
                    if (this.value.length > parseInt(options['length'])) {
                        this.value = this.value.substring(0, parseInt(options['length']));
                        return;
                    } else {
                        for (var k = 0; k < getInptList.length; k++) {
                            getInptList[k].className = options['inptList'].substring(1, options['inptList'].length);
                        }
                        for (var i = 0; i < this.value.split('').length; i++) {
                            getInptList[i].className = options['inptList'].substring(1, options['inptList'].length) + ' ' + options['addClass'];
                            if ((i + 1) === parseInt(options['length'])) {
                                if (this.value==='111111') {
                                    /*这里判断原密码是否正确*/
                                    document.querySelector('.font-red').innerHTML=''
                                    getPwInpt0.style.display='none';
                                    getPwInpt.style.display='block';
                                    document.querySelector('.pw-box .font32').innerHTML='请设置新交易密码';
                                    for (var k = 0; k < getInptList.length; k++) {
                                        getInptList[k].className = options['inptList'].substring(1, options['inptList'].length);
                                    }
                                    window.flowPassword.setInsetRun({
                                        /* 父级 id；方便多次调用 */
                                        'wrap': '#passWrapa',
                                        /* 隐藏input id */
                                        'curEle': '#pw1',
                                        /* 隐藏input id2 */
                                        'curEle2': '#pw2',
                                        /* 输入元素 class */
                                        'inptList': '.pw-inpt-st',
                                        /* 输入框添加 class (黑点样式) */
                                        'addClass': 'isfocus',
                                        /* 输入密码长度 */
                                        'length': 6,
                                        /* 点击完成按钮 */
                                        'pwBtn':'.pw-btn',
                                        /* 不满足长度-预留方法 */
                                        'stateId': '#keyboardDIV'
                                    });                                    
                                }else{
                                    document.querySelector('.font-red').innerHTML='原密码错误！'
                                }
                            } else {
                                if (typeof options['stateId'] != 'undefined') {
                                    _this.setPasswodInit(options['stateId']);
                                }
                            }
                        }
                    }
                }, false);
            }
        },
        setInsetRun: function(options) {
            var _this = this;
            if (typeof options != 'undefined') {
                _this.addFocus(options['wrap']);
                var getWrap = document.querySelector(options['wrap']);
                var getPwInpt = getWrap.querySelector(options['curEle']);
                var getInptList = getWrap.querySelectorAll(options['inptList']);
                var setEvent = "input" in document ? 'input' : 'keyup';
                getPwInpt.onfocus;
                getPwInpt.addEventListener(setEvent, function() {
                    if (this.value.length > parseInt(options['length'])) {
                        this.value = this.value.substring(0, parseInt(options['length']));
                        return;
                    } else {
                        for (var k = 0; k < getInptList.length; k++) {
                            getInptList[k].className = options['inptList'].substring(1, options['inptList'].length);
                        }
                        for (var i = 0; i < this.value.split('').length; i++) {
                            getInptList[i].className = options['inptList'].substring(1, options['inptList'].length) + ' ' + options['addClass'];
                            if ((i + 1) === parseInt(options['length'])) {
                                _this.isSuccess(options);
                            } else {
                                if (typeof options['stateId'] != 'undefined') {
                                    _this.setPasswodInit(options['stateId']);
                                }
                            }
                        }
                    }
                }, false);
            }
        },
        isSuccess: function(options) {
            var _this = this;
            if (typeof options != 'undefined') {
                var getWrap = document.querySelector(options['wrap']);
                var getPwInpt = getWrap.querySelector(options['curEle']);
                var getPwInpt2 = getWrap.querySelector(options['curEle2']);
                var getInptList = getWrap.querySelectorAll(options['inptList']);
                var getPwBtn = document.querySelector(options['pwBtn']);
                var setEvent = "input" in document ? 'input' : 'keyup';
                getPwInpt.style.display="none";
                getPwInpt2.style.display="block";
                getPwBtn.style.display='block';
                getPwInpt2.onfocus;
                for (var k = 0; k < getInptList.length; k++) {
                    getInptList[k].className = options['inptList'].substring(1, options['inptList'].length);
                }
                document.querySelector('.pw-box .font32').innerHTML='请再次输入新交易密码';
                getPwInpt2.addEventListener(setEvent, function() {
                    if (this.value.length > parseInt(options['length'])) {
                        this.value = this.value.substring(0, parseInt(options['length']));
                        return;
                    } else {
                        for (var k = 0; k < getInptList.length; k++) {
                            getInptList[k].className = options['inptList'].substring(1, options['inptList'].length);
                        }
                        for (var i = 0; i < this.value.split('').length; i++) {
                            getInptList[i].className = options['inptList'].substring(1, options['inptList'].length) + ' ' + options['addClass'];
                            if ((i + 1) === parseInt(options['length'])) {
                                _this.pwValCompare(getPwInpt.value,getPwInpt2.value);

                            } else {
                                getPwBtn.className='pw-btn grey';
                                if (typeof options['stateId'] != 'undefined') {
                                    _this.setPasswodInit(options['stateId']);
                                }
                            }
                        }
                    }
                }, false);

            }
        },
        setPasswodInit: function(ele) {
            if (typeof ele != 'undefined') {
                var setBtn = document.querySelector(ele);
                if (setBtn) {
                    setBtn.style.display = 'none';
                } else {
                    return;
                }
            }
        },
        addFocus: function(ele) {
            if (typeof ele != 'undefined') {
                var getIpt = document.querySelectorAll(ele)[0];
                var isTouch = "touchstart" in document ? 'touchstart' : 'click';
                document.querySelectorAll('body')[0].addEventListener(isTouch, function(e) {
                    var e = e || window.event;
                    var target = e.target || e.srcElement;
                    if (target.parentNode.id == ele.substring(1, ele.length)) {
                        getIpt.style.boxShadow = '0 0 6px 0 #ccc';
                    } else {
                        getIpt.style.boxShadow = '0 0 0 0 #ccc';
                    }
                }, false);
            }
        },
        pwValCompare: function(val,val2) {
            if (val != 'undefined' && val2 != 'undefined') {
                if (val!=val2) {
                    document.querySelector('.font-red').innerHTML='两次密码不一致！';
                    document.querySelector('.pw-btn').disabled=true;
                }else{
                    document.querySelector('.pw-btn').className='pw-btn';
                    document.querySelector('.pw-btn').disabled=false;
                    document.querySelector('.font-red').innerHTML='';
                }
            }
        }
    }
})(window);
document.addEventListener('DOMContentLoaded', function(){
    window.flowPassword.setUsedRun({
        /* 父级 id；方便多次调用 */
        'wrap': '#passWrapa',
        /* 隐藏input id0 */
        'curEle0': '#pw0',
        /* 隐藏input id */
        'curEle': '#pw1',
        /* 输入元素 class */
        'inptList': '.pw-inpt-st',
        /* 输入框添加 class (黑点样式) */
        'addClass': 'isfocus',
        /* 输入密码长度 */
        'length': 6,
        /* 点击完成按钮 */
        'pwBtn':'.pw-btn',
        /* 不满足长度-预留方法 */
        'stateId': '#keyboardDIV'
    });
}, false);