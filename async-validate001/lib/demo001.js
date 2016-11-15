'use strict';

var AsyncValidator = require('async-validate');

function demo001() {
    var descriptor = {
        type: 'object',
        fields: {
            name: { type: "string", required: true }
        }
    };

    var validator = new AsyncValidator(descriptor);
    var source = {};
    AsyncValidator.plugin([require('async-validate/plugin/object'), require('async-validate/plugin/string'), require('async-validate/plugin/util')]);
    validator.validate(source, function (err, res) {
        if (err) {
            throw err;
        } else if (res) {
            return console.dir(res.errors);
        }
    });
}

demo001();