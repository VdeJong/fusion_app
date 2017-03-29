function init() {
  // Init Foundation
  $(document).foundation();

  // Character count message
  counter = function() {
    var value = $('#message').val();

    if (value.length == 0) {
      $('#totalChars').html(0);
      return;
    }

    var regex = /\s+/gi;
    var totalChars = value.length;
    $('#totalChars').html(totalChars);
  }
}
init();

$(document).ready(function() {
  if($('#message')) {
    $('#message').change(counter);
    $('#message').keydown(counter);
    $('#message').keypress(counter);
    $('#message').keyup(counter);
    $('#message').blur(counter);
    $('#message').focus(counter);
  }
});
