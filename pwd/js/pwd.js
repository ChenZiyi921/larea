class Password {
    constructor() { }
    start(opts) {
        for (let i = 0; i < opts.input.length; i++) {
            opts.input[i].index = i;
            opts.input[i].addEventListener('input', function () {
                let len = this.value.length;
                this.value = this.value.replace(/^(0+)|[^\d]+/g, '');
                if (len > opts.items.length) {
                    this.value = this.value.substr(0, 6)
                }
                let clearSelected = () => {
                    for (let l = 0; l < opts.items.length; l++) opts.items[l].classList.remove('inputed')
                }
                switch (this.index) {
                    case 0:
                        clearSelected()
                        break;
                    case 1:
                        len >= opts.items.length || clearSelected()
                        break;
                }
                for (let l = 0; l < len; l++) {
                    len > opts.items.length || opts.items[l].classList.add('inputed')
                }
                if (len == opts.items.length) {
                    this.setAttribute('data-value', this.value);
                    switch (this.index) {
                        case 0:
                            opts.callback();
                            opts.tipsContainer.innerText = opts.tips;
                            setTimeout(() => { this.style.display = 'none', clearSelected() }, 300)
                            break;
                        case 1:
                            opts.confirm.style.display = 'block'
                    }
                } else {
                    len >= opts.items.length || this.setAttribute('data-value', '');
                }
            })
        }
    }
    confirm(opts) {
        return new Promise((resolve, reject) => {
            resolve({
                input1: opts.input[0].getAttribute('data-value'),
                input2: opts.input[1].getAttribute('data-value')
            })
        })
    }
}

new Password().start({
    items: document.querySelectorAll('.pwd-wrap li'),
    input: document.querySelectorAll('.pwd-input'),
    confirm: document.getElementById('confirm'),
    tipsContainer: document.querySelector('.pwd-title'),
    tips: '请再次输入6位数字交易密码',
    callback() { }
})

document.getElementById('confirm').addEventListener('click', () => {
    (new Password).confirm({
        input: document.querySelectorAll('.pwd-input')
    }).then(res => {
        console.log(res)
    })
})