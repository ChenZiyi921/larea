var marqueeData = [
    ['用户', '158****2023', '抓到', '腕表五折券'],
    ['用户', '153****5252', '抓到', '运动五折券'],
    ['用户', '183****3707', '抓到', '9期免息券'],
    ['用户', '159****9959', '抓到', '饰品五折券'],
    ['用户', '134****9330', '抓到', '服装五折券'],
    ['用户', '137****2112', '抓到', '手机数码五折券'],
    ['用户', '173****7687', '抓到', '全品类五折券'],
    ['用户', '136****4529', '抓到', '6期免息券'],
    ['用户', '137****6243', '抓到', '彩妆五折券'],
    ['用户', '156****0464', '抓到', '12期免息券']
];
class slideList {
    constructor(opts) {
        this.init(opts)
        this.data(opts)
    }
    init(opts) {
        let clearI = setInterval(() => {
            opts.list.style.marginTop = --opts.startPos + 'px';
            Math.abs(opts.startPos) >= opts.list.offsetHeight - opts.container.offsetHeight && (opts.list.style.marginTop = opts.startPos = 0);
            this.slide(opts, clearI);
        }, opts.speed);
    }
    slide(opts, clearI) {
        if (opts.startPos % opts.list.querySelector('p').offsetHeight == 0) {
            clearInterval(clearI);
            setTimeout(() => this.init(opts), opts.delay)
        }
    }
    data(opts) {
        new Promise((resolve, reject) => {
            opts.list.innerHTML = '';
            for (let i = 0; i < 20; i++) {
                opts.list.innerHTML += '<p><i>' + marqueeData[i][0] + '</i><em>' + marqueeData[i][1] + '</em><i>' + marqueeData[i][2] + '</i><em>' + marqueeData[i][3] + '</em></p>';
            }
            return resolve()
        }).then(() => {
            setTimeout(() => this.data(opts), opts.update)
        }).catch(err => console.log(err));
    }
}
new slideList({
    container: document.querySelector('#activityMarqueeWraps'),
    list: document.querySelector('#activityMarqueeMain'),
    startPos: 0,
    delay: 2000,
    speed: 25,
    update: 12e4
})
var publicHost = location.protocol + '//' + location.hostname,
    getGrab = document.querySelector('.grab'),
    beginBtn = document.getElementById('beginBtn'),
    grabBtn = document.getElementById('grabBtn'),
    getPrize = document.querySelectorAll('.doll-main span'),
    getTimer = document.querySelector('.watch'),
    getNum = document.querySelector('.time'),
    btnAnimata = function () { beginBtn.classList.remove('btnAnimation') },
    btnAnimatb = function () { grabBtn.classList.remove('btnAnimation') };
var grabDoll = {
    init: function () {
        this.main();
    },
    limit: function (arr, num) {
        var newArr = [];
        arr.map(function (x) {
            newArr.push(Math.abs(x - num));
        });
        return newArr.indexOf(Math.min.apply(null, newArr))
    },
    timer: function () {
        var i = 10;
        var a = setInterval(function () {
            if (i == 0) {
                return;
            } else {
                if (/stop/.test(getTimer.className)) {
                    getNum.innerHTML = 10;
                    clearInterval(a);
                    return;
                } else {
                    i--;
                    i < 10 ? (getNum.innerHTML = '0' + i) : (getNum.innerHTML = i);
                }
            }
        }, 1000);
    },
    luckDrawNum: function (t) {
        var _this = this;
        switch (t) {
            case 2:
                grabBtn.classList.add('success');
                /success/.test(grabBtn.className) && _this.grab();
                setTimeout(function () {
                    grabBtn.classList.remove('success');
                }, 10);
                break;
            case 3:
                getNum.innerHTML == 10 && _this.timer();
                _this.begin();
                break;
        }
    },
    begin: function () {
        if (!/focus/.test(grabBtn.className)) {
            getTimer.classList.remove('stop');
            beginBtn.classList.add('active', 'btnAnimation');
            setTimeout(btnAnimata, 1000);
            getGrab.classList.add('grabSlide');
            getGrab.classList.remove('grabDown', 'grabUp');
            for (var i = 0; i < getPrize.length; i++) {
                getPrize[i].classList.remove('prizeUp');
            }
        }
    },
    grab: function () {
        var _this = this;
        if (/active/.test(beginBtn.className)) {
            getTimer.classList.add('stop');
            grabBtn.classList.add('focus', 'btnAnimation');
            setTimeout(btnAnimatb, 1000);
            beginBtn.classList.remove('active');
            getGrab.style.left = getGrab.offsetLeft + 'px';
            getGrab.classList.remove('grabSlide');
            getGrab.classList.add('grabDown');
            var arr = [];
            for (var i = 0; i < getPrize.length; i++) {
                arr.push(getPrize[i].offsetLeft);
                var clearT = setTimeout(function () {
                    getGrab.style.left = getPrize[getIndex].offsetLeft - 20 + 'px';
                    getGrab.classList.remove('grabDown');
                    getGrab.classList.add('grabUp');
                    getPrize[getIndex].classList.add('prizeUp');
                    clearTimeout(clearT);
                }, 2500);
            }
            var getIndex = grabDoll.limit(arr, getGrab.offsetLeft);
            var clearFocus = setTimeout(function () {
                grabBtn.classList.remove('focus');
                clearTimeout(clearFocus);
                grabBtn.classList.remove('runs');
            }, 5e3);
        } else {
            _this.tips('请先点击开始按钮')
        }
    },
    tips: function (e) {
        if (!document.getElementById("systemTips") && e && "" != e) {
            var t = null,
                n = document.createElement("div");
            n.id = "systemTips", n.innerHTML = e.toString() || "", document.querySelectorAll("body")[0].appendChild(n);
            var a = document.getElementById("systemTips");
            if (!a) return;
            t = setTimeout(function () {
                a.parentNode && (a.parentNode.removeChild(a), clearTimeout(t))
            }, 2e3)
        }
    },
    main: function () {
        var _this = this;
        var getNum = document.querySelectorAll('.time')[0];
        beginBtn.addEventListener('click', function () {
            grabBtn.classList.remove('runs');
            _this.luckDrawNum(3);
        });
        grabBtn.addEventListener('click', function () {
            if (!/runs/.test(this.className)) {
                this.classList.add('runs');
                /active/.test(beginBtn.className) ? _this.luckDrawNum(2) : _this.tips('请先点击开始按钮');
            }
        });
        setInterval(function () {
            getNum.innerHTML == '00' && (!/stop/.test(getTimer.className)) &&_this.luckDrawNum(2);
            getNum.innerHTML == '00' && (getNum.innerHTML = '10')
        }, 1000);
    }
};
grabDoll.init();