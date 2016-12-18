export default function Validator () {
    //用来存放校验结果的堆栈
    this.validateResult = new ValidateEventArgs() ;//new Array()
    //用来存放已检查对象的对转
    this.checkedObjects = new Array() ;
    //检查并执行一段表达式
  
}
var $eval = function (expr){
    try{
        return eval(expr) ;
    }catch(e){
        return expr ;
    };
}
//定义校验通过事件，表单校验通过后会触发该事件
Validator.prototype.checkPassedEvent = function(sender,event){
    if(sender.onCheckPassed !=null){
        return $eval(sender.onCheckPassed) ;
    }else{
        return this.onCheckPassed(sender,event) ;
    }
}
//定义校验失败，表单校验失败后会触发该事件



function ValidateEventArgs(){
    
    //存放校验结果的数组，这个数组中包含所有的校验失败的ValidatePack对象
    this.results = new Array() ;
    //存放所有所有校验对象的数组
    this.checkedObjects = new Array() ;
}
//默认的结果展示方法
ValidateEventArgs.prototype.getResult = function(){
    var msg = "" ;
    for(var i = 0 ; i < this.results.length ;i ++){
        msg += this.results[i].getMessage() +"\n" ;
    }
    return msg ;
}