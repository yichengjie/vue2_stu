var util = require('util') ;
import {isBaggageByServiceType} from '../../common/common.js' ;

//校验的func的简单封装
export function wrapValidateFn(validateFn,cfg){
    return function(rule,value,callback){
        let {vvm,...otherCfg} = cfg ;
        return validateFn.call(null,value,callback,vvm,otherCfg) ;
    }
}

//校验销售生效日期
export function validateFirstMaintenanceDate(value,callback){
      //console.info('cfg : ' + cfg) ;
      //let {lastMaintenanceDate} = cfg.vm.formData ;
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
export function validateLastMaintenanceDate(value,callback,vvm){
      //console.info('formData : ' ,formData) ;
      let {firstMaintenanceDate} = vvm.formData  ;
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
export function validateUseDateLimit(value,callback,vvm){
      let useDateLimitTye = vvm.formData  ;
      let {firstUseDate,lastUseDate,effectivePeriodType,effectivePeriodNumber,effectivePeriodUnit} = vvm.formData ;
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

export function validateAllEmptyOrNot(value,callback,vvm,otherCfg){
    let {name1,name2} = otherCfg ;
    let formData = vvm.formData ;
    let value1 = (formData[name1]);
    let value2 = (formData[name2]) ;
    //console.info('name1 : ['+name1+'] , value  : ['+value1+'] ') ;
    //console.info('name1 : ['+name1+'] , value : ['+value2+'] ') ;
    if(value1 ===''){
        if(value2!==''){
            callback('同时有值或无值!') ;
            return false;
        }
    }else{//如果value1不为空
        if(value2===''){
            callback('同时有值或无值!') ;
            return false;
        }
    }
    callback() ;
    return true ;
}

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
export function validateBiggerNumber(value,callback,vvm,otherCfg){
    //console.info('cfg' ,cfg) ;
    let {smallerNum,biggerNum} = otherCfg ;
    let formData = vvm['formData'] ;
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

/**是否收费的校验逻辑 */
export function validateNoChargeNotAvailable(value,callback,vvm){
    //是否收费，170-201，里程费，适用于//免费行李件数
    let serviceType = vvm.serviceData.serviceType ;
    let {formData:{noChargeNotAvailable,list170VO,list201VO,specifiedServiceFeeMileage,specifiedServiceFeeApp,freeBaggageAllowancePieces}} = vvm ;
    if(['D','O'].includes(noChargeNotAvailable)){
        //如果是行李的话
        if(isBaggageByServiceType(serviceType)){
            let tNum = Number(freeBaggageAllowancePieces) ;
            if(tNum!==0){
                callback('收费为D/O时,【免费行李件数】必须为0!') ;
                return false;
            }
        }
    }else if(['X','F','E','G','H'].includes(noChargeNotAvailable)){
        if(list170VO.length>0||list201VO.length>0){
            callback('当为免费时【金额】必须为空!') ;
            return false;
        }
        if(specifiedServiceFeeMileage!==''){
            callback('当为免费时【里程费】必须为空!') ;
            return false;
        }
        if(specifiedServiceFeeApp!==''){
            callback('当不为D/O时【适用于】必须为空!') ;
            return false;
        }
    }
    callback() ;
    return true ;
}
/**适用于的校验逻辑 */
export function validateSpecifiedServiceFeeApp(value,callback,vvm){
    //适用于,是否收费,list170VO,list201VO,serviceType//specifiedServiceFeeApp
    let {formData:{specifiedServiceFeeApp,noChargeNotAvailable,list170VO,list201VO},serviceData:{serviceType}} = vvm ;
    //当值为空时：1.收费（Not Available/No Charge）字段的值必须为D/X/F/E。
    if( ['D','X','F','E'].includes(noChargeNotAvailable)){
        if(specifiedServiceFeeApp!==''){
            callback('收费为D/X/F/E时，【适用于】必须为空!') ;
            return false;
        }
    }
    if(['H','C','P'].includes(specifiedServiceFeeApp)){//否则就是字段不为空
        //当本字段的值为H/C/P时，T170和T201的值为0
        if(list170VO.length>0||list201VO.length>0){
            callback('当金额有值，【适用于】不能为H/C/P') ;
            return false;
        }
    }
    callback() ;
    return true ;
}

export function validatGeoSpec(value,callback,vvm,otherCfg){
    let msgObj = {A:'大区代码错误!',C:'城市代码错误',N:'国家代码错误','P':'机场代码错误',S:'州代码错误',Z:'区域代码错误'} ;
    let {name1,name2} = otherCfg ;
    let {formData} = vvm ;
    let geoSpecLocType = formData[name1] ;
    let geoSpecLoc = formData[name2] ;
    if(geoSpecLocType===''){
        if(geoSpecLoc!==''){
            callback('区域类型必填!') ;
            return false;
        }else{
            callback() ;
            return true ;
        }
    }else{//如果类型不为空
        if(geoSpecLoc===''){
            callback('区域代码必填!') ;
            return false;
        }else{
           let flag = util.isValidGeoLocal(geoSpecLoc,geoSpecLocType) ;
           if(flag){
               callback() ;
               return true ;
           }else{
               callback(msgObj[geoSpecLocType]) ;
               return true ;
           }
        }
    }
}




export const i18n_cn ={
  required: '%s 必填',
}
