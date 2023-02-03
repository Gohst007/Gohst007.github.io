
function load_btn(fn) {

    let btn_icon = $('.form-btn .btn-icon');
    let btn_txt = $('.form-btn .btn-text');

    switch (fn) {
        case 'start':
            btn_icon[0].hidden = false;
            btn_txt[0].hidden = true;
            break;
        case 'stop':
            setTimeout(() => {
                btn_icon[0].hidden = true;
                btn_txt[0].hidden = false;
            }, 2000);
            break;
    }
}

function validate_input(obj) {
    let return_value;
    let temp;

    let input = $(obj);

    if (input.val().length < 0) {
        return_value = { error: 'empty' }
    }
    else {
        if (input.attr('user-form') == 'register') {
            switch (input.attr('name')) {
                case 'registerNames':
                    if (input.val().length < 3) {
                        return_value = { status: 'error', msg: 'Minimum 3' }
                        break;
                    }
                    break;
                case 'registerUsername':
                    if (input.attr('user-form') == 'register') {
                        let user = /[a-z]/g;
                        if (user.test(input.val())) {
                            user = /[A-Z]/g;

                            if (user.test(input.val()) == false) {
                                return_value = { status: 'error', msg: 'a-z, A-Z required' }
                                break;
                            }
                        }
                        else {
                            return_value = { status: 'error', msg: 'a-z required' }
                            break;
                        }
                    }
                    else if (input.attr('user-form') == 'login') { }
                    break;
                case 'registerEmail':
                    let email = /[@]/g;
                    if (email.test(input.val()) == false) {
                        return_value = { status: 'error', msg: 'Invalid email format' }
                        break;
                    }
                    break;
                case 'registerPassword':
                    let val = input.val();

                    if (val.length > 3) {
                        let pattern;
                        pattern = /[a-z]/g;

                        if (pattern.test(val)) {
                            pattern = /[A-Z]/g;

                            if (pattern.test(val)) {
                                pattern = /[!@#%&]/g;

                                if (pattern.test(val)) {
                                    pattern = /[0-9]/g;

                                    if (pattern.test(val)) {
                                        temp = val;
                                    }
                                    else {
                                        return_value = { status: 'error', msg: 'a-z, A-Z, !@#%&, 0-9 required' }
                                        break;
                                    }
                                }
                                else {
                                    return_value = { status: 'error', msg: 'a-z, A-Z, !@#%& required' }
                                    break;
                                }
                            }
                            else {
                                return_value = { status: 'error', msg: 'a-z, A-Z required' }
                                break;
                            }
                        }
                        else {
                            return_value = { status: 'error', msg: 'a-z required' }
                            break;
                        }
                    }
                    else {
                        return_value = { status: 'error', msg: 'Minimum 4' }
                        break;
                    }
                    break;
                case 'registerConfirmPassword':
                    temp = input.attr('ps');

                    if (input.val() != temp) {
                        return_value = { status: 'error', msg: 'Passwords do not match' }
                        break;
                    }
                    else {
                        return_value = { status: 'success', msg: 'proceed' }
                    }
                    break;
            }
        }
        else if (input.attr('user-form') == 'login') {
            if (input.val() == ' ') {
                return_value = { status: 'error', msg: 'Required' }
            }
            else {
                return_value = { status: 'success', msg: 'proceed' }
            }
        }
    }

    return return_value;
}

function svr(inputs = []) {
    // let return_value;
    let input;
    let data = [];

    inputs.each(function () {
        input = $(this);
        data[input.attr('name')] = input.val();
    });

    let process = { reason: 'login', data: data };

    flash('core/app.php', process)
        .then(response => {
            load_btn('stop');

            let feed = response.feed;

            feed = JSON.parse(feed);

            console.log(feed);
        });
}

function load_page(page) {
    let container = $('.index-content-container');
    let list = $('.links-list');
    let links = list.children();

    links.each(function() {
        if ($(this).hasClass('active') && $(this).attr('link-target') !== page) {
            $(this).removeClass('active');
        }

        if ($(this).attr('link-target') == page) {
            $(this).addClass('active');
        }
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

    container.load('http://gohst007.github.io/account/pages/html/' + page + '.html', function (e) {
        setTimeout(() => {
            let text;

            switch (page) {
                case 'home':
                        text = "Home";
                    break;
                case 'messages':
                    text = "Messages";
                break;
                case 'game':
                    text = "Play Now";
                break;
                case 'wallet':
                    text = "Funds Center";
                break;
                case 'myaccount':
                    text = "Profile Center";
                break;
                case 'referrals':
                    text = "Referral Center";
                break;
                case 'howtoplay':
                    text = "User Guide";
                break;
            }

            $('.page-title').html(text);
            $('.index-content-loader').attr('hidden', true);
            setTimeout(() => {
                $('.index-content-container').attr('hidden', false);
            }, 500);
        }, 1000);
    });
}

function side_menu_nav() {
    let links = $('.side-menu-link');
    let parent, page;

    links.each(function (e) {
        $(this).click(function (e) {
            e.preventDefault();
            parent = $(this).parent('li');
            page = parent.attr('link-target');

            load_page(page);
        });
    });
}

export function init_app() {
    load_content('.index-page-content');
    side_menu_nav();
    $('.side-menu-link.home-init-btn').click();

    $('.sidebar-toggle').on('click', function (e) {
        if (innerWidth < 500) {
            if ($('#sidebar').hasClass('shrinked')) {
                $('.section-content-container').css('display', 'none');
            }
            else {
                $('.section-content-container').css('display', 'block');
            }
        }
    });
}