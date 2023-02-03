async function flash(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        redirect: 'follow',
        body: JSON.stringify(data)
    });

    return response.json();
}

function load_content(elem) {
    let modal_container = $('#index-modal');

    modal_container.addClass('d-flex');

    if ($(elem).attr('hidden') == false) {
        $(elem).attr('hidden', true);
    }

    modal_container.modal({
        keyboard: false,
        backdrop: 'static',
        show: true
    });

    $('.index-content-container').attr('hidden', true);
    $('.index-content-loader').css({
        width: '100%',
        height: '80%'
    });
    $('.index-content-loader').children('div.row').css({
        width: '100%',
        height: '100%'
    });
    
    $('.index-content-loader').attr('hidden', false);

    setTimeout(() => {
        modal_container.css('display','none');
        modal_container.modal('hide');
        modal_container.removeClass('d-flex');
        $(elem).attr('hidden', false);
    }, 2000);
}

function load_page_content() {
    $('.index-content-container').load('http://localhost/game/account/pages/html/index.html', function (e) {
        let btn = $('.index-load-btn');

        btn.each(function() {
            $(this).click(function(e) {
                let modal = $('#index-modal');
                
                modal.modal({
                    keyboard: false,
                    backdrop: 'static',
                    show: true
                });
    
                let modal_load = modal.children().children().children().children('.modal-load');
                let modal_info = modal.children().children().children().children('.modal-info');
    
                if (modal_load.is('hidden') == false) {
                    if (modal_info[0].hidden == true) {
                        modal_load.hide();
                        modal_info[0].hidden = false;
                        modal_radius('10px');
                    }
                }

                let game_id = $(this).attr('game-id');
                let game = $(this).attr('game');
                let platform = $(this).attr('platform');

                let modal_title = modal_info.children('.modal-header').children('.modal-title');
                let modal_body = modal_info.children('.modal-body');

                let modal_body_text = modal_body.children('p');

                modal_title.html(game);
                modal_body_text.html('Game settings')
    
                console.log(game_id, game, platform);
            });
        });
    });
}

function modal_radius(val) {
    $('body').get(0).style.setProperty('--modal-radius',val);
}

function modal_content(opt = {}) {}