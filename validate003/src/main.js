require('./style/index.css') ;
import Validator  from './validator.js' ;
$(function(){
    console.info('hello world') ;
    var myForm = document.getElementById('myForm') ;
    var submitBtn = document.getElementById('submitBtn') ; 
    
    submitBtn.onclick = function(){
        var addr = $('input[name=addr]').val() ;
        data.addr = addr ;
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

var data = {
    name:'123',
    addr:'henan'
} ;


var validateFunc = function(myForm){
    var validator = new Validator() ;
    // var vfn = function(value){
    //     if(value  === '' ){
    //         return '不能为空';
    //     }
    //     if(value === '123'){
    //         return '密码不能为123'  ;
    //     }
    //     if(data.addr === '123'){
    //         return '地址不能是123' ;
    //     }
    // }

     var vfn = function(value,callback){
        if(value  === '' ){
            callback ('不能为空');
        }
        if(value === '123'){
            callback ('密码不能为123')   ;
        }
        if(data.addr === '123'){
            callback ('地址不能是123')  ;
        }
    }


    validator.add(myForm.username,[
        {strategy:'isNonEmpty',errorMsg:'用户名不能为空'},
        {strategy:'minLength:6',errorMsg:'用户名长度不能小于6位'}
    ]) ;

    validator.add(myForm.password,[
        {validator:vfn}
    ]) ;
    var errorMsg = validator.start() ;
    return errorMsg ;
}

