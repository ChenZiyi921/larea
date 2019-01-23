var jzfqAct = {}
jzfqAct.lotteryRun = {
	init: function () {
		var _this = this;
		_this.binEvent({
			li: 'lottery-unit',
			btn: '#lotteryBtn'
		});
	},
	rollRun: function (opts, callback) {
		var lottTimeOut;
		var getLottLi = document.querySelectorAll('.' + opts['li']);
		var setCount = getLottLi.length;
		var x = -1;
		for (var i = 0; i < getLottLi.length; i++) {
			if (document.querySelectorAll('.' + opts['li'] + "-" + i)[0].className.indexOf('active') != -1) {
				x = i;
			}
		}
		function rollDown() {
			opts['times'] += 1;
			if (x > -1) {
				document.querySelectorAll(".lottery-unit-" + x)[0].classList.remove("active");
			}
			x += 1;
			if (x > setCount - 1) {
				x = 0;
			};
			document.querySelectorAll(".lottery-unit-" + x)[0].classList.add("active");
			if (opts['times'] > opts['cycle'] + 10 && opts['prize'] == x) {
				clearTimeout(lottTimeOut);
				opts['prize'] = -1;
				opts['times'] = 0;
				callback();
			} else {
				if (opts['times'] < opts['cycle']) {
					opts['speed'] -= 10;
				} else if (opts['times'] == opts['cycle']) {
					var index = opts['stop'];
					opts['prize'] = index;
				} else {
					if (opts['times'] > opts['cycle'] + 10 && ((opts['prize'] == 0 && x == 7) || opts['prize'] == x + 1)) {
						opts['speed'] += 110;
					} else {
						opts['speed'] += 20;
					}
				}
				if (opts['speed'] < 40) {
					opts['speed'] = 40;
				};
				lottTimeOut = setTimeout(rollDown, opts['speed']);
			}
		}
		lottTimeOut = setTimeout(rollDown, opts['speed']);
	},
	binEvent: function (param) {
		var clickBtn = document.querySelector(param['btn']);
		var posVal = '';
		var _this = this;
		clickBtn.addEventListener('click', function () {
			_this.rollRun({
				li: param['li'],
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