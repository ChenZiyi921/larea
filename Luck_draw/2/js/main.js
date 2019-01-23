var jzfqAct = {}
jzfqAct.lotteryRun = {
	init: function () {
		this.binEvent();
	},
	rollRun: function (opts, callback) {
		var lottTimeOut,
			getLottLi = document.querySelectorAll(opts['li']),
			setCount = getLottLi.length,
			x = -1;
		for (var i = 0; i < getLottLi.length; i++) {
			document.querySelectorAll(opts['li'] + "-" + i)[0].className.indexOf('active') != -1 && (x = i)
		}
		function rollDown() {
			opts['times'] += 1;
			if (x > -1) {
				document.querySelectorAll(".lottery-unit-" + x)[0].classList.remove("active");
			}
			x += 1;
			x > setCount - 1 && (x = 0);
			document.querySelectorAll(".lottery-unit-" + x)[0].classList.add("active");
			if (opts['times'] > opts['cycle'] + 10 && opts['prize'] == x) {
				lottTimeOut = null;
				clearTimeout(lottTimeOut);
				opts['prize'] = -1;
				opts['times'] = 0;
				callback();
			} else {
				if (opts['times'] < opts['cycle']) {
					opts['speed'] -= 10;
				} else if (opts['times'] == opts['cycle']) {
					opts['prize'] = opts['stop'];
				} else {
					if (opts['times'] > opts['cycle'] + 10 && ((opts['prize'] == 0 && x == 7) || opts['prize'] == x + 1)) {
						opts['speed'] += 110;
					} else {
						opts['speed'] += 20;
					}
				}
				opts['speed'] < 40 && (opts['speed'] = 40);
				lottTimeOut = setTimeout(rollDown, opts['speed']);
			}
		}
		lottTimeOut = setTimeout(rollDown, opts['speed']);
	},
	binEvent: function () {
		var clickBtn = document.querySelector('#lotteryBtn');
		var posVal = '';
		var _this = this;
		clickBtn.addEventListener('click', function () {
			_this.rollRun({
				li: '.lottery-unit',
				speed: 100,
				times: 0,
				cycle: 20,
				prize: -1,
				stop: posVal
			}, function () {

			});
		})
	}
};
jzfqAct.lotteryRun.init();