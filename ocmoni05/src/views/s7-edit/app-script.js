import Navbar from '../common/Navbar.vue' ;
import QuerySection from './QuerySection.vue' ;
import DataSection from './DataSection.vue' ;
import ContentLayout from './ContentLayout.vue' ;
import NewVersionService from './NewVersionService.vue' ;
import {initPage4AddApi,initPage4UpdateApi} from '../../api/s7-edit.js' ;
import {wrapValidateFn,validateFirstMaintenanceDate,validateLastMaintenanceDate,validateServiceNumber,
    validateUseDateLimit,validateLettersOrNumber,validateBiggerNumber,validateAllEmptyOrNot,
    validateNoChargeNotAvailable} from './busi/validate.js' ;
import UseDateLimitChangeBtn from './UseDateLimitChangeBtn.vue' ;
import Table196 from './Table196.vue' ;
import Table170And201 from './Table170And201.vue' ;
import Table178 from './Table178.vue' ;
import {formData,serviceData,optionsData} from './busi/jsonData.js' ;
export default {
    components:{
        Navbar,QuerySection,DataSection,ContentLayout,
        NewVersionService,UseDateLimitChangeBtn,Table196,
        Table170And201,Table178
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
                ]
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
            this.serviceData.recordS5Id = '';
            let retObj = this.serviceData.serviceChooseList.find(function(item){
                return item.id === id ;
            });
            //if(){}
            let {attributesGroup,attributesSubgroup,serviceType,serviceSubCode} = retObj ||{} ;
            this.serviceData.recordS5Id = id || '';
            this.serviceData.serviceType = serviceType || 'F' ;
            this.serviceData.group = attributesGroup || '';
            this.serviceData.subGroup = attributesSubgroup || '' ;
            this.serviceData.subCode = serviceSubCode || '';
        }
    },
    mounted(){
        initPage4AddApi().then(retData=>{
            this.serviceData.serviceType = 'F' ;
            if(retData.flag==='true'||retData.flag===true){
                let len = this.serviceData.serviceChooseList.length ;
                this.serviceData.serviceChooseList.splice(0,len) ;
                for(let item of retData.serviceChooseList){
                    this.serviceData.serviceChooseList.push(item) ;
                }
                //console.info("retList : " ,retData.serviceChooseList) ;
            }else{
                console.info('数据加载不完整...') ;
            }
        },error =>{
            console.info('error : ',error) ;
        })
        initPage4UpdateApi().then(retData=>{
            let {formData} = retData ;
            Object.assign(this.formData,formData) ;
        }) ;
        //var validator = $("#s7_form").validate({meta : ""});
        //this.validator = validator ;
    }
}