(function() {
    var util = {
        // 是否有类名
        hasClass: function(ele, cls) {
            var re = new RegExp("(^|\\s)" + cls + "(\\s|$)");
            return re.test(ele.className);
        },
        // 添加类名
        addClass: function(ele, cls) {
            if (!this.hasClass(ele, cls)) {
                ele.className += " " + cls;
            }
        },
        // 删除类名
        removeClass: function(ele, cls) {
            if (this.hasClass(ele, cls)) {
                var reg = RegExp("(^|\\s)" + cls + "(\\s|$)");
                ele.className = ele.className.replace(reg, " ");
            }
        },
        // 获取ID
        getId: function(id) {
            return document.getElementById(id);
        },
        // 获取类名
        getClassName: function(name) {
            return document.querySelectorAll(name);
        }
    };

    var index = 1;
    var left = util.getId("leftArrow"),
        right = util.getId("rightArrow"),
        pic = util.getId("picInner"),
        select = util.getId("select");

    var btn = select.getElementsByTagName("i");

    // 移动至特定页面
    function go(offset) {
        pic.style.left = parseInt(pic.style.left) + offset + "px";

        if (parseInt(pic.style.left) > 0) { // 必须用parseInt,因为left值有px单位
            pic.style.left = -1800 + "px";
        }

        if (parseInt(pic.style.left) < -1800) {
            pic.style.left = 0 + "px";
        }
    }

    // 显示button勾选状态
    function showGo() {
        for (var i = 0; i < btn.length; i++) {
            if (btn[i].className == "icon-gou") {
                btn[i].className = "";
                break;
            }
        }
        btn[index - 1].className = "icon-gou";
    }

    // 如果不在内联样式中添加style="left:0;",那么就获取不到left值
    left.onclick = function() {
        index -= 1;
        if (index < 1) {
            index = 3;
        }
        showGo();
        go(900);
    };

    right.onclick = function() {
        index += 1;
        if (index > 3) {
            index = 1;
        }
        showGo();
        go(-900);
    };

    //按钮点击
    for (var i = 0; i < btn.length; i++) {
        btn[i].onclick = function() {
            if (util.hasClass(this, "icon-gou")) {
                return;
            }
            var newIndex = parseInt(this.dataset.index);
            var offset = -900 * (newIndex - index);
            index = newIndex;
            showGo();
            go(offset);
        }
    }
})();