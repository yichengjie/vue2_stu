var schema = require('async-validator');
var descriptor = {
  address: {
    type: "object", required: true,
    fields: {
      street: {type: "string", required: true},
      city: {type: "string", required: true},
      zip: {type: "string", required: true, len: 8, message: "invalid zip"}
    }
  },
  name: {type: "string", required: true}
}
var validator = new schema(descriptor);
validator.validate({ address: {} }, (errors, fields) => {
  // errors for street, address.city, address.zip and address.name
});