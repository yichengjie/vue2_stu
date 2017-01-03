function getSessionId(){
    var c_name = 'JSESSIONID';  
    if(document.cookie.length>0){  
        c_start=document.cookie.indexOf(c_name + "="); 
        if(c_start!=-1){ 
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);  
            if(c_end==-1) c_end=document.cookie.length;  
            return document.cookie.substring(c_start,c_end);  
        }else{
            //手动从后台传来sessionid
            var JSESSIONID = $('#JSESSIONID').val();
            return JSESSIONID;
        }
    }
}
//3AD40971428FBB310B943781931954CE
//3AD40971428FBB310B943781931954CE