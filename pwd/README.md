## 交易密码调用方法

`
// 需确认密码
new Password().start({
    items: document.querySelectorAll('.pwd-wrap li'),
    input: document.querySelectorAll('.pwd-input'),
    confirm: document.getElementById('confirm'),
    tipsContainer: document.querySelector('.pwd-title'),
    tips: '请再次输入6位数字交易密码', // 第二遍提示
    callback() {
        // 输入完第一遍后执行
    }
})
document.getElementById('confirm').addEventListener('click', () => {
    (new Password).confirm({
        input: document.querySelectorAll('.pwd-input')
    }).then(res => {
        // 初始化
        new Password().init().then(res => {
            res.tipsContainer.innerText = '请输入6位数字交易密码';
        })
    })
})
`
`
// 无需确认密码  
new Password().start({    
    items: document.querySelectorAll('.pwd-wrap li'),    
    input: document.querySelectorAll('.pwd-input'),
    confirm: document.getElementById('confirm'),
    tipsContainer: document.querySelector('.pwd-title'),
    tips: '',
    callback() {
        this.confirm.style.display = 'block';
    }
})
document.getElementById('confirm').addEventListener('click', () => {
    (new Password).confirm({
        input: document.querySelectorAll('.pwd-input')
    }).then(res => {
        new Password().init()
    })
})
`