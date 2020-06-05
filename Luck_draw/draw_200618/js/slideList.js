class slideList {
    constructor(opts) {
        this.init(opts)
        opts.data()
    }
    init(opts) {
        let clearI = setInterval(() => {
            opts.list.style.marginTop = --opts.startPos + 'px';
            Math.abs(opts.startPos) >= opts.list.offsetHeight - opts.container.offsetHeight && (opts.list.style.marginTop = opts.startPos = 0);
            this.slide(opts, clearI);
        }, opts.speed);
    }
    slide(opts, clearI) {
        if (opts.startPos % opts.list.querySelector('li').offsetHeight == 0) {
            clearInterval(clearI);
            setTimeout(() => this.init(opts), opts.delay)
        }
    }
}