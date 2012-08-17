/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 12-8-12
 * Time: 下午2:30
 * To change this template use File | Settings | File Templates.
 */

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

function _iPOPUPS($dom) {
    var $dom = $dom;
    this.setTitle = function (t) {
        $dom.title.html(t);
    }
    this.setContent = function (c) {
        $dom.content.html(c);
    }
    this.openPopups = function () {
        $dom.popup("open");
    }

    this.closePopups = function () {
        $dom.popup("close");
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

    this.bindClickOption = function () {
        $('#' + _this.id + ' dd ul li a').click(function () {
            var text = $(this).html();
            $('#' + _this.id + ' dt a span').html(text);
            $('#' + _this.id + ' dd ul').hide();
            _this.setSelectedValue($(this));
        });
    };

    this.setSelectedValue = function (e) {
        $('input[name=year]').val(e.data("value"));
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
    }()
}


/**
 * 下拉日期选择框;
 */

function abstractTimeSelector(id) {
    var _this = this;
    abstractDateSelector.call(this, id);
    this.setAppendElement = function (ord) {
        var min = 0;
        var max = 24;
        var t;
        for (var i = min; i <= max; i++) {
            (i < 10) ? t = '0' + i.toString() : t = i;
            var ali = '<li><a href="#" data-role="none">' + t + '</a></li>';
            if (ord == "asc") {
                $(ali).appendTo('#' + _this.id + ' dd ul').find("a").data("value", i);
            }
            if (ord == "desc") {
                $(ali).prependTo('#' + _this.id + ' dd ul').find("a").data("value", i);
            }

        }
    }

    this.bindClickOption = function () {
        $('#' + _this.id + ' dd ul li a').click(function () {
            var text = $(this).html() + ':00';
            $('#' + _this.id + ' dt a span').html(text);
            $('#' + _this.id + ' dd ul').hide();
            _this.setSelectedValue($(this));
        });
    };
}


/**
 * 下拉选择框 - 短信策略 / 短信模板;
 */

function abstractOptionSelector(id) {
    var _this = this;
    abstractDateSelector.call(this, id);
    this.setAppendElement = function (arr) {
        for (var i = 0 in arr) {
            var $_li = $('<li><a href="#" data-role="none"></a></li>');
            $_li.find("a").html(arr[i].text);
            $_li.appendTo('#' + _this.id + ' dd ul').find("a").data("value", arr[i].value);
        }
    }
}