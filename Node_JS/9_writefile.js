import fs from 'fs';  //ko connect fs module ki tra km krta hai local data ko connect krna(fs ka km)

fs.writeFile('8_output.txt', 'Today Weather is amazing', (err)=>{
    if (err) throw err;
    // console.log("File Saved");
});

// write file ka km hai new file create krni
// fs.writeFile(file, data[, options], callback) callback parameter err in this only