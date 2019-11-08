
let publicHost = location.protocol + '//' + location.hostname,
    getGrab = document.querySelector('.grab'),
    beginBtn = document.getElementById('beginBtn'),
    grabBtn = document.getElementById('grabBtn'),
    getPrize = document.querySelectorAll('.doll-main span'),
    getTimer = document.querySelector('.watch'),
    getNum = document.querySelector('.time'),
    btnAnimata = () => { beginBtn.classList.remove('btnAnimation') },
    btnAnimatb = () => { grabBtn.classList.remove('btnAnimation') };
class grabDoll {
    constructor() {
        this.main()
    }
    limit(arr, num) {
        let newArr = [];
        arr.map(x => {
            newArr.push(Math.abs(x - num));
        });
        return newArr.indexOf(Math.min.apply(null, newArr))
    }
    timer() {
        let i = 10;
        let a = setInterval(() => {
            if (i == 0) return;
            if (/stop/.test(getTimer.className)) {
                getNum.innerHTML = 10;
                clearInterval(a);
                return;
            } else {
                i--;
                i < 10 ? (getNum.innerHTML = '0' + i) : (getNum.innerHTML = i);
            }
        }, 1000);
    }
    luckDrawNum(t) {
        switch (t) {
            case 2:
                grabBtn.classList.add('success');
                /success/.test(grabBtn.className) && this.grab();
                setTimeout(() => grabBtn.classList.remove('success'), 10)
                break;
            case 3:
                getNum.innerHTML == 10 && this.timer();
                this.begin();
                break;
        }
    }
    begin() {
        if (!/focus/.test(grabBtn.className)) {
            getTimer.classList.remove('stop');
            beginBtn.classList.add('active', 'btnAnimation');
            setTimeout(btnAnimata, 1000);
            getGrab.classList.add('grabSlide');
            getGrab.classList.remove('grabDown', 'grabUp');
            for (let i = 0; i < getPrize.length; i++) {
                getPrize[i].classList.remove('prizeUp');
            }
        }
    }
    grab() {
        let _this = this;
        if (/active/.test(beginBtn.className)) {
            getTimer.classList.add('stop');
            grabBtn.classList.add('focus', 'btnAnimation');
            setTimeout(btnAnimatb, 1000);
            beginBtn.classList.remove('active');
            getGrab.style.left = getGrab.offsetLeft + 'px';
            getGrab.classList.remove('grabSlide');
            getGrab.classList.add('grabDown');
            let arr = [];
            for (let i = 0; i < getPrize.length; i++) {
                arr.push(getPrize[i].offsetLeft);
                let clearT = setTimeout(function () {
                    getGrab.style.left = getPrize[getIndex].offsetLeft - 20 + 'px';
                    getGrab.classList.remove('grabDown');
                    getGrab.classList.add('grabUp');
                    getPrize[getIndex].classList.add('prizeUp');
                    clearTimeout(clearT);
                }, 2500);
            }
            let getIndex = this.limit(arr, getGrab.offsetLeft);
            let clearFocus = setTimeout(() => {
                grabBtn.classList.remove('focus');
                clearTimeout(clearFocus);
                grabBtn.classList.remove('runs');
            }, 5e3);
        } else {
            _this.tips('请先点击开始按钮')
        }
    }
    tips(e) {
        if (!document.getElementById("systemTips") && e && "" != e) {
            let t = null,
                n = document.createElement("div");
            n.id = "systemTips", n.innerHTML = e.toString() || "", document.querySelectorAll("body")[0].appendChild(n);
            let a = document.getElementById("systemTips");
            if (!a) return;
            t = setTimeout(() => {
                a.parentNode && (a.parentNode.removeChild(a), clearTimeout(t))
            }, 2e3)
        }
    }
    main() {
        let _this = this;
        let getNum = document.querySelectorAll('.time')[0];
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
        setInterval(() => {
            getNum.innerHTML == '00' && (!/stop/.test(getTimer.className)) && _this.luckDrawNum(2);
            getNum.innerHTML == '00' && (getNum.innerHTML = '10')
        }, 1000);
    }
}
new grabDoll