var contextPath ="/ocgui"
var carrCode = "CA" ;
/**
 *  "code": "747", 
            "description": "B747-400CMB"
 *///contextPath
var initPage4AddUrl = contextPath+'/s7/initPage4Add.action' ;
Mock.mock(initPage4AddUrl, {
    "equipmentList|5":[
        {
            "code|1": ['747','73G','733','340','319'],
            "description|1":['B747-400CMB','B737-700','B737-3z00','A340-300','A319-111']
        }
    ],
    "flag|1":true,
    "ffpList|4":[
        {
            "id|1":['8be6a271ea7c4435b74460c277c204da',
                    '3b77accb37d94d6ea4fcf9e00694f9cf',
                    'c5eab8fe739b42f49f8a07ac0654831a',
                    '3b72585de6264f76a8059f7aa220b98c'],
            "cardType|1":["V","G","C","P"] ,
            "description|1":["白金卡","金卡","银卡","普通卡"],
            "ffpStatus|1":["1","2","3","4"]
        }
    ],
    "passengerList|3":[
        {
           "psgrTypeCode|1":["ADT","CNN","UNN"] ,
           "psgrTypeDesc|1":["成人","儿童","无人陪伴儿童"]
        }
    ],
    "serviceGroupList|+1":202,
    "serviceChooseList|10-20":[
        {
            "id":"@id",
            "carrCode":"CA",
            "serviceType|1":["F","M","R","T","A","B","C","E","P"],
            "serviceSubCode|1":['0JK','0JJ','099'],
            "commercialName|1":['cm001','cm002','cm003'],
            "attributesGroup|1":["BG","BD"],
            "attributesSubgroup|1":['22','54','44'],
            "serviceGroupDescription|1":['22','54','44'],
            "subGroupDescription|1":['Priority Boarding','Priority','Boarding',''],
            "subCodeTableNo163|1":['9000101',"9000102","9000103"]
        }
    ]
});

