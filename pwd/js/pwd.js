class Password {
    start(opts) {
        const _this = this;
        this.opts = opts;
        for (let i = 0; i < opts.input.length; i++) {
            opts.input[i].index = i;
            opts.input[i].addEventListener('input', function () {
                let len = this.value.length;
                this.value = this.value.replace(/^(0+)|[^\d]+/g, '');
                if (len > opts.items.length) {
                    this.value = this.value.substr(0, 6);
                }
                len >= opts.items.length || _this.clearSelected()
                for (let l = 0; l < len; l++) {
                    len > opts.items.length || opts.items[l].classList.add('inputed');
                }
                if (len == opts.items.length) {
                    this.setAttribute('data-value', this.value);
                    switch (this.index) {
                        case 0:
                            opts.callback && opts.callback();
                            !!opts.tips && (opts.tipsContainer.innerText = opts.tips);
                            opts.input.length > 1 && setTimeout(() => {
                                this.style.display = 'none';
                                _this.clearSelected();
                            }, 300);
                            break;
                        case 1:
                            opts.confirm.style.display = 'block';
                    }
                } else {
                    len >= opts.items.length || this.setAttribute('data-value', '');
                }
            });
        }
    }
    confirm() {
        return new Promise((resolve, reject) => {
            let resVal = {};
            for (let i = 0; i < this.opts.input.length; i++) {
                resVal[`input${i + 1}`] = this.opts.input[i].getAttribute('data-value')
            }
            resolve(resVal);
        });
    }
    clearSelected() {
        for (let l = 0; l < this.opts.items.length; l++) this.opts.items[l].classList.remove('inputed');
    }
    init() {
        return new Promise((resolve, reject) => {
            this.start(this.opts);
            this.clearSelected();
            for (let i = 0; i < this.opts.input.length; i++) {
                this.opts.input[i].setAttribute('data-value', '');
                this.opts.input[i].value = '';
            }
            this.opts.input[0].style.display = 'block';
            this.opts.confirm.style.display = 'none';
            resolve(this.opts);
        });
    }
}