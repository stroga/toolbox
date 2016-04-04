;(function() {
  function bind(el, func) {
    if (el.addEventListener) {
      el.addEventListener('beforeprint', func, false);
    } else if (el.attachEvent) {
      el.attachEvent('onbeforeprint', func);
    }
  }
  if (navigator.userAgent.match(/msie/i)) {
    bind(window, function() {
      var nodes = document.getElementsByTagName('script'),
          i;
      for (i = nodes.length; i--;) {
        if ((nodes[i].id || '').match(mmcore.cprefix)) {
          nodes[i].removeAttribute('src');
        }
      }
    });
  }
})();