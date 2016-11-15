var schema = require('async-validator');
var descriptor = {
    age1_age2: {
        type: "object", required: true,
        fields: {
            age1: {type: "number",message: 'age1请输入数字'},
            age2: {type: "number",message: 'age2请输入数字'}
        }
    }
}
var validator = new schema(descriptor);

var model = {age1_age2:{age1:2,age2:''}} ;

validator.validate(model, (errors, fields) => {
  // errors for street, address.city, address.zip and address.name

  console.info('  -------------> ' , errors) ;
});
