//查询数据库的api
import {orderListData,random} from '../common/index.js' ;

export function queryDbApi (queryParam){
    let {toPageNum,pageSize,orderName,isAsc} = queryParam ;
    let records7List = [] ;
    //生成0-5的随机数
    let r = random(1,9) ;
    let min = toPageNum *10 ;
    let r2 = random(min ,min +pageSize) ;
    for(let i = 0 ; i < pageSize ; i ++){
        //let cur = _.random(0, 5);
        let obj = {"subcode":"OB"+ r(),"serviceType":"F"+ r(),"status": r2(),"saleStartDate":"2016/01/0"+ r(),
                "saleEndDate":"2016/12/2"+ r(),"travelStartDate":"2016/01/0"+ r(),"travelEndDate":"2016/12/2"+ r(),
                "loc1":"11"+ r(),"loc2":"1234567"+ r(),"flyerStatus":""+ r(),"money":"99"+ r()+"CNY","descr":"描述" + r(),
                "lastUpdateUser":"yicj"+ r(),"lastUpdateDate":"2016/01/01 14:0"+ r()
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
        setTimeout(function(){
            //hiding() ;
            resolve({pageBean,flag:true}) ;
        },300) ;
    }) ;
}


