export default class Validator {
    constructor(){
        this.cache = [] ;
    }
    add (dom,rules) {
        var self = this ;
        for(let rule of rules){
            (function(rule){
                var strategyAry = rule.strategy.split( ':' ) ;
                var errorMsg =  rule.errorMsg ;
                self.cache.push(function(){
                    var strategy = strategyAry.shift() ;//用户挑选的stragey
                    strategyAry.unshift(dom.value);
                    strategyAry.push(errorMsg) ;
                    return strategies[strategy].apply(dom,strategyAry) ;
                }) ;
            })(rule) ;
        }
    }
    start () {
        for (let validatorFn of this.cache){
            var msg = validatorFn() ;
            if( msg ){
                return msg ;
            }
        }
    }
}

var strategies = {
    isNonEmpty (value,errorMsg){
        if( value === '' ){
            return errorMsg ;
        }
    },
    minLength (value,length,errorMsg) {
        if( value.length < length ){
            return errorMsg ;
        }
    },
    isMobile ( value,errorMsg ) {
        if( !/(^1[3|5|8][0-9]{9}$)/.test(value) ){
            return errorMsg ;
        }
    }
} ;
