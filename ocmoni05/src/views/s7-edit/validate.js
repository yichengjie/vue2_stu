var util = require('util') ;

//校验的func的简单封装
export function wrapValidateFn(validateFn,cfg){
    return function(rule,value,callback){
        return validateFn.call(null,value,callback,cfg) ;
    }
}

//校验销售生效日期
export function validateFirstMaintenanceDate(value,callback,cfg){
      //console.info('cfg : ' + cfg) ;
      let {lastMaintenanceDate} = cfg.vm.formData ;
      if(value&&value.length>0){//大于当前时间下一小时0分
            let flag = util.isBiggerDateTimeThanCurrentNextHour(value) ;
            //console.info('flag : ' + flag) ;
            if(!flag){
               callback('需大于下一小时0分!');
               return false;
            }
            callback&&callback() ;
            return true ;
      }else{
            callback&&callback() ;
            return true ;
      }
}
//校验销售截止日期
export function validateLastMaintenanceDate(value,callback,cfg){
      //console.info('formData : ' ,formData) ;
      let {firstMaintenanceDate} = cfg.vm.formData  ;
      if(firstMaintenanceDate&&firstMaintenanceDate.length>0&&value&&value.length>0){//截止日期需要大于生效日期
           let flag = util.isBiggerDateTimeThan(value,firstMaintenanceDate) ;
           if(!flag){
               callback('截止日期需大于生效日期');
               return false;
            }
            callback&&callback() ;
            return true ;
      }else{
            callback&&callback() ;
            return true ;
      }
}
//校验使用时间限制
export function validateUseDateLimit(value,callback,cfg){
      let useDateLimitTye = cfg.vm.formData  ;
      let {firstUseDate,lastUseDate,effectivePeriodType,effectivePeriodNumber,effectivePeriodUnit} = cfg.vm.formData ;
      if(useDateLimitTye===''){
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
}
//校验服务套数
// export function validateServiceNumber(value,callback,cfg){
//       //'serviceNumberMinimum','serviceNumberMaximum'
//       let {serviceNumberMinimum,serviceNumberMaximum} = cfg.vm.formData  ;
//       //console.info('serviceNumberMinimum : ' + serviceNumberMinimum) ;
//       //console.info('serviceNumberMaximum : ' + serviceNumberMaximum) ;
//       if(serviceNumberMinimum !='' &&serviceNumberMaximum !=''){
//             if(serviceNumberMinimum>serviceNumberMaximum){
//                callback('最大值不能小于最小值!');
//                return false ;
//             }
//       }
//       callback() ;
//       return true;   
// }


/**校验字母或数字的组合输入 */
export function validateLettersOrNumber(value,callback){
    let flag = util.islettersOrNumber(value);
    if(!flag){
        callback('字母或数字组合!') ;
        return false;
    }
    callback() ;
    return true ;
}
/**数字后者大于前者校验 */
export function validateBiggerNumber(value,callback,cfg){
    //console.info('cfg' ,cfg) ;
    let {smallerNum,biggerNum} = cfg ;
    let formData = cfg['vm']['formData'] ;
    let smaller = formData[smallerNum] ;
    let bigger = formData[biggerNum] ;
    //console.info('smaller : ['+smaller+']') ;
    //console.info('bigger : ['+bigger+']') ;
    if(smaller !=='' && bigger !==''){
        if(smaller>bigger){
            callback('最大值不能小于最小值!');
            return false ;
        }
    }
    callback() ;
    return true;   
}

//校验区域代码
export function validateLoc(value,callback){
      let {locValue} = cfg.vm.formData  ;
      if(value&&value.length>0){
          if(locValue&&locValue.length>0){
              callback &&callback() ;
              return true ;
          }else{
             callback && callback('区域代码不能为空!') ;
             return false;
          }
      }else{
          if(locValue&&locValue.length>0){
             callback && callback('区域类型不能为空!') ;
             return false;
          }else{
              callback &&callback() ;
              return true ; 
          }
      }
}


export const i18n_cn ={
  required: '%s 必填',
}
