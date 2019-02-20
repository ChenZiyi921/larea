class AspenSlide {
    constructor(opts) {
        !/Object/.test(Object.prototype.toString.call(opts)) ? (() => {
            throw new Error('is not Object');
        })() : (() => {
            this.opts = opts;
            this.contentLength = this.opts.content.length || 0;
            if (this.opts.wrap.nodeType === 1 && this.contentLength > 1) {
                this.pages = {
                    x: 0,
                    y: 0,
                }
                this.winWidth = window.innerWidth;
                this.initPage = 0;
                this.clearSlide = null;
                this._setDome(this.initPage);
                this.bindEvent();
                this._autoPlay();
            }
        })(opts);
    }
    _css(ele, opts) {
        if (ele && /Object/.test(Object.prototype.toString.call(opts))) {
            for (var key in opts) {
                opts[key] && (ele.style[key] = opts[key]);
            }
            return ele;
        } else {
            throw new Error('is not Object');
        }
    }
    bindEvent() {
        this.opts.wrap.addEventListener('touchstart', (e) => {
            e.preventDefault();
            clearInterval(this.clearSlide);
            this._start(e)
        });
        this.opts.wrap.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this._move(e)
        });
        this.opts.wrap.addEventListener('touchend', (e) => {
            e.preventDefault();
            this._end(e);
        });
    }
    _setDome(item) {
        for (let i = 0, iLen = this.contentLength; i < iLen; i++) {
            this._css(this.opts.content[i], {
                transform: 'translate3d(0,0,0)',
                zIndex: 1
            });
        }
        this._css(this.opts.content[item], {
            zIndex: 7
        });
        if (this.opts.isAuto) {
            let setItem = item + 1;
            item === (this.contentLength - 1) && (setItem = 0);
            this._css(this.opts.content[setItem], {
                transform: 'translate3d(' + this.winWidth + 'px,0,0)'
            });
        }
    }
    _start(e) {
        this.pages = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY,
        }
    }
    _move(e) {
        let [x, y] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        this.opts.wrap.removeEventListener('touchend', this._end);
        this._translate(x, 'move');
    }
    _end(e) {
        let [x, y] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        this.opts.wrap.removeEventListener('touchmove', this._move);
        x - this.pages.x > 0 ? (Math.abs(x - this.pages.x) > this.opts.lateX && this.initPage--) : (Math.abs(x - this.pages.x) > this.opts.lateX && this.initPage++);
        this._translate(x, 'end');
        this._autoPlay();
    }
    _setItem(item) {
        if (this.opts.itemEle.length > 0) {
            for (let i = 0, iLen = this.opts.itemEle.length; i < iLen; i++) {
                this.opts.itemEle[i].classList.remove('actives');
            }
            this.opts.itemEle[item || this.initPage].classList.add('actives');
        }
    }
    _translate(x, type) {
        let [m, t, r, l, p] = [null, this.initPage, (x === 'play' ? '-' : (x - this.pages.x > 0 ? '' : '-')), this.contentLength - 1, null];
        let returnSlideItme = (callback) => {
            r === '-' ? (t === 0 && (m = t + 1, p = l) || t < l && (m = t + 1, p = t - 1) || t === l && (m = 0, p = t - 1) || t > l && (this.initPage = 0, t = 0, m = t + 1, p = l)) : (t < 0 && (this.initPage = l, t = l, p = 0, m = t - 1) || (t === 0 && (m = l, p = t + 1) || (t > 0 && (m = t - 1, p = t + 1))));
            typeof callback === 'function' && (callback.call(this));
        }
        let [pre, clearp, z] = [r === '-' ? (r + this.winWidth) : (this.winWidth), null, (/\-/.test(r) ? '' : '-')];
        if (type === 'end') {
            returnSlideItme(function () {
                this._css(this.opts.content[p], {
                    zIndex: 9,
                    transition: 'transform .2s linear',
                    transform: 'translate3d(' + pre + 'px,0,0)'
                });
                this._css(this.opts.content[t], {
                    zIndex: 11,
                    transition: 'transform .2s linear',
                    transform: 'translate3d(0,0,0)'
                });
                this._css(this.opts.content[m], {
                    zIndex: 7,
                    transition: 'none',
                    transform: 'translate3d(' + z + this.winWidth + 'px,0,0)'
                });
                clearp = setTimeout(() => {
                    this._setItem(t);
                    this._setDome(t);
                    clearTimeout(clearp);
                }, 200);
            });
        }
        if (type === 'move') {
            returnSlideItme(function () {
                let [getMovex, s] = [this.winWidth - Math.abs(x - this.pages.x), x - this.pages.x];
                this._css(this.opts.content[t], {
                    zIndex: 11,
                    transition: 'none',
                    transform: 'translate3d(' + s + 'px,0,0)'
                });
                this._css(this.opts.content[m], {
                    zIndex: 7,
                    transition: 'none',
                    transform: 'translate3d(' + z + getMovex + 'px,0,0)'
                });
            });
        }
    }
    _autoPlay() {
        this.opts.isAuto && (clearInterval(this.clearSlide), this.clearSlide = setInterval(() => {
            this.initPage++ , this._translate('play', 'end');
        }, (this.opts.speed || 5000)));
    }
}