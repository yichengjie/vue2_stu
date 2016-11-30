export let formData ={
    firstMaintenanceDate:'',
    lastMaintenanceDate:'',
    serviceNumberMinimum:'',
    serviceNumberMaximum:'',
    description:'',
    fareBasis:'',
    discountCode:'',
    availability:'',
    select2:'',
    useDateLimitTye:'',//使用时间限制类型[时间段:'']或[期限:'1']
    effectivePeriodType:'',
    effectivePeriodNumber:'',
    effectivePeriodUnit:'',
    firstUseDate:'',
    lastUseDate:'',
    freeBaggageAllowancePieces:'',
    firstExcessOccurrence:'',
    lastExcessOccurrence:'',
    freeBaggageAllowanceWeight:'',
    freeBaggageAllowanceUnit:'',
    baggageTravelApplication:''/*行李使用范围*/,
    list196VO:[],
    noChargeNotAvailable:'',/*是否收费*/
    list170VO:[],
    list201VO:[],
    specSevFeeAndOrIndicator:'',/*或-和*/
    mileageExchangeIndicator:'',/*里程积分兑换标识*/
    specifiedServiceFeeMileage:'',/*里程费*/
    specifiedServiceFeeApp:'',/**适用于 */
    specServiceFeeColSub:'',/*包含-扣除*/
    specServiceFeeNetSell:'',/*净价-销售价*/
    indicatorComission:'Y',/*有无代理费*/
    taxApplication:'Y',/*有无税费*/
    sequenceNumber:'',/*优先级序号*/
    passengerTypeCode:'',/**旅客类型*/
    minPassengerAge:'',/*年龄范围*/
    maxPassengerAge:'',
    allowancePeopleMinimum:'',/*服务人数范围*/
    allowancePeopleMaximum:'',
    firstPassengerOccurrence:'',/*旅客序号范围*/
    lastPassengerOccurrence:'',
    frequentFlyerStatus:'',/*常旅客状态*/
    customerIndexScoreMinimum:'',/**客户积分范围*/
    customerIndexScoreMaxmum:'',
    list172VO:[],/*大客户-特殊客户**/
    list178VO:[],/**发布对象*/
    publicPrivateIndicator:'',/*公布私有**/
    geoSpecFromToWithin:'',/*区域限制*/
    geoSpecSectPortJourney:'',/**区域部分全程*/
    geoSpecTravelIndicator:'',/*指定区域*/
    geoSpecExceptionStopTime:'',/*经停时间*/
    geoSpecExceptionStopUnit:'',/*经停单位*/
    geoSpecStopConnDes:'',/*经停类型*/
    geoSpecLoc1Type:'',/*区域1*/
    geoSpecLoc1:'',
    geoSpecLoc2Type:'',/*区域2*/
    geoSpecLoc2:'',
    geoSpecLoc3Type:'',/*区域3*/
    geoSpecLoc3:'',
    mileageMinimum:'',/*里程范围*/
    mileageMaximum:'',
    indicatorInterline:'Y',/*是否联程*/
    travelStartDate:'',/*旅行开始日期*/
    travelEndtDate:'',/*旅行截止日期*/
    startTime:'',/*起始时刻*/
    stopTime:'',/*结束时刻*/
    dayOfWeek:['3'],/*星期*/
    equipment:'',/*机型*/
    cabin:'',/*舱位等级*/
    upgradeToCabin:'',/*升舱到的服务等级*/
    advancedPurchasePeriod:'',/*提前购票时间*/
    advancedPurchaseUnit:'',/*提前购票时间单位*/
    tourCode:'',/*旅行编码*/
    tariff:'',/*TARIFF NO.**/
    rule:'',/*RULE NO.*/
    advancedPurchaseTktIssue:'',/*与机票同时出票**/
    indicatorReissueRefund:'',/**是否可退*/
    formOfRefund:''/*退款形式*/
} ;

export let serviceData ={
    recordS5Id:'',
    serviceType:'F',
    group:'',
    subGroup:'',
    subCode:'',
    serviceChooseList:[]
};

