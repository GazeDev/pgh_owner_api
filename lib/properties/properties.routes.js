
module.exports = {
  routes: async (models) => {
    const controllers = await require('./properties.controllers.js')(models);
    const propertiesModels = require('./properties.models');
    return [
      {
        method: 'GET',
        path: '/properties',
        handler: controllers.getProperties,
        options: {
          auth: 'jwt',
          description: 'Get properties',
          notes: 'Get properties for an inputted search query',
          tags: ['api', 'Properties'],
          validate: {
            query: propertiesModels.apiFilterQuery,
          }
        }
      },
    ];
  },
};
