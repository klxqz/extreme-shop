(function($) {
    "use strict";
    $.extremeShop = {
        options: {},
        init: function(options) {
            this.options = options;
            this.initCompare();
            this.initWishlist();
        },
        initMain: function() {

        },
        initWishlist: function() {

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
            var self = this;

            $('.product_list').on('click', '.add_to_wishlist', function() {
                var wishlist = $.cookie('shop_wishlist');
                if (!$(this).hasClass('checked')) {
                    if (wishlist) {
                        wishlist += ',' + $(this).data('id');
                    } else {
                        wishlist = '' + $(this).data('id');
                    }
                    $(this).poshytip('update', self.options.remove_from_wishlist);
                    if (wishlist.split(',').length > 1) {
                        $(this).poshytip('update', '<a style="color:#FFF; text-decoration:underline;" href="' + self.options.wishlist_url + '">Просмотреть ' + wishlist.split(',').length + '</a>', true);
                    }
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
                    $(this).poshytip('update', self.options.add_to_wishlist);
                    $(this).removeClass('checked');
                }
                return false;
            });
        },
        initCompare: function() {
            $('.add_to_compare').poshytip({
                followCursor: true,
                className: 'tip-darkgray',
                showOn: 'hover',
                alignTo: 'target',
                alignX: 'inner-left',
                offsetX: 0,
                offsetY: 5
            });
            var self = this;

            $('.product_list').on('click', '.add_to_compare', function() {
                var compare = $.cookie('shop_compare');
                if (!$(this).hasClass('checked')) {
                    if (compare) {
                        compare += ',' + $(this).data('id');
                    } else {
                        compare = '' + $(this).data('id');
                    }
                    $(this).poshytip('update', self.options.remove_from_compare);
                    if (compare.split(',').length > 1) {
                        $('.total-compare-val').text(compare.split(',').length);
                        $(this).poshytip('update', '<a style="color:#FFF; text-decoration:underline;" href="' + $(".bt_compare_bottom").attr('href') + '">Сравнить ' + compare.split(',').length + '</a>', true);
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
                    $(this).poshytip('update', self.options.add_to_compare);

                    $(this).removeClass('checked');
                }
                var url = $(".bt_compare_bottom").attr('href').replace(/compare\/.*$/, 'compare/' + compare + '/');
                $(".bt_compare_bottom").attr('href', url);

                return false;
            });
        }
    };
})(jQuery);


$(document).ready(function() {


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


    $('.dialog').on('click', 'a.dialog-close', function() {
        $(this).closest('.dialog').hide().find('.cart').empty();
        return false;
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $(".dialog:visible").hide().find('.cart').empty();
        }
    });

    $("#center_column").on('click', '.product_list .addtocart .ajax_add_to_cart_button', function() {
        $(this).closest('form').submit();
        return false;
    });

    $(".cart_block_list").on('click', '.products .ajax_cart_block_remove_link', function() {
        var product_block = $(this).closest('dt');
        var cart_total = $(".shopping_cart");
        $.post(cart_url + 'delete/', {id: product_block.data('id')}, function(response) {
            if (response.status == 'ok') {
                product_block.remove();
                cart_total.find('.ajax_block_cart_total').html(response.data.total);
                cart_total.find('.ajax_cart_quantity').html(response.data.count);
                cart_total.find('.ajax_cart_discount').html(response.data.discount);
                if (!response.data.count) {
                    cart_total.find('.ajax_cart_no_product').removeClass('unvisible');
                    cart_total.find('.ajax_cart_product_txt_s').addClass('unvisible');
                    cart_total.find('.ajax_cart_quantity').addClass('unvisible');
                }
            }
        }, 'json');
        return false;
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
                if (cart_total.find('dt[data-id=' + response.data.item_id + ']').length) {
                    var item = cart_total.find('dt[data-id=' + response.data.item_id + ']');
                    var quantity = parseInt(item.find('.quantity').text());
                    item.find('.quantity').text(quantity + 1);
                    cart_total.find('.ajax_block_cart_total').html(response.data.total);
                    cart_total.find('.ajax_cart_quantity').text(response.data.count);
                } else {
                    var origin = f.closest('li');
                    var block = $('<div></div>').append(origin.clone().removeClass('col-md-4 col-sm-6'));

                    block.css({
                        'z-index': 10,
                        top: origin.offset().top - $(window).scrollTop(),
                        left: origin.offset().left,
                        width: origin.width() + 'px',
                        height: origin.height() + 'px',
                        position: 'fixed',
                        overflow: 'hidden'
                    }).insertAfter(origin).animate({
                        top: cart_total.offset().top,
                        left: cart_total.offset().left,
                    }, 500, function() {
                        var info = origin.find('.ajax_product_info');
                        $(this).remove();
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


                    });
                }

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
            if (!!(history.pushState && history.state !== undefined)) {
                window.history.pushState({}, '', url);
            }
            $(window).lazyLoad && $(window).lazyLoad('reload');
        });
    });
});
