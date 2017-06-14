function init() {
    // Init Foundation
    $(document).foundation();

    // GLOBALS
    var $message = $('#message'),
        loadDelay = 300;

    $('#login').click(function (e) {
        e.preventDefault();
        $('.page.login').addClass('not-show');
        $('.page.overview').removeClass('hide');

        setTimeout(function () {
            $('.page.login').addClass('hide');
            $('.page.overview').removeClass('not-show');
        }, loadDelay);
    });

    // Character count message
    counter = function () {
        var $totalChars = $('#totalChars'),
            charCount = $message.val(),
            availableChars = $message.data("input-max"),
            totalCharsLeft;

        if (charCount.length == 0) {
            totalCharsLeft = availableChars;
        }
        else {
            totalCharsLeft = (availableChars - charCount.length);
        }

        $totalChars.html(totalCharsLeft + ' tekens over');
    };


    // close pop-up
    $('.close').on('click', function () {
        $(this).parent().parent().addClass('hide');
    });


    // function to get participants from .json file
    $.getJSON('../participants.json', function (data) {
        $.each(data.men, function (i, f) {
            // var userBlock = '<div class="block user-block"><div class="block-container"><div class="image blur-20"><figure><img src="'+ f.afbeelding + '" alt=""></figure></div><div class="information"><h4>' + f.naam +' (' + f.leeftijd + ' jaar)' + '</h4><p>' + f.tekens + ' tekens </p></div></div></div>';
            var userBlock = '<div class="block user-block"><div class="block-container"><div class="image blur-' + f.blur + '"><figure><img src="' + f.afbeelding + '" alt=""></figure></div><div class="information"><h4>' + f.naam + ' (' + f.leeftijd + ' jaar) <span><img src="images/block-' + f.status + '.png" alt=""></span></h4><p>' + f.tekens + ' tekens</p></div></div></div>';

            $(userBlock).appendTo(".men-user-blocks");
        });
        $.each(data.women, function (i, f) {
            // var userBlock = '<div class="block user-block"><div class="block-container"><div class="image blur-20"><figure><img src="'+ f.afbeelding + '" alt=""></figure></div><div class="information"><h4>' + f.naam + ' (' + f.leeftijd + ' jaar)' + '</h4><p>' + f.tekens + ' tekens </p></div></div></div>';
            var userBlock = '<div class="block user-block"><div class="block-container"><div class="image blur-' + f.blur + '"><figure><img src="' + f.afbeelding + '" alt=""></figure></div><div class="information"><h4>' + f.naam + ' (' + f.leeftijd + ' jaar) <span><img src="images/block-' + f.status + '.png" alt=""></span></h4><p>' + f.tekens + ' tekens</p></div><div class="open-chat"><a href="#"><img src="images/block-chat.png" alt=""><div class="count-messages ' + f.hideCount + '">' + f.messages + '</div></a></div></div></div>';

            $(userBlock).appendTo(".women-user-blocks");
        })
    });
}
init();

$(document).ready(function () {
    var $message = $('#message');

    if ($message) {
        $message.change(counter);
        $message.keydown(counter);
        $message.keypress(counter);
        $message.keyup(counter);
        $message.blur(counter);
        $message.focus(counter);
    }
});


$('.chat').on('click', function () {
    $('.chat-overview-section').addClass('not-slide-right');
    $('.chat-detail-section').removeClass('hide');

    setTimeout(function () {
        $('.chat-overview-section').addClass('hide');
        $('.chat-detail-section').removeClass('not-slide-right');
    }, loadDelay);
});

$('.chat-detail-section-back').on('click', function () {
    $('.chat-detail-section').addClass('hide');
    $('.chat-overview-section').removeClass('not-slide-right');

    setTimeout(function () {
        $('.chat-detail-section').addClass('not-slide-right');
        $('.chat-overview-section').removeClass('hide');
    }, loadDelay);
});
