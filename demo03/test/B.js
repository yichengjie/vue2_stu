import util from './util.js' ;
(function(global,factory){
  if(typeof define ==='function' && define.amd){
    define([],factory) ;
  }else if(typeof exports === 'object'){
    module.exports = factory() ;
  }else{
    global.A = factory() ;
  }
}(this,function (){
  //var util = require('./util.js') ;

  function B (){
    util.arr.push('b') ;
  }
  return B ;
})) ;
