/*=================================================================================================

jQuery "textareaCounter" plugin

=================================================================================================*/

(function($){
  $.fn.textareaCounter = function(options) {
  
    // setting the defaults
    var defaults = {
      limit: 100
      , type: 'char'
      , label: ''
    };  

    /*

    Options:
    ---------------------
    limit: number
    type: 'char|word' (default = char)
    label: 'id|class' (for class include leading dot)

    Example usage:
    ---------------------
    $("textarea").textareaCounter({ limit: 100 });

    */
    var options = $.extend(defaults, options);
    
    // get the count
    function getCount(obj, elmLbl, type) {

      text = obj.val();

      if(text === "") {
        txtCount = 0;
      } else {
        // Word cound or Character count?
        txtCount = (options.type == 'word') ? $.trim(text).split(" ").length : txtCount = $.trim(text).length;
      }

      if(txtCount > options.limit) {
        var diff = (options.limit - txtCount);
        elmLbl.text(diff+type+'remaining').css('color','red');
      } else {
        elmLbl.text((options.limit - txtCount)+type+'remaining').css('color','green');
      } 

    }
    
    // and the plugin begins
    return this.each(function() {
      var obj, text, txtCount, limited, uiLabel, uiCounter;
      obj = $(this);

      // Which label do we need?
      uiLabel = (options.type == 'word') ? ' words ' : ' characters ';

      if (options.label === '') {

        uiCounter = $('<div class="text-counter">sdfgsdfgsdf'+options.limit + ' ' + uiLabel + 'remaining</div>');
        obj.after(uiCounter);

      } else {

        uiCounter = $(options.label);
        uiCounter.text(options.limit + ' ' + uiLabel + 'remaining');

      }

      $(document).ready(function() {
        getCount(obj, uiCounter, uiLabel);
      });

      if ($.browser.msie) {
        obj.keypress(function() {
          getCount(obj, uiCounter, uiLabel);
        });
        obj.change(function() {
          getCount(obj, uiCounter, uiLabel);
        });
      } else {
        obj.keyup(function() {
          getCount(obj, uiCounter, uiLabel);
        });
      }
      
    });
    
  };
})(jQuery);