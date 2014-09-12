jQuery(function($) {
    $(document).ready(function() {
        initCompare();
        initWishlist();
        if (tagcanvas) {
            initTagcanvas();
        }
        if (filter_slider) {
            initFilterSlider();
        }

        if (quick_view) {
            initQuickview();
        }
    });
});

function initFilterSlider() {
    $('#filter-slider').slider({
        range: true,
        min: filter_slider_min_value,
        max: filter_slider_max_value,
        values: [filter_slider_min_price, filter_slider_max_price],
        slide: function(event, ui) {
            var v = ui.values[0];
            if (v == $(this).slider('option', 'min')) {
                v = '';
            }
            $('.filters input[name="price_min"]').val(v);
            v = ui.values[1];
            if (v == $(this).slider('option', 'max')) {
                v = '';
            }
            $('.filters input[name="price_max"]').val(v);
        },
        stop: function(event, ui) {
            $('input[name="price_min"]').change();
        }
    });
    $(".filters input[name=price_min], .filters input[name=price_max]").change(function() {
        var min = parseFloat($(".filters input[name=price_min]").val());
        if (!min) {
            min = $("#filter-slider").slider('option', 'min');
        }
        var max = parseFloat($(".filters input[name=price_max]").val());
        if (!max) {
            max = $("#filter-slider").slider('option', 'max');
        }
        if (max >= min) {
            $("#filter-slider").slider('option', 'values', [min, max]);
        }
    });
}

function initTagcanvas() {
    if ($('#tag-cloud-canvas #canvas').tagcanvas({
        textColour: $('#tag-cloud a').css('color'),
        outlineColour: '#000',
        outlineMethod: "colour",
        outlineThickness: 1,
        reverse: true,
        hideTags: true,
        depth: 0.8,
        maxSpeed: 0.05
    }, 'tag-cloud')) {
        $('#tag-cloud-canvas').show();
        $('#tag-cloud').hide();
    }
}

function initQuickview() {
    $(document).on('click', '.quick-view:visible', function(e)
    {
        e.preventDefault();
        var url = this.href;
        $.fancybox({
            'padding': 0,
            'width': 1087,
            'height': 610,
            'type': 'iframe',
            'href': url + '?content_only=1'
        });
    });
}
function initWishlist() {

    $('.product_list#wishlist_list').on('click', '.add_to_wishlist', function() {
        if ($(this).hasClass('checked')) {
            $(this).closest('li').remove();
        }
    });
    $('.add_to_wishlist').poshytip({
        followCursor: true,
        className: 'tip-darkgray',
        showOn: 'hover',
        alignTo: 'target',
        alignX: 'inner-left',
        offsetX: 0,
        offsetY: 5
    });

    $('.product_list').on('click', '.add_to_wishlist', function() {
        var wishlist = $.cookie('shop_wishlist');
        if (!$(this).hasClass('checked')) {
            if (wishlist) {
                wishlist += ',' + $(this).data('id');
            } else {
                wishlist = '' + $(this).data('id');
            }
            //$(this).poshytip('update', remove_from_wishlist);
            $(this).poshytip('update', '<a style="color:#FFF; text-decoration:underline;" href="' + wishlist_url + '">Просмотреть ' + wishlist.split(',').length + '</a>', true);
            $.cookie('shop_wishlist', wishlist, {expires: 30, path: '/'});
            $(this).addClass('checked');
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
        }
        return false;
    });
}


