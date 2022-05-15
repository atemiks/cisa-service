$(document).ready(function() {
    var swiperReviews = new Swiper('.swiper-reviews', {
        grabCursor: true,
        autoHeight: true,
        slidesPerView: 3,
        spaceBetween: '2%',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            755: {slidesPerView: 2, spaceBetween: 20},
            480: {slidesPerView: 1, spaceBetween: 0}
        }
    });

    $('.product-image-container').each(function(__, block) {
        var mainGalleryContainer = $(block).find('.product-gallery-media');

        var thumbsGalleryContainer = $(block).find('.product-gallery-thumbs');
        var thumbsGalleryNext = thumbsGalleryContainer.siblings('.swiper-button-next-thumbs');
        var thumbsGalleryPrev = thumbsGalleryContainer.siblings('.swiper-button-prev-thumbs');

        /*Swiper Gallery Thumbs*/
        var swiperThumbGalleryProduct = new Swiper(thumbsGalleryContainer, {
            direction: 'horizontal',
            slidesPerView: 2,
            breakpointsInverse: true,
            breakpoints: {
                375: {direction: 'horizontal', slidesPerView: 3},
                576: {direction: 'vertical', slidesPerView: 3}
            },
            on: {
                init: function () {
                    swiperHelpers.initRewindControls(this, thumbsGalleryPrev, thumbsGalleryNext, true);
                }
            }
        });

        var swiperMainGalleryProduct = new Swiper(mainGalleryContainer, {
            spaceBetween: 10,
            thumbs: {
                swiper: swiperThumbGalleryProduct
            }
        });
        /*end Swiper Gallery Thumbs*/
    });
});