$(document).ready(function() {
    $('#views_block li a').hover(
            function() {
                displayImage($(this));
            },
            function() {
            }
    );

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



// Change the current product images regarding the combination selected
function refreshProductImages(id_product_attribute)
{
    $('#thumbs_list_frame').scrollTo('li:eq(0)', 700, {axis: 'x'});

    id_product_attribute = parseInt(id_product_attribute);


    var thumb_width = $('#thumbs_list_frame >li').width() + parseInt($('#thumbs_list_frame >li').css('marginRight'));
    $('#thumbs_list_frame').width((parseInt((thumb_width) * $('#thumbs_list_frame >li').length)) + 'px');
    $('#thumbs_list').trigger('goto', 0);

}
//To do after loading HTML
function galeryReload() {
    //init the serialScroll for thumbs
    $('#thumbs_list').serialScroll({
        items: 'li:visible',
        prev: '#view_scroll_left',
        next: '#view_scroll_right',
        axis: 'x',
        offset: 0,
        start: 0,
        stop: true,
        duration: 700,
        step: 1,
        lazy: true,
        lock: false,
        force: false,
        cycle: false
    });

    $('#thumbs_list').trigger('goto', 1);// SerialScroll Bug on goto 0 ?
    $('#thumbs_list').trigger('goto', 0);
}
$(document).ready(galeryReload);
$(window).resize(refreshProductImages);



$(document).ready(function(e) {
    productWishlist();

    if ($("#product-image").length) {
        $("#product-image").elevateZoom({
            zoomType: "window",
            cursor: "crosshair",
            zoomWindowFadeIn: 500,
            zoomWindowFadeOut: 750,
            gallery: "thumbs_list_frame",
            galleryActiveClass: "thumbActive",
            zoomWindowWidth: 400,
            borderSize: 1,
            borderColour: '#e5e5e5',
            lensOpacity: 0.7,
            scrollZoom: true,
            constrainType: 'width'
        });
        $("#product-image").bind("click", function(e) {
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


    $('.favorite a').click(function() {
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