function initCompare() {
    $('.add_to_compare').poshytip({
        followCursor: true,
        className: 'tip-darkgray',
        showOn: 'hover',
        alignTo: 'target',
        alignX: 'inner-left',
        offsetX: 0,
        offsetY: 5
    });


    $('.product_list').on('click', '.add_to_compare', function() {
        var compare = $.cookie('shop_compare');
        if (!$(this).hasClass('checked')) {
            if (compare) {
                compare += ',' + $(this).data('id');
            } else {
                compare = '' + $(this).data('id');
            }
            $(this).poshytip('update', remove_from_compare);
            $('.total-compare-val').text(compare.split(',').length);
            if (compare.split(',').length > 1) {
                compare_url = compare_url.replace(/compare\/.*$/, 'compare/' + compare + '/');
                $(this).poshytip('update', '<a style="color:#FFF; text-decoration:underline;" href="' + compare_url + '">Сравнить ' + compare.split(',').length + '</a>', true);
                $(".bt_compare_bottom").removeAttr('disabled');
            }
            $.cookie('shop_compare', compare, {expires: 30, path: '/'});
            $(this).addClass('checked');
        } else {
            if (compare) {
                compare = compare.split(',');
            } else {
                compare = [];
            }
            var i = $.inArray($(this).data('id') + '', compare);
            if (i != -1) {
                compare.splice(i, 1);
            }
            $('.total-compare-val').text(compare.length);

            if (compare.length < 2) {
                $(".bt_compare_bottom").attr('disabled', 'disabled');
            }
            if (compare) {
                $.cookie('shop_compare', compare.join(','), {expires: 30, path: '/'});
            } else {
                $.cookie('shop_compare', null);
            }
            $(this).poshytip('update', add_to_compare);

            $(this).removeClass('checked');
        }
        if ($(".bt_compare_bottom").attr('href')) {
            var url = $(".bt_compare_bottom").attr('href').replace(/compare\/.*$/, 'compare/' + compare + '/');
            $(".bt_compare_bottom").attr('href', url);
        }
        return false;
    });
}



jQuery(function($) {
    $(document).ready(function() {
        $("#first-currencies a").click(function() {
            var url = location.href;
            if (url.indexOf('?') == -1) {
                url += '?';
            } else {
                url += '&';
            }
            location.href = url + 'currency=' + $(this).data('code');
            return false;
        });

    });
});



function blockHover(status)
{
    $(document).off('mouseenter').on('mouseenter', '.product_list.grid li.ajax_block_product .product-container', function(e) {

        if ('ontouchstart' in document.documentElement)
            return;
        if ($('body').find('.container').width() == 1170)
        {
            $(this).parent().addClass('hovered');
        }
    });

    $(document).off('mouseleave').on('mouseleave', '.product_list.grid li.ajax_block_product .product-container', function(e) {
        if ($('body').find('.container').width() == 1170)
            $(this).parent().removeClass('hovered').removeAttr('style');
    });
}

