var faker = require('faker');
 var fs=require('fs'); 
 var jsonArray=[]; 
    for(i=0;i<1000000;i++){
    	 var jsonObj={};

    	jsonObj.id=i;
    	jsonObj.name=faker.name.firstName();
    	jsonObj.city=faker.address.city();
    	jsonObj.email=faker.internet.email();
    	jsonArray.push(jsonObj);
 }
var jsonObj1={};
jsonObj1.employees=jsonArray;

fs.writeFile('output_json.json',JSON.stringify(jsonObj1),'utf-8');
