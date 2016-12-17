export default class Validator {
    constructor(){
        this.cache = [] ;
    }
    add (dom,rule,errorMsg) {
        let  ary = rule.split( ':' ) ;//把strategy和参数分开
        this.cache.push(function(){//把校验的步骤用空函数包裹起来，并放入cache
            var stragey = ary.shift() ;//用户挑选的stragey
            ary.unshift(dom.value);
            ary.push(errorMsg) ;
            return strategies[stragey].apply(dom,ary) ;
        }) ;
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