$(document).ready(function() {
    blockHover();
    bindGrid();


    if ($('#is_product_page').length) {
        var $this = $('#is_product_page');
        var products = $.cookie('viewed_products');
        if (products) {
            products = products.split(',');
        } else {
            products = [];
        }

        var i = $.inArray($this.val(), products);
        if (i != -1) {
            products.splice(i, 1);
        }
        products.unshift($this.val());
        if (products) {
            $.cookie('viewed_products', products.join(','), {expires: 30, path: '/'});
        }

    }


    $('#selectProductSort option').click(function() {
        location.assign($(this).val());
    });

    $('#nb_item').change(function() {
        if ($(this).val()) {
            $.cookie('products_per_page', $(this).val(), {expires: 30, path: '/'});
        } else {
            $.cookie('products_per_page', '', {expires: 0, path: '/'});
        }
        location.reload();
    });






    $('.dialog').on('click', 'a.dialog-close', function() {
        $(this).closest('.dialog').hide().find('.cart').empty();
        return false;
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $(".dialog:visible").hide().find('.cart').empty();
        }
    });


    $("#center_column").on('submit', '.product_list .addtocart', function() {
        var f = $(this);
        if (f.data('url')) {
            var d = $('#dialog');
            var c = d.find('.cart');
            c.load(f.data('url'), function() {
                c.prepend('<a href="#" class="dialog-close">&times;</a>');
                d.show();
                if ((c.height() > c.find('form').height())) {
                    c.css('bottom', 'auto');
                } else {
                    c.css('bottom', '15%');
                }
            });
            return false;
        }
        $.post(f.attr('action') + '?html=1', f.serialize(), function(response) {
            if (response.status == 'ok') {
                var cart_total = $(".shopping_cart");

                var origin = f.closest('.ajax_block_product');
                var block = $('<div></div>').append(origin.clone().removeClass('col-md-4 col-sm-6'));
                var insertAfter = f.closest('.ajax_block_product');
                if (origin.hasClass('product-box') || $('#product_comparison').length) {
                    insertAfter = $('#columns');
                }


                block.css({
                    'z-index': 10,
                    top: origin.offset().top - $(window).scrollTop(),
                    left: origin.offset().left,
                    width: origin.width() + 'px',
                    height: origin.height() + 'px',
                    position: 'fixed',
                    overflow: 'hidden'
                }).insertAfter(insertAfter).animate({
                    top: cart_total.offset().top - origin.height(),
                    left: cart_total.offset().left
                }, 500, function() {
                    $(this).remove();
                    if (cart_total.find('dt[data-id=' + response.data.item_id + ']').length) {
                        var item = cart_total.find('dt[data-id=' + response.data.item_id + ']');
                        var quantity = parseInt(item.find('.quantity').text());
                        item.find('.quantity').text(quantity + 1);
                        cart_total.find('.ajax_block_cart_total').html(response.data.total);
                        cart_total.find('.ajax_cart_quantity').text(response.data.count);
                    } else {
                        var info = origin.find('.ajax_product_info');
                        var tpl_data = {
                            url: info.data('url'),
                            name: info.data('name'),
                            img: info.data('img'),
                            price: info.data('price'),
                            quantity: 1,
                            id: response.data.item_id
                        };

                        $('#cart_block_list_item_tmpl').tmpl(tpl_data).appendTo('.cart_block_list .products');
                        cart_total.find('.ajax_block_cart_total').html(response.data.total);
                        cart_total.find('.ajax_cart_quantity').html(response.data.count);
                        cart_total.find('.ajax_cart_discount').html(response.data.discount);


                        cart_total.find('.ajax_cart_no_product').addClass('unvisible');
                        cart_total.find('.ajax_cart_product_txt_s').removeClass('unvisible');
                        cart_total.find('.ajax_cart_quantity').removeClass('unvisible');

                    }
                });


                if (response.data.error) {
                    alert(response.data.error);
                }
            } else if (response.status == 'fail') {
                alert(response.errors);
            }
        }, "json");
        return false;
    });

    $('.filters.ajax form input').change(function() {
        var f = $(this).closest('form');
        var url = '?' + f.serialize();
        $(window).lazyLoad && $(window).lazyLoad('sleep');
        $.get(url, function(html) {
            var tmp = $('<div></div>').html(html);
            $('.product_list').html(tmp.find('.product_list').html());
            //if (!!(history.pushState && history.state !== undefined)) {
            //    window.history.pushState({}, '', url);
            //}
            //$(window).lazyLoad && $(window).lazyLoad('reload');
        });
    });
});



function bindGrid()
{
    var view = $.cookie('display');

    if (!view) {
        view = default_product_view;
    }
    if (view && view != 'grid') {
        display(view);
    } else {
        $('.display').find('li#grid').addClass('selected');
    }
    $(document).on('click', '#grid', function(e) {
        e.preventDefault();
        display('grid');
    });

    $(document).on('click', '#list', function(e) {
        e.preventDefault();
        display('list');
    });
}

