SlideClass = {
    hasPrototype: false,
    newClass: function(ele) {
        var ele = ele || {};
        if (!this.hasPrototype) {
            this.init.prototype = SlideClass;
            this.hasPrototype = true;
        }
        return new this.init(ele);
    },
    init: function(ele) {
        var _this = this;
        _this.clearAnimation = null;
        _this.item = 0;
        _this.speed = ele.speed;
        _this.interval = ele.interval;
        _this.prev = ele.prve;
        _this.next = ele.next;
        _this.length = ele.slideMain.length;
        _this.slideMain = ele.slideMain;
        _this.aCur = ele.aCur;
        _this.curName = ele.curName;
        _this.addclassName = ele.addclassName;
        _this.hoveMain = ele.hoverMain;
        clearTimeout(_this.clearAnimation);
        _this.clearAnimation = setTimeout(function(){
            _this.autoPlay();
        }, _this.interval);
        ele.prev.click(function() {
            _this.prvePage();
        });
        ele.next.click(function() {
            _this.nextPage();
        });
        ele.aCur.click(function() {
            _this.clickCur(this);
        });
        _this.hoverWrap();
    },
    autoPlay: function() {
        var _this = this;
        if (!this.slideMain.is(':animated')) {
            _this.item == _this.length-1 ? _this.item = 0 : _this.item++;
            _this.animationObj(_this.item);
            _this.curAnimation(_this.item);
            _this.clearAnimation = setTimeout(function() {
                _this.autoPlay();
            }, _this.interval);
        }
    },
    prvePage: function() {
        var _this = this;
        if (!_this.slideMain.is(':animated')) {
            _this.item == 0 ? _this.item = this.length - 1 : _this.item--;
            _this.animationObj(_this.item);
            _this.curAnimation(_this.item);
        }
    },
    nextPage: function() {
        var _this = this;
        if (!_this.slideMain.is(':animated')) {
            _this.item == _this.length - 1 ? _this.item = 0 : this.item++;
            _this.animationObj(_this.item);
            _this.curAnimation(_this.item);
        }
    },
    clickCur: function(ele) {
        var _this = this;
        clearTimeout(_this.clearAnimation);
        var getItem = $(ele).index();
        _this.aCur.removeClass(_this.curName);
        _this.aCur.eq(getItem).addClass(_this.curName);
        _this.animationObj(getItem);
        _this.item = getItem;
    },
    animationObj: function(getNum) {
        var _this = this;
        _this.slideMain.removeClass(_this.addclassName).css({ opacity: 0, zIndex: 0 });
        _this.slideMain.eq(getNum).addClass(_this.addclassName).stop(true, false).animate({ opacity: 1, zIndex: 8}, _this.speed);
    },
    curAnimation: function(eqNum) {
        var aCur = this.aCur, _this = this;
        aCur.removeClass(_this.curName);
        aCur.eq(eqNum).addClass(_this.curName);
    },
    hoverWrap: function(ele) {
        var _this = this;
        _this.hoveMain.hover(function() {
            clearTimeout(_this.clearAnimation);
        }, function() {
            _this.clearAnimation = setTimeout(function() {
                _this.autoPlay();
            }, _this.interval);
        });
    }
};
var tabClass = {
    hasPrototype: false,
    newClass: function(ele) {
        var ele = ele || {};
        if (!this.hasPrototype) {
            this.init.prototype = tabClass;
            this.hasPrototype = true;
        }
        return new this.init(ele);
    },
    tabBindEvent: function(ele){
        var _this = this;
        _this.clickEle.on(_this.eventClass,function(){
            var $this = $(this);
            _this.clickEle.removeClass(_this.addCur);
            $this.addClass(_this.addCur);
            var index = $this.index();
            _this.tabContent.hide();
            _this.tabContent.eq(index).show();
        });
    },
    init: function(ele){
        var _this = this;
        _this.clickEle = ele.clickEle;
        _this.tabContent = ele.tabContent;
        _this.addCur = ele.addCur;
        _this.eventClass = ele.eventClass;
        _this.tabBindEvent();
    }
};
/*配置轮播图参数对象*/
var eleObject = {
    speed: 300,
    interval: 5000,
    slideMain: $('#slideWrap').find('.slide'),
    curName: 'cur',
    addclassName: 'animation',
    prev: $('#slideWrap').find('.prev'),
    next: $('#slideWrap').find('.next'),
    aCur: $('#slideWrap').find('.item a'),
    hoverMain: $('#slideWrap')
};
/* 配置切换标签对象 */
var tabObject = {
    clickEle: $('#tabObj').find('.tab-list li'),
    tabContent: $('#tabObj').find('.content-list'),
    addCur: 'gzcur',
    eventClass: 'mouseover' 
};
;(function($,undefined){
    /* 轮播图JS运行 */ 
    SlideClass.newClass(eleObject);
    /* tab 切换 JS运行 */ 
    tabClass.newClass(tabObject);
})(jQuery);