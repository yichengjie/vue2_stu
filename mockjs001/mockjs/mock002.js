// Mock.mock('http://localhost:3000/ocgui/s7/query.action', {
//     'name'	   : '[@name](/user/name)()',
//     'age|1-100': 100,
//     'color'	   : '[@color](/user/color)'
// });
// Mock.mock('http://localhost:3000/ocgui/s7/query.action', {
//     'name'     : '@name',
//     'age|1-100': 100,
//     'color'    : '@color',
//     'tset|123.1-10': 1,
//     'test002|1': true 
// });

Mock.mock('http://localhost:3000/ocgui/s7/query.action', {
    'flag|1': true ,
    'list|5':[{
        'name'     : '@name',
        'age|1-100': 100,
        'color'    : '@color',
        'tset|123.1-10': 1,
        'test002|1': true 
    }]
});