//封装未能通过校验的对象
function ValidatePack(target,validate,checkValue){
    //校验对象本身
    this.target = target ;
    //校验规则
    this.validate = validate ;
    //被检查的值
    this.checkValue = checkValue ;
}

ValidatePack.prototype.getMessage = function(){
    if(this.target.errorMsg != null){
        return this.target.errorMsg ;
    }
    var msg = "" ;
    if(this.target.tag != null){
        msg += "'" + this.target.tag +"'" ;
    }else{
        msg += "'"+this.target.name+"'" ;
    }
    if(this.checkValue === true){
        msg += "必填" +this.validate.message+"!" ;
    }else if(this.checkValue === false){
        msg += "不能" + this.validate.message +"!" ;
    }else if(!isNaN(this.checkValue)){
        msg += this.validate.message + "限制为" + this.checkValue +"!" ;
    }else{
        msg += this.validate.message + "("+this.checkValue+")" ; 
    }
    return msg ;
}