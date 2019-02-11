$(document).ready(function () {
    $('#views_block li a').click(
            function () {
                displayImage($(this));
                return false;
            }
    );
});

$(document).ready(function () {
    $('body.content_only').each(function () {
        $("select,input:not([type=submit],[type=button],.comparator,#search_query_top),textarea").uniform();

        $(document).on('click', '.product_quantity_up', function (e) {
            e.preventDefault();
            fieldName = $(this).data('field-qty');
            var currentVal = parseInt($('input[name=' + fieldName + ']').val());
            if (!isNaN(currentVal)) {
                $('input[name=' + fieldName + ']').val(currentVal + 1).trigger('keyup');
            }
        });

        $(document).on('click', '.product_quantity_down', function (e) {
            e.preventDefault();
            fieldName = $(this).data('field-qty');
            var currentVal = parseInt($('input[name=' + fieldName + ']').val());
            if (!isNaN(currentVal) && currentVal > 1) {
                $('input[name=' + fieldName + ']').val(currentVal - 1).trigger('keyup');
            } else {
                $('input[name=' + fieldName + ']').val(1);
            }
        });
        $('body.content_only .ajax_add_to_cart_button').click(function () {
                window.parent.$('.fancybox-close').delay(1000).click();
        });
    });

});



//update display of the large image
function displayImage(domAAroundImgThumb, no_animation)
{

    if (domAAroundImgThumb.prop('href'))
    {
        var new_src = domAAroundImgThumb.attr('href').replace('thickbox', 'large');
        var new_title = domAAroundImgThumb.attr('title');
        var new_href = domAAroundImgThumb.attr('href');
        if ($('#bigpic').prop('src') != new_src)
        {
            $('#bigpic').attr({
                'src': new_src,
                'alt': new_title,
                'title': new_title
            }).load();
        }
        $('#views_block li a').removeClass('shown');
        $(domAAroundImgThumb).addClass('shown');
    }
}




function galeryReload() {

    $('#thumbs_list_frame').bxSlider({
        slideMargin: 10,
        slideWidth: 80,
        moveSlides: 1,
        prevText: '<i class="icon-chevron-sign-left"></i>',
        nextText: '<i class="icon-chevron-sign-right"></i>',
        pager: false,
        maxSlides: 4,
        infiniteLoop: false
    });

}
$(document).ready(galeryReload);




$(document).ready(function (e) {
    productWishlist();

    if ($("#product-image").length) {
        $("#product-image.fancybox").bind("click", function (e) {
            var ez = $('#product-image').data('elevateZoom');
            $.fancybox(ez.getGalleryList());
            return false;
        });
    }


    if ($('.bxslider').length) {
        $('.bxslider').bxSlider({
            minSlides: 2,
            maxSlides: 6,
            slideWidth: 178,
            slideMargin: 20,
            pager: false,
            nextText: '',
            prevText: '',
            moveSlides: 1,
            infiniteLoop: false,
            hideControlOnEnd: true
        });
    }

});


function productWishlist() {

    $('.favorite a').poshytip({
        followCursor: true,
        className: 'tip-darkgray',
        showOn: 'hover',
        alignTo: 'target',
        alignX: 'inner-left',
        offsetX: 0,
        offsetY: 5
    });



    $('.favorite a').click(function () {
        var wishlist = $.cookie('shop_wishlist');
        if (!$(this).hasClass('checked')) {
            if (wishlist) {
                wishlist += ',' + $(this).data('id');
            } else {
                wishlist = '' + $(this).data('id');
            }
            $(this).poshytip('update', '<a style="color:#FFF; text-decoration:underline;" href="' + wishlist_url + '">Просмотреть ' + wishlist.split(',').length + '</a>', true);
            $.cookie('shop_wishlist', wishlist, {expires: 30, path: '/'});
            $(this).addClass('checked');
            $(this).text('Удалить из избранного');
        } else {
            if (wishlist) {
                wishlist = wishlist.split(',');
            } else {
                wishlist = [];
            }
            var i = $.inArray($(this).data('id') + '', wishlist);
            if (i != -1) {
                wishlist.splice(i, 1);
            }
            if (wishlist) {
                $.cookie('shop_wishlist', wishlist.join(','), {expires: 30, path: '/'});
            } else {
                $.cookie('shop_wishlist', null);
            }
            $(this).poshytip('update', add_to_wishlist);
            $(this).removeClass('checked');
            $(this).text('Добавить в избранное');
        }
        return false;
    });
}