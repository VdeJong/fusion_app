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

var loadDelay = 300;

$('.chat').on('click', function () {
    $('.chat-overview-section').addClass('not-slide-right');
    $('.chat-detail-section').removeClass('hide');

    setTimeout(function() {
        $('.chat-overview-section').addClass('hide');
        $('.chat-detail-section').removeClass('not-slide-right');
    }, loadDelay);
});

$('.chat-detail-section-back').on('click', function () {
    $('.chat-detail-section').addClass('hide');
    $('.chat-overview-section').removeClass('not-slide-right');

    setTimeout(function() {
        $('.chat-detail-section').addClass('not-slide-right');
        $('.chat-overview-section').removeClass('hide');
    }, loadDelay);
});