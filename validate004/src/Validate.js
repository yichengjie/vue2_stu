function Validate(pattern,msg){
    this.patternName = pattern ;
    this.message = msg ;
}
Validate.prototype = new Attribute() ;

export default function ValidateAttribute(pattern,msg){
    return new Validate(pattern,msg) ;
}

