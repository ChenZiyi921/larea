; (function (ROOT, callback) {
    var ajaxUrl = location.protocol + '//' + location.hostname;
    var newFunction = new Function();
    newFunction.fn = newFunction.prototype = {
        init: function () {
            this.bindEvnt();
            this.modifyUserInfo();
        },
        convertImgDataToBlob: function (base64Data) {
            var format = "image/jpeg";
            var base64 = base64Data;
            var code = window.atob(base64.split(",")[1]);
            var aBuffer = new window.ArrayBuffer(code.length);
            var uBuffer = new window.Uint8Array(aBuffer);
            for (var i = 0; i < code.length; i++) {
                uBuffer[i] = code.charCodeAt(i) & 0xff;
            }
            var blob = null;
            try {
                blob = new Blob([uBuffer], { type: format });
            }
            catch (e) {
                window.BlobBuilder = window.BlobBuilder ||
                    window.WebKitBlobBuilder ||
                    window.MozBlobBuilder ||
                    window.MSBlobBuilder;
                if (e.name == 'TypeError' && window.BlobBuilder) {
                    var bb = new window.BlobBuilder();
                    bb.append(uBuffer.buffer);
                    blob = bb.getBlob("image/jpeg");
                } else if (e.name == "InvalidStateError") {
                    blob = new Blob([aBuffer], { type: format });
                } else {

                }
            }
            return blob;
        },
        bindEvnt: function () {
            var publicFileInpt = document.getElementById('replaceImg');
            publicFileInpt.addEventListener('click', function () {
                document.getElementById('aspenLoadimgWrap').style.display = 'block';
                var cut = new ImgClip({
                    aspenWrap: 'aspenLoadimgWrap',
                    successShow: 'finalImg',
                    canvas: 'aspenCanvas',
                    fileObj: 'aspenFile',
                    cutBtn: 'aspenSave',
                    resultObj: 'aspenImg',
                    rotateR: 'rotateR',
                    cutScale: 1,
                    cutW: '220'
                })
            }, false);
        },
        modifyUserInfo: function () {
            var _this = this;
            var headPortrait = document.getElementById('headPortrait');
            var upLoadBtn = document.querySelector('#upLoadBtn');
            var upLoadText = document.querySelectorAll('.upload-content input')[0];
            var upLoadImg = document.querySelectorAll('.upload-l')[0];
            var getImg = document.querySelector('#finalImg');
            _this.closeUpLoad();
            headPortrait.addEventListener('click', function () {
                upLoadWrap.style.display = 'block';
            }, false);
            upLoadBtn && upLoadBtn.addEventListener('click', function () {
                if (upLoadText && upLoadText.value == '') {
                    aspenLib.tips('请填写昵称');
                    return false;
                } if (upLoadText.value.length > 6) {
                    aspenLib.tips('昵称限7个字以内');
                    return false;
                } else if (!getImg.src) {
                    aspenLib.tips('请上传头像');
                    return false;
                } else {
                    var imgObjs = '';
                    if (/^http/.test(getImg.src)) {
                        imgObjs = getImg.src;
                    } else {
                        imgObjs = _this.convertImgDataToBlob(getImg.src);
                    }
                    var nameValue = upLoadText.value;
                    var formData = new FormData();
                    var xhr = new XMLHttpRequest();
                    formData.append("uploadImg", imgObjs);
                    formData.append("neckname", nameValue);
                    xhr.open("post", ajaxUrl + '/m/api/queen/oss.php', true);
                    xhr.onreadystatechange = function (data) {
                        if (4 === xhr.readyState) {
                            var data = JSON.parse(xhr.responseText);
                            if (200 === xhr.status) {
                                if (data.code == "200") {
                                    aspenLib.tips(data.msg);
                                    nameValue = data.data.nickname;
                                    var userTit = document.querySelectorAll('.user-t')[0];
                                    if (userTit) {
                                        userTit.innerHTML = '<span>' +
                                            '<img src="' + data.data.headPortrait + '">' +
                                            '</span>' +
                                            '<em>' + data.data.nickname + '</em>';
                                    }
                                    upLoadWrap.style.display = 'none';
                                } else {
                                    aspenLib.tips(data.msg);
                                }
                            } else {
                                aspenLib.tips(data.msg);
                            }
                        }
                    };
                    xhr.send(formData);
                }
            }, false);
        },
        closeUpLoad: function () {
            var closeUpBtn = document.querySelector('#closeUp');
            closeUpBtn.onclick = function () {
                upLoadWrap.style.display = 'none';
            }
        }
    },
        ROOT.upLoadImg = newFunction.fn;
    typeof callback == 'function' && callback.call(this, ROOT.upLoadImg);
})(window, function () {
    return window.upLoadImg;
});
document.addEventListener('DOMContentLoaded', function () {
    var getWinHeigth = window.innerHeight;
    var getLoadimgWrap = document.getElementById('aspenLoadimgWrap');
    if (getLoadimgWrap) {
        getLoadimgWrap.style.height = getWinHeigth + 'px';
    }
    window.upLoadImg.init();
}, false);