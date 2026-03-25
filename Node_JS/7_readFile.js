import fs from 'fs';

//fs.readFile(path[, options], callback)

fs.readFile('8_message.txt', 'utf8', (err, data)=>{
    if (err) throw err;
    console.log("File Content:", data);
});

//arrow function main na function hota hai na function name  ()=>{}
//  normal function main function aur function name hota hai  function (){}, function add(){}