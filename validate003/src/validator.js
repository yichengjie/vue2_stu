export default class Validator {
    constructor(){
        this.cache = [] ;
    }
    add (dom,rules) {
        var self = this ;
        for(let rule of rules){
            (function(rule){
                if(rule.strategy){
                    var strategyAry = rule.strategy.split( ':' ) ;
                    var errorMsg =  rule.errorMsg ;
                    self.cache.push(function(){
                        var strategy = strategyAry.shift() ;//用户挑选的stragey
                        strategyAry.unshift(dom.value);
                        strategyAry.push(errorMsg) ;
                        return strategies[strategy].apply(dom,strategyAry) ;
                    }) ;
                }else{
                    var fn = rule.validator ;
                    // var callback = function(){
                    //     return  ;
                    // }
                    if(fn && typeof fn === 'function'){
                        self.cache.push(function(){
                            return fn.call(dom,dom.value) ;
                            //fn.call(dom,dom.value) ;
                           // return callback();
                        } ) ;
                    }
                }
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
