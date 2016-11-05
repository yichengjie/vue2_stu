//查询数据库的api
import {orderListData,random} from '../common/index.js' ;
import _ from 'lodash' ;

export function queryDbApi (queryParam){
    //console.info('查询参数 : ' ,queryParam) ;
    let {toPageNum,pageSize,orderName,isAsc} = queryParam ;
    let records7List = [] ;
    //生成0-5的随机数
    let r = random(1,9) ;
    let min = toPageNum *10 ;
    let r2 = random(min ,min +pageSize) ;
    let r3 = random(1,2)  ;
    let r4 = random(1,5)  ;
    for(let i = 0 ; i < pageSize ; i ++){
        let xxStatus = r3()+"" ;
        let xxStatusDes = r4()+"" ;
        //let cur = _.random(0, 5);
        let id = _.uniqueId("s7Id-") ;
        let s5DescrbeInfo = "test tooltip ["+i+"]" ;
        let obj = {"id":id,"subcode":"OB"+ r(),"serviceType":"F"+ r(),"sequenceNumber":"999"+i,"status": xxStatus,"statusDes":xxStatusDes, "saleStartDate":"2016/01/0"+ r(),
                "saleEndDate":"2016/12/2"+ r(),"travelStartDate":"2016/01/0"+ r(),"travelEndDate":"2016/12/2"+ r(),
                "loc1":"11"+ r(),"loc2":"1234567"+ r(),"flyerStatus":""+ r(),"money":"99"+ r()+"CNY","descr":"描述" + r(),
                "lastUpdateUser":"yicj"+ r(),"lastUpdateDate":"2016/01/01 14:0"+ r(),"s5DescrbeInfo":s5DescrbeInfo
        } ;
        records7List.push(obj) ;
    }

    orderListData(records7List,orderName,isAsc) ;
    var pageBean = {
        curPage:toPageNum,
        pageSize:pageSize,
        pageNumList:[1,2,3,4,5],
        pageCount:5,
        recordList:records7List,
        recordCount:100
    } ;
    //loading() ;
    return new Promise(function(resolve,reject){
        let waitTimeNum = 0 ;
        setTimeout(function(){
            //hiding() ;
            resolve({pageBean,flag:true}) ;
        },waitTimeNum) ;
    }) ;
}


