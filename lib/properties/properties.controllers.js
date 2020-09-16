module.exports = async (models) => {
  const Boom = require('@hapi/boom');
  const Sequelize = require('sequelize');
  const Op = Sequelize.Op;
  const addressHelpers = require('../address/address.helpers');

  try {
    console.log('Processing addresses...')
    await processAddresses();
    console.log('Done processing addresses.');
  } catch (e) {
    console.error('Error during processAddresses().', e);
  }

// const used = process.memoryUsage().heapUsed / 1024 / 1024;
// console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  return {
    getProperties: async function(request, h) {
      console.log('Request params:', JSON.stringify(request.query));
      let response;
      try {
        response = await getProperties(request.query);
      } catch (e) {
        throw Boom.badImplementation('Error during getProperties(request.query).', e);
      }
      return {
        query: request.query,
        count: response.length,
        results: response,
      };
    },
  };

  async function processAddresses() {
    let limit = 1000;
    let offset = 0;
    let instances;
    do {
      instances = await models.Property.findAll({
        where: {
          [Op.or]: {
            address: null,
            searchableAddressV1: null,
            ownerAddress: null,
            searchableOwnerAddressV1: null,
          }
        },
        attributes: [
          'PARID',
          'PROPERTYHOUSENUM',
          'PROPERTYADDRESS',
          'PROPERTYCITY',
          'PROPERTYSTATE',
          'PROPERTYZIP',
          'PROPERTYOWNER',
          'CHANGENOTICEADDRESS1',
          'CHANGENOTICEADDRESS2',
          'CHANGENOTICEADDRESS3',
          'CHANGENOTICEADDRESS4',
        ],
        offset: 0,
        limit: limit,
      });
      if (instances.length > 0) {
        console.log(`Processing - limit: ${limit}. offset: ${offset}. instances: ${instances.length}`);
      }
      let saves = [];
      offset = offset + limit;
      for (var i = 0; i < instances.length; i++) {
        let instance = instances[i];
        let address = `${instance['PROPERTYHOUSENUM']} ${instance['PROPERTYADDRESS']} ${instance['PROPERTYCITY']} ${instance['PROPERTYSTATE']} ${instance['PROPERTYZIP']}`;
        let addressV1 = addressHelpers.preProcessAddress(address);
        let owner = instance['PROPERTYOWNER'].replace(/\s+/g, ' ');
        let ownerAddress = `${instance['CHANGENOTICEADDRESS1']} ${instance['CHANGENOTICEADDRESS2']} ${instance['CHANGENOTICEADDRESS3']} ${instance['CHANGENOTICEADDRESS4']}`;
        let ownerAddressV1 = addressHelpers.preProcessAddress(ownerAddress);
        instance['owner'] = owner;
        instance['address'] = address.replace(/\s+/g, ' ');
        instance['searchableAddressV1'] = addressV1;
        instance['ownerAddress'] = ownerAddress.replace(/\s+/g, ' ');
        instance['searchableOwnerAddressV1'] = ownerAddressV1;
        let save = instance.save({
          fields: ['address', 'searchableAddressV1', 'owner', 'ownerAddress', 'searchableOwnerAddressV1'],
        });
        saves.push(save)
      }
      await Promise.all(saves);

    } while (instances.length !== 0);
    return true;
  }

  async function getProperties(queries = null) {
    let whereOptions = {};
    if (queries !== null) {
      whereOptions[Op.or] = {};
    }

    if (propOf(queries, 'parcelId')) {
      whereOptions[Op.or].PARID = {
        [Op.or]: [].concat(queries.parcelId).map((val) => {
          return {[Op.iLike]: '%' + val + '%'};
        }),
      };
    }
    if (propOf(queries, 'address')) {
      whereOptions[Op.or].searchableAddressV1 = {
        [Op.or]: [].concat(queries.address).map((val) => {
          return {[Op.iLike]: '%' + addressHelpers.preProcessAddress(val, replacePercent = false) + '%'}
        }),
      };
    }
    if (propOf(queries, 'owner')) {
      whereOptions[Op.or].owner = {
        [Op.or]: [].concat(queries.owner).map((val) => {
          return {[Op.iLike]: '%' + val + '%'};
        }),
      };
    }
    if (propOf(queries, 'ownerAddress')) {
      whereOptions[Op.or].searchableOwnerAddressV1 = {
        [Op.or]: [].concat(queries.ownerAddress).map((val) => {
          return {[Op.iLike]: '%' + addressHelpers.preProcessAddress(val, replacePercent = false) + '%'}
        }),
      };
    }

    let properties = await models.Property.findAll({
      where: whereOptions,
      attributes: [
        ['PARID', 'parid'],
        'address',
        ['PROPERTYOWNER', 'owner'],
        'ownerAddress',
        ['HOMESTEADFLAG', 'home'],
      ]
    });

    return properties;
  }

  function propOf(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

};
