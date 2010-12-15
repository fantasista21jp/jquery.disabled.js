/*
 * jQuery pagescroller (jQuery Plugin)
 *
 * Copyright (c) 2010 Tom Shimada
 *
 * Depends Script:
 *	js/jquery.js (1.3.2~)
 */

(function($) {
  $.disabled = {
    defaults: {
      id: 'jquery-disabled-'+new Date().getTime(),
      zIndex: 99999,
      backgroundColor: '#FFFFFF',
      opacity: 0,
      close: false
    },
    is_msie6: (!$.support.style && typeof document.documentElement.style.maxHeight === 'undefined')
  };

  $.disabled.on = function(configs) {
    configs = $.extend(this.defaults, configs);

    var $disabled = $('<div id="'+configs.id+'"></div>').css({
          top: '0px',
          left: '0px',
          backgroundColor: configs.backgroundColor,
          opacity: configs.opacity,
          position: 'absolute',
          zIndex: configs.zIndex
        }).appendTo('body');
    var width = 0,
        height = 0;

    var $body = $('body'),
        bodyWidth = $body.width(),
        bodyHeight = $body.height();
    _fit();
    $(window).bind('resize', _fit);

    if (configs.close === true) {
      $disabled.css({
        cursor: 'pointer'
      }).click(function(){
        $.disabled.off(configs);
      });
    }

    var selectboxes = [];
    if (this.is_msie6) {
      $('select:visible').each(function(){
        var $selectbox = $(this);
        selectboxes.push($selectbox);
        $selectbox.css('visibility', 'hidden');
      });
    }
    $.data($disabled.get(0), 'selectboxes', selectboxes);

    function _fit() {
      if ($disabled.length === 0) {
        $(window).unbind('resize', _fit);
        return;
      }
      var $window = $(window),
          $document = $(document),
          width = Math.ceil(bodyWidth > $window.width() ? $document.width() : $window.width()),
          height = Math.ceil(bodyHeight > $window.height() ? $document.height() : $window.height());
      $disabled.css({
        width: width + 'px',
        height: height + 'px'
      });
    }
  };

  $.disabled.off = function(configs) {
    configs = $.extend(this.defaults, configs);

    var $disabled = $('#'+configs.id),
        selectboxes = $.data($disabled.get(0), 'selectboxes');

    $.each(selectboxes, function(){
      this.css('visibility', '');
    });

    $disabled.remove();
  };
})(jQuery);
