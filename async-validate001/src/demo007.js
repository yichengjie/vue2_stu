import AsyncValidator from 'async-validator';
let vvm = {formData:
            {useDateLimitTye:'',
             firstUseDate:'',
             lastUseDate:'',
             effectivePeriodType:'',
             effectivePeriodNumber:'',
             effectivePeriodUnit:''}} ;
let useDateLimit = wrapValidateFn(validateUseDateLimit,{vvm:vvm}) ;

var obj ={firstUseDate: "", lastUseDate: "", effectivePeriodType: "", effectivePeriodNumber: "", effectivePeriodUnit: ""} ;
var descriptor ={firstUseDate:[
    {validator:useDateLimit}
]} ;




var validator = new AsyncValidator(descriptor);
validator.validate(obj, (errors, fields) => {
    console.info('helle world.........') ;
  // errors for street, address.city, address.zip and address.name
});





function wrapValidateFn(validateFn,cfg){
    return function(rule,value,callback){
        let {vvm,...otherCfg} = cfg ;
        return validateFn.call(null,value,callback,vvm,otherCfg) ;
    };
}


function validateUseDateLimit(value,callback,vvm){
      console.info('test ---------------------------------') ;
      //   callback() ;
      //   return true;
      let useDateLimitTye = vvm.formData.useDateLimitTye  ;
      let {firstUseDate,lastUseDate,effectivePeriodType,effectivePeriodNumber,effectivePeriodUnit} = vvm.formData ;
      if(useDateLimitTye===''){
          console.info('1111111111111') ;
          let flag1 = true ; 
          let flag2 = true ;
          let count = 0 ;
          if(firstUseDate&&firstUseDate.length>0){
              flag1 = util.isBiggerThanCurrent(firstUseDate) ;
              count ++ ;
          }
          if(flag1&&lastUseDate&&lastUseDate.length>0){
              flag2 = util.isBiggerThanCurrent(lastUseDate) ;
              count ++ ;
          }
          if( (!flag1) || (!flag2) ){
              callback('日期必须大于今天') ;
              return false;
          }
          //如果截止日期还必须大于生效日期
          if(flag1&&flag2&& (count ===2)){
              let flag3 = util.isBiggerDateThan(lastUseDate,firstUseDate) ; 
              if(!flag3){
                callback('结束必须大于起始值') ;
                return false;
              }
          }
          callback() ;
          return true ;
      }else if(useDateLimitTye==='1'){
          console.info('2222222') ;
          if(effectivePeriodType===''){
              if(effectivePeriodNumber!==''||effectivePeriodUnit!==''){
                   callback('期限类型必填') ;
                   return false;  
              } 
              callback() ;
              return true;   
          }else{//type 不为空 
             if(effectivePeriodNumber ===''||effectivePeriodUnit ===''){
                  callback('期限值必填') ;
                  return false;  
             } 
             callback() ;
             return true;   
          }
      }
      //☆☆☆☆☆☆☆☆☆☆☆☆
      //这个地方千万要注意一定要保重执行过callback，否则在form-item中
      //☆☆☆☆☆☆☆☆☆☆☆☆
       callback() ;
       return true ;
}