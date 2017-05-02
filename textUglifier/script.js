$(function() {
  "use strict";
  var $input = $("#userInput");
  var $button = $('.button');
  
  new Clipboard('.button');
  
  $input.on('input', function() {
    $button.val("Copy");
    $input.val(uglify($input.val()));
  });
  
  $button.on('click', function() {
    $button.val("Copied!");
    setTimeout(function() {
      $input.val("").blur();
    }, 0);
  });

  function uglify(text) {
    var result = text.split(" ");
    // capitalise everything but first letter
    result = result.map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    result = result.map(function(word) {
      return word.split('').map(function(letter) {
        switch (letter) {
          case 'a':
            letter = '4';
            break;
          case 'e':
            letter = '3';
            break;
          case 'i':
            letter = '1';
            break;
          case 'o':
            letter = '0';
            break;
          case 's':
            letter = '5';
            break;
          default:
            letter = letter;
            break;
                      };
        return letter;
      }).join('');
    });
    return result.join(" ");
  }
  
});
