
$(document).ready(function() {

    //hover 'other views' images management
    $('#views_block li a').hover(
            function() {
                displayImage($(this));
            },
            function() {
            }
    );






    // The button to increment the product value
    $(document).on('click', '.product_quantity_up', function(e) {
        e.preventDefault();
        fieldName = $(this).data('field-qty');
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        if (quantityAvailable > 0) {
            quantityAvailableT = quantityAvailable;
        } else {
            quantityAvailableT = 100000000;
        }
        if (!isNaN(currentVal) && currentVal < quantityAvailableT) {
            $('input[name=' + fieldName + ']').val(currentVal + 1).trigger('keyup');
        } else {
            $('input[name=' + fieldName + ']').val(quantityAvailableT);
        }
    });
    // The button to decrement the product value
    $(document).on('click', '.product_quantity_down', function(e) {
        e.preventDefault();
        fieldName = $(this).data('field-qty');
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        if (!isNaN(currentVal) && currentVal > 1) {
            $('input[name=' + fieldName + ']').val(currentVal - 1).trigger('keyup');
        } else {
            $('input[name=' + fieldName + ']').val(1);
        }
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

});