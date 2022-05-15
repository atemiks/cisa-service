var beforeWindowWidthResizeFunctions = [];

(function ($, window) {
    $(document).ready(function () {
        windowSizeHelper.setWindowWidth();

        window.addEventListener('resize', function () {
            var beforeResizeFunctionsResults = [];

            beforeWindowWidthResizeFunctions.forEach(function (callback) {
                var callbackResult = callback();
                if (typeof callbackResult != 'undefined') {
                    beforeResizeFunctionsResults.push(callbackResult);
                }
            });

            if (beforeResizeFunctionsResults.length > 0) {
                $.when.apply(this, beforeResizeFunctionsResults).then(function () {
                    windowSizeHelper.setWindowWidth();
                });
            } else {
                windowSizeHelper.setWindowWidth();
            }
        });
    });
})(jQuery, window);