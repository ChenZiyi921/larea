var orderDetails = {
    init: function () {
        var _this = this;
        _this.copyOrderNumber();
    },
    copyOrderNumber: function () {
        var copyBtn = document.getElementById('copyBtn');
        copyBtn.addEventListener('click', function () {
            if (!document.body.querySelectorAll('.oInput')[0]) {
                var copyText = document.querySelectorAll(".order-number span")[0].innerText;
                var container = document.createElement('input');
                container.setAttribute('readonly', 'readonly');
                container.value = copyText;
                document.body.appendChild(container);
                container.setSelectionRange(0, copyText.length);
                document.execCommand("Copy");
                container.className = 'oInput';
                container.style.display = 'none';
                aspenLib.tips('复制成功');
                document.body.removeChild(container);
            }
        }, false);
    }
};
orderDetails.init();