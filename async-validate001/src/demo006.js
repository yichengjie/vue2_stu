class Validate{
    constructor(rules){
        this.rules = rules ;
    }
    validate(){
        this.rules.validate() ;
    }
}

class Demo{
    
    constructor(addr){
        this.addr = addr ;
    }

    doSave(){
        console.info('----------> ' + this.addr) ;
        var hello = () => {
            console.info('hello ' + this.addr) ;
        }
        var rules = {
            "validate":hello
        } ;
        var v = new Validate(rules) ;
        v.validate() ;
    }
}

new Demo('henan').doSave() ;