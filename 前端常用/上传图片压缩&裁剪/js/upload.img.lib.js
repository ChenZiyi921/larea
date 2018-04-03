;
var iTimer = null,
    sizeTimer = null;

function doMove(obj, json, fx, d, fn) {
    clearInterval(iTimer);
    var iStartTime = +new Date();
    var c = {};
    var d = d || 1000;
    var fx = fx || 'easeOut';
    var size = false;
    c.TRx = json.TRx2 - json.TRx1;
    c.TRy = json.TRy2 - json.TRy1;
    if (json.r1 && json.r2) {
        size = true;
        c.r = json.r2 - json.r1;
    }
    iTimer = setInterval(function () {
        var t = +new Date() - iStartTime;
        if (t >= d) {
            clearInterval(iTimer);
            fn && fn();
            t = d;
        }
        var vx = Tween[fx](t, json.TRx1, c.TRx, d);
        var vy = Tween[fx](t, json.TRy1, c.TRy, d);
        if (size) {
            var vr = Tween[fx](t, json.r1, c.r, d);
            obj.imageSize.w = obj.img.width * vr;
            obj.imageSize.h = obj.img.height * vr;
        }
        obj.drawImg(vx, vy);
    }, 15);
}
var Tween = {
    linear: function (t, b, c, d) {
        return c * t / d + b;
    },
    easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeBoth: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInStrong: function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutStrong: function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeBothStrong: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        }
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    elasticIn: function (t, b, c, d, a, p) {
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    elasticOut: function (t, b, c, d, a, p) {
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    elasticBoth: function (t, b, c, d, a, p) {
        if (t === 0) {
            return b;
        }
        if ((t /= d / 2) == 2) {
            return b + c;
        }
        if (!p) {
            p = d * (0.3 * 1.5);
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) +
                b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c +
            b;
    },
    backIn: function (t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    backOut: function (t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 3.70158;
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    backBoth: function (t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    bounceIn: function (t, b, c, d) {
        return c - Tween['bounceOut'](d - t, 0, c, d) + b;
    },
    bounceOut: function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        }
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    },
    bounceBoth: function (t, b, c, d) {
        if (t < d / 2) {
            return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
}
var ImgClip = function (opt) {
    this.canvas = null;
    this.fileObj = null;
    this.cutBtn = null;
    this.resultObj = null;
    this.winSize = {
        w: 300,
        h: 300
    };
    this.ctx = null;
    this.img = null;
    this.dataURL;
    this.dis = {
        x: 0,
        y: 0
    };
    this.pre = {
        x: 0,
        y: 0
    };
    this.prex = this.prey = 0;
    this.flagX = true;
    this.r = 1;
    this.rMax = 1;
    this.rMin = 1 / 4;
    this.rr = 1;
    this.rDis = 0;
    this.imageSize = {
        w: 0,
        h: 0
    };
    this.cutSize = {
        w: 0,
        h: 0,
        t: 0,
        l: 0
    };
    this.cutFast = false;
    this.tstate = 'end';
    this.cutScale = 1;
    this.cutW = 0;
    this.paddB = 100;
    this.rot = 0;
    this.isRotate = false;
    opt && this.init(opt);
};
ImgClip.prototype = {
    init: function (opt) {
        if (!opt) {
            return false;
        }
        var This = this;
        this.canvas = this.getObj(opt.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.successShow = this.getObj(opt.successShow);
        this.fileObj = this.getObj(opt.fileObj);
        this.aspenWrap = this.getObj(opt.aspenWrap);
        this.cutBtn = this.getObj(opt.cutBtn);
        this.resultObj = this.getObj(opt.resultObj);
        this.cutScale = parseFloat(opt.cutScale);
        this.winSize = {
            w: view().w,
            h: view().h - this.paddB
        };
        opt.cutW == 'winW' ? (this.cutW = this.winSize.w) : (this.cutW = Number(opt.cutW));
        var hh = parseInt(this.cutW * this.cutScale);
        this.cutSize = {
            w: this.cutW,
            h: hh,
            t: (this.winSize.h - hh) / 2,
            l: (this.winSize.w - this.cutW) / 2
        };
        this.setCanvas(this.canvas);
        this.clearCanvas(this.canvas);
        this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        (opt.rotateR) && (this.rotateR = this.getObj(opt.rotateR));
        addEvent(this.fileObj, 'change', function (e) {
            if (!e.target.files[0]) return;
            This.r = 1;
            This.rot = 0;
            This.isRotate = false;
            This.run(e, This);
        });
        addEvent(this.cutBtn, 'click', function (e) {
            This.getResults(e);
        });
        (opt.rotateR) && addEvent(this.getObj(opt.rotateR), 'click', function () {
            if (This.img === null) return;
            if (This.rot == 3) {
                This.rot = 0;
            } else {
                This.rot++;
            }
            var r1 = This.r;
            var tempW = 1,
                tempH = 1;
            if (This.rot == 1 || This.rot == 3) {
                var drawW = This.imageSize.h;
                var drawH = This.imageSize.w;
                tempH = This.cutSize.h / This.img.width;
                tempW = This.cutSize.w / This.img.height;
            } else {
                var drawW = This.imageSize.w;
                var drawH = This.imageSize.h;
                tempH = This.cutSize.h / This.img.height;
                tempW = This.cutSize.w / This.img.width;
            }
            This.clearCanvas(This.canvas);
            This.ctx.fillStyle = '#000';
            This.ctx.fillRect(0, 0, This.canvas.width, This.canvas.height);
            This.isRotate = true;
            This.ctx.save();
            This.ctx.translate(This.prex + drawH / 2, This.prey + drawW / 2);
            This.ctx.rotate(This.rot * 90 * Math.PI / 180);
            This.ctx.drawImage(This.img, -This.imageSize.w / 2, -This.imageSize.h / 2, This.imageSize.w, This.imageSize.h);
            This.ctx.restore();
            This.drawUI(This.ctx, This.cutSize);
            This.prex = This.pre.x = This.prex - (drawW / 2 - drawH / 2);
            This.prey = This.pre.y = This.prey - (drawH / 2 - drawW / 2);
            if (tempW > r1 || tempH > r1) {
                This.rMin = This.r = tempW > tempH ? tempW : tempH;
            } else {
                This.rMin = tempW > tempH ? tempW : tempH;
            }
            This.rMax = Math.max(This.rMin * 2, 1);
            document.getElementById('log2').innerHTML = 'min=' + This.rMin + '--///--max=' +
                This.rMax;
            if (This.r != r1) {
                doMove(This, {
                    TRx1: This.prex,
                    TRy1: This.prey,
                    r1: r1,
                    TRx2: This.prex,
                    TRy2: This.prey,
                    r2: This.r
                }, 'easeBoth', 300, function () {
                    This.toMove(This);
                });
            } else {
                This.toMove(This);
            }
            return false;
        });
    },
    run: function (e, obj) {
        var self = this;
        e = e || window.event;
        var files = e.target.files;
        var f = files[0];
        obj.pre.x = obj.pre.y = obj.prex = obj.prey = 0;
        obj.img = null;
        resolveObjectURL(obj.dataURL);
        obj.dataURL = createObjectURL(f);
        obj.drawImg(0, 0, function () {
            obj.tstate = 'ok';
            addEvent(obj.canvas, 'touchstart', function (e) {
                obj.fntouchstart(e);
                addEvent(document, 'touchmove', function (e) {
                    obj.fntouchmove(e);
                });
                addEvent(document, 'touchend', function (e) {
                    obj.fntouchend(e);
                });
            });
            addEvent(obj.canvas, 'mousedown', function (e) {
                obj.fntouchstart(e);
                addEvent(document, 'mousemove', function (e) {
                    obj.fntouchmove(e);
                });
                addEvent(document, 'mouseup', function (e) {
                    obj.fntouchend(e);
                });
            });
            self.ctx.rotate(self.rot * 90 * Math.PI / 180);
        });
    },
    drawImg: function (offsetX, offsetY, fn) {
        this.clearCanvas(this.canvas);
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.img === null) {
            this.img = new Image();
            var This = this;
            this.img.onload = function () {
                This.clearCanvas(This.canvas);
                This.ctx.fillStyle = '#000';
                This.ctx.fillRect(0, 0, This.canvas.width, This.canvas.height);
                This.imageSize = {
                    w: this.width,
                    h: this.height
                };
                var tempW = 1,
                    tempH = 1;
                tempH = This.cutSize.h / this.height;
                tempW = This.cutSize.w / this.width;
                if (this.height < This.cutSize.h || this.width < This.cutSize.w) {
                    This.rMin = This.r = tempW > tempH ? tempW : tempH;
                } else if (this.height > This.canvas.height && this.width > This.canvas.width) {
                    This.rMin = tempW > tempH ? tempW : tempH;
                    tempH = This.canvas.height / this.height;
                    tempW = This.canvas.width / this.width;
                    This.r = tempW > tempH ? tempW : tempH;
                }
                This.rMax = Math.max(This.rMin * 2, 1);
                document.getElementById('log2').innerHTML = 'min=' + This.rMin + '--///--max=' +
                    This.rMax;
                This.imageSize.w = this.width * This.r;
                This.imageSize.h = this.height * This.r;
                offsetX = This.prex = This.pre.x = This.winSize.w / 2 - This.imageSize.w / 2;
                offsetY = This.prey = This.pre.y = This.winSize.h / 2 - This.imageSize.h / 2;
                This.ctx.save();
                This.ctx.translate(This.canvas.width / 2, This.canvas.height / 2);
                This.ctx.drawImage(this, -This.imageSize.w / 2, -This.imageSize.h / 2, This.imageSize.w, This.imageSize.h);
                This.ctx.restore();
                This.prex = This.pre.x = This.canvas.width / 2 - This.imageSize.w / 2;
                This.prey = This.pre.y = This.canvas.height / 2 - This.imageSize.h / 2;
                This.drawUI(This.ctx, This.cutSize);
            };
            this.img.src = this.dataURL;
        } else {
            this.ctx.save();
            if (this.isRotate) {
                if (this.rot == 1 || this.rot == 3) {
                    this.ctx.translate(offsetX + this.imageSize.h / 2, offsetY + this.imageSize.w / 2);
                } else {
                    this.ctx.translate(offsetX + this.imageSize.w / 2, offsetY + this.imageSize.h / 2);
                }
                this.ctx.rotate(this.rot * 90 * Math.PI / 180);
                this.ctx.drawImage(this.img, -this.imageSize.w / 2, -this.imageSize.h / 2, this.imageSize.w, this.imageSize.h);
            } else {
                this.ctx.translate(offsetX + this.imageSize.w / 2, offsetY + this.imageSize.h / 2);
                this.ctx.drawImage(this.img, -this.imageSize.w / 2, -this.imageSize.h / 2, this.imageSize.w, this.imageSize.h);
            }
            this.ctx.restore();
            this.drawUI(this.ctx, this.cutSize);
        }
        fn && fn();
    },
    fntouchstart: function (e) {
        var e = e || window.event;
        e.preventDefault();
        this.rDis = 0;
        if (e.type == 'touchstart' && e.touches.length == 2) {
            var dx = e.touches[0].clientX - e.touches[1].clientX;
            var dy = e.touches[0].clientY - e.touches[1].clientY;
            this.rDis = Math.sqrt(dx * dx + dy * dy);
            document.getElementById('log').innerHTML = 'd1=' + this.rDis;
        }
        if (this.tstate != 'ok') {
            return;
        }
        this.tstate = 'start';
        this.rr = this.r;
        this.dis.x = (e.type == 'mousedown' ? e.clientX : e.touches[0].clientX) - (this.pre.x);
        this.dis.y = (e.type == 'mousedown' ? e.clientY : e.touches[0].clientY) - (this.pre.y);
        return false;
    },
    fntouchmove: function (e) {
        var e = e || window.event;
        var This = this;
        if (this.tstate != 'start') {
            return;
        }
        var x = (e.type == 'mousemove' ? e.clientX : e.touches[0].clientX) - this.dis.x;
        var y = (e.type == 'mousemove' ? e.clientY : e.touches[0].clientY) - this.dis.y;
        if (e.type == 'touchmove' && e.touches.length == 2) {
            var dx = e.touches[0].clientX - e.touches[1].clientX;
            var dy = e.touches[0].clientY - e.touches[1].clientY;
            var d2 = Math.sqrt(dx * dx + dy * dy);
            var r1 = This.rr;
            var r2 = r1 * (d2 / This.rDis);
            if (r2 < This.rMin / 2) {
                r2 = This.rMin / 2;
            }
            if (r2 > This.rMax * 1.5) {
                r2 = This.rMax * 1.5;
            }
            document.getElementById('log').innerHTML = 'r1=' + This.r + '--///--r2=' + r2;
            This.imageSize.w = This.img.width * r2;
            This.imageSize.h = This.img.height * r2;
            x -= (This.imageSize.w / 2) - (This.img.width * r1) / 2;
            y -= (This.imageSize.h / 2) - (This.img.height * r1) / 2;
            This.r = r2;
        }
        this.drawImg(x, y, function () {
            This.prex = x;
            This.prey = y;
        });
    },
    fntouchend: function (e) {
        if (this.tstate == 'ok') return;
        this.tstate = 'ok';
        document.onmousemove = null;
        document.ontouchmove = null;
        this.pre.x = this.prex;
        this.pre.y = this.prey;
        var r1 = this.r;
        var This = this;
        if (this.r < this.rMin) {
            this.r = this.rMin;
            doMove(this, {
                TRx1: this.prex,
                TRy1: this.prey,
                r1: r1,
                TRx2: this.prex,
                TRy2: this.prey,
                r2: this.r
            }, 'easeBoth', 300, function () {
                This.toMove(This);
                document.getElementById('log').innerHTML = 'r1=' + This.r;
            });
        } else if (this.r > this.rMax) {
            this.r = this.rMax;
            var x1 = this.prex;
            var y1 = this.prey;
            this.pre.x = this.prex -= -(This.img.width * r1 / 2) + (This.img.width * this.r) / 2;
            this.pre.y = this.prey -= -(This.img.height * r1 / 2) + (This.img.height * this.r) / 2;
            doMove(this, {
                TRx1: x1,
                TRy1: y1,
                r1: r1,
                TRx2: this.prex,
                TRy2: this.prey,
                r2: this.r
            }, 'easeBoth', 300, function () {
                This.toMove(This);
                document.getElementById('log').innerHTML = 'r1=' + This.r;
            });
        } else {
            document.getElementById('log').innerHTML = 'r1=' + This.r;
            this.toMove(this);
        }
    },
    toMove: function (obj, r1, r2, fn) {
        if (obj.rot == 1 || obj.rot == 3) {
            var drawW = obj.imageSize.h;
            var drawH = obj.imageSize.w;
        } else {
            var drawW = obj.imageSize.w;
            var drawH = obj.imageSize.h;
        }
        var range = {
            left: obj.cutSize.l,
            right: obj.cutSize.l + obj.cutSize.w,
            top: obj.cutSize.t,
            bottom: obj.cutSize.t + obj.cutSize.h
        };
        var x1 = obj.prex;
        var y1 = obj.prey;
        if (obj.prex + drawW < range.right) {
            obj.prex = obj.pre.x = range.right - drawW;
        }
        if (obj.prex > range.left) {
            obj.prex = obj.pre.x = range.left;
        }
        if (obj.prey + drawH < range.bottom) {
            obj.prey = obj.pre.y = range.bottom - drawH;
        }
        if (obj.prey > range.top) {
            obj.prey = obj.pre.y = range.top;
        }
        doMove(obj, {
            TRx1: x1,
            TRy1: y1,
            TRx2: obj.prex,
            TRy2: obj.prey
        }, 'easeOut', 500, function () {
            fn && fn();
        });
    },
    getResults: function () {
        if (!this.dataURL) return;
        if (!document.getElementById('vData')) {
            var canvas2 = document.createElement('canvas');
            canvas2.style.display = 'none';
            canvas2.id = 'vData';
            this.resultObj.parentNode.appendChild(canvas2);
        } else {
            var canvas2 = document.getElementById('vData');
        }
        var ctx2 = canvas2.getContext('2d');
        canvas2.width = this.cutSize.w;
        canvas2.height = this.cutSize.h;
        ctx2.drawImage(this.canvas, this.cutSize.l + 0.5, this.cutSize.t + 0.5, this.cutSize.w - 1, this.cutSize.h - 1, 0, 0, canvas2.width, canvas2.height);
        this.resultObj.src = canvas2.toDataURL();
        this.successShow.src = canvas2.toDataURL();
        this.aspenWrap.style.display = 'none';
    },
    getObj: function (name) {
        return 'string' == (typeof name) ? document.getElementById(name) : name;
    },
    clearCanvas: function (can) {
        var con = can.getContext('2d');
        con.clearRect(0, 0, can.width, can.height);
    },
    setCanvas: function (can) {
        can.width = this.winSize.w;
        can.height = this.winSize.h;
    },
    drawUI: function (cxt, cut) {
        cxt.beginPath();
        cxt.rect(0, 0, cxt.canvas.width, cxt.canvas.height);
        pathRect(cxt, cut.l, cut.t, cut.w, cut.h);
        cxt.closePath();
        cxt.fillStyle = "rgba(0,0,0,0.3)";
        cxt.fill();
        cxt.lineWidth = 2;
        cxt.strokeStyle = '#57b7eb';
        cxt.strokeRect(cut.l - 1.5, cut.t - 1.5, cut.w + 3, cut.h + 3);
    }
};

function pathRect(cxt, x, y, width, height) {
    cxt.moveTo(x, y);
    cxt.lineTo(x, y + height);
    cxt.lineTo(x + width, y + height);
    cxt.lineTo(x + width, y);
    cxt.lineTo(x, y);
}

function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    }
}

function extend(obj1, obj2) {
    for (var attr in obj2) {
        obj1[attr] = obj2[attr];
    }
}

function addEvent(obj, eventType, func) {
    if (obj.attachEvent) {
        obj.attachEvent("on" + eventType, func);
    } else {
        obj.addEventListener(eventType, func, false);
    }
}

function removeEvent(obj, eventType, func) {
    if (obj.detachEvent) {
        obj.detachEvent("on" + eventType, func);
    } else {
        obj.removeEventListener(eventType, func, false);
    }
}
var createObjectURL = function (blob) {
    return window[window.URL ? 'URL' : 'webkitURL']['createObjectURL'](blob);
};
var resolveObjectURL = function (blob) {
    window[window.URL ? 'URL' : 'webkitURL']['revokeObjectURL'](blob);
};