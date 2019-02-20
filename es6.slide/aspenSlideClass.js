;
function aspenJZFQSlide(opts) {
    this.init(opts);
};
aspenJZFQSlide.prototype = {
    init: function (opts) {
        var _this = this;
        if (/Object/.test(Object.prototype.toString.call(opts))) {
            _this.opts = opts;
            _this.contentLength = _this.opts.content.length || 0;
            if (_this.opts.wrap.nodeType === 1 && _this.contentLength > 1) {
                _this.pages = {
                    x: 0,
                    y: 0
                };
                _this.winWidth = window.innerWidth;
                _this.initPage = 0;
                _this.clearSlide = null;
                _this._setDome(_this.initPage);
                _this._bindEvent();
                _this._autoPlay();
            }
        } else {
            throw new Error('is not Object');
        }
    },
    _css: function (ele, opts) {
        if (ele && /Object/.test(Object.prototype.toString.call(opts))) {
            for (var key in opts) {
                opts[key] && (ele.style[key] = opts[key]);
            }
            return ele;
        }
    },
    _bindEvent: function () {
        var _this = this;
        _this.opts.wrap.addEventListener('touchstart', function (e) {
            e.preventDefault();
            clearInterval(_this.clearSlide);
            _this._start(e)
        });
        _this.opts.wrap.addEventListener('touchmove', function (e) {
            e.preventDefault();
            _this._move(e)
        });
        _this.opts.wrap.addEventListener('touchend', function (e) {
            e.preventDefault();
            _this._end(e);
        });
    },
    _setDome: function (item) {
        var _this = this;
        for (var i = 0, iLen = _this.contentLength; i < iLen; i++) {
            _this._css(_this.opts.content[i], {
                transform: 'translate3d(0,0,0)',
                zIndex: 1
            });
        }
        _this._css(_this.opts.content[item], {
            zIndex: 7
        });
        if (_this.opts.isAuto) {
            var setItem = item + 1;
            item === (_this.contentLength - 1) && (setItem = 0);
            _this._css(_this.opts.content[setItem], {
                transform: 'translate3d(' + _this.winWidth + 'px,0,0)'
            });
        }
    },
    _start: function (e) {
        this.pages = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        }
    },
    _move: function (e) {
        var _this = this,
            x = e.changedTouches[0].pageX,
            y = e.changedTouches[0].pageY;
        _this.opts.wrap.removeEventListener('touchend', _this._end);
        _this._translate(x, 'move');
    },
    _end: function (e) {
        var _this = this,
            x = e.changedTouches[0].pageX,
            y = e.changedTouches[0].pageY;
        _this.opts.wrap.removeEventListener('touchmove', _this._move);
        (x - _this.pages.x > 0) ? (Math.abs(x - _this.pages.x) > _this.opts.lateX && _this.initPage--) : (Math.abs(x - _this.pages.x) > _this.opts.lateX && _this.initPage++);
        _this._translate(x, 'end');
        _this._autoPlay();
    },
    _setItem: function (item) {
        var _this = this;
        if (_this.opts.itemEle.length > 0) {
            for (var i = 0, iLen = _this.opts.itemEle.length; i < iLen; i++) {
                _this.opts.itemEle[i].classList.remove('actives');
            }
            _this.opts.itemEle[item || _this.initPage].classList.add('actives');
        }
    },
    _translate: function (x, type) {
        var _this = this,
            m = null,
            t = _this.initPage,
            r = (x === 'play' ? '-' : (x - _this.pages.x > 0 ? '' : '-')),
            l = _this.contentLength - 1,
            p = null,
            returnItme = function (callback) {
                r === '-' ? (t === 0 && (m = t + 1, p = l) || t < l && (m = t + 1, p = t - 1) || t === l && (m = 0, p = t - 1) || t > l && (_this.initPage = 0, t = 0, m = t + 1, p = l)) : (t < 0 && (_this.initPage = l, t = l, p = 0, m = t - 1) || (t === 0 && (m = l, p = t + 1) || (t > 0 && (m = t - 1, p = t + 1))));
                typeof callback === 'function' && (callback.call(this));
            },
            pre = (r === '-' ? (r + _this.winWidth) : (_this.winWidth)),
            clearp = null,
            z = (/\-/.test(r) ? '' : '-');
        if (type === 'end') {
            returnItme(function () {
                _this._css(_this.opts.content[t], {
                    zIndex: 11,
                    transition: 'transform .2s linear',
                    transform: 'translate3d(0,0,0)'
                });
                _this._css(_this.opts.content[p], {
                    zIndex: 9,
                    transition: 'transform .2s linear',
                    transform: 'translate3d(' + pre + 'px,0,0)'
                });
                _this._css(_this.opts.content[m], {
                    zIndex: 7,
                    transition: 'none',
                    transform: 'translate3d(' + z + _this.winWidth + 'px,0,0)'
                });
                clearp = setTimeout(function () {
                    _this._setItem(t);
                    _this._setDome(t);
                    clearTimeout(clearp);
                }, 200);
            });
        }
        if (type === 'move') {
            returnItme(function () {
                var getMovex = _this.winWidth - Math.abs(x - _this.pages.x),
                    s = x - _this.pages.x;
                _this._css(_this.opts.content[t], {
                    zIndex: 11,
                    transition: 'none',
                    transform: 'translate3d(' + s + 'px,0,0)'
                });
                _this._css(_this.opts.content[m], {
                    zIndex: 7,
                    transition: 'none',
                    transform: 'translate3d(' + z + getMovex + 'px,0,0)'
                });
            });
        }
    },
    _autoPlay: function () {
        var _this = this;
        _this.opts.isAuto && (clearInterval(_this.clearSlide), _this.clearSlide = setInterval(function () {
            _this.initPage++, _this._translate('play', 'end');
        }, (_this.opts.speed || 5000)));
    }
}
/* new aspenJZFQSlide */