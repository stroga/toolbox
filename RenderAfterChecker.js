;(function(test) {
    var _t,
        gi = mmcore.GenInfo[test.name],
        rmb = [],
        _name = test.name.replace(/\s/g, '_'),
        n = 100;
    try {
        _t = tc;
    } catch (e) {
        _t = {};
    }
    var preloadImages = function (context) {
        var arrImg = context.match(/service.maxymiser.net\/cm\/images-[^\/]+([^)'"\\]+)/g) || [];
        for (var i = 0; i < arrImg.length; i++) {
            new Image().src = "//" + arrImg[i];
        }
    };
    for (var mb in _t) {
        if (!/undefined|Default/.test(gi[mb.toLowerCase()])) {
            rmb.push(mb);

            for (var con in tc[mb]) {
                for (var tcc = tc[mb][con], i = 0; i < tcc.length; i++) {
                    preloadImages(tcc[i]);
                }
            }
        }
    }
    if (rmb.length) {
        var mmInt = setInterval(function() {
            if ( mmcore._docEnd || !n-- ) {
                var el = document.getElementById(_name);
                mmcore.RenderMaxyboxes(rmb);
                if (el) {
                    el.parentNode.removeChild(el);
                }
                clearInterval(mmInt);
            }
        }, 50);
    } else {
        var el = document.getElementById(_name);
        el && el.parentNode.removeChild(el);

    }
}({
    name: 'T08_Navigation',
    hideElement: '#mainnav'
}));