export let optionsData ={
    effectivePeriodType:[/**使用时间限制 */
        {name:"选择","value":""},{name:"距购买服务后",value:"A"},
        {name:"距服务兑换后",value:"B"},
        {name:"距航班起飞前",value:"D",disabled:true}
    ] ,
    effectivePeriodUnit:[/**使用时间限制 */
        {name:"天",value:"D"},{name:"月",value:"M"},
        {name:"小时",value:"H"}
    ],
    availability:[/**是否检查库存 */
        {name:"是",value:"N"},{name:"否",value:"Y"}
    ],
    specSevFeeAndOrIndicator:[/*或-和*/
        {name:"或",value:""},{name:"和",value:"A"},
    ],
    mileageExchangeIndicator:[/*里程积分兑换标识*/
        {name:"不兑换",value:''},{name:"兑换，用里程支付",value:'1'},{name:"兑换，用里程或金额支付",value:'2'}
    ],
    noChargeNotAvailable:[/**是否收费 */
        {"name":"收费","value":""},{"name":"不适用","value":"X"},
        {"name":"免费，不出EMD单","value":"F"},{"name":"免费，出EMD单","value":"E"},
        {"name":"免费，不出EMD单，不要求预定","value":"G"},{"name":"免费，出EMD单，不要求预定","value":"H"},
        {"name":"免费，行李规则遵循市场方航空公司规则","value":"D"},{"name":"免费，行李规则遵循承运方航空公司规则","value":"O"}
    ],
    specifiedServiceFeeApp:[/*适用于*/
        {"name":"每一个票价组成部分算一次服务费用","value":"1"},{"name":"每一个票价组成部分算一半的服务费用","value":"2"},
        {"name":"每用一次服务算一次服务费用","value":"3"},{"name":"匹配的部分航程算一次服务费用","value":"4"},
        {"name":"往返程服务费用【F/R/T】","value":"5"},{"name":"每公斤按公布运价的0.5%收费","value":"H"},
        {"name":"每公斤按公布运价的1%收费","value":"C"},{"name":"每公斤按公布运价的1.5%收费","value":"P"},
        {"name":"按每公斤收费","value":"K"},{"name":"按每5公斤收费","value":"F"}
    ],
    specServiceFeeColSub:[/*包含扣除**/
        {"name":"包含在票价中","value":"I"},{"name":"单独收费","value":""}
    ],
    specServiceFeeNetSell:[
        {"name":"销售价","value":""},{"name":"净价","value":"N"}
    ],
    indicatorComission:[/*有无代理费*/
        {"name":"有","value":"Y"},{"name":"无","value":"N"}
    ],
    taxApplication:[/*有无税费*/
        {"name":"有","value":"Y"},{"name":"无","value":"N"}  
    ],
    passengerTypeCode:[/**旅客类型(这个数据从后台查询过来)*/
        {name:'选择',value:''}
    ],
    frequentFlyerStatus:[/*常旅客状态(这个数据从后台查询过来)*/
        {name:'选择',value:''}
    ],
    publicPrivateIndicator:[/*公布-私有*/
            {name:'公布',value:''},{name:'私有',value:'P'}
    ],
    geoSpecFromToWithin:[/**区域限制*/
        {name:'不限区域',value:''},{name:'区域1→2',value:'1'},
        {name:'区域2→1',value:'2'},{name:'区域1内部',value:'W'}
    ],
    geoSpecSectPortJourney:[/**区域-部分-全程*/
        {"name":"选择","value":""},{"name":"Sector","value":"S"},
        {"name":"Portion","value":"P"},{"name":"Journey","value":"J"}
    ],
    geoSpecExceptionStopUnit:[/**经停时间单位*/
        {"name":"选择","value":""},{"name":"分","value":"N"},
        {"name":"小时","value":"H"},{"name":"天","value":"D"},
        {"name":"月","value":"M"}
    ],
    geoSpecLoc1Type:[/**区域单位*/
        {"name":"选择","value":""},
        {"name":"大区","value":"A"},{"name":"城市","value":"C"},
        {"name":"国家","value":"N"},{"name":"机场","value":"P"},
        {"name":"州","value":"S"},{"name":"区域","value":"Z"}
    ],
    indicatorInterline:[
        {"name":"是","value":"Y"},{"name":"否","value":"N"}
    ],
    dayOfWeek:[
        {"name":"星期一","value":"1"},{"name":"星期二","value":"2"},
        {"name":"星期三","value":"3"},{"name":"星期四","value":"4"},
        {"name":"星期五","value":"5"},{"name":"星期六","value":"6"},
        {"name":"星期日","value":"7"}
    ],
    equipment:[/*机型(这个数据从后台查询过来)**/
            {name:'选择',value:''}
    ],
    cabin:[/*舱位等级*/
        {"name":"选择","value":""},
        {"name":"豪华头等舱","value":"R"},{"name":"头等舱","value":"F"},
        {"name":"豪华商务舱","value":"J"},{"name":"商务舱","value":"C"},
        {"name":"豪华经济舱","value":"P"},{"name":"经济舱","value":"Y"}
    ],
    advancedPurchaseUnit:[/*提前购票时间单位*/
        {"name":"分","value":"N"}, {"name":"小时","value":"H"},
        {"name":"天","value":"D"}, {"name":"月","value":"M"}
    ],
    advancedPurchaseTktIssue:[/**与机票同时出票*/
        {"name":"是","value":""}, {"name":"否","value":"X"},
    ],
    indicatorReissueRefund:[/*是否可退*/
        {"name":"不可退款","value":"N"},
        {"name":"可退款","value":"Y"}, {"name":"可改","value":"R"}
    ],
    formOfRefund:[/**退款形式*/
        {"name":"选择","value":""},{"name":"按原付款渠道退款","value":"1"},
        {"name":"按电子凭证退款","value":"2"}
    ]
} ; 