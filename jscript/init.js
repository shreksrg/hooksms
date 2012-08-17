/**
 * Created with JetBrains ShrekSrg.
 * User: 百事通挂机短信
 * Date: 12-8-12
 * Time: 下午2:30
 * To change this template use File | Settings | File Templates.
 */

var UID;    //-- 用户ID
var tplSMSId; // 模版短信ID
var hookSMSId; //  挂机短信ID
var loginValidor = new validLogin('do.html', 'index.html'); //-- 配置登录验证

/**
 * 登录验证；
 */
function validLogin(url, dir) {
    this.url = url;
    this.dir = dir;
    var data = {provetype:'login'};
    this.reqValidate = function () {
        $.post(this.url, data, function (jarr) {
            jarr = {session:1, uid:888}; //-- 返回数据格式
            if (jarr.session != 1) {
                $.mobile.changePage(this.dir);
            }
            UID = jarr.uid;
        })
    }
}


/**
 * 文本框输入即时变化;
 */

jQuery.fn.extend({
    jitchange:function (fn) {
        if (!+[1, ] != true) {
            $(this).get(0).addEventListener("input", fn, false)
        }
        // $(this).bind("jitchange", fn);
        return this
    }
});


function countWordsNum() {
    var len = $('textarea[name=smscontent]').val().length;
    $('span[bstname=curWords]').html(len);
    return len;
}

/**
 * JMPOPUP 弹出层设置;
 */

function _AbstractPOPUPS(dom) {
    var _dom = dom;
    this.setTitle = function (t) {
        _dom.find('h1[pmt=heading]').html(t);
    }
    this.setContent = function (c) {
        _dom.find('p[pmt=content]').html(c);
    }
    this.openPopups = function () {
        _dom.popup("open");
    }

    this.closePopups = function () {
        _dom.popup("close");
    }
}

function _TipPOPUPS(dom) {
    var _dom = dom;
    _AbstractPOPUPS.call(this, dom);
}


function _Tip2POPUPS(dom) {
    var _dom = dom;
    _AbstractPOPUPS.call(this, dom);
    this.tipButton = function () {
        $('div.ui-grid-a').hide();
        $('div.ui-grid-solo').show();
    }
    this.configButton = function () {
        $('div.ui-grid-a').show();
        $('div.ui-grid-solo').hide();
    }

}

/**
 * 加载弹出层代码;
 */

/*var popupTip;
 $.ajax({
 url:"http://localhost/orderMobi/assets/www/hooksms2/popuptip.html",
 async:false,
 success:function (html) {

 popupTip = html.toString();

 }
 })*/


/**
 * 下拉日期选择框基类;
 */

/*

 function abstractDateSelector(id) {
 var _this = this;
 _this.id = null;
 var setID = function () {
 _this.id = id;
 };

 this.setAppendElement = function (setting) {
 var min = setting.min;
 var max = setting.max;
 for (var i = min; i <= max; i++) {
 var ali = '<li><a href="#" data-role="none">' + i + '</a></li>';
 $(ali).prependTo('#' + _this.id + ' dd ul').find("a").data("value", i);
 }
 };

 this.bindClickText = function () {
 $('#' + _this.id + ' dt a').click(function () {
 $('.bt-dropdown').not($('#' + _this.id)[0]).find('dd ul').hide();
 $('#' + _this.id + ' dd ul').toggle();
 });
 };

 this.bindClickOption = function (el) {
 $('#' + _this.id + ' dd ul li a').click(function () {
 var text = $(this).html();
 $('#' + _this.id + ' dt a span').html(text);
 $('#' + _this.id + ' dd ul').hide();
 _this.setSelectedValue(el, $(this));
 });
 };

 this.setSelectedValue = function (el, em) {
 el.val(em.data("value"));
 };

 this.bindDocumentClick = function () {
 $(document).bind('click', function (e) {
 var $clicked = $(e.target);
 if (!$clicked.parents().hasClass("bt-dropdown"))
 $('#' + id + ' dd ul').hide();
 });
 };

 var init = function () {
 setID();
 _this.bindDocumentClick();
 _this.bindClickText()
 }()
 }
 */


/**
 * 下拉日期选择框;
 */

function abstractTimeSelector() {
    var _this = this;
    var min, max;
    _this.txtOption = "" || null;
    _this.valueOption = "" || null;

    this.clearPOPUP = function () {
        $('ul.optSelectMenu').empty();
    }

    this.setAppendElement = function () {
        var t;
        for (var i = min; i <= max; i++) {
            (i < 10) ? t = '0' + i.toString() : t = i;
            var ali = '<li><a href="#" data-role="none" data-rel="back">' + t + '</a></li>';
            $(ali).prependTo('ul.optSelectMenu').find("a").data("value", i);
        }
    }

    this.bindClickOptions = function () {
        $('ul.optSelectMenu li a').click(function () {
            _this.txtOption = $(this).html() + ':00';
            _this.valueOption = $(this).data("value");
            _this.eventClickOptions();
        })
    };


    this.eventClickOptions = function () {
        return false
    }

    this.init = function (setting) {
        min = setting.min;
        max = setting.max;
        console.log(min);
        _this.clearPOPUP();
        _this.setAppendElement();
        _this.bindClickOptions();
    };


    // this.init();
}


function abstractDateSelector() {
    var _this = this;
    abstractTimeSelector.call(this);
    this.bindClickOptions = function () {
        $('ul.optSelectMenu li a').click(function () {
            _this.txtOption = $(this).html();
            _this.valueOption = $(this).data("value");
            _this.eventClickOptions();
        })
    };
}


/**
 * 下拉选择框 - 短信策略 / 短信模板;
 */

function abstractOptionSelector(arr) {
    var _this = this;
    _this.txtOption = "" || null;
    _this.valueOption = "" || null;
    _this.arr = arr;

    this.clearPOPUP = function () {
        $('ul.optSelectMenu').empty();
    }

    this.setAppendElement = function () {
        for (var i = 0 in _this.arr) {
            var $_li = $('<li><a href="#" data-role="none" data-rel="back"></a></li>');
            $_li.find("a").html(_this.arr[i].text);
            $_li.appendTo('ul.optSelectMenu').find("a").data("value", _this.arr[i].value);
        }
    }
    this.bindClickOptions = function () {
        $('ul.optSelectMenu li a').click(function () {
            _this.txtOption = $(this).html();
            _this.valueOption = $(this).data("value");
            _this.eventClickOptions();
        })
    };


    this.init = function () {
        _this.clearPOPUP();
        _this.setAppendElement();
        _this.bindClickOptions();
    };

    this.init();
}



