var str ='我'  ;//用户输入
/**
 * 中文符号
 */
function isChineseDot(text){
    //匹配这些中文标点符号 。 ？ ！ ， 、 ； ： “ ” ‘ ' （ ） 《 》 〈 〉 【 】 『 』 「 」 ﹃ ﹄ 〔 〕 … — ～ ﹏ ￥
    var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
    if(reg.test(text)){
        return true ;
    }else{
        return false;
    }
}

//是否含有中文（也包含日文和韩文）
function isChinese(str){   
   var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
   return reg.test(str);
}

//同理，是否含有全角符号的函数
function isFullwidth(str){
   var reg = /[\uFF00-\uFFEF]/;
   return reg.test(str);
} 


var flag1 = isChinese("☆") ;
var flag2 = isFullwidth("☆") ;
var flag3 = isChineseDot("☆") ;

console.info("☆是不是中文 : " + flag1) ;
console.info("☆是不是全角字符 : " + flag2) ;
console.info("☆是不是中文字符 : " + flag3) ;