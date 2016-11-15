var schema = require('async-validator');
function demo001(){
    var descriptor = {
        email: [
            {type: "number", required: true},
            {validator(rule, value, callback, source, options) {
                var errors = [];
                // test if email address already exists in a database
                // and add a validation error to the errors array if it does
                callback(errors);
            }}
        ]
    };
    var validator = new schema(descriptor);
        validator.validate({email: "Firstname"}, (errors, fields) => {
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
