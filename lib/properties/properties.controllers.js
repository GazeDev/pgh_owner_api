module.exports = async () => {
  // const Boom = require('@hapi/boom');

  let Properties;
  try {
    let processedJsonPath = '../../assessments/processed.json';
    const fs = require("fs");
    if (!fs.existsSync('./assessments/processed.json')) {
      console.log('assessments/processed.json does not exist, creating...');
      try {
        const process = require('../../assessments/process.js');
        await process('json');
      } catch (e) {
        console.log('ERROR generating processed.json', e);
      }
    }
    Properties = require(processedJsonPath);
    console.log('parcels loaded');
    console.log('count:', Properties.length);
  } catch (e) {
    console.log('ERROR loading processed.json', e);
  }

//   const used = process.memoryUsage().heapUsed / 1024 / 1024;
// console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  return {
    getProperties: async function(request, h) {
      console.log('Request params:', JSON.stringify(request.query));
      // let searchType = 'csv';
      let searchType = 'json';
      try {
        if (searchType == 'json') {
          console.time("search");
          let matches = [];
          let filters = request.query;
          for (let i of Properties) {
            if (jsonFilter(i, filters)) {
              // customize the order of the returned results
              matches.push({
                parid: i.parid,
                address: i.address,
                owner: i.owner,
                ownerAddress: i.ownerAddress,
                home: i.home,
              });
            }
          }
          console.timeEnd("search");
          // return matches;
          return {
            query: request.query,
            count: matches.length,
            results: matches,
          };
        } else {
          console.time("search");
          let response = await csvSearch(request.query);
          response = format(response);
          console.timeEnd("search");
          return response;
        }

      } catch (e) {
        console.log('e', e);
        throw e;
      }

    }
  };

};

function jsonSearch(filters, properties) {
  let count = 0;
  let matches = [];
  return new Promise((resolve, reject) => {

  }, err => {
    return reject(err);
  }, onComplete => {
    return resolve(matches);
  });
}
  function jsonFilter(i, filters) {
    // NOTE: This function is overwriting properties in the filters object.
    // Because objects are passed by reference this means the filters object is
    // modified outside of this function scope. Keep in mind in case it's a
    // problem elsewhere.

    //  If any filter matches, then we have a match for the item
    if (Object.prototype.hasOwnProperty.call(filters, 'parcelId')) {
      // standardize string to array
      if (typeof filters.parcelId === 'string') {
        filters.parcelId = [filters.parcelId];
      }
      for (let filter of filters.parcelId) {
        if (i.parid.includes(filter.toUpperCase())) {
          return true;
        }
      }
    }

    if (Object.prototype.hasOwnProperty.call(filters, 'address')) {
      // standardize string to array
      if (typeof filters.address === 'string') {
        filters.address = [filters.address];
      }
      for (let filter of filters.address) {
        if (i.address.includes(filter.toUpperCase())) {
          return true;
        }
      }
    }

    if (Object.prototype.hasOwnProperty.call(filters, 'owner')) {
      // standardize string to array
      if (typeof filters.owner === 'string') {
        filters.owner = [filters.owner];
      }
      for (let filter of filters.owner) {
        if (i.owner.includes(filter.toUpperCase())) {
          return true;
        }
      }
    }

    if (Object.prototype.hasOwnProperty.call(filters, 'ownerAddress')) {
      // standardize string to array
      if (typeof filters.ownerAddress === 'string') {
        filters.ownerAddress = [filters.ownerAddress];
      }
      for (let filter of filters.ownerAddress) {
        if (i.ownerAddress.includes(filter.toUpperCase())) {
          return true;
        }
      }
    }

    return false;
  }

