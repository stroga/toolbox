var PC_VALUE_NAME = "key";
var d = mmcore.Deferred();
d.done( function ( val ) {
    console.log( val )
} );


function getVal( pc_name ) {
    var val;
    xdLocalStorage.getItem(pc_name, function(data) {
        val = data.value;
        d.resolve( val );
    });
}

/**
 * Created by Ofir_Dagan on 4/17/14.
 */
'use strict';
window.XdUtils = window.XdUtils || (function() {

    function extend(object, defaultObject) {
        var result = defaultObject || {};
        var key;
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                result[key] = object[key];
            }
        }
        return result;
    }

    //public interface
    return {
        extend: extend
    };
})();


/**
 * Created by dagan on 07/04/2014.
 */
'use strict';
/* global console, XdUtils */
window.xdLocalStorage = window.xdLocalStorage || (function() {
    var MESSAGE_NAMESPACE = 'cross-domain-local-message';
    var options = {
        iframeId: 'cross-domain-iframe',
        iframeUrl: undefined,
        initCallback: function() {}
    };
    var requestId = -1;
    var iframe;
    var requests = {};
    var wasInit = false;
    var iframeReady = true;

    function applyCallback(data) {
        if (requests[data.id]) {
            requests[data.id](data);
            delete requests[data.id];
        }
    }

    function receiveMessage(event) {
        var data;
        try {
            data = JSON.parse(event.data);
        } catch (err) {
            //not our message, can ignore
        }
        if (data && data.namespace === MESSAGE_NAMESPACE) {
            if (data.id === 'iframe-ready') {
                iframeReady = true;
                options.initCallback();
            } else {
                applyCallback(data);
            }
        }
    }

    function buildMessage(action, key, value, callback) {
        requestId++;
        requests[requestId] = callback;
        var data = {
            namespace: MESSAGE_NAMESPACE,
            id: requestId,
            action: action,
            key: key,
            value: value
        };
        iframe.contentWindow.postMessage(JSON.stringify(data), '*');
    }

    function init(customOptions) {
        options = XdUtils.extend(customOptions, options);
        var temp = document.createElement('div');

        if (window.addEventListener) {
            window.addEventListener('message', receiveMessage, false);
        } else {
            window.attachEvent('onmessage', receiveMessage);
        }

        temp.innerHTML = '<iframe id="' + options.iframeId + '" src=' + options.iframeUrl + ' style="display: none;"></iframe>';
        document.body.appendChild(temp);
        iframe = document.getElementById(options.iframeId);
    }

    function isApiReady() {
        if (!wasInit) {
            console.log('You must call xdLocalStorage.init() before using it.');
            return false;
        }
        if (!iframeReady) {
            console.log('You must wait for iframe ready message before using the api.');
            return false;
        }
        return true;
    }

    return {
        //callback is optional for cases you use the api before window load.
        init: function(customOptions) {
            if (!customOptions.iframeUrl) {
                throw 'You must specify iframeUrl';
            }
            if (wasInit) {
                console.log('xdLocalStorage was already initialized!');
                return;
            }
            wasInit = true;
            if (document.readyState === 'complete') {
                init(customOptions);
            } else {
                window.onload = function() {
                    init(customOptions);
                };
            }
        },
        setItem: function(key, value, callback) {
            if (!isApiReady()) {
                return;
            }
            buildMessage('set', key, value, callback);
        },

        getItem: function(key, callback) {
            if (!isApiReady()) {
                return;
            }
            buildMessage('get', key, null, callback);
        },
        removeItem: function(key, callback) {
            if (!isApiReady()) {
                return;
            }
            buildMessage('remove', key, null, callback);
        },
        key: function(index, callback) {
            if (!isApiReady()) {
                return;
            }
            buildMessage('key', index, null, callback);
        },
        clear: function(callback) {
            if (!isApiReady()) {
                return;
            }
            buildMessage('clear', null, null, callback);
        },
        wasInit: function() {
            return wasInit;
        }
    };
})();



/**
 * Created by dagan on 07/04/2014.
 */
'use strict';
/* global XdUtils */
(function() {

    var MESSAGE_NAMESPACE = 'cross-domain-local-message';

    var defaultData = {
        namespace: MESSAGE_NAMESPACE
    };

    function postData(id, data) {
        var mergedData = XdUtils.extend(data, defaultData);
        mergedData.id = id;
        parent.postMessage(JSON.stringify(mergedData), '*');
    }

    function getData(id, key) {
        var value = localStorage.getItem(key);
        var data = {
            key: key,
            value: value
        };
        postData(id, data);
    }

    function setData(id, key, value) {
        localStorage.setItem(key, value);
        var checkGet = localStorage.getItem(key);
        var data = {
            success: checkGet === value
        };
        postData(id, data);
    }

    function removeData(id, key) {
        localStorage.removeItem(key);
        postData(id, {});
    }

    function getKey(id, index) {
        var key = localStorage.key(index);
        postData(id, {
            key: key
        });
    }

    function clear(id) {
        localStorage.clear();
        postData(id, {});
    }

    function receiveMessage(event) {
        var data;
        try {
            data = JSON.parse(event.data);
        } catch (err) {
            //not our message, can ignore
        }
        if (data && data.namespace === MESSAGE_NAMESPACE) {
            if (data.action === 'set') {
                setData(data.id, data.key, data.value);
            } else if (data.action === 'get') {
                getData(data.id, data.key);
            } else if (data.action === 'remove') {
                removeData(data.id, data.key);
            } else if (data.action === 'key') {
                getKey(data.id, data.key);
            } else if (data.action === 'clear') {
                clear(data.id);
            }
        }
    }

    if (window.addEventListener) {
        window.addEventListener('message', receiveMessage, false);
    } else {
        window.attachEvent('onmessage', receiveMessage);
    }

    function sendOnLoad() {
        var data = {
            namespace: MESSAGE_NAMESPACE,
            id: 'iframe-ready'
        };
        parent.postMessage(JSON.stringify(data), '*');
    }
    //on creation
    sendOnLoad();
})();



xdLocalStorage.init({
    iframeUrl: 'https://rawgit.com/ofirdagan/cross-domain-local-storage/master/app/views/cross-domain-local-storage.html',
    initCallback: function() {
        console.log('Got iframe ready');
        //xdLocalStorage.setItem(PC_VALUE_NAME, "govno");
        //getVal( PC_VALUE_NAME );
    }
});





