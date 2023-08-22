const validator = require('validator');
const moment = require('moment');
const { __ } = require('i18n');
module.exports = async data => {

    let errorArr = {
        status: true,
        message: ""
    };
    if (data && data.length > 0) {
        data.every(params => {
            if (params) {
                if (params.title) {
                    if (params.required) {
                        if (params.value) {
                            if (typeof params.value === 'object') {
                                if (Object.keys(params.value).length <= 0) {
                                    errorArr['status'] = false;
                                    errorArr['message'] = __("IS_REQUIRED", params.title);
                                    return false
                                } else {
                                    return true
                                }
                            } else {
                                if (typeof params.value !== params.type) {
                                    errorArr['status'] = false;
                                    errorArr['message'] = __("INVALID_TYPE", params.title);
                                    return false
                                } else {
                                    if (params.title === __('email')) {
                                        if (!validator.isEmail(params.value)) {
                                            errorArr['status'] = false;
                                            errorArr['message'] = __("EMAIL_INVALID");
                                            return false
                                        }
                                    } else if (params.title == __('mobileNumber')) {
                                        //Commenting for now //2020-20-02
                                        if (!validator.isMobilePhone(params.value.toString(), ['en-IN', 'en-US'])) {
                                            errorArr['status'] = false;
                                            errorArr['message'] = 'Please enter valid Mobile Number!.';
                                            return false
                                        }
                                    } else if (params.title.toLowerCase() == __('birthdate')) {
                                        if (!moment(params.value, 'YYYY-MM-DD', true).isValid()) {
                                            errorArr['status'] = false;
                                            errorArr['message'] = __("INVALID_DATE_FORMAT");
                                            return false
                                        }
                                        if (new Date(params.value) >= new Date()) {
                                            errorArr['status'] = false;
                                            errorArr['message'] = __("BIRTHDATE_SHOULD_LESS_THAN_CURRENT_DATE");
                                            return false
                                        }
                                    } else if (params.title.toLowerCase() == __('date')) {
                                        if (!moment(params.value, 'YYYY-MM-DD', true).isValid()) {
                                            errorArr['status'] = false;
                                            errorArr['message'] = __("INVALID_DATE_FORMAT");
                                            return false
                                        }
                                    }
                                    return true
                                }
                            }
                        } else {
                            errorArr['status'] = false;
                            errorArr['message'] = __("IS_REQUIRED", params.title)
                            return false
                        }
                    } else {
                        if (params.value != '' && params.value != undefined && params.value != null) {
                            if (typeof params.value == 'object') {
                                if (Object.keys(params.value).length <= 0) {
                                    errorArr['status'] = false;
                                    errorArr['message'] = __("IS_REQUIRED", params.title);
                                    return false
                                } else {
                                    return true
                                }
                            } else {
                                if (typeof params.value != params.type) {
                                    errorArr['status'] = false;
                                    errorArr['message'] = __("INVALID_TYPE", params.title);
                                    return false
                                } else {
                                    if (params.title == __('email')) {
                                        if (!validator.isEmail(params.value)) {
                                            errorArr['status'] = false;
                                            errorArr['message'] = __("EMAIL_INVALID");
                                            return false
                                        }
                                    } else if (params.title.toLowerCase() == __('birthdate')) {
                                        if (!moment(params.value, 'YYYY-MM-DD', true).isValid()) {
                                            errorArr['status'] = false;
                                            errorArr['message'] = __("INVALID_DATE_FORMAT");
                                            return false
                                        }

                                        if (new Date(params.value) >= new Date()) {
                                            errorArr['status'] = false;
                                            errorArr['message'] = __("BIRTHDATE_SHOULD_LESS_THAN_CURRENT_DATE");
                                            return false
                                        }
                                    } else if (params.title.toLowerCase() == __('date')) {
                                        if (!moment(params.value, 'YYYY-MM-DD', true).isValid()) {
                                            errorArr['status'] = false;
                                            errorArr['message'] = __("INVALID_DATE_FORMAT");
                                            return false
                                        }
                                    }
                                    return true
                                }
                            }
                        }
                        //return true to continue loop
                        return true
                    }
                } else {
                    errorArr['status'] = false;
                    errorArr['message'] = __("SPECIFY_PARAMS_TITLE");
                    return false
                }
            } else {
                errorArr['status'] = false;
                errorArr['message'] = __("SEND_AT_LEAST_ONE_PARAMS");
                return false
            }
        });
    }
    // console.log('errorArr',errorArr)
    return errorArr;
}
