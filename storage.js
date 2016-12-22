/****************************************************/
//
// Library that wraps sessionStorage for easier use
//
// Uses the same interface as sessionStorage, but
// handles conversion from JavaScript objects to JSON
// and provides a polyfill for older browsers.
//
/****************************************************/

var storage = function storage(theWindow) {
    // storagePolyfill will be used in instances where sessionStorage
    // is unavailable (mostly moderately old versions of IE, or 
    // any IE when the script is invoked from local filesystem).
    // It provides a similar interface as sessionStorage, so
    // consumers of this library need not worry about browser version.
    var storagePolyfill = function () {
        // Use a simple object instead of sessionStorage
        // It won't be saved throughout the session, but will 
        // allow the script to run without error.
        var items = {};

        return {
            getItem: function (key) {
                var item = items[key];

                // Invalid reference returns undefined, not null,
                // but sessionStorage spec requires return of null.
                return typeof item === "undefined" ? null : item;
            },
            setItem: function (key, value) {
                items[key] = value;
            },
            removeItem: function (key) {
                delete items[key];
            }
        }
    }();

    // Ensure sessionStorage is present and defined (it won't be on older IE, or IE running script from local file system)
    // If not, use the polyfill
    var storageAdaptor = 'sessionStorage' in theWindow && typeof theWindow.sessionStorage !== "undefined" ? theWindow.sessionStorage : storagePolyfill;

    // Simple function to return the type of an object (more robust/accurate than "typeof")
    var toType = function (obj) {
        return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
    };


    // Return an object that mimics the interface to sessionStorage
    return {
        getItem: function (key) {
            var item = storageAdaptor.getItem(key);

            try {
                item = JSON.parse(item);
            } catch (e) {
                // parse is expected to fail on some types, ignore this and return anyway.
            }

            return item;
        },

        setItem: function (key, value) {
            // Get the type of value
            var type = toType(value);

            // If value is an object or array, stringify it for storage,
            // as sessionStorage only accepts strings 
            if (/object|array/.test(type)) {
                value = JSON.stringify(value);
            }

            storageAdaptor.setItem(key, value);
        },

        removeItem: function (key) {
            storageAdaptor.removeItem(key);
        }
    };
}(this); // Pass in the global object (window, in browsers, something else in Node).