//检查日期是否合法
	/**
	 * @param:value 需要检查的日期字符串
	 * @param:splitStr 日期用什么分隔符 eg 2016-11-25使用的是'-'
	 * @param:noTimeLimit 不限制20年内的日期才合法(可以无限年)
	 */
	function checkDataValid(value,splitChar,noTimeLimit){
		var tmpSplit = splitChar || '-' ;
	   	var date = value;
		var notLimitFlag = true ;
		if(noTimeLimit==false){
			notLimitFlag = false;
		}
		var regStr = "^[0-9]{4}"+tmpSplit+"[0-9]{2}"+tmpSplit+"[0-9]{2}$"  ;
		var reg =new RegExp(regStr); // re为/^\d+bl$/gim
		if(!reg.test(date)){
			 return false;
		}
		var result = true;
		var curYear = (new Date().getFullYear() - 0);
		var ymd = date.split(tmpSplit);
		var year = ymd[0] - 0;
		var month = ymd[1] - 0;
		var day = ymd[2] - 0;
			/* month-day relation, January begins from index 1 */
		var mdr = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		var isLeapYear = function(){
			// 判断年份是否是闰年
			return (year % 400 === 0) || ((year % 4 === 0) && (year % 100 !== 0));
			};
		if((!noTimeLimit)&&(year < curYear - 20 || year > curYear + 20)){
			// 年份超过前后20年，则校验失败
			result = false;
		}
		if(month > 12 || month < 1){
			// 如果月份不合法，则校验失败
			result = false;
		}
		if(mdr[month] < day || day < 1 || day > 31){
			// 日期天数不合法，校验失败
			result = false;
		}
		if(month === 2 && !isLeapYear() && day > 28){
			// 年份不是闰年，日期天数不合法，校验失败
			result = false;
		}
		return result;
	}


//判断日期是否合法
function _isLegalDate(datavalue){
	return checkDataValid(datavalue,'-',true) ;
}

var flag = _isLegalDate('2016-12-17') ;
console.info('flag : ' + flag) ;
