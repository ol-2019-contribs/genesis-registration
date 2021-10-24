const testFolder = '.';
const fs = require('fs');
var _ = require('lodash');

let stats = [];

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    let a = file.indexOf("-oper");
    if (a == -1) {
      console.log(file);

      let path = file + "/account_profile";
      
      if (fs.existsSync(path)) {
      
        let rawdata = fs.readFileSync(path);
        let profile = JSON.parse(rawdata);
        let parsed_value = JSON.parse(profile.value);
        let new_autopay = _
        .reject(parsed_value.autopay_instructions, (pay) => {
          return pay.value === 0
        })
        .forEach((pay, i) => {
          let instruction = {
            ns: file,
            dest: pay.destination,
            percent: pay.value

          }
          // console.log(instruction);
          stats.push(instruction);
          // // console.log(i);
          // pay.uid = i + 1;
          // if (pay.note.indexOf("benefits") != -1) {
            
          //   let true_address = "19E966BFA4B32CE9B7E23721B37B96D2";
          //   pay.destination = true_address;
            
          // }
          // pay.end_epoch = 1000;
          // pay.duration_epochs = 1000;
          // return pay

        })

        
        // overwrite the account profile

        // console.log(profile);

      }


    }
    



    
  });
  console.log(stats);
  fs.writeFile("./stats.json", JSON.stringify(stats), function (err) {
    if (err) return console.log(err);
    console.log(`File saved`);
  });
});

