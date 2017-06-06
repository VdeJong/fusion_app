function init() {
    // Init Foundation
    $(document).foundation();

    // Loginpage fadeOut/Overviewpage fadeIn
    var loadDelay = 300;
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
        var value = $('#message').val();

        if (value.length == 0) {
            $('#totalChars').html(0);
            return;
        }

        var regex = /\s+/gi;
        var totalChars = value.length;
        $('#totalChars').html(totalChars);
    }

    // function to get participants from .json file
    $.getJSON('../participants.json', function (data) {
        $.each(data.men, function (i, f) {
            var userBlock = '<div class="block user-block"><div class="block-container"><div class="image blur-20"><figure><img src="'+ f.afbeelding + '" alt=""></figure></div><div class="information"><h4>' + f.naam +' (' + f.leeftijd + ' jaar)' + '</h4><p>' + f.tekens + ' tekens </p></div></div></div>';

            $(userBlock).appendTo(".men-user-blocks");
        });
        $.each(data.women, function (i, f) {
            var userBlock = '<div class="block user-block"><div class="block-container"><div class="image blur-20"><figure><img src="'+ f.afbeelding + '" alt=""></figure></div><div class="information"><h4>' + f.naam + ' (' + f.leeftijd + ' jaar)' + '</h4><p>' + f.tekens + ' tekens </p></div></div></div>';

            $(userBlock).appendTo(".women-user-blocks");
        })

    });
}
init();

$(document).ready(function () {
    if ($('#message')) {
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