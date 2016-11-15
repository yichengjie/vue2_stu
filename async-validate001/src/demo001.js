//var Schema = require('async-validate') ;
import AsyncValidator from 'async-validator';
//var AsyncValidator = require('async-validator') ;

function handleErrors(errors, fields){
    console.info('errors --->  ' ,errors) ;
    console.info('fields ---> ' ,fields) ;
}

function demo001(){
    var descriptor = {
        name: {type: "string", required: true}
    }
    var validator = new AsyncValidator(descriptor);
    validator.validate({name: ""}, (errors, fields) => {
        if(errors) {
            // validation failed, errors is an array of all errors
            // fields is an object keyed by field name with an array of
            // errors per field
            return handleErrors(errors, fields);
        }
    // validation passed
    });
}

demo001() ;

