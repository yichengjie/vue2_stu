import Navbar from '../common/Navbar.vue' ;
import QuerySection from './QuerySection.vue' ;
import DataSection from './DataSection.vue' ;
import ContentLayout from './ContentLayout.vue' ;
import NewVersionService from './NewVersionService.vue' ;
import {initPage4AddApi,initPage4UpdateApi} from '../../api/s7-edit.js' ;
import {wrapValidateFn,validateFirstMaintenanceDate,validateLastMaintenanceDate,validateServiceNumber,
    validateUseDateLimit,validateLoc} from './validate.js' ;
import UseDateLimitChangeBtn from './UseDateLimitChangeBtn.vue' ;
import Table196 from './Table196.vue' ;
import Table170And201 from './Table170And201.vue' ;
import Table178 from './Table178.vue' ;
import {formData,serviceData,optionsData} from './jsonData.js' ;
export default {
    components:{
        Navbar,QuerySection,DataSection,ContentLayout,
        NewVersionService,UseDateLimitChangeBtn,Table196,
        Table170And201,Table178
    },
    data(){
        //所有的校验方法
        let firstMaintenanceDate = wrapValidateFn(validateFirstMaintenanceDate,this) ; 
        let lastMaintenanceDate = wrapValidateFn(validateLastMaintenanceDate,this) ;
        let serviceNumber =wrapValidateFn(validateServiceNumber,this) ;
        let useDateLimit = wrapValidateFn(validateUseDateLimit,this) ;

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
                useDateLimit:{
                    firstUseDate:[
                        {validator: useDateLimit ,trigger: 'change'}
                    ]
                }
            },
            options2:[
                {name:"选择",value:""},
                {name:"类型F",value:"F"}
            ],
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