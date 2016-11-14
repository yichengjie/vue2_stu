function query(){
    $.ajax({
        url: 'http://localhost:3000/ocgui/s7/query.action',
    }).done(function(data, status, xhr){
        //var info = JSON.stringify(data) ;
        console.log(data) ;    
    })
}
