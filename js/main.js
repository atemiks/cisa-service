$(document).ready(function() {
    var windowWidth = $(window).innerWidth();
    var body = $('body');
    var offcanvas = $('#offcanvas');
    var filter = $('#filter');
    var mobileSearch = $('#mobile-search');
    var modalCounter = 0;
    

    /* layout */
    function mobileLayout() {
        createOffcanvas();
    }

    function desktopLayout() {
        destroyOffcanvas();
    }


    // custom select
    $("select.select2").select2({
        placeholder: "",
        minimumResultsForSearch: Infinity
    });

    //custom number
    $('.form-number .number-button').on('click', function() {
        var $button = $(this);
        var oldValue = $button.parents('.form-number').find('input').val();

        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }

        $button.parents('.form-number').find('input').val(newVal);
    });

    // close open modals before show another
    $('.modal').on('show.bs.modal', function () {
        modalCounter++;
        $('.modal').not($(this)).each(function () {
            $(this).modal('hide');
        })
    })

    $('.modal').on('hidden.bs.modal', function () {
        modalCounter--;
        if(modalCounter) {
            $('body').addClass('modal-open');
        }
        else {
            $('body').removeClass('modal-open');
        }
    });


    /* off canvas */
    function showOffcanvas() {
        body.addClass('open');
        offcanvas.addClass('open');
    }

    function closeOffcanvas() {
        body.removeClass('open');
        offcanvas.removeClass('open');
    }

    function createOffcanvas() {
        var cabinet = $('.header-cabinet');
        var mainNav = $('.header-nav');

        cabinet.appendTo(offcanvas);
        mainNav.appendTo(offcanvas);
    }

    function destroyOffcanvas() {
        var cabinet = $('.header-cabinet');
        var mainNav = $('.header-nav');

        cabinet.appendTo('#header-account');
        mainNav.appendTo('#header-nav');
    }

    // open offcanvas
    $('.offcanvas-toggler').on('click', showOffcanvas);

    // close offcanvas
    $('.offcanvas-close').on('click', closeOffcanvas);

    // close offcanvas by swipe
    $(offcanvas).hammer().on("swipeleft", closeOffcanvas);


    /* header sub menu */ 
    $('.header-nav .item.has-children .link').on('click', function(e) {
        if(windowSizeHelper.isMobile()) {
            e.preventDefault();

            var self = $(e.currentTarget),
                parrent = self.closest('.item'),
                menu = parrent.find('.sub-menu');

            parrent.toggleClass('open');
            menu.slideToggle();
        }
    })


    /* filter */
    function showFilter() {
        body.addClass('open');
        filter.addClass('open');
    }

    function closeFilter() {
        body.removeClass('open');
        filter.removeClass('open');
    }

    function collapseFilterVariants(el) {
        var parent = $(el).closest('.filter-block');
        var elements = parent.find('.filter-content');

        parent.toggleClass('open');
        elements.slideToggle();
    }

    function showMoreHandler(e) {
        e.preventDefault();

        var self = $(e.currentTarget);
        var parent = self.closest('.filter-block');
        var parentChildren = parent.find('.filter-variant-secondary');

        self.toggleClass('open');
        parentChildren.slideToggle();

        if ( self.hasClass('open') ) {
            self.html('<span>Свернуть</span>');
        } else {
            self.html('<span>Показать ещё</span>');
            $(filter).scrollTop($(parent).offset().top - $(document).scrollTop() + $(filter).scrollTop())
        }
    }

    // open filter
    $('.filter-toggler').on('click', showFilter);

    // close filter
    $('.filter-close').on('click', closeFilter);

    // close filter by swipe
    $(filter).hammer().on("swipeleft", closeFilter);


    // collapse filter group
    $('.filter-title').on('click', function() {
        if ( windowSizeHelper.isMobile() ) {
            collapseFilterVariants($(this));
        }
    });

    // collapse filter variants
    $('.filter-variants-more').on('click', showMoreHandler);


    /* aside menu */
    function collapseAsideMenu(e) {
        e.preventDefault();

        var self = $(e.currentTarget);
        var parent = self.closest('.menu-block');
        var parentChildren = parent.find('.menu-content');

        self.toggleClass('close');
        parentChildren.slideToggle();
    }

    // collapse aside menu
    $('.menu-toggler').on('click', collapseAsideMenu);



    /* mobile search */
    function showMobileSearch() {
        var searchInput = mobileSearch.find('input[type="search"]');

        mobileSearch.addClass('open');
        searchInput.focus();
    }

    function closeMobileSearch() {
        mobileSearch.removeClass('open');
    }

    // search toggler
    $('.search-toggler').on('click', function() {
        if( mobileSearch.hasClass('open') ) {
            closeMobileSearch();
        } else {
            showMobileSearch();
        }
    });


    /* widgets */
    // widget toggler
    $('.widget-toggler').on('click', function(e) {
        e.preventDefault();

        var self = $(e.currentTarget);
        var parent = self.closest('.widget');

        parent.addClass('animated');
        parent.toggleClass('open');
    });


    /* profile orders */
    // explain order card
    $('.profile-orders').on('click', 'a.order-code', function(e) {
        e.preventDefault();

        var self = $(e.currentTarget);
        var parent = self.closest('.order-short-card');

        parent.next().slideToggle();
    });


    $('.bg0').hammer().on("swipeleft tap", function() {
        closeOffcanvas();
        closeFilter();
    });


    if (windowSizeHelper.isMobile()) {
        mobileLayout();
    }
    
    beforeWindowWidthResizeFunctions.push(function () {
        if(windowSizeHelper.isMobileToDesktopResize()) {
            desktopLayout();
        }

        if(windowSizeHelper.isDesktopToMobileResize()) {
            mobileLayout();
        }
    });


    // fixed header
    (function () {
        var headerFixed = $('.header-fixed');
        var headerHeight = $('.header-box').height();

        var adjustHeaderView = function () {
            var scroll = $(window).scrollTop();
            if (scroll > headerHeight) {
                headerFixed.addClass('sticky');
            } else {
                headerFixed.removeClass('sticky');
            }
        };

        adjustHeaderView();
        $(window).on('scroll', function () {
            adjustHeaderView();
        });
    })();

    //Form 'Registration' ------------------------------------------------------------------------*/
    $('.custom-control-company').click(function () {
        $('.formbox-showhide').show();

    });

    $('.custom-control-person').click(function () {
        $('.formbox-showhide').hide();
    });
    //end Form 'Registration' --------------------------------------------------------------------*/

   //Catalog 'Compare actived' -------------------------------------------------------------------*/
    $('.product-compare').click(function () {
        $(this).toggleClass('compare-actived');

        if ($(this).hasClass('compare-actived')) {
            $(this).children('.text-dotted').html('Удалить из сравнения');
        } else {
            $(this).children('.text-dotted').html('Добавить к сравнению');
        } return false;
    });
    //end Catalog 'Compare actived' --------------------------------------------------------------*/

   //Catalog 'Basket actived' --------------------------------------------------------------------*/
    $('.product-add-to-basket').click(function () {
        $(this).parents('.product-basket-skew').toggleClass('basket-actived'); 
    });
    //end Catalog 'Basket actived' ---------------------------------------------------------------*/

    /*Scroll to anchors --------------------------------------------------------------------------*/
    $('a[href^="#section-feedback"]').click(function() {
        var target = $(this).attr('href');
        $('html, body').animate({scrollTop: $(target).offset().top - $('.header-fixed').height()}, 300);
        return false;
    });
    /*end Scroll to anchors ----------------------------------------------------------------------*/
})