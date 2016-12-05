import Navbar from '../common/Navbar.vue' ;
import QuerySection from './QuerySection.vue' ;
import DataSection from './DataSection.vue' ;
import ContentLayout from './ContentLayout.vue' ;
import NewVersionService from './NewVersionService.vue' ;
import {initPage4AddApi,initPage4UpdateApi} from '../../api/s7-edit.js' ;
import {wrapValidateFn,validateFirstMaintenanceDate,validateLastMaintenanceDate,validateServiceNumber,
    validateUseDateLimit,validateLettersOrNumber,validateBiggerNumber,validateAllEmptyOrNot,
    validateNoChargeNotAvailable,validateSpecifiedServiceFeeApp,validatGeoSpec} from './busi/validate.js' ;
import UseDateLimitChangeBtn from './UseDateLimitChangeBtn.vue' ;
import {formData,serviceData,optionsData} from './busi/jsonData.js' ;
import util_lib from 'util_lib2' ;
export default {
    components:{
        Navbar,QuerySection,DataSection,ContentLayout,
        NewVersionService,UseDateLimitChangeBtn
    },
    data(){
        //所有的校验方法
        //销售生效日期
        let firstMaintenanceDate = wrapValidateFn(validateFirstMaintenanceDate,{vvm:this}) ; 
        //销售截止日期
        let lastMaintenanceDate = wrapValidateFn(validateLastMaintenanceDate,{vvm:this}) ;
        //服务套数
        let serviceNumber = wrapValidateFn(validateBiggerNumber,{vvm:this,smallerNum:'serviceNumberMinimum',biggerNum:'serviceNumberMaximum'}) ;
        //使用时间限制
        let useDateLimit = wrapValidateFn(validateUseDateLimit,{vvm:this}) ;
        //数字字母校验
        let lettersOrNumber = wrapValidateFn(validateLettersOrNumber,{vvm:null}) ;
        //收费行李件数
        let excessOccurrence = wrapValidateFn(validateBiggerNumber,{vvm:this,smallerNum:'firstExcessOccurrence',biggerNum:'lastExcessOccurrence'}) ;
        let freeBaggageAllowanceWeightAndUnit = wrapValidateFn(validateAllEmptyOrNot,{vvm:this,name1:'freeBaggageAllowanceWeight',name2:'freeBaggageAllowanceUnit'}) ;
        //是否收费校验
        let noChargeNotAvailable = wrapValidateFn(validateNoChargeNotAvailable,{vvm:this}) ;
        //适用于校验
        let specifiedServiceFeeApp = wrapValidateFn(validateSpecifiedServiceFeeApp,{vvm:this}) ;
        //区域校验
        let geoSpec1 = wrapValidateFn(validatGeoSpec,{vvm:this,name1:'geoSpecLoc1Type',name2:'geoSpecLoc1'}) ; 
        let geoSpec2 = wrapValidateFn(validatGeoSpec,{vvm:this,name1:'geoSpecLoc2Type',name2:'geoSpecLoc2'}) ; 
        let geoSpec3 = wrapValidateFn(validatGeoSpec,{vvm:this,name1:'geoSpecLoc3Type',name2:'geoSpecLoc3'}) ; 

        return {
            formData:{
                ...formData 
            },
            serviceData:{/*选择服务相关的数据**/
                ...serviceData 
            },
            rules:{
                firstMaintenanceDate: [
                    {required: true, message: '必填', trigger: 'change' },
                    {validator:firstMaintenanceDate,trigger:'change'}
                ],
                lastMaintenanceDate:[
                    {validator: lastMaintenanceDate ,trigger: 'change'}
                ],
                serviceNumber:{
                    serviceNumberMaximum:[{ validator: serviceNumber ,trigger: 'change'}]
                },
                useDateLimit:{/**使用时间限制 */
                    firstUseDate:[
                        {validator: useDateLimit ,trigger: 'change'}
                    ]
                },
                fareBasis:[/**产品代号*/
                    {validator: lettersOrNumber ,trigger: 'change'}
                ],
                discountCode:[/**折扣代码 */
                    {validator: lettersOrNumber ,trigger: 'change'}
                ],
                excessOccurrence:{/**收费行李件数 */
                    firstExcessOccurrence:[
                        {validator: excessOccurrence ,trigger: 'change'}
                    ]
                },
                freeBaggageAllowanceWeightAndUnit:{
                    freeBaggageAllowanceWeight:[
                         {validator: freeBaggageAllowanceWeightAndUnit ,trigger: 'change'}
                    ]
                },/**是否收费 */
                noChargeNotAvailable:[
                    {validator: noChargeNotAvailable ,trigger: 'change'}
                ],
                specifiedServiceFeeApp:[
                    {validator: specifiedServiceFeeApp ,trigger: 'change'}
                ],
                geoSpec1:{
                    geoSpecLoc1Type:[
                        {validator: geoSpec1 ,trigger: 'change'}
                    ]
                },
                geoSpec2:{
                    geoSpecLoc2Type:[
                        {validator: geoSpec2 ,trigger: 'change'}
                    ]
                },
                geoSpec3:{
                    geoSpecLoc3Type:[
                        {validator: geoSpec3 ,trigger: 'change'}
                    ]
                }
            },
            optionsData:{
                ...optionsData
            }
        } ;
    },
    methods:{
        handleSaveForm(type){
            console.info('formData : ' + JSON.stringify(this.formData)) ;
            //如果没有选择服务
            if(this.serviceData.recordS5Id===''){
                $.showTuiErrorDialog('请选择服务到最后一级！');
                return ;
            }
            //var jqFlag = this.validator.form() ;
            //console.info('jquery validate flag  : ' +jqFlag )  ;
            //校验整个表单
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleReset() {
            this.$refs.editForm.resetFields();
        },
        handleSelectService(id){
           
        }
    },
    mounted(){
        let pageParam = util_lib.getJspPageParam() ;
        let {action} = pageParam ;
        console.info('==== [action] ==== : ' + action) ;
        switch(action){
            case 'add':
                initPage4Add(this) ;
                break ;
            case 'update':
                initPage4Update(this) ;
                break ;
            case 'copy':
                initPage4Update(this) ;
                break ;
            default:
                initPage4Add(this) ;
                break ;
        }
    }
}

function initPage4Update(_vm){
    initPage4UpdateApi().then(retData=>{
        let id = '56372eb40480478a83e85040f945e416' ;//FP类型--F
        //id ='8fefc6fcce0e4c8e8df3772cb3ac609a' ;//FL类型--F
        //id = '7d10d15697e5477b83f09470c5a0f9fc';//A类型
        id = 'b293f43b9e9a4b4eb393e86307c921a6';//C类型
        _vm.serviceData.recordS5Id = id;
        let {formData} = retData ;
        Object.assign(_vm.formData,formData) ;
    }) ;
}

function initPage4Add(_vm){
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
    })

}