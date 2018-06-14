
var cssUrl = 'cssm/wal.pop.css';
;
(function(d, c, b, e) {
    var a = function(g, f) {
        if (typeof b === "undefined") {
            throw new Error("load jQuery");
        } else {
            this.element = g;
            this.defaults = {
                url: cssUrl,
                title: "",
                tipTxt: "tips",
                confirmBtnRun: function() {},
                cancelBtnRun: function() {},
                confirmBtn: "",
                cancelBtn: ""
            };
            this.options = b.extend({}, this.defaults, f);
        }
    };
    a.prototype = {
        initSetTimeOut: null,
        initCMpop: function() {
            this.loadCSS();
            this.popSet();
            this.bindEvent();
        },
        loadCSS: function() {
            var g = document.createElement("link");
            g.rel = "stylesheet";
            g.type = "text/css";
            g.href = this.options.url;
            var f = document.getElementsByTagName("head")[0];
            f.appendChild(g);
        },
        popSet: function() {
            var g = "";
            if (typeof this.options.confirmBtn != "undefined" && this.options.confirmBtn != "" && typeof this.options.cancelBtn != "undefined" && this.options.cancelBtn != "") {
                g = '<input type="button" class="jzfq-pop-cancel" value="' + this.options.cancelBtn + '" /><input type="button" class="jzfq-pop-confirm" value="' + this.options.confirmBtn + '" />';
            } else {
                if (typeof this.options.confirmBtn != "undefined" && this.options.confirmBtn != "") {
                    g = '<input type="button" class="jzfq-pop-confirm" value="' + this.options.confirmBtn + '" />';
                }
                if (typeof this.options.cancelBtn != "undefined" && this.options.cancelBtn != "") {
                    g = '<input type="button" class="jzfq-pop-cancel" value="' + this.options.cancelBtn + '" />';
                }
            }
            if (typeof this.options.title != "undefined" && this.options.title != "") {
                var f = '<div class="jzfq-pop-mask"></div><div class="jzfq-pop-main clearfix"><a href="javascript:;" class="jzfq-pop-close">×</a><p class="jzfq-pop-tel">' + this.options.title + '</p><div class="jzfq-pop-content clearfix">' + this.options.tipTxt + '</div><div class="jzfq-pop-footer">' + g + "</div></div>";
            }else{
                var f = '<div class="jzfq-pop-mask"></div><div class="jzfq-pop-main clearfix"><a href="javascript:;" class="jzfq-pop-close">×</a>' + '<div class="jzfq-pop-content clearfix">' + this.options.tipTxt + '</div><div class="jzfq-pop-footer">' + g + "</div></div>";
            }
            clearTimeout(this.initSetTimeOut);
            this.initSetTimeOut = setTimeout(function() {
                b("body").append(f);
                b(".jzfq-pop-mask").css({
                    width: "100%",
                    height: b(c).height() + "px",
                    position: "fixed",
                    background: "#000",
                    zIndex: "9122120",
                    top: "0",
                    left: "0",
                    opacity: ".4"
                });
                var h = b(".jzfq-pop-main");
                h.css({
                    marginTop: -h.outerHeight() / 2 + "px"
                }).addClass("cpshow");
            }, "200");
        },
        bindEvent: function() {
            var g = this;
            var f = b(c);
            f.off("click");
            f.on("click", ".jzfq-pop-close", function(h) {
                h.preventDefault();
                g.popClose();
            });
            if (typeof this.options.confirmBtn != "undefined" && typeof this.options.confirmBtn != "") {
                f.on("click", ".jzfq-pop-confirm", function(h) {
                    h.preventDefault();
                    g.confirmBtnClick();
                    g.popClose();
                });
            }
            if (typeof this.options.cancelBtn != "undefined" && typeof this.options.cancelBtn != "") {
                f.on("click", ".jzfq-pop-cancel", function(h) {
                    h.preventDefault();
                    g.cancelBtnClick();
                    g.popClose();
                });
            }
        },
        popClose: function(g) {
            var f = b(".jzfq-pop-main");
            var h = b(".jzfq-pop-mask");
            f.addClass("cpclose");
            h.hide();
            clearTimeout(this.initSetTimeOut);
            this.initSetTimeOut = setTimeout(function() {
                f.remove();
                h.remove();
                b("head").find("link:last").remove();
            }, "200");
        },
        confirmBtnClick: function() {
            if (typeof this.options.confirmBtnRun != "undefined" && typeof this.options.confirmBtnRun === "function") {
                return this.options.confirmBtnRun();
            } else {
                this.popClose();
            }
        },
        cancelBtnClick: function() {
            if (typeof this.options.cancelBtnRun != "undefined" && typeof this.options.cancelBtnRun === "function") {
                return this.options.cancelBtnRun();
            } else {
                this.popClose();
            }
        }
    };
    b.prototype.newCMPublicPop = function(g) {
        var f = new a(this, g);
        return f.initCMpop();
    };
})(window, document, jQuery);
/* system init Basics */
;
(function(initBasics, doc, $, undefined) {
    initBasics.setPublicRun = {
        getBody: $('body'),
        init: function() {
            var _this = this;
        },
        countDown: function() {
            var _this = this;
            _this.getBody.on('click', '.getcode', function() {   
                var time=60;
                var code=$(this);
                var t=setInterval(function  () {
                    time--;
                    code.html("请等待"+time+"秒").attr("disabled","disabled");
                    code.addClass("grey");
                    if (time==0) {
                        clearInterval(t);
                        code.html("重新获取").attr("disabled",false);
                        code.removeClass("grey");
                        };
                    },1000)
            });
        },        
    }
    $(function() {
        initBasics.setPublicRun.init();
    });
})(window, document, jQuery);