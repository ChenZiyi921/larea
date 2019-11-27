## 交易密码调用方法
```
// 需确认密码
const PaymentPassword = new Password();
PaymentPassword.start({
    items: document.querySelectorAll('.pwd-wrap li'),
    input: document.querySelectorAll('.pwd-input'),
    confirm: document.getElementById('confirm'),
    tipsContainer: document.querySelector('.pwd-title'),
    tips: '请再次输入6位数字交易密码', // 第二遍提示
    callback() {
        // 输入完第一遍回调函数
    }
})
document.getElementById('confirm').addEventListener('click', () => {
    PaymentPassword.confirm().then(res => {
        // 初始化
        PaymentPassword.init().then(res => {
            res.tipsContainer.innerText = '请输入6位数字交易密码';
        })
    })
})

// 无需确认密码  
const PaymentPassword = new Password();
PaymentPassword.start({
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
    PaymentPassword.confirm().then(res => {
        PaymentPassword.init()
    })
})
```