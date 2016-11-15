var schema = require('async-validator');
function demo001(){
    var descriptor = {
        name(rule, value, callback, source, options) {
            var errors = [];
            if(!/^[a-z0-9]+$/.test(value)) {
            errors.push(
                new Error(
                //util.format("%s must be lowercase alphanumeric characters",rule.field)
                    `${rule.field} must be lowercase alphanumeric characters`
                ));
            }
            callback(errors);
        }
    }
    var validator = new schema(descriptor);
        validator.validate({name: "Firstname"}, (errors, fields) => {
        if(errors) {
            return handleErrors(errors, fields);
        }
    // validation passed
    });
}
demo001() ;


function handleErrors(errors, fields){
    console.info('errors --->  ' ,errors) ;
    console.info('fields ---> ' ,fields) ;
}