function csvSearch(filters) {
  // console.log(filters);
  const csv = require('csvtojson');
  let fs = require("fs");
  let stream = fs.createReadStream('./assessments/AC_Property_Assessments_20200115.csv');
  let count = 0;
  let matches = [];
  return new Promise((resolve,reject)=>{
    csv({delimiter: '\t'}).fromStream(stream).subscribe(json => {
      if (filter(json, filters)) {
        matches.push(json);
      }
      count ++;
    }, err => {
      return reject(err);
    }, onComplete => {
      return resolve(matches);
    });
  })
}
  function filter(i, filters) {
    // NOTE: This function is overwriting properties in the filters object.
    // Because objects are passed by reference this means the filters object is
    // modified outside of this function scope. Keep in mind in case it's a
    // problem elsewhere.

    //  If any filter matches, then we have a match for the item
    if (Object.prototype.hasOwnProperty.call(filters, 'parcelId')) {
      // standardize string to array
      if (typeof filters.parcelId === 'string') {
        filters.parcelId = [filters.parcelId];
      }
      for (let filter of filters.parcelId) {
        if (i.PARID.replace(/\s+/g, ' ').includes(filter.toUpperCase())) {
          return true;
        }
      }
    }

    if (Object.prototype.hasOwnProperty.call(filters, 'address')) {
      let address = `${i.PROPERTYHOUSENUM} ${i.PROPERTYADDRESS} ${i.PROPERTYCITY} ${i.PROPERTYSTATE} ${i.PROPERTYZIP}`.replace(/\s+/g, ' ');
      // standardize string to array
      if (typeof filters.address === 'string') {
        filters.address = [filters.address];
      }
      for (let filterAddress of filters.address) {
        if (address.includes(filterAddress.toUpperCase())) {
          return true;
        }
      }
    }

    if (Object.prototype.hasOwnProperty.call(filters, 'owner')) {
      // standardize string to array
      if (typeof filters.owner === 'string') {
        filters.owner = [filters.owner];
      }
      for (let owner of filters.owner) {
        if (i.PROPERTYOWNER.replace(/\s+/g, ' ').includes(owner.toUpperCase())) {
          return true;
        }
      }
    }

    if (Object.prototype.hasOwnProperty.call(filters, 'ownerAddress')) {
      let ownerAddress = `${i.CHANGENOTICEADDRESS1} ${i.CHANGENOTICEADDRESS2} ${i.CHANGENOTICEADDRESS3} ${i.CHANGENOTICEADDRESS4}`.replace(/\s+/g, ' ');
      // standardize string to array
      if (typeof filters.ownerAddress === 'string') {
        filters.ownerAddress = [filters.ownerAddress];
      }
      for (let filterAddress of filters.ownerAddress) {
        if (ownerAddress.includes(filterAddress.toUpperCase())) {
          return true;
        }
      }
    }

    return false;
  }

function format (matches) {
  let formatted = [];
  for (let i of matches) {
    formatted.push({
      parid: i.PARID,
      address: `${i.PROPERTYHOUSENUM} ${i.PROPERTYADDRESS} ${i.PROPERTYCITY} ${i.PROPERTYSTATE} ${i.PROPERTYZIP}`.replace(/\s+/g, ' '),
      owner: i.PROPERTYOWNER.replace(/\s+/g, ' '),
      ownerAddress: `${i.CHANGENOTICEADDRESS1} ${i.CHANGENOTICEADDRESS2} ${i.CHANGENOTICEADDRESS3} ${i.CHANGENOTICEADDRESS4}`.replace(/\s+/g, ' '),
      home: i.HOMESTEADFLAG,
    })
  }
  return formatted;
}


// TODO: try processing the file in just an index file, no hapi, etc.
// TODO: try streaming and stripping the file down to just the info needed
//
class Properties {
  constructor(request) {
    this.request = request;
    this.builder = {};
  }

  streamSearch(params) {



    const csv = require('csvtojson');
    let fs = require("fs");
    let stream = fs.createReadStream('./lib/properties/AC_Property_Assessments_20200115.csv');
    let matches = [];
    return new Promise((resolve,reject) => {
      csv({delimiter: '\t'}).fromStream(stream).subscribe(json => {
        if (this.filter(item, params)) {
          this.builder.matches.push(item);
        }
        count ++;
      }, err => {
        return reject(err);
      }, onComplete => {
        return resolve(matches);
      });
    })

    return this;
  }

  format () {
    let matches = this.builder.matches;
    let formatted = [];
    for (let i of matches) {
      formatted.push({
        parcel: i.PARID,
        address: `${i.PROPERTYHOUSENUM} ${i.PROPERTYADDRESS} ${i.PROPERTYCITY} ${i.PROPERTYSTATE} ${i.PROPERTYZIP}`.replace(/\s+/g, ' '),
        owner: i.PROPERTYOWNER.replace(/\s+/g, ' '),
        ownerAddress: `${i.CHANGENOTICEADDRESS1} ${i.CHANGENOTICEADDRESS2} ${i.CHANGENOTICEADDRESS3} ${i.CHANGENOTICEADDRESS4}`.replace(/\s+/g, ' '),
        homestead: i.HOMESTEADFLAG,
      })
    }
    this.builder.matches = formatted;

    return this;
  }

  result() {
    return this.builder.matches;
  }

  _filter(i, filters) {

  }

}