function display(view)
{
    var html = '';
    var nbItemsPerLine = 3;
    var nbItemsPerLineTablet = 2;
    if (view == 'list')
    {
        $('ul.product_list').removeClass('grid').addClass('list row');
        $('.product_list > li').removeClass('col-xs-12 col-sm-' + 12 / nbItemsPerLineTablet + ' col-md-' + 12 / nbItemsPerLine).addClass('col-xs-12');
        $('.product_list > li').each(function(index, element) {
            html = '';
            html = '<div class="product-container"><div class="row">';
            html += '<div class="left-block col-xs-4 col-xs-5 col-md-4">' + $(element).find('.left-block').html() + '</div>';
            html += '<div class="center-block col-xs-4 col-xs-7 col-md-4">';
            html += '<h5 itemprop="name">' + $(element).find('h5').html() + '</h5>';
            var rating = $(element).find('.comments_note').html();
            if (rating != null) {
                html += '<div itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating" class="comments_note">' + rating + '</div>';
            }
            html += '<p class="product-desc">' + $(element).find('.product-desc').html() + '</p>';
            var colorList = $(element).find('.color-list-container').html();
            if (colorList != null) {
                html += '<div class="color-list-container">' + colorList + '</div>';
            }
            var availability = $(element).find('.availability').html();
            if (availability != null) {
                html += '<span class="availability">' + availability + '</span>';
            }
            html += '</div>';
            html += '<div class="right-block col-xs-4 col-xs-12 col-md-4"><div class="right-block-content row">';
            var price = $(element).find('.content_price').html();
            if (price != null) {
                html += '<div class="content_price col-xs-5 col-md-12">' + price + '</div>';
            }
            html += '<div class="button-container col-xs-7 col-md-12">' + $(element).find('.button-container').html() + '</div>';
            html += '<div class="functional-buttons clearfix col-sm-12">' + $(element).find('.functional-buttons').html() + '</div>';
            html += '</div>';
            html += '</div></div>';
            $(element).html(html);
        });
        $('.display').find('li#list').addClass('selected');
        $('.display').find('li#grid').removeAttr('class');
        $.cookie('display', 'list', {expires: 30, path: '/'});
    }
    else
    {
        $('ul.product_list').removeClass('list').addClass('grid row');
        $('.product_list > li').removeClass('col-xs-12').addClass('col-xs-12 col-sm-' + 12 / nbItemsPerLineTablet + ' col-md-' + 12 / nbItemsPerLine);
        $('.product_list > li').each(function(index, element) {
            html = '';
            html += '<div class="product-container">';
            html += '<div class="left-block">' + $(element).find('.left-block').html() + '</div>';
            html += '<div class="right-block">';
            html += '<div class="product-flags">' + $(element).find('.product-flags').html() + '</div>';
            html += '<h5 itemprop="name">' + $(element).find('h5').html() + '</h5>';
            var rating = $(element).find('.comments_note').html(); // check : rating
            if (rating != null) {
                html += '<div itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating" class="comments_note">' + rating + '</div>';
            }
            html += '<p itemprop="description" class="product-desc">' + $(element).find('.product-desc').html() + '</p>';
            var price = $(element).find('.content_price').html(); // check : catalog mode is enabled
            if (price != null) {
                html += '<div class="content_price">' + price + '</div>';
            }
            html += '<div itemprop="offers" itemscope itemtype="http://schema.org/Offer" class="button-container">' + $(element).find('.button-container').html() + '</div>';
            var colorList = $(element).find('.color-list-container').html();
            if (colorList != null) {
                html += '<div class="color-list-container">' + colorList + '</div>';
            }
            var availability = $(element).find('.availability').html(); // check : catalog mode is enabled
            if (availability != null) {
                html += '<span class="availability">' + availability + '</span>';
            }
            html += '</div>';
            html += '<div class="functional-buttons clearfix">' + $(element).find('.functional-buttons').html() + '</div>';
            html += '</div>';
            $(element).html(html);
        });
        $('.display').find('li#grid').addClass('selected');
        $('.display').find('li#list').removeAttr('class');
        $.cookie('display', 'grid', {expires: 30, path: '/'});
    }
}