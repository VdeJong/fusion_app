function init() {
    // Init Foundation
    $(document).foundation();

    // Init Swiper
    var swiperContainer = $('.swiper-container');
    if(swiperContainer.length) {
      var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 10,
        speed: 600,
        paginationBulletRender: function (swiper, index, className) {
          var arrTeams = ['HCR', 'HC Tilburg'];
          return '<li class="'+ className +'"><img src="images/clublogo-'+ (index + 1) +'.png" alt="'+ arrTeams[index] +'"><span>'+ arrTeams[index] +'</span></li>';
        },
        onSlideChangeStart: function() {
          var teamSelectionWrap = $('.team-selection');
          var paginationBullet = $('.swiper-pagination-bullet:nth-child(1)');

          if(paginationBullet.hasClass('swiper-pagination-bullet-active')) {
            teamSelectionWrap.removeClass('right-active').addClass('left-active');
          } else {
            teamSelectionWrap.removeClass('left-active').addClass('right-active');
          }
        }
      });
    }

    // function to get participants from .json file
    $.getJSON('../participants.json', function (data) {
        $.each(data.men, function (i, f) {
            // var userBlock = '<div class="block user-block"><div class="block-container"><div class="image blur-20"><figure><img src="'+ f.afbeelding + '" alt=""></figure></div><div class="information"><h4>' + f.naam +' (' + f.leeftijd + ' jaar)' + '</h4><p>' + f.tekens + ' tekens </p></div></div></div>';
            var userBlock = '<div class="block user-block"><div class="block-container"><div class="image blur-' + f.blur + '"><figure><img src="' + f.afbeelding + '" alt=""></figure></div><div class="information"><h4>' + f.naam + ' (' + f.leeftijd + ' jaar) <span><img src="images/block-' + f.status + '.png" alt=""></span></h4><p>' + f.tekens + ' tekens</p></div></div></div>';

            $(userBlock).appendTo(".men-user-blocks");
        });
        $.each(data.women, function (i, f) {
            // var userBlock = '<div class="block user-block"><div class="block-container"><div class="image blur-20"><figure><img src="'+ f.afbeelding + '" alt=""></figure></div><div class="information"><h4>' + f.naam + ' (' + f.leeftijd + ' jaar)' + '</h4><p>' + f.tekens + ' tekens </p></div></div></div>';
            var userBlock = '<div class="block user-block"><div class="block-container"><div class="image blur-' + f.blur + '"><figure><img src="' + f.afbeelding + '" alt=""></figure></div><div class="information"><h4>' + f.naam + ' (' + f.leeftijd + ' jaar) <span><img src="images/block-' + f.status + '.png" alt=""></span></h4><p>' + f.tekens + ' tekens</p></div>' +
            '<div class="open-chat"><a href="'+ f.chatlink +'"><img src="images/block-chat.png" alt=""><div class="count-messages ' + f.hideCount + '">' + f.messages + '</div></a></div></div></div>';

            $(userBlock).appendTo(".women-user-blocks");
        });

        // Demo: open popup
        var womenUsers = $('.women-user-blocks');
        var firstUser = womenUsers.find('.user-block').first();
        var userImage = firstUser.find('.image');
        var popupJosefien = $('.pop-up-josefien');
        var button = popupJosefien.find('.clear-blur');

        userImage.on('click', function() {
          popupJosefien.removeClass('not-show');
        });
        button.on('click', function(e) {
          e.preventDefault();
          var listImage = userImage[0];
          var popupImage = popupJosefien.find('.image');

          // Split
          var splitted = listImage.classList[1].split('-');
          splitted[1] = splitted[1] - 10;

          if(splitted[1] <= 0) {
            $(this).addClass('disabled');
          }
          $(listImage).removeClass().addClass('image').addClass('blur-'+ splitted[1]);
          $(popupImage).removeClass().addClass('image').addClass('blur-'+ splitted[1]);
        });
    });

    // Close pop-up
    $('.close').on('click', function() {
      $(this).parent().parent().addClass('not-show');
    });

    // Show popup on chat
    var sendChatmessage = $('.send-message');
    var popupSofie = $('.pop-up-sofie');
    sendChatmessage.on('click', function(e) {
      popupSofie.removeClass('not-show');
    });

    // Toggle tabs matches
    var matchBlocks = $('.matchup-block');
    if(matchBlocks.length) {
      $.each(matchBlocks, function(k, v) {
        $(this).on('click', function() {
          if($(this).hasClass('open')) {
            $(this).removeClass('open');
          } else {
            $(this).addClass('open');
          }
        })
      });
    }

    // GLOBALS
    var $message = $('#message'),
        loadDelay = 300;

    // $('#login').click(function (e) {
    //     e.preventDefault();
    //     $('.page.login').addClass('not-show');
    //     $('.page.overview').removeClass('hide');
    //
    //     setTimeout(function () {
    //         $('.page.login').addClass('hide');
    //         $('.page.overview').removeClass('not-show');
    //     }, loadDelay);
    // });

    // Character count message
    counter = function () {
      var $totalChars = $('#totalChars'),
          charCount = $message.val(),
          availableChars = $message.data("input-max"),
          totalCharsLeft;

      if (charCount.length == 0) {
        totalCharsLeft = availableChars;
      } else {
        totalCharsLeft = (availableChars - charCount.length);
      }

      $totalChars.html(totalCharsLeft + ' tekens over');
    };
}
init();

$(document).ready(function () {
    var $message = $('#message');

    if($message.length) {
      counter();
      $message.change(counter);
      $message.keydown(counter);
      $message.keypress(counter);
      $message.keyup(counter);
      $message.blur(counter);
      $message.focus(counter);
    }
});

// $('.chat').on('click', function () {
//     $('.chat-overview-section').addClass('not-slide-right');
//     $('.chat-detail-section').removeClass('hide');
//
//     setTimeout(function () {
//         $('.chat-overview-section').addClass('hide');
//         $('.chat-detail-section').removeClass('not-slide-right');
//     }, loadDelay);
// });
//
// $('.chat-detail-section-back').on('click', function () {
//     $('.chat-detail-section').addClass('hide');
//     $('.chat-overview-section').removeClass('not-slide-right');
//
//     setTimeout(function () {
//         $('.chat-detail-section').addClass('not-slide-right');
//         $('.chat-overview-section').removeClass('hide');
//     }, loadDelay);
// });
