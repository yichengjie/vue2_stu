require('./style/index.css') ;
import Validator  from './validator.js' ;
$(function(){
    console.info('hello world') ;
    var myForm = document.getElementById('myForm') ;
    var submitBtn = document.getElementById('submitBtn') ; 
    submitBtn.onclick = function(){
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
    validator.add(myForm.username,[
        {strategy:'isNonEmpty',errorMsg:'用户名不能为空'},
        {strategy:'minLength:6',errorMsg:'用户名长度不能小于6位'}
    ]) ;

    validator.add(myForm.password,[
        {strategy:'minLength:6',errorMsg:'密码长度不能小于6位'}
    ]) ;
    validator.add(myForm.phoneNumber,[
        {strategy:'isMobile',errorMsg:'手机号格式不正确'}
    ]) ;
    var errorMsg = validator.start() ;
    return errorMsg ;
}

