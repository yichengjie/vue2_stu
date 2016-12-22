var contextPath ="/ocgui" ;
var carrCode = "CA" ;
let jsonData = require('../test/s7-edit.json') ;
var Mock = require('mockjs') ;
var initPage4AddUrl = contextPath+'/s7/initPage4Add.action' ;
var initPage4UpdateUrl = contextPath+'/s7/initPage4Update.action' ;

Mock.mock(initPage4AddUrl,function(){
    console.info('我拦截到请求地址['+initPage4AddUrl+'],并返回了模板数据...') ;
    let retData ={
        flag:true ,
        ...jsonData
    };
    return retData ;
});

Mock.mock(initPage4UpdateUrl,function(){
    console.info('我拦截到请求地址['+initPage4UpdateUrl+'],并返回了模板数据...') ;
    let formData = {//2016-10-21 13:45
        firstMaintenanceDate:'',
        serviceType:'A',
        serviceSubCode:'0JJ'
    } ;
    let retData ={
        flag:true ,
        formData,
        ...jsonData
    };
    return retData ;
});
