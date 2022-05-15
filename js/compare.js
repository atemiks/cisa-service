(function () {
    $(function () {
        var compareContainer = $('#compare-container');

        // Compare page
        (function () {
            if (compareContainer.length !== 1) {
                return;
            }

            /**
             * Match height on compare page.
             */
            var matchHeight = function () {
                // Match headers
                var maxHeaderHeight = 0;
                compareContainer.find('.compare-header').each(function (_, header) {
                    $(header).css('height', '');
                }).each(function (_, header) {
                    var jHeader = $(header);
                    var height = Math.round(jHeader.outerHeight());
                    if (height > maxHeaderHeight) {
                        maxHeaderHeight = height;
                    }
                }).each(function (_, header) {
                    $(header).css('height', maxHeaderHeight + 'px');
                });


                // Match parameters
                var maxItemHeights = [];
                compareContainer.find('.compare-body').each(function (_, body) {
                    $(body).find('.compare-specification-item').css('height', '');
                }).each(function (_, body) {
                    $(body).find('.compare-specification-item').each(function (_, item) {
                        var jItem = $(item);
                        var height = Math.round(jItem.outerHeight());
                        if (typeof maxItemHeights[_] === 'undefined') {
                            maxItemHeights.push(height);
                        } else if (height > maxItemHeights[_]) {
                            maxItemHeights[_] = height;
                        }
                    });
                }).each(function (_, body) {
                    $(body).find('.compare-specification-item').each(function (_, item) {
                        var jItem = $(item);
                        jItem.css('height', maxItemHeights[_] + 'px');
                    });
                });
            };

            /**
             * Init compare slider.
             */
            var initSlider = function () {
                // Compare products slider
                $('.swiper-compare-cover').each(function() {
                    var sliderContainer, swiper, prev, next;

                    sliderContainer = $(this);
                    prev = sliderContainer.find('.swiper-compare-button-prev');
                    next = sliderContainer.find('.swiper-compare-button-next');


                    //Swiper
                    swiper = new Swiper(sliderContainer.find('.swiper-compare'), {
                        slidesPerView: 2,
                        navigation: {
                            nextEl: next,
                            prevEl: prev,
                        }
                    });
                });
            };


            // Init match height on document ready and resize
            var matchHeightTimeout = null;
            $(window).on('resize', function () {
                if (matchHeightTimeout) {
                    clearTimeout(matchHeightTimeout);
                }
                setTimeout(function () {
                    matchHeight();
                }, 50)
            });
            matchHeight();
            initSlider();

           
        })();
    });
})();