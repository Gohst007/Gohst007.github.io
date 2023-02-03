
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

    let process = { reason: 'forgot', data: data };

    // flash('core/app.php', process)
    //     .then(response => {
    //         load_btn('stop');

    //         let feed = response.feed;

    //         feed = JSON.parse(feed);

    //         console.log(feed);
    //     });

    alert('Password reset successfull');

    setTimeout(() => {
        location.href="https://gohst007.github.io/account/";
    }, 1000);
}

export function init_app() {
    let form = $('.user-form');
    let inputs = $('.form-inputs');

    form.on('submit', (e) => {
        e.preventDefault();

        let qtemp;
        let temp;

        inputs.each(function () {

            if ($(this).attr('name') == 'registerPassword') {
                qtemp = $(this).val();
            }
            else if ($(this).attr('name') == 'registerConfirmPassword') {
                $(this).attr('ps', qtemp);
            }

            $(this).attr('user-form', 'login');

            temp = validate_input($(this));

            if (temp !== undefined) {
                if (temp.status == 'error') {
                    qtemp = '.' + $(this).attr('name') + '.feed';

                    $(qtemp).html(temp.msg);

                    setTimeout(() => {
                        $(qtemp).html('')
                    }, 2000);
                    return false;
                }
            }
        });

        if (temp.status == 'success') {
            load_btn('start');
            svr(inputs);
        }

        if (temp == undefined) {
            temp = { error: '0 work' }
        }
    });
}