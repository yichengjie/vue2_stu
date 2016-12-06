import util from 'util_lib' ;
import {initPage4AddApi,initPage4UpdateApi} from 'apiPath/s7-edit.js' ;
/**查询s5Id */
/**
 * @param list s5的记录集合
 * @param queryObj 查询参数
 */
export function findRecordS5Id(list,serviceType,serviceSubCode){
    let queryObj ={serviceType,serviceSubCode} ;
    let retObj = _.find(list,queryObj) ;
    return retObj ? retObj.id :'' ;
}
/**
 * 处理页面上的保存按钮事件
 */
export function handleSaveForm(_vm){
    console.info('formData : ' + JSON.stringify(_vm.formData)) ;
    //如果没有选择服务
    if(_vm.serviceData.recordS5Id===''){
        $.showTuiErrorDialog('请选择服务到最后一级！');
        return ;
    }
    //var jqFlag = this.validator.form() ;
    //console.info('jquery validate flag  : ' +jqFlag )  ;
    //校验整个表单
    _vm.$refs.editForm.validate((valid) => {
        if (valid) {
            alert('submit!');
        } else {
            console.log('error submit!!');
            return false;
        }
    });
}
/**
 * 初始化页面上的数据
 */
export function initPageData(_vm){
    let pageParam = util.getJspPageParam() ;
    let {action} = pageParam ;
    console.info('==== [action] ==== : ' + action) ;
    switch(action){
        case 'add':
            _initPage4Add(_vm) ;
            break ;
        case 'update':
            _initPage4Update(_vm) ;
            break ;
        case 'copy':
            _initPage4Update(_vm) ;
            break ;
        default:
            _initPage4Add(_vm) ;
            break ;
    }
}

function _initPage4Update(_vm){
    initPage4UpdateApi().then(retData=>{
        //let id = '56372eb40480478a83e85040f945e416' ;//FP类型--F
        //id ='8fefc6fcce0e4c8e8df3772cb3ac609a' ;//FL类型--F
        //id = '7d10d15697e5477b83f09470c5a0f9fc';//A类型
        //id = 'b293f43b9e9a4b4eb393e86307c921a6';//C类型
        let list = retData.serviceChooseList ;
        let {formData} = retData ;
        for(let item of list){
            _vm.serviceData.serviceChooseList.push(item) ;
        }
        let {serviceType,serviceSubCode} = formData ;
        let id = findRecordS5Id(list,serviceType,serviceSubCode) ;
        Object.assign(_vm.formData,formData) ;
        _vm.serviceData.recordS5Id = id;
    }) ;
}

function _initPage4Add(_vm){
     //默认服务类型为F
     initPage4AddApi().then(retData=>{
        _vm.serviceData.serviceType = 'F' ;
        if(retData.flag==='true'||retData.flag===true){
            let len = _vm.serviceData.serviceChooseList.length ;
            _vm.serviceData.serviceChooseList.splice(0,len) ;
            for(let item of retData.serviceChooseList){
                _vm.serviceData.serviceChooseList.push(item) ;
            }
            //console.info("retList : " ,retData.serviceChooseList) ;
        }else{
            console.info('数据加载不完整...') ;
        }
    },error =>{
        console.info('error : ',error) ;
    });

}