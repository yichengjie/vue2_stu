export function validateAge(value,callback,vm){
    var age1 = vm.ruleForm.age1 ;
    var age2 = vm.ruleForm.age2 ;
    if (age1 === '' && age2==='') {
        callback(new Error('age1与age2至少填写一个!'));
    return ;
    }
    if(isNaN(age1)){
        callback(new Error('age1必须输入数字'));
    return ;
    }
    if(isNaN(age2)){
        callback(new Error('age2必须输入数字'));
    return ;
    }
    var age11 = parseInt(age1,10) ;
    var age22 = parseInt(age2,10) ;
    if (age11 > age22) {
        callback(new Error('后者要大于前者!'));
    } else {
        callback();
    }
}

export function validatePub(value,callback,vm){
    var pubType = vm.ruleForm.pubType ;
    var pubValue = vm.ruleForm.pubValue ;

    if(pubType==='' && pubValue === ''){
        callback();
        return ;
    }
    if (pubType !== '' && pubValue==='') {
        callback(new Error('发布对象代码必填'));
        return ;
    }
    if (pubValue !== '' && pubType==='') {
        callback(new Error('发布对象类型必填'));
    return ;
    }

    if(pubType==='1'){
        if(pubValue!=='1'){
            callback(new Error('类型1时value必须为1'));
            return ;
        }
    }

    if(pubType==='2'){
        if(pubValue!=='2'){
            callback(new Error('类型2时value必须为2'));
            return ;
        }
    }

    if(pubType==='3'){
        if(pubValue!=='3'){
            callback(new Error('类型3时value必须为3'));
            return ;
        }
    }
    callback();
}
export function validateStartDate(value,callback,vm){
     callback('生效日期必须大于当前日期');
}

export function validateEndDate(value,callback,vm){
    callback('截止日期必须大于当前日期');
}

export let selectOption= {
    pubOptions:[
        {name:"选择",value:''},
        {name:"类型1",value:"1"},
        {name:"类型2",value:"2"},
        {name:"类型3",value:"3"}
    ],
    dayOfWeakOption:[
        {name:"星期1",value:'1'},
        {name:"星期2",value:"2"},
        {name:"星期3",value:"3"},
        {name:"星期4",value:"4"}
    ],
    freeOrNotOption:[
        {name:"免费",value:""},
        {name:"收费",value:'1'},
    ]
};