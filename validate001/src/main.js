require('./style/index.css') ;
import Validator  from './validator.js' ;
$(function(){
    console.info('hello world') ;
    var myForm = document.getElementById('myForm') ;
    myForm.onsubmit = function(){
        var errorMsg = validateFunc(myForm) ;
        if( errorMsg ){
            alert(errorMsg) ;
            return false;//阻止表单提交
        }else {
            alert('校验通过，可以提交表单') ;
            return false;
        }
    }
}) ;

var validateFunc = function(myForm){
    var validator = new Validator() ;
    validator.add(myForm.username,'isNonEmpty','用户名不能为空') ;
    validator.add(myForm.password,'minLength:6','密码长度不能小于6位') ;
    validator.add(myForm.phoneNumber,'isMobile','手机号格式不正确') ;
    var errorMsg = validator.start() ;
    return errorMsg ;
}

