module.exports = function(outputType) {
      const fs = require('fs');
      const readline = require('readline');

      const readFile = readline.createInterface({
        input: fs.createReadStream('./assessments/AC_Property_Assessments_20200115.csv'),
        output: fs.createWriteStream(`./assessments/processed.${outputType}`, {
          emitClose: true
        }),
        terminal: false
      });

      var fileArray = [];

      let transform = (outputType == 'csv') ? transformAsCsv : transformAsJson;

      return new Promise((resolve, reject) => {
        readFile
          .on('line', transform)
          .on('close', function() {
            console.log(`Created "${this.output.path}"`);
            if (outputType == 'json') {
              let writable = this.output;
              writable.write(JSON.stringify(fileArray), () => {
                resolve(true);
              });
            } else {
              resolve(true);
            }
          });
      });

      function transformAsCsv(line) {
        let array = line.split('\t');
        let columns = [
          0, // PARID
          1, // PROPERTYOWNER
          2, // PROPERTYHOUSENUM
          3, // PROPERTYFRACTION
          4, // PROPERTYADDRESS
          5, // PROPERTYCITY
          6, // PROPERTYSTATE
          7, // PROPERTYUNIT
          8, // PROPERTYZIP
          29, // HOMESTEADFLAG
          49, // CHANGENOTICEADDRESS1
          50, // CHANGENOTICEADDRESS2
          51, // CHANGENOTICEADDRESS3
          52, // CHANGENOTICEADDRESS4
        ];
        let subset = [];
        for (column of columns) {
          subset.push(array[column]);
        }
        let newline = subset.join('\t');
        this.output.write(`${newline}\n`);
      }

      function transformAsJson(line) {
        let array = line.split('\t');
        let columns = [
          0, // PARID
          1, // PROPERTYOWNER
          2, // PROPERTYHOUSENUM
          3, // PROPERTYFRACTION
          4, // PROPERTYADDRESS
          5, // PROPERTYCITY
          6, // PROPERTYSTATE
          7, // PROPERTYUNIT
          8, // PROPERTYZIP
          29, // HOMESTEADFLAG
          49, // CHANGENOTICEADDRESS1
          50, // CHANGENOTICEADDRESS2
          51, // CHANGENOTICEADDRESS3
          52, // CHANGENOTICEADDRESS4
        ];
        let subset = {
          parid: array[0],
          owner: array[1],
          home: array[29],
          address: `${array[2]} ${array[4]} ${array[5]} ${array[6]} ${array[8]}`.replace(/\s+/g, ' '),
          ownerAddress: `${array[49]} ${array[50]} ${array[51]} ${array[52]}`.replace(/\s+/g, ' '),
        };
        fileArray.push(subset);
      }
    };
