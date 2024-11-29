"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmailValidator = exports.getPasswordValidators = void 0;
function getPasswordValidators() {
    return [
        {
            validator: function (v) {
                return /[a-z]/.test(v);
            },
            message: "Password must contain at least one lowercase letter"
        },
        {
            validator: function (v) {
                return /[A-Z]/.test(v);
            },
            message: "Password must contain at least one uppercase letter"
        },
        {
            validator: function (v) {
                return /\d/.test(v);
            },
            message: "Password must contain at least one digit"
        },
        {
            validator: function (v) {
                return /^(?=.*[a-zA-Z]).{8,}$/.test(v);
            },
            message: "Password must be at least 8 characters long and include letters"
        }
    ];
}
exports.getPasswordValidators = getPasswordValidators;
function getEmailValidator() {
    return {
        validator: function (v) {
            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
        },
        message: "Please provide a valid email"
    };
}
exports.getEmailValidator = getEmailValidator;
//# sourceMappingURL=validations.js